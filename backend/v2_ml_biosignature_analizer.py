#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
ANALIZADOR MEJORADO DE BIOSIGNATURAS CON MACHINE LEARNING
=========================================================
Versión 2.1 — Pipelines sin fuga, imputación robusta, HZ ajustada, métricas balanceadas,
reporte mejorado y guardado de modelos/metrics.

Requisitos:
  pip install pandas numpy requests scikit-learn joblib
"""

import os
import json
import warnings
from datetime import datetime

import numpy as np
import pandas as pd
import requests
import joblib

from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split, cross_val_score, StratifiedKFold
from sklearn.metrics import classification_report, confusion_matrix, balanced_accuracy_score
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.svm import SVC
from sklearn.neural_network import MLPClassifier

warnings.filterwarnings("ignore")


class EnhancedBiosignatureAnalyzer:
    def __init__(self, data_dir: str = "exoplanet_data", labeling_strategy: str = "thresholds"):
        """
        labeling_strategy: 'thresholds' (porcentaje fijo) | 'quantiles' (quintiles)
        """
        self.data_dir = data_dir
        self.ensure_data_directory()

        # Configuración de scoring (ajustada)
        self.scoring_config = {
            'habitability_weight': 0.35,
            'detectability_weight': 0.30,
            'biosignature_weight': 0.25,
            'stellar_activity_weight': 0.10,

            # Habitabilidad
            'optimal_temp_range': (250, 350),   # K
            'extended_temp_range': (200, 400),  # K
            'earth_size_bonus': 2.0,            # x10 → +20
            'super_earth_bonus': 1.5,           # x10 → +15

            # Detectabilidad
            'bright_star_penalty': -10,         # J < 6 (saturación)
            'optimal_period_range': (1, 50),    # días
            'transit_depth_bonus': 5,           # profundidad alta

            # Factores estelares
            'm_dwarf_bonus': 15,                # M favorece
            'flare_star_penalty': -20,          # (placeholder si tuvieras dato)
            'old_star_bonus': 5,                # >5 Gyr
        }

        # Clases para ML
        self.ml_classes = {
            0: "No Viable",
            1: "Low Priority",
            2: "Medium Priority",
            3: "High Priority",
            4: "Prime Target"
        }

        self.models = {}  # se llenará con {name: {..., 'model': pipeline}}
        self.labeling_strategy = labeling_strategy  # 'thresholds' | 'quantiles'

    # -------------------- UTILIDADES BÁSICAS --------------------

    def ensure_data_directory(self):
        os.makedirs(self.data_dir, exist_ok=True)

    # -------------------- DESCARGA DE DATOS --------------------

    def download_nasa_datasets(self):
        """Descarga datasets actualizados de NASA Exoplanet Archive con timeouts optimizados y fallback a archivos locales"""
        print("🛰️  DESCARGANDO DATASETS REALES DE NASA...")

        datasets = {
            'confirmed': 'https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+*+from+ps&format=csv',
            'tess_toi': 'https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+*+from+toi&format=csv',
            'k2': 'https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+*+from+k2pandc&format=csv'
        }

        # Timeouts optimizados por dataset
        timeouts = {
            'confirmed': 90,
            'tess_toi': 90,
            'k2': 180  # K2 necesita más tiempo
        }

        downloaded_data = {}

        for name, url in datasets.items():
            filename = os.path.join(self.data_dir, f"{name}_data.csv")

            # Verificar si existe archivo local
            if os.path.exists(filename):
                print(f"   📁 Usando archivo local existente: {filename}")
                try:
                    df = pd.read_csv(filename)
                    downloaded_data[name] = df
                    print(f"   ✅ {len(df):,} registros de {name} (local)")
                    continue
                except Exception as e:
                    print(f"   ⚠️  Error leyendo archivo local, intentando descarga: {e}")

            try:
                print(f"📥 Descargando {name}...")
                response = requests.get(
                    url,
                    timeout=timeouts.get(name, 90),
                    stream=True  # Para datasets grandes
                )
                response.raise_for_status()

                # Guardar archivo
                with open(filename, "wb") as f:
                    for chunk in response.iter_content(chunk_size=8192):
                        f.write(chunk)

                df = pd.read_csv(filename)
                downloaded_data[name] = df
                print(f"   ✅ {len(df):,} registros de {name}")

            except requests.exceptions.Timeout:
                print(f"   ❌ Timeout descargando {name} (>{timeouts.get(name, 90)}s)")
                # Intentar usar archivo local si existe
                if os.path.exists(filename):
                    try:
                        df = pd.read_csv(filename)
                        downloaded_data[name] = df
                        print(f"   📁 Usando versión local de {filename}: {len(df):,} registros")
                    except:
                        downloaded_data[name] = pd.DataFrame()
                else:
                    downloaded_data[name] = pd.DataFrame()

            except Exception as e:
                print(f"   ⚠️  Saltando {name}: {str(e)[:100]}...")
                # Intentar usar archivo existente si está disponible
                if os.path.exists(filename):
                    try:
                        df = pd.read_csv(filename)
                        downloaded_data[name] = df
                        print(f"   ♻️  Usando archivo existente: {len(df):,} registros")
                    except:
                        downloaded_data[name] = pd.DataFrame()
                else:
                    downloaded_data[name] = pd.DataFrame()

        return downloaded_data

    # -------------------- FÍSICA: ZONA HABITABLE --------------------

    def calculate_enhanced_habitability_zone(self, stellar_temp, stellar_luminosity=None):
        """
        Zona habitable (Kopparapu 2013, conservador). Usa st_lum si está disponible.
        Devuelve (r_inner, r_outer) en AU o (None, None) si faltan datos.
        """
        if pd.isna(stellar_temp):
            return None, None

        T_sun = 5778.0
        T_star = float(stellar_temp)

        # Coeficientes conservadores
        S_eff_inner, a_i, b_i, c_i, d_i = 1.0140, 1.2456e-4, 1.4612e-8, -7.6345e-12, -1.7511e-15
        S_eff_outer, a_o, b_o, c_o, d_o = 0.3438, 5.8942e-5, 1.6558e-9, -3.0045e-12, -5.2983e-16

        dT = T_star - T_sun
        S_inner = S_eff_inner + a_i * dT + b_i * dT**2 + c_i * dT**3 + d_i * dT**4
        S_outer = S_eff_outer + a_o * dT + b_o * dT**2 + c_o * dT**3 + d_o * dT**4

        if (stellar_luminosity is not None) and (not pd.isna(stellar_luminosity)):
            L_star = float(stellar_luminosity)
        else:
            # Aproximación cruda si no hay luminosidad
            L_star = (T_star / T_sun) ** 4

        r_inner = np.sqrt(L_star / S_inner)
        r_outer = np.sqrt(L_star / S_outer)
        return r_inner, r_outer

    # -------------------- SCORING ALGORÍTMICO --------------------

    def calculate_enhanced_score(self, planet_data):
        """
        Scoring mejorado con arreglos: HZ extendida, detectabilidad (J muy brillante,
        profundidad de tránsito), actividad estelar empezando en 0 y cap al final.
        """
        details = {}

        # 1) HABITABILIDAD (35%)
        habitability = 0.0

        teff = planet_data.get('st_teff')
        a = planet_data.get('pl_orbsmax', np.nan)
        hz_inner = hz_outer = None
        if not pd.isna(teff):
            hz_inner, hz_outer = self.calculate_enhanced_habitability_zone(
                teff, planet_data.get('st_lum', None)
            )
        if hz_inner and hz_outer and not pd.isna(a):
            if hz_inner <= a <= hz_outer:
                habitability += 25  # dentro HZ
            # HZ extendida: algo por dentro o por fuera del rango conservador
            elif (hz_inner * 0.75 <= a < hz_inner) or (hz_outer < a <= hz_outer * 1.25):
                habitability += 12

        radius = planet_data.get('pl_rade', np.nan)
        if not pd.isna(radius) and radius > 0:
            if 0.8 <= radius <= 1.2:
                habitability += self.scoring_config['earth_size_bonus'] * 10  # +20
            elif 1.2 < radius <= 2.0:
                habitability += self.scoring_config['super_earth_bonus'] * 10  # +15
            elif radius > 4.0:
                habitability -= 15

        eqt = planet_data.get('pl_eqt', np.nan)
        if not pd.isna(eqt) and eqt > 0:
            opt_min, opt_max = self.scoring_config['optimal_temp_range']
            ext_min, ext_max = self.scoring_config['extended_temp_range']
            if opt_min <= eqt <= opt_max:
                habitability += 20
            elif ext_min <= eqt <= ext_max:
                habitability += 10
            else:
                habitability -= 10

        details['habitability'] = float(np.clip(habitability, 0, 35))

        # 2) DETECTABILIDAD (30%)
        detect = 0.0

        j_mag = planet_data.get('sy_jmag', np.nan)
        if not pd.isna(j_mag):
            if j_mag < 6:  # muy brillante (riesgo saturación JWST)
                detect += self.scoring_config['bright_star_penalty']  # negativo
            elif j_mag < 8:
                detect += 25
            elif j_mag < 10:
                detect += 20
            elif j_mag < 12:
                detect += 15
            else:
                detect += 5

        period = planet_data.get('pl_orbper', np.nan)
        if not pd.isna(period) and period > 0:
            pmin, pmax = self.scoring_config['optimal_period_range']
            if pmin <= period <= pmax:
                detect += 10
            elif period > 100:
                detect -= 5

        # Profundidad de tránsito (si está disponible)
        depth = planet_data.get('pl_trandep', planet_data.get('tran_depth', np.nan))
        if not pd.isna(depth) and depth > 0:
            # Heurística simple (ppm)
            if depth >= 1000:
                detect += self.scoring_config['transit_depth_bonus']  # +5
            elif depth >= 500:
                detect += 3

        stype = str(planet_data.get('st_spectype', '')).upper()
        if 'M' in stype:
            detect += self.scoring_config['m_dwarf_bonus']  # +15
        elif any(x in stype for x in ['F', 'G', 'K']):
            detect += 5

        details['detectability'] = float(np.clip(detect, -30, 30))

        # 3) POTENCIAL DE BIOSIGNATURA (25%)
        bio = 20.0
        mass = planet_data.get('pl_masse', np.nan)
        if not pd.isna(mass) and not pd.isna(radius) and radius > 0:
            density = mass / (radius ** 3)
            if 3.0 <= density <= 8.0:
                bio += 5
        details['biosignature'] = float(np.clip(bio, 0, 25))

        # 4) ACTIVIDAD ESTELAR (10%)
        act = 0.0  # iniciar en 0; cap al final
        age = planet_data.get('st_age', np.nan)
        if not pd.isna(age):
            if age > 5:
                act += self.scoring_config['old_star_bonus']  # +5
            elif age < 1:
                act -= 5
        details['stellar_activity'] = float(np.clip(act, -10, 10))

        total = details['habitability'] + details['detectability'] + details['biosignature'] + details['stellar_activity']
        details['total_score'] = float(np.clip(total, 0, 100))
        return details

    # -------------------- FEATURES PARA ML --------------------

    def prepare_ml_features(self, df: pd.DataFrame):
        """
        Prepara features en un DataFrame (sin imputación aquí).
        Incluye numéricas + derivadas (in_habitable_zone, densidad, tipo estelar codificado, logs).
        """
        base_feats = [
            'pl_rade', 'pl_masse', 'pl_orbper', 'pl_orbsmax', 'pl_eqt',
            'st_teff', 'st_rad', 'st_mass', 'st_age', 'sy_jmag', 'sy_kmag', 'st_lum'
        ]
        X = df.reindex(columns=base_feats).copy()

        # in_habitable_zone
        in_hz = []
        for _, row in df.iterrows():
            hz_in = hz_out = None
            if not pd.isna(row.get('st_teff')):
                hz_in, hz_out = self.calculate_enhanced_habitability_zone(row.get('st_teff'), row.get('st_lum'))
            a = row.get('pl_orbsmax', np.nan)
            flag = 0
            if hz_in and hz_out and not pd.isna(a) and hz_in <= a <= hz_out:
                flag = 1
            in_hz.append(flag)
        X['in_habitable_zone'] = in_hz

        # Densidad
        dens = []
        for _, row in df.iterrows():
            r, m = row.get('pl_rade', np.nan), row.get('pl_masse', np.nan)
            val = np.nan
            if not pd.isna(r) and r > 0 and not pd.isna(m):
                val = m / (r ** 3)
            dens.append(val)
        X['planet_density'] = dens

        # Tipo estelar codificado
        st_code = []
        st_series = df.get('st_spectype', pd.Series([''] * len(df)))
        for st in st_series.astype(str).str.upper():
            code = 0
            if 'M' in st:
                code = 1
            elif 'K' in st:
                code = 2
            elif 'G' in st:
                code = 3
            elif 'F' in st:
                code = 4
            st_code.append(code)
        X['stellar_type_encoded'] = st_code

        # Logs para variables sesgadas
        X['log_pl_orbper'] = np.log1p(X['pl_orbper'])
        # Evita log de negativos
        X['log_pl_eqt'] = np.log1p(X['pl_eqt'].clip(lower=0))

        feature_names = list(X.columns)
        return X, feature_names

    # -------------------- ETIQUETADO --------------------

    def create_training_labels(self, scores: np.ndarray):
        """
        Crea etiquetas (0..4) según estrategia:
          - thresholds: umbrales fijos por porcentaje
          - quantiles: quintiles del score (mejora el balance de clases)
        """
        scores = np.asarray(scores, dtype=float)
        if self.labeling_strategy == "quantiles":
            qs = np.quantile(scores, [0.2, 0.4, 0.6, 0.8])
            labels = np.digitize(scores, qs)  # 0..4
            return labels.astype(int)

        # strategy = 'thresholds'
        labels = []
        for s in scores:
            if s < 30:
                labels.append(0)
            elif s < 50:
                labels.append(1)
            elif s < 70:
                labels.append(2)
            elif s < 85:
                labels.append(3)
            else:
                labels.append(4)
        return np.asarray(labels, dtype=int)

    # -------------------- ENTRENAMIENTO ML --------------------

    def train_ml_models(self, X: pd.DataFrame, y: np.ndarray):
        """
        Entrena modelos con Pipelines (sin fuga), imputación mediana, CV estratificado
        y métricas balanceadas. Devuelve (results, best_model_name).
        """
        print("🤖 ENTRENANDO MODELOS DE MACHINE LEARNING...")

        skf = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)

        models = {
            'RandomForest': Pipeline([
                ('imp', SimpleImputer(strategy='median')),
                ('clf', RandomForestClassifier(
                    n_estimators=200, random_state=42, class_weight='balanced',
                    min_samples_leaf=3, n_jobs=-1, max_depth=15
                ))
            ]),
            'GradientBoosting': Pipeline([
                ('imp', SimpleImputer(strategy='median')),
                ('clf', GradientBoostingClassifier(
                    n_estimators=100, random_state=42, max_depth=8, learning_rate=0.1
                ))
            ]),
            'SVM': Pipeline([
                ('imp', SimpleImputer(strategy='median')),
                ('sc', StandardScaler(with_mean=False)),
                ('clf', SVC(
                    probability=True, class_weight='balanced', random_state=42,
                    C=1.0, gamma='scale', max_iter=1000  # Límite de iteraciones
                ))
            ]),
            'NeuralNetwork': Pipeline([
                ('imp', SimpleImputer(strategy='median')),
                ('sc', StandardScaler(with_mean=False)),
                ('clf', MLPClassifier(
                    hidden_layer_sizes=(64, 32), random_state=42,
                    max_iter=500, early_stopping=True, validation_fraction=0.1
                ))
            ])
        }

        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42, stratify=y
        )

        results = {}
        for name, pipe in models.items():
            print(f"   🔄 {name}...")
            try:
                # Timeout para modelos lentos
                import signal
                def timeout_handler(signum, frame):
                    raise TimeoutError(f"Modelo {name} excedió tiempo límite")

                # 5 minutos máximo por modelo
                signal.signal(signal.SIGALRM, timeout_handler)
                signal.alarm(300)

                pipe.fit(X_train, y_train)
                signal.alarm(0)  # Cancelar timeout

                # Holdout
                y_pred = pipe.predict(X_test)
                acc = float((y_pred == y_test).mean())
                bacc = float(balanced_accuracy_score(y_test, y_pred))

                # CV (accuracy y balanced accuracy) - solo 3 folds para velocidad
                skf_fast = StratifiedKFold(n_splits=3, shuffle=True, random_state=42)
                cv_acc = cross_val_score(pipe, X_train, y_train, cv=skf_fast, scoring='accuracy')
                cv_bacc = cross_val_score(pipe, X_train, y_train, cv=skf_fast, scoring='balanced_accuracy')

                results[name] = {
                    'model': pipe,
                    'test_accuracy': acc,
                    'test_balanced_accuracy': bacc,
                    'cv_mean_accuracy': float(cv_acc.mean()),
                    'cv_std_accuracy': float(cv_acc.std()),
                    'cv_mean_balanced_accuracy': float(cv_bacc.mean()),
                    'cv_std_balanced_accuracy': float(cv_bacc.std()),
                    'report': classification_report(y_test, y_pred, output_dict=False),
                    'confusion_matrix': confusion_matrix(y_test, y_pred).tolist()
                }

                print(f"      ✅ Acc: {acc:.3f} | BalAcc: {bacc:.3f} | CV acc: {cv_acc.mean():.3f}±{cv_acc.std():.3f}")

            except (TimeoutError, Exception) as e:
                print(f"      ⚠️  {name} falló o excedió tiempo: {str(e)[:50]}...")
                signal.alarm(0)  # Asegurar cancelación
                continue

        # Selección por balanced accuracy de CV
        best_model_name = max(results, key=lambda k: results[k]['cv_mean_balanced_accuracy'])
        self.models = results

        # Guardado de modelos (pipelines completos)
        for name, res in results.items():
            joblib.dump(res['model'], os.path.join(self.data_dir, f"model_{name.lower()}.pkl"))

        print(f"   🏆 Mejor modelo: {best_model_name}")
        return results, best_model_name

    # -------------------- PREDICCIÓN --------------------

    def predict_with_ml(self, X: pd.DataFrame, model_name: str = 'RandomForest'):
        """Predice con el pipeline seleccionado (incluye imputación/escalado interno)."""
        if model_name not in self.models:
            print(f"❌ Modelo {model_name} no encontrado")
            return None, None

        model = self.models[model_name]['model']
        predictions = model.predict(X)
        probabilities = model.predict_proba(X)  # todos los definidos soportan probas
        return predictions, probabilities

    # -------------------- PIPELINE COMPLETO --------------------

    def analyze_all_planets(self, use_dataset: str = 'confirmed'):
        """
        Pipeline completo de análisis:
          - Descarga datos
          - Scoring algorítmico
          - Features y etiquetas
          - Entrena y predice con ML
          - Guarda CSV, modelos y reporte
        """
        print("🌍 ANALIZADOR MEJORADO DE BIOSIGNATURAS")
        print("=" * 60)

        # Descargar datos
        datasets = self.download_nasa_datasets()
        if use_dataset not in datasets or datasets[use_dataset].empty:
            print("❌ No se pudieron descargar datos válidos.")
            return None, None

        df = datasets[use_dataset].copy()
        print(f"📊 Analizando {len(df):,} exoplanetas (source: {use_dataset})...")

        # Calcular scores algorítmicos
        print("🔢 Calculando scores algorítmicos...")
        scores = []
        detailed_results = []
        for idx, row in df.iterrows():
            score_details = self.calculate_enhanced_score(row)
            scores.append(score_details['total_score'])
            detailed_results.append({
                'planet_name': row.get('pl_name', f'Planet_{idx}'),
                'host_star': row.get('hostname', 'Unknown'),
                'biosignature_score': score_details['total_score'],
                'habitability_score': score_details['habitability'],
                'detectability_score': score_details['detectability'],
                'biosignature_potential': score_details['biosignature'],
                'stellar_activity': score_details['stellar_activity'],
                'radius_earth': row.get('pl_rade', np.nan),
                'mass_earth': row.get('pl_masse', np.nan),
                'orbital_period': row.get('pl_orbper', np.nan),
                'equilibrium_temp': row.get('pl_eqt', np.nan),
                'stellar_temp': row.get('st_teff', np.nan),
                'discovery_year': row.get('disc_year', np.nan)
            })

        scores = np.asarray(scores, dtype=float)

        # Features y etiquetas
        print("🤖 Preparando datos para Machine Learning...")
        X, feature_names = self.prepare_ml_features(df)
        y = self.create_training_labels(scores)

        # Entrenamiento
        ml_results, best_model = self.train_ml_models(X, y)

        # Predicciones sobre todos
        print("🔮 Generando predicciones ML...")
        predictions, probabilities = self.predict_with_ml(X, best_model)
        if predictions is None:
            print("❌ No hay predicciones.")
            return None, ml_results

        # Mezclar resultados
        for i, result in enumerate(detailed_results):
            pred = int(predictions[i])
            conf = float(np.max(probabilities[i]))
            result['ml_prediction'] = pred
            result['ml_class'] = self.ml_classes.get(pred, str(pred))
            result['ml_confidence'] = conf

        results_df = pd.DataFrame(detailed_results).sort_values('biosignature_score', ascending=False)

        # Guardado
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        csv_filename = os.path.join(self.data_dir, f"enhanced_ranking_{timestamp}.csv")
        results_df.to_csv(csv_filename, index=False)

        # Guardar métricas JSON (trazabilidad)
        metrics_payload = {
            'timestamp': timestamp,
            'labeling_strategy': self.labeling_strategy,
            'n_planets': int(len(df)),
            'best_model': best_model,
            'models': {
                name: {
                    'test_accuracy': res['test_accuracy'],
                    'test_balanced_accuracy': res['test_balanced_accuracy'],
                    'cv_mean_accuracy': res['cv_mean_accuracy'],
                    'cv_std_accuracy': res['cv_std_accuracy'],
                    'cv_mean_balanced_accuracy': res['cv_mean_balanced_accuracy'],
                    'cv_std_balanced_accuracy': res['cv_std_balanced_accuracy'],
                } for name, res in ml_results.items()
            }
        }
        metrics_filename = os.path.join(self.data_dir, f"metrics_{timestamp}.json")
        with open(metrics_filename, "w", encoding="utf-8") as f:
            json.dump(metrics_payload, f, ensure_ascii=False, indent=2)

        # Reporte Markdown
        self.generate_enhanced_report(results_df, ml_results, timestamp)

        print(f"✅ Análisis completado.")
        print(f"   • CSV: {csv_filename}")
        print(f"   • Métricas: {metrics_filename}")
        print(f"   • Reporte: {os.path.join(self.data_dir, f'enhanced_report_{timestamp}.md')}")
        return results_df, ml_results

    # -------------------- REPORTE --------------------

    def generate_enhanced_report(self, df: pd.DataFrame, ml_results: dict, timestamp: str):
        """Genera reporte Markdown con resultados y Top-20."""
        report_filename = os.path.join(self.data_dir, f"enhanced_report_{timestamp}.md")
        with open(report_filename, 'w', encoding='utf-8') as f:
            f.write("# REPORTE MEJORADO DE BIOSIGNATURAS CON MACHINE LEARNING\n")
            f.write(f"**Fecha:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
            f.write("**Sistema:** Enhanced Biosignature Analyzer v2.1\n\n")

            # Resumen ejecutivo
            f.write("## RESUMEN EJECUTIVO\n")
            f.write(f"- **Total de planetas analizados:** {len(df):,}\n")
            # Distribución por clases ML
            for class_id, class_name in self.ml_classes.items():
                count = int((df['ml_prediction'] == class_id).sum())
                f.write(f"- **{class_name}:** {count:,} planetas\n")

            # Resultados ML
            f.write("\n## RESULTADOS MACHINE LEARNING\n")
            for model_name, results in ml_results.items():
                f.write(f"### {model_name}\n")
                f.write(f"- **Accuracy (test):** {results['test_accuracy']:.3f}\n")
                f.write(f"- **Balanced Acc (test):** {results['test_balanced_accuracy']:.3f}\n")
                f.write(f"- **CV Accuracy:** {results['cv_mean_accuracy']:.3f} (±{results['cv_std_accuracy']:.3f})\n")
                f.write(f"- **CV Balanced Acc:** {results['cv_mean_balanced_accuracy']:.3f} (±{results['cv_std_balanced_accuracy']:.3f})\n\n")

            # Top candidatos (tras ordenar)
            f.write("## TOP 20 CANDIDATOS (ALGORITMO + ML)\n\n")
            f.write("| Rank | Planeta | Score | ML Class | Confidence | Habitabilidad | Detectabilidad |\n")
            f.write("|------|---------|-------|----------|------------|---------------|----------------|\n")
            top_20 = df.head(20).reset_index(drop=True)
            for rank, row in enumerate(top_20.itertuples(index=False), 1):
                f.write(
                    f"| {rank} | {str(row.planet_name)[:20]} | {row.biosignature_score:.1f}% | "
                    f"{row.ml_class} | {row.ml_confidence:.2f} | {row.habitability_score:.0f} | "
                    f"{row.detectability_score:.0f} |\n"
                )

            # Metodología
            f.write("\n## METODOLOGÍA MEJORADA\n")
            f.write("1. **Scoring Algorítmico:** Reglas físicas y heurísticas conservadoras.\n")
            f.write("2. **Machine Learning:** Clasificación automática en 5 categorías.\n")
            f.write("3. **Validación Cruzada:** Pipelines con imputación y escalado sin fuga.\n")
            f.write("4. **Features Avanzadas:** 14+ características planetarias y estelares.\n")

        print(f"📄 Reporte generado: {report_filename}")


# -------------------- ENTRYPOINT --------------------

if __name__ == "__main__":
    analyzer = EnhancedBiosignatureAnalyzer(
        data_dir="exoplanet_data",
        labeling_strategy="thresholds"  # 'thresholds' o 'quantiles'
    )
    analyzer.analyze_all_planets(use_dataset='confirmed')
