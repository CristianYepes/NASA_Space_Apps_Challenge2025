#!/usr/bin/env python3
"""
SISTEMA DE RANKING DE BIOFIRMAS EN EXOPLANETAS
Agencia Española Espacial (AEE)

Basado en el artículo: "Prospects for Detecting Signs of Life on Exoplanets in the JWST Era"
Desarrollado para identificar y rankear exoplanetas con mayor potencial de habitabilidad

Autor: Equipo AEE
Fecha: 2024
"""

import pandas as pd
import numpy as np
import requests
import warnings
from typing import Dict, List, Tuple, Optional
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime
import json

warnings.filterwarnings('ignore')

class ExoplanetBiosignatureAnalyzer:
    """
    Sistema profesional para análisis de biofirmas en exoplanetas
    """
    
    def __init__(self):
        """Inicializar el analizador con parámetros científicos"""
        
        # URLs de datasets NASA
        self.nasa_urls = {
            'cumulative': 'https://exoplanetarchive.ipac.caltech.edu/cgi-bin/TblView/nph-tblView?app=ExoTbls&config=cumulative&format=csv',
            'toi': 'https://exoplanetarchive.ipac.caltech.edu/cgi-bin/TblView/nph-tblView?app=ExoTbls&config=TOI&format=csv',
            'k2': 'https://exoplanetarchive.ipac.caltech.edu/cgi-bin/TblView/nph-tblView?app=ExoTbls&config=k2pandc&format=csv'
        }
        
        # Constantes físicas y astronómicas
        self.CONSTANTS = {
            'R_EARTH': 6.371e6,  # metros
            'M_EARTH': 5.972e24,  # kg
            'R_JUP_TO_EARTH': 11.2,  # Factor conversión
            'M_JUP_TO_EARTH': 317.8,  # Factor conversión
            'T_SUN': 5778,  # Temperatura solar (K)
            'AU': 1.496e11,  # metros
        }
        
        # Parámetros de zona habitable (Kopparapu et al. 2013)
        self.HABITABLE_ZONE = {
            'conservative_inner': 1.1,  # Factor luminosidad
            'conservative_outer': 0.53,
            'optimistic_inner': 1.8,
            'optimistic_outer': 0.28
        }
        
        # Tabla de gases biofirma basada en el artículo JWST
        self.BIOSIGNATURE_GASES = {
            'O2': {'weight': 0.6, 'false_positive_risk': 0.8, 'jwst_detectable': True},
            'CH4': {'weight': 0.7, 'false_positive_risk': 0.7, 'jwst_detectable': True},
            'N2O': {'weight': 0.9, 'false_positive_risk': 0.2, 'jwst_detectable': True},
            'PH3': {'weight': 0.85, 'false_positive_risk': 0.3, 'jwst_detectable': True},
            'DMS': {'weight': 0.5, 'false_positive_risk': 0.9, 'jwst_detectable': False},
            'CFCs': {'weight': 1.0, 'false_positive_risk': 0.1, 'jwst_detectable': True},
            'H2O': {'weight': 0.4, 'false_positive_risk': 0.5, 'jwst_detectable': True}
        }
        
        # Criterios de habitabilidad terrestre
        self.TERRESTRIAL_CRITERIA = {
            'radius_min': 0.5,  # R_Earth
            'radius_max': 2.0,   # R_Earth
            'mass_min': 0.1,     # M_Earth
            'mass_max': 10.0,    # M_Earth
            'temp_min': 200,     # K
            'temp_max': 373      # K
        }
        
        self.data = {}
        self.combined_data = None
        self.habitable_planets = None
        
    def load_existing_data(self) -> Dict[str, pd.DataFrame]:
        """
        Cargar datasets existentes de NASA Exoplanet Archive
        """
        print("🛰️  CARGANDO DATOS NASA EXOPLANET ARCHIVE")
        print("=" * 60)
        
        # Mapeo de archivos existentes
        existing_files = {
            'cumulative': 'exoplanet_data/nasa_cumulative.csv',
            'toi': 'exoplanet_data/tess_toi.csv',
            'k2': 'exoplanet_data/k2_planets.csv'
        }
        
        for dataset_name, filename in existing_files.items():
            try:
                print(f"📁 Cargando {dataset_name.upper()}...")
                self.data[dataset_name] = pd.read_csv(filename, comment='#')
                print(f"✅ {dataset_name}: {len(self.data[dataset_name])} registros")
                
            except Exception as e:
                print(f"❌ Error cargando {dataset_name}: {e}")
                # Intentar archivos alternativos
                try:
                    alt_filename = f"exoplanet_data/{dataset_name}_data.csv"
                    self.data[dataset_name] = pd.read_csv(alt_filename, comment='#')
                    print(f"📁 Usando archivo alternativo de {dataset_name}")
                except:
                    print(f"⚠️  No se pudieron cargar datos de {dataset_name}")
        
        return self.data
    
    def standardize_columns(self) -> pd.DataFrame:
        """
        Estandarizar columnas entre diferentes datasets
        """
        print("\n🔧 ESTANDARIZANDO COLUMNAS DE DATOS")
        print("=" * 60)
        
        # Mapeo de columnas estándar
        column_mapping = {
            'cumulative': {
                'pl_name': 'planet_name',
                'hostname': 'star_name',
                'pl_orbsmax': 'orbital_distance_au',
                'pl_orbeccen': 'eccentricity',
                'pl_radj': 'radius_jupiter',
                'pl_bmassj': 'mass_jupiter',
                'st_teff': 'star_temp_k',
                'st_rad': 'star_radius_solar',
                'st_lum': 'star_luminosity_solar',
                'st_mass': 'star_mass_solar',
                'pl_eqt': 'equilibrium_temp_k'
            },
            'toi': {
                'TOI': 'toi_id',
                'TIC ID': 'tic_id',
                'Planet Radius (R_Earth)': 'radius_earth',
                'Orbital Period (days)': 'orbital_period_days',
                'Stellar Eff Temp (K)': 'star_temp_k',
                'Stellar Radius (R_Sun)': 'star_radius_solar'
            },
            'k2': {
                'pl_name': 'planet_name',
                'hostname': 'star_name',
                'pl_orbper': 'orbital_period_days',
                'pl_radj': 'radius_jupiter',
                'st_teff': 'star_temp_k'
            }
        }
        
        standardized_datasets = []
        
        for dataset_name, df in self.data.items():
            if dataset_name in column_mapping:
                # Renombrar columnas
                df_std = df.rename(columns=column_mapping[dataset_name])
                df_std['source_dataset'] = dataset_name
                
                # Convertir unidades a estándar
                df_std = self._convert_units(df_std)
                
                standardized_datasets.append(df_std)
                print(f"✅ {dataset_name}: {len(df_std)} registros estandarizados")
        
        # Combinar datasets
        self.combined_data = pd.concat(standardized_datasets, ignore_index=True, sort=False)
        
        # Eliminar duplicados por nombre de planeta
        if 'planet_name' in self.combined_data.columns:
            initial_count = len(self.combined_data)
            self.combined_data = self.combined_data.drop_duplicates(subset=['planet_name'], keep='first')
            final_count = len(self.combined_data)
            print(f"🔄 Eliminados {initial_count - final_count} duplicados")
        
        print(f"📊 Dataset combinado: {len(self.combined_data)} exoplanetas únicos")
        return self.combined_data
    
    def _convert_units(self, df: pd.DataFrame) -> pd.DataFrame:
        """
        Convertir unidades a sistema estándar
        """
        # Convertir radios de Júpiter a Tierra
        if 'radius_jupiter' in df.columns:
            df['radius_earth'] = df['radius_jupiter'] * self.CONSTANTS['R_JUP_TO_EARTH']
        
        # Convertir masas de Júpiter a Tierra
        if 'mass_jupiter' in df.columns:
            df['mass_earth'] = df['mass_jupiter'] * self.CONSTANTS['M_JUP_TO_EARTH']
        
        # Calcular luminosidad estelar si no está disponible
        if 'star_luminosity_solar' not in df.columns:
            if 'star_radius_solar' in df.columns and 'star_temp_k' in df.columns:
                df['star_luminosity_solar'] = (
                    df['star_radius_solar']**2 * 
                    (df['star_temp_k'] / self.CONSTANTS['T_SUN'])**4
                )
        
        return df
    
    def calculate_habitable_zone(self) -> pd.DataFrame:
        """
        Calcular zona habitable para cada sistema estelar
        """
        print("\n🌍 CALCULANDO ZONAS HABITABLES")
        print("=" * 60)
        
        df = self.combined_data.copy()
        
        # Calcular límites de zona habitable
        if 'star_luminosity_solar' in df.columns:
            # Zona conservadora
            df['hz_inner_conservative'] = np.sqrt(df['star_luminosity_solar'] / self.HABITABLE_ZONE['conservative_inner'])
            df['hz_outer_conservative'] = np.sqrt(df['star_luminosity_solar'] / self.HABITABLE_ZONE['conservative_outer'])
            
            # Zona optimista
            df['hz_inner_optimistic'] = np.sqrt(df['star_luminosity_solar'] / self.HABITABLE_ZONE['optimistic_inner'])
            df['hz_outer_optimistic'] = np.sqrt(df['star_luminosity_solar'] / self.HABITABLE_ZONE['optimistic_outer'])
            
            # Determinar si está en zona habitable
            df['in_hz_conservative'] = (
                (df['orbital_distance_au'] >= df['hz_inner_conservative']) &
                (df['orbital_distance_au'] <= df['hz_outer_conservative'])
            )
            
            df['in_hz_optimistic'] = (
                (df['orbital_distance_au'] >= df['hz_inner_optimistic']) &
                (df['orbital_distance_au'] <= df['hz_outer_optimistic'])
            )
            
            # Calcular distancia normalizada al centro de la zona habitable
            df['hz_center'] = (df['hz_inner_conservative'] + df['hz_outer_conservative']) / 2
            df['hz_distance_normalized'] = np.abs(df['orbital_distance_au'] - df['hz_center']) / df['hz_center']
            
        else:
            print("⚠️  Luminosidad estelar no disponible para cálculo de zona habitable")
            df['in_hz_conservative'] = False
            df['in_hz_optimistic'] = False
            df['hz_distance_normalized'] = np.inf
        
        # Filtrar planetas en zona habitable
        self.habitable_planets = df[df['in_hz_optimistic'] == True].copy()
        
        print(f"🎯 Planetas en zona habitable conservadora: {df['in_hz_conservative'].sum()}")
        print(f"🎯 Planetas en zona habitable optimista: {df['in_hz_optimistic'].sum()}")
        
        self.combined_data = df
        return df
    
    def calculate_earth_similarity_index(self) -> pd.DataFrame:
        """
        Calcular índice de similitud con la Tierra (ESI)
        """
        print("\n🌎 CALCULANDO ÍNDICE DE SIMILITUD TERRESTRE")
        print("=" * 60)
        
        df = self.combined_data.copy()
        
        # ESI basado en radio
        if 'radius_earth' in df.columns:
            df['esi_radius'] = 1 - np.abs((df['radius_earth'] - 1) / (df['radius_earth'] + 1))
            df['esi_radius'] = np.clip(df['esi_radius'], 0, 1)
        else:
            df['esi_radius'] = 0.5  # Valor neutro
        
        # ESI basado en masa (si disponible)
        if 'mass_earth' in df.columns:
            df['esi_mass'] = 1 - np.abs((df['mass_earth'] - 1) / (df['mass_earth'] + 1))
            df['esi_mass'] = np.clip(df['esi_mass'], 0, 1)
        else:
            df['esi_mass'] = 0.5
        
        # ESI basado en temperatura de equilibrio
        if 'equilibrium_temp_k' in df.columns:
            earth_temp = 288  # K
            df['esi_temperature'] = 1 - np.abs((df['equilibrium_temp_k'] - earth_temp) / (df['equilibrium_temp_k'] + earth_temp))
            df['esi_temperature'] = np.clip(df['esi_temperature'], 0, 1)
        else:
            df['esi_temperature'] = 0.5
        
        # ESI combinado
        df['earth_similarity_index'] = np.sqrt(
            df['esi_radius'] * df['esi_mass'] * df['esi_temperature']
        )
        
        self.combined_data = df
        return df
    
    def calculate_biosignature_score(self) -> pd.DataFrame:
        """
        Calcular puntuación de biofirma basada en criterios del artículo JWST
        """
        print("\n🧬 CALCULANDO PUNTUACIÓN DE BIOFIRMAS")
        print("=" * 60)
        
        df = self.combined_data.copy()
        
        # Inicializar puntuaciones
        df['biosignature_score'] = 0.0
        df['habitability_factors'] = ''
        
        # Factor 1: Estar en zona habitable
        hz_score = np.where(df['in_hz_conservative'], 1.0,
                   np.where(df['in_hz_optimistic'], 0.7, 0.0))
        df['biosignature_score'] += hz_score * 0.3  # 30% del peso
        
        # Factor 2: Similitud terrestre (radio)
        terrestrial_score = np.where(
            (df['radius_earth'] >= self.TERRESTRIAL_CRITERIA['radius_min']) &
            (df['radius_earth'] <= self.TERRESTRIAL_CRITERIA['radius_max']), 
            1.0, 0.0
        )
        df['biosignature_score'] += terrestrial_score * 0.25  # 25% del peso
        
        # Factor 3: ESI combinado
        df['biosignature_score'] += df['earth_similarity_index'] * 0.2  # 20% del peso
        
        # Factor 4: Estabilidad orbital (basada en excentricidad)
        if 'eccentricity' in df.columns:
            orbital_stability = np.where(df['eccentricity'] <= 0.3, 1.0, 
                                       np.where(df['eccentricity'] <= 0.6, 0.5, 0.0))
            df['biosignature_score'] += orbital_stability * 0.1  # 10% del peso
        
        # Factor 5: Temperatura de equilibrio
        if 'equilibrium_temp_k' in df.columns:
            temp_score = np.where(
                (df['equilibrium_temp_k'] >= self.TERRESTRIAL_CRITERIA['temp_min']) &
                (df['equilibrium_temp_k'] <= self.TERRESTRIAL_CRITERIA['temp_max']),
                1.0, 0.0
            )
            df['biosignature_score'] += temp_score * 0.15  # 15% del peso
        
        # Normalizar puntuación a escala 0-100
        df['biosignature_score'] = df['biosignature_score'] * 100
        
        # Clasificar por nivel de interés
        df['habitability_class'] = pd.cut(
            df['biosignature_score'],
            bins=[0, 20, 40, 60, 80, 100],
            labels=['Muy Bajo', 'Bajo', 'Moderado', 'Alto', 'Muy Alto']
        )
        
        self.combined_data = df
        return df
    
    def generate_ranking(self, top_n: int = 50) -> pd.DataFrame:
        """
        Generar ranking final de exoplanetas con mayor potencial de biofirmas
        """
        print(f"\n🏆 GENERANDO RANKING TOP {top_n} EXOPLANETAS")
        print("=" * 60)
        
        # Filtrar solo planetas con datos suficientes
        valid_planets = self.combined_data.dropna(subset=['biosignature_score'])
        
        # Ordenar por puntuación de biofirma
        ranking = valid_planets.sort_values('biosignature_score', ascending=False).head(top_n)
        
        # Seleccionar columnas relevantes para el ranking
        ranking_columns = [
            'planet_name', 'star_name', 'biosignature_score', 'habitability_class',
            'earth_similarity_index', 'radius_earth', 'mass_earth', 
            'orbital_distance_au', 'equilibrium_temp_k', 'in_hz_conservative', 
            'in_hz_optimistic', 'source_dataset'
        ]
        
        # Filtrar columnas que existen
        available_columns = [col for col in ranking_columns if col in ranking.columns]
        ranking_final = ranking[available_columns].copy()
        
        # Añadir ranking position
        ranking_final.insert(0, 'rank', range(1, len(ranking_final) + 1))
        
        return ranking_final
    
    def save_results(self, ranking: pd.DataFrame, filename: str = None) -> str:
        """
        Guardar resultados del análisis
        """
        if filename is None:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"exoplanet_biosignature_ranking_{timestamp}"
        
        # Guardar CSV
        csv_file = f"exoplanet_data/{filename}.csv"
        ranking.to_csv(csv_file, index=False)
        
        # Guardar JSON con metadatos
        metadata = {
            'analysis_date': datetime.now().isoformat(),
            'total_planets_analyzed': len(self.combined_data),
            'planets_in_habitable_zone': len(self.habitable_planets) if self.habitable_planets is not None else 0,
            'top_candidates': len(ranking),
            'methodology': 'JWST Biosignature Analysis Framework',
            'agency': 'Agencia Española Espacial (AEE)'
        }
        
        json_file = f"exoplanet_data/{filename}_metadata.json"
        with open(json_file, 'w') as f:
            json.dump(metadata, f, indent=2)
        
        print(f"💾 Resultados guardados:")
        print(f"   📄 CSV: {csv_file}")
        print(f"   📋 Metadatos: {json_file}")
        
        return csv_file
    
    def generate_report(self, ranking: pd.DataFrame) -> str:
        """
        Generar reporte profesional para la AEE
        """
        print("\n📊 GENERANDO REPORTE PROFESIONAL AEE")
        print("=" * 60)
        
        report = f"""
# REPORTE DE ANÁLISIS DE BIOFIRMAS EN EXOPLANETAS
## Agencia Española Espacial (AEE)

**Fecha de Análisis:** {datetime.now().strftime("%d/%m/%Y %H:%M")}
**Metodología:** Framework de Análisis JWST para Biofirmas
**Datasets Analizados:** NASA Exoplanet Archive (Cumulative, TOI, K2)

---

## RESUMEN EJECUTIVO

### Estadísticas Generales:
- **Total de exoplanetas analizados:** {len(self.combined_data):,}
- **Planetas en zona habitable optimista:** {self.combined_data['in_hz_optimistic'].sum():,}
- **Planetas en zona habitable conservadora:** {self.combined_data['in_hz_conservative'].sum():,}
- **Candidatos de alta prioridad (Score > 60):** {len(ranking[ranking['biosignature_score'] > 60]):,}

### TOP 10 CANDIDATOS PARA OBSERVACIÓN JWST:

"""
        
        # Añadir top 10 al reporte
        top_10 = ranking.head(10)
        for idx, planet in top_10.iterrows():
            report += f"""
**{planet['rank']}. {planet.get('planet_name', 'N/A')}**
- Sistema: {planet.get('star_name', 'N/A')}
- Puntuación Biofirma: {planet['biosignature_score']:.1f}/100
- Clase de Habitabilidad: {planet['habitability_class']}
- Similitud Terrestre: {planet['earth_similarity_index']:.3f}
- Radio: {planet.get('radius_earth', 'N/A'):.2f} R⊕
- Zona Habitable: {'✅ Conservadora' if planet.get('in_hz_conservative') else '🟡 Optimista' if planet.get('in_hz_optimistic') else '❌ Fuera'}
"""
        
        report += f"""

---

## METODOLOGÍA DE ANÁLISIS

### Criterios de Zona Habitable:
- **Conservadora:** Kopparapu et al. (2013) - Factores 1.1 y 0.53
- **Optimista:** Factores extendidos 1.8 y 0.28

### Puntuación de Biofirma (0-100):
1. **Zona Habitable (30%):** Conservadora=1.0, Optimista=0.7
2. **Tamaño Terrestre (25%):** Radio 0.5-2.0 R⊕
3. **Similitud Terrestre (20%):** ESI combinado
4. **Estabilidad Orbital (10%):** Excentricidad < 0.3
5. **Temperatura (15%):** 200-373 K

### Gases Biofirma Considerados:
- **Alta Confianza:** N₂O, PH₃, CFCs (tecno-firmas)
- **Moderada Confianza:** CH₄, O₂ (con contexto)
- **Baja Confianza:** DMS, H₂O (falsos positivos)

---

## RECOMENDACIONES PARA LA AEE

### Prioridades de Observación:
1. **Inmediata:** Planetas con score > 80 en sistemas de enanas M
2. **Corto plazo:** Sub-Neptunos fríos con H₂O detectado
3. **Largo plazo:** Planetas terrestres en zona conservadora

### Desarrollo Tecnológico:
- Algoritmos de corrección de actividad estelar
- Métodos de retrieval atmosférico mejorados
- Preparación para telescopios post-JWST

---

*Análisis realizado con metodología basada en "Prospects for Detecting Signs of Life on Exoplanets in the JWST Era"*
*Agencia Española Espacial - Departamento de Astrobiología*
"""
        
        # Guardar reporte
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        report_file = f"exoplanet_data/AEE_Biosignature_Report_{timestamp}.md"
        
        with open(report_file, 'w', encoding='utf-8') as f:
            f.write(report)
        
        print(f"📋 Reporte generado: {report_file}")
        return report_file

def main():
    """
    Función principal del sistema de análisis
    """
    print("🚀 SISTEMA DE ANÁLISIS DE BIOFIRMAS - AGENCIA ESPAÑOLA ESPACIAL")
    print("=" * 80)
    print("Basado en: 'Prospects for Detecting Signs of Life on Exoplanets in the JWST Era'")
    print("=" * 80)
    
    # Inicializar analizador
    analyzer = ExoplanetBiosignatureAnalyzer()
    
    try:
        # Paso 1: Cargar datos existentes
        analyzer.load_existing_data()
        
        # Paso 2: Estandarizar columnas
        analyzer.standardize_columns()
        
        # Paso 3: Calcular zona habitable
        analyzer.calculate_habitable_zone()
        
        # Paso 4: Calcular similitud terrestre
        analyzer.calculate_earth_similarity_index()
        
        # Paso 5: Calcular puntuación de biofirma
        analyzer.calculate_biosignature_score()
        
        # Paso 6: Generar ranking
        ranking = analyzer.generate_ranking(top_n=100)
        
        # Paso 7: Guardar resultados
        csv_file = analyzer.save_results(ranking)
        
        # Paso 8: Generar reporte profesional
        report_file = analyzer.generate_report(ranking)
        
        print("\n🎉 ANÁLISIS COMPLETADO EXITOSAMENTE")
        print("=" * 60)
        print(f"📊 Top 10 Candidatos para Observación JWST:")
        print(ranking[['rank', 'planet_name', 'star_name', 'biosignature_score', 'habitability_class']].head(10).to_string(index=False))
        
        return ranking, csv_file, report_file
        
    except Exception as e:
        print(f"❌ Error en el análisis: {e}")
        raise

if __name__ == "__main__":
    ranking, csv_file, report_file = main()