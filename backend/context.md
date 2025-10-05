# 🌌 CONTEXT.MD - Proyecto AEE (Atmospheric Exoplanet Explorer)
## Sistema Avanzado de Detección de Biosignaturas con Machine Learning

---

## 📋 **ÍNDICE**
1. [Visión General del Proyecto](#visión-general)
2. [Fundamento Científico](#fundamento-científico)
3. [Arquitectura del Sistema](#arquitectura-del-sistema)
4. [Análisis Técnico Detallado](#análisis-técnico-detallado)
5. [Machine Learning Pipeline](#machine-learning-pipeline)
6. [Flujo de Datos](#flujo-de-datos)
7. [Casos de Uso](#casos-de-uso)
8. [Guía de Implementación](#guía-de-implementación)

---

## 🎯 **VISIÓN GENERAL DEL PROYECTO**

### **¿Qué es AEE?**
El **Atmospheric Exoplanet Explorer (AEE)** es un sistema de inteligencia artificial avanzado diseñado para identificar y clasificar automáticamente exoplanetas con potencial para albergar biosignaturas atmosféricas. Combina conocimiento científico de vanguardia con técnicas de machine learning para priorizar objetivos de observación para el telescopio espacial James Webb (JWST).

### **Problema que Resuelve**
- **Volumen de Datos**: Más de 38,952 exoplanetas confirmados requieren análisis sistemático
- **Complejidad Científica**: Múltiples criterios físicos y astronómicos deben evaluarse simultáneamente
- **Recursos Limitados**: El tiempo de observación del JWST es extremadamente valioso y debe optimizarse
- **Subjetividad**: Necesidad de criterios objetivos y reproducibles para la selección de objetivos

### **Solución Propuesta**
Un sistema híbrido que combina:
1. **Algoritmos Científicos**: Basados en física y astronomía establecida
2. **Machine Learning**: Para descubrir patrones ocultos en los datos
3. **Automatización**: Procesamiento escalable de grandes conjuntos de datos
4. **Validación Cruzada**: Múltiples enfoques para garantizar robustez

---

## 🔬 **FUNDAMENTO CIENTÍFICO**

### **Base Teórica: Paper de Investigación**
El proyecto se fundamenta en el paper científico **"Biosignature Gases in Exoplanet Atmospheres with JWST"** que establece:

#### **Tres Criterios Clave para Biosignaturas:**
1. **Detección**: ¿Es la señal robusta y estadísticamente significativa?
2. **Atribución**: ¿Las características espectrales se atribuyen correctamente al gas apropiado?
3. **Interpretación**: ¿Las propiedades planetarias derivadas son confiables?

#### **Gases Biosignatura Identificados:**
- **Primarios**: O₂, CH₄, N₂O, NH₃, PH₃
- **Secundarios**: CH₃Cl, CH₃Br, DMS, HCN
- **Tecnosignaturas**: SF₆, NF₃, CFCs, PFCs

#### **Desafíos Científicos Abordados:**
- **Contaminación Estelar**: Actividad magnética de estrellas M
- **Falsos Positivos**: Procesos abióticos que imitan biosignaturas
- **Límites de Detección**: Señales débiles en atmósferas delgadas
- **Degeneración de Parámetros**: Múltiples interpretaciones de los mismos datos

### **Implementación de Criterios Científicos**

#### **1. Zona Habitable (Kopparapu et al. 2013)**
```python
def calculate_enhanced_habitable_zone(self, stellar_data):
    # Implementación directa del modelo científico estándar
    if stellar_teff < 2600:  # Estrellas M muy frías
        inner_hz = 0.38 * (stellar_teff / 2600) ** 0.32
        outer_hz = 0.66 * (stellar_teff / 2600) ** 0.32
```

#### **2. Criterios de Habitabilidad**
- **Temperatura Equilibrio**: 200K - 400K (rango ampliado para sub-Neptunos)
- **Tamaño Planetario**: 0.5 - 3.0 R⊕ (incluye super-Tierras)
- **Densidad**: 3.0 - 8.0 g/cm³ (composición rocosa)
- **Período Orbital**: Estabilidad a largo plazo

#### **3. Detectabilidad con JWST**
- **Magnitud Estelar**: J < 12 para observaciones factibles
- **Profundidad de Tránsito**: >100 ppm para señal detectable
- **Tipo Estelar**: Preferencia por enanas M (mayor contraste)
- **Actividad Estelar**: Penalización por contaminación

---

## 🏗️ **ARQUITECTURA DEL SISTEMA**

### **Componentes Principales**

```
┌─────────────────────────────────────────────────────────────┐
│                    AEE SYSTEM ARCHITECTURE                  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
│  │   DATA      │    │  ALGORITHM  │    │  MACHINE    │     │
│  │ ACQUISITION │───▶│   SCORING   │───▶│  LEARNING   │     │
│  │             │    │             │    │             │     │
│  └─────────────┘    └─────────────┘    └─────────────┘     │
│         │                   │                   │          │
│         ▼                   ▼                   ▼          │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
│  │    NASA     │    │  PHYSICS    │    │   MODEL     │     │
│  │ EXOPLANET   │    │   BASED     │    │ TRAINING &  │     │
│  │  ARCHIVE    │    │ EVALUATION  │    │ PREDICTION  │     │
│  └─────────────┘    └─────────────┘    └─────────────┘     │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                        OUTPUT LAYER                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
│  │   RANKING   │    │   REPORTS   │    │   MODELS    │     │
│  │    CSV      │    │ MARKDOWN    │    │   PICKLE    │     │
│  └─────────────┘    └─────────────┘    └─────────────┘     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### **Clase Principal: EnhancedBiosignatureAnalyzer**

```python
class EnhancedBiosignatureAnalyzer:
    """
    Sistema principal que orquesta todo el análisis de biosignaturas
    
    Responsabilidades:
    - Gestión de datos del NASA Exoplanet Archive
    - Cálculo de scoring algorítmico multi-criterio
    - Entrenamiento y validación de modelos ML
    - Generación de reportes y rankings
    """
```

---

## 🔍 **ANÁLISIS TÉCNICO DETALLADO**

### **1. Adquisición de Datos**

#### **Fuente: NASA Exoplanet Archive**
```python
def download_exoplanet_data(self):
    """
    Descarga datos actualizados del NASA Exoplanet Archive
    
    Parámetros obtenidos:
    - pl_name: Nombre del planeta
    - pl_orbper: Período orbital (días)
    - pl_rade: Radio planetario (R⊕)
    - pl_masse: Masa planetaria (M⊕)
    - pl_eqt: Temperatura de equilibrio (K)
    - st_teff: Temperatura estelar efectiva (K)
    - st_rad: Radio estelar (R☉)
    - st_mass: Masa estelar (M☉)
    - st_age: Edad estelar (Gyr)
    - sy_jmag: Magnitud J del sistema
    """
```

#### **Manejo de Datos Faltantes**
- **Estrategia**: Imputación por mediana para variables numéricas
- **Validación**: Verificación de rangos físicamente plausibles
- **Filtrado**: Eliminación de objetos con datos críticos faltantes

### **2. Sistema de Scoring Algorítmico**

#### **Estructura Multi-Criterio (Pesos Optimizados)**
```python
total_score = (
    habitability_score * 0.35 +      # Habitabilidad (35%)
    detectability_score * 0.30 +     # Detectabilidad JWST (30%)
    biosignature_score * 0.25 +      # Potencial Biosignatura (25%)
    stellar_activity_score * 0.10     # Actividad Estelar (10%)
)
```

#### **Criterio 1: Habitabilidad (35%)**
```python
def calculate_habitability_score(self, planet_data):
    """
    Evalúa el potencial de habitabilidad basado en:
    
    Sub-criterios:
    - Zona Habitable (40%): Posición orbital vs. límites HZ
    - Tamaño Planetario (30%): Capacidad de retener atmósfera
    - Temperatura (20%): Rango compatible con agua líquida
    - Densidad (10%): Composición rocosa vs. gaseosa
    
    Bonificaciones especiales:
    - Planetas terrestres (0.8-1.2 R⊕): +20%
    - Super-Tierras (1.2-2.0 R⊕): +15%
    - Temperatura óptima (273-373K): +25%
    """
```

#### **Criterio 2: Detectabilidad JWST (30%)**
```python
def calculate_detectability_score(self, planet_data, stellar_data):
    """
    Evalúa la viabilidad de observación con JWST:
    
    Factores técnicos:
    - Magnitud J estelar: Límite J < 12 para observaciones
    - Profundidad de tránsito: >100 ppm para detección
    - Período orbital: 1-50 días para múltiples tránsitos
    - Tipo estelar: Enanas M favorecidas (mayor contraste)
    
    Cálculo de profundidad de tránsito:
    depth = (R_planet / R_star)² * 10⁶ ppm
    """
```

#### **Criterio 3: Potencial de Biosignatura (25%)**
```python
def calculate_biosignature_potential(self, planet_data):
    """
    Evalúa la probabilidad de detectar gases biosignatura:
    
    Indicadores clave:
    - Composición atmosférica inferida
    - Estabilidad orbital a largo plazo
    - Ausencia de procesos que destruyan biosignaturas
    - Capacidad de retener atmósfera secundaria
    
    Gases objetivo prioritarios:
    - NH₃: Altamente soluble, indicador de océanos
    - PH₃: Difícil producción abiótica
    - N₂O: Producto metabólico específico
    - CH₃Cl: Biosignatura marina
    """
```

#### **Criterio 4: Actividad Estelar (10%)**
```python
def calculate_stellar_activity_impact(self, stellar_data):
    """
    Evalúa la contaminación por actividad estelar:
    
    Factores de penalización:
    - Estrellas M jóvenes: Alta actividad magnética
    - Flares frecuentes: Destrucción atmosférica
    - Manchas estelares: Contaminación espectral
    - Variabilidad UV: Fotoquímica alterada
    
    Bonificaciones:
    - Estrellas >5 Gyr: Actividad reducida
    - Tipo espectral tardío: Menor radiación UV
    """
```

### **3. Preparación de Features para ML**

#### **Features Base (8 parámetros)**
```python
base_features = [
    'pl_orbper',    # Período orbital
    'pl_rade',      # Radio planetario
    'pl_masse',     # Masa planetaria
    'pl_eqt',       # Temperatura equilibrio
    'st_teff',      # Temperatura estelar
    'st_rad',       # Radio estelar
    'st_mass',      # Masa estelar
    'sy_jmag'       # Magnitud J
]
```

#### **Features Derivadas (6 parámetros)**
```python
derived_features = [
    'in_habitable_zone',     # Booleano: ¿En zona habitable?
    'planet_density',        # Densidad planetaria (g/cm³)
    'stellar_type_encoded',  # Tipo estelar codificado
    'log_pl_orbper',        # Log del período orbital
    'log_pl_eqt',           # Log de la temperatura
    'transit_depth'         # Profundidad de tránsito (ppm)
]
```

#### **Transformaciones Aplicadas**
```python
def prepare_ml_features(self, df):
    """
    Prepara features para machine learning:
    
    Transformaciones:
    1. Imputación por mediana para valores faltantes
    2. Codificación de variables categóricas
    3. Transformaciones logarítmicas para distribuciones sesgadas
    4. Cálculo de features físicamente relevantes
    5. Normalización con StandardScaler
    """
```

---

## 🤖 **MACHINE LEARNING PIPELINE**

### **Arquitectura de Modelos**

#### **Modelos Implementados**
```python
models = {
    'RandomForest': RandomForestClassifier(
        n_estimators=200,
        max_depth=15,
        min_samples_split=5,
        min_samples_leaf=2,
        class_weight='balanced',
        random_state=42
    ),
    
    'GradientBoosting': GradientBoostingClassifier(
        n_estimators=150,
        learning_rate=0.1,
        max_depth=8,
        min_samples_split=5,
        random_state=42
    ),
    
    'SVM': SVC(
        kernel='rbf',
        C=10,
        gamma='scale',
        class_weight='balanced',
        probability=True,
        random_state=42
    ),
    
    'NeuralNetwork': MLPClassifier(
        hidden_layer_sizes=(100, 50),
        activation='relu',
        solver='adam',
        alpha=0.001,
        learning_rate='adaptive',
        max_iter=1000,
        random_state=42
    )
}
```

### **Proceso de Entrenamiento**

#### **1. Creación de Labels**
```python
def create_training_labels(self, scores, strategy='quantile'):
    """
    Convierte scores continuos en clases discretas:
    
    Estrategias disponibles:
    - 'quantile': Distribución balanceada por cuantiles
    - 'fixed': Umbrales fijos basados en scores
    
    Clases resultantes:
    - Clase 0: No Viable (0-20%)
    - Clase 1: Low Priority (20-40%)
    - Clase 2: Medium Priority (40-60%)
    - Clase 3: High Priority (60-80%)
    - Clase 4: Prime Target (80-100%)
    """
```

#### **2. Validación Cruzada Estratificada**
```python
def train_ml_models(self, X, y):
    """
    Entrenamiento con validación robusta:
    
    Técnicas aplicadas:
    - StratifiedKFold (k=5): Preserva distribución de clases
    - Pipeline completo: Imputación + Escalado + Modelo
    - Timeout de seguridad: 300s por modelo
    - Métricas balanceadas: Accuracy, Balanced Accuracy
    - Guardado automático: Modelos como archivos .pkl
    """
```

#### **3. Métricas de Evaluación**
```python
metrics_calculated = {
    'accuracy': accuracy_score(y_true, y_pred),
    'balanced_accuracy': balanced_accuracy_score(y_true, y_pred),
    'cv_mean_accuracy': np.mean(cv_scores),
    'cv_std_accuracy': np.std(cv_scores),
    'classification_report': classification_report(y_true, y_pred),
    'confusion_matrix': confusion_matrix(y_true, y_pred)
}
```

### **Predicción y Confianza**

#### **Ensemble de Modelos**
```python
def predict_with_ml(self, planet_features, model_name='RandomForest'):
    """
    Predicción con estimación de confianza:
    
    Proceso:
    1. Carga del modelo entrenado (.pkl)
    2. Aplicación del pipeline completo
    3. Predicción de clase (0-4)
    4. Cálculo de probabilidades por clase
    5. Estimación de confianza (max probability)
    
    Output:
    - predicted_class: Clase predicha (int)
    - confidence: Confianza de la predicción (float 0-1)
    - probabilities: Vector de probabilidades por clase
    """
```

---

## 📊 **FLUJO DE DATOS**

### **Pipeline Completo de Procesamiento**

```
┌─────────────────┐
│  NASA Archive  │
│   (Raw Data)   │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Data Cleaning & │
│   Validation    │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│   Algorithmic   │
│    Scoring      │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Feature Prep &  │
│ Label Creation  │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ ML Training &   │
│   Validation    │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│  Prediction &   │
│    Ranking      │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│ Report & Model  │
│   Generation    │
└─────────────────┘
```

### **Archivos de Salida Generados**

#### **1. Ranking CSV**
```csv
pl_name,algorithmic_score,ml_class,ml_confidence,habitability,detectability,biosignature,stellar_activity
TOI-715 b,87.3,4,0.92,89.1,85.2,88.7,86.4
K2-18 b,82.1,4,0.87,78.9,89.3,79.8,80.2
TRAPPIST-1 e,79.8,3,0.81,91.2,72.1,82.3,74.9
```

#### **2. Reporte Markdown**
- **Executive Summary**: Resumen de resultados clave
- **ML Performance**: Métricas de cada modelo
- **Top 20 Candidates**: Lista priorizada con justificación
- **Methodology**: Descripción técnica del proceso

#### **3. Modelos Entrenados**
- `model_randomforest.pkl`: Modelo Random Forest
- `model_svm.pkl`: Modelo SVM
- `model_gradientboosting.pkl`: Modelo Gradient Boosting
- `model_neuralnetwork.pkl`: Red Neuronal
- `scaler.pkl`: Escalador de features
- `metrics.json`: Métricas de performance

---

## 🎯 **CASOS DE USO**

### **1. Investigación Científica**

#### **Selección de Objetivos para Papers**
```python
# Identificar candidatos para publicación
top_candidates = analyzer.get_top_candidates(
    min_score=75,
    min_confidence=0.8,
    max_results=20
)

# Análisis estadístico de poblaciones
population_stats = analyzer.analyze_population_statistics(
    group_by=['stellar_type', 'planet_size'],
    metrics=['habitability', 'detectability']
)
```

#### **Validación de Hipótesis**
```python
# Comparar algoritmos vs ML
correlation = analyzer.compare_algorithmic_vs_ml(
    metric='spearman_correlation'
)

# Análisis de sensibilidad de parámetros
sensitivity = analyzer.parameter_sensitivity_analysis(
    parameters=['pl_rade', 'pl_eqt', 'st_teff']
)
```

### **2. Planificación de Observaciones**

#### **Optimización de Tiempo JWST**
```python
# Priorizar por tiempo de observación disponible
observation_plan = analyzer.optimize_observation_schedule(
    available_hours=100,
    min_transits_required=3,
    priority_threshold=70
)

# Evaluación de viabilidad técnica
feasibility = analyzer.assess_jwst_feasibility(
    target_list=top_candidates,
    instrument='NIRSpec',
    mode='transit_spectroscopy'
)
```

### **3. Predicción en Tiempo Real**

#### **Nuevos Descubrimientos**
```python
# Evaluar planeta recién descubierto
new_planet_data = {
    'pl_rade': 1.1,
    'pl_masse': 1.3,
    'pl_orbper': 22.7,
    'pl_eqt': 288,
    'st_teff': 3200,
    # ... más parámetros
}

prediction = analyzer.predict_single_planet(new_planet_data)
print(f"Clase predicha: {prediction['class']}")
print(f"Confianza: {prediction['confidence']:.2f}")
print(f"Score algorítmico: {prediction['algorithmic_score']:.1f}")
```

### **4. Análisis Comparativo**

#### **Benchmarking de Métodos**
```python
# Comparar diferentes estrategias de labeling
comparison = analyzer.compare_labeling_strategies(
    strategies=['quantile', 'fixed', 'adaptive'],
    metrics=['accuracy', 'balanced_accuracy', 'f1_score']
)

# Evaluación de robustez
robustness = analyzer.test_model_robustness(
    noise_levels=[0.1, 0.2, 0.3],
    missing_data_rates=[0.05, 0.1, 0.15]
)
```

---

## 🛠️ **GUÍA DE IMPLEMENTACIÓN**

### **Instalación y Configuración**

#### **1. Requisitos del Sistema**
```bash
# Python 3.8+
python --version

# Memoria RAM: Mínimo 8GB, Recomendado 16GB
# Espacio en disco: 2GB para datos y modelos
# Conexión a internet: Para descarga de datos NASA
```

#### **2. Instalación de Dependencias**
```bash
# Crear entorno virtual
python -m venv aee_env
source aee_env/bin/activate  # macOS/Linux
# aee_env\Scripts\activate   # Windows

# Instalar paquetes requeridos
pip install scikit-learn==1.3.0
pip install pandas==2.0.3
pip install numpy==1.24.3
pip install requests==2.31.0
pip install joblib==1.3.1
```

#### **3. Estructura de Directorios**
```
NASA_Space_Apps_Challenge2025/
├── backend/
│   ├── v2_ml_biosignature_analizer.py  # Código principal
│   ├── context.md                      # Este archivo
│   ├── README.md                       # Documentación
│   ├── paper_content.txt              # Paper de referencia
│   └── data/                          # Directorio de datos
│       ├── exoplanet_data.csv         # Datos descargados
│       ├── models/                    # Modelos entrenados
│       └── results/                   # Resultados generados
```

### **Ejecución del Sistema**

#### **Modo Básico**
```python
from v2_ml_biosignature_analizer import EnhancedBiosignatureAnalyzer

# Inicializar analizador
analyzer = EnhancedBiosignatureAnalyzer(
    data_dir='./data',
    labeling_strategy='quantile'
)

# Ejecutar análisis completo
analyzer.analyze_all_planets()
```

#### **Modo Avanzado con Configuración**
```python
# Configuración personalizada
config = {
    'habitability_weight': 0.40,
    'detectability_weight': 0.30,
    'biosignature_weight': 0.20,
    'stellar_activity_weight': 0.10,
    'min_score_threshold': 50,
    'cv_folds': 10,
    'timeout_seconds': 600
}

analyzer = EnhancedBiosignatureAnalyzer(
    data_dir='./data',
    labeling_strategy='fixed',
    config=config
)

# Análisis con parámetros personalizados
results = analyzer.analyze_all_planets()
```

### **Interpretación de Resultados**

#### **Métricas de Calidad**
```python
# Evaluar performance de modelos
model_performance = {
    'RandomForest': {
        'accuracy': 0.87,
        'balanced_accuracy': 0.84,
        'cv_mean': 0.85,
        'cv_std': 0.03
    },
    # ... otros modelos
}

# Criterios de aceptación:
# - Accuracy > 0.80: Excelente
# - Balanced Accuracy > 0.75: Bueno para clases desbalanceadas
# - CV Std < 0.05: Modelo estable
```

#### **Interpretación de Clases**
```python
class_interpretation = {
    0: "No Viable - Score < 20% - No recomendado para observación",
    1: "Low Priority - Score 20-40% - Candidato de baja prioridad",
    2: "Medium Priority - Score 40-60% - Candidato moderado",
    3: "High Priority - Score 60-80% - Candidato prioritario",
    4: "Prime Target - Score > 80% - Objetivo principal para JWST"
}
```

### **Troubleshooting Común**

#### **Problemas de Datos**
```python
# Error: Datos no descargados
# Solución: Verificar conexión a internet y permisos de escritura

# Error: Memoria insuficiente
# Solución: Procesar en lotes más pequeños
analyzer.set_batch_size(1000)

# Error: Modelos no convergen
# Solución: Aumentar timeout o ajustar hiperparámetros
```

#### **Validación de Resultados**
```python
# Verificar consistencia de resultados
consistency_check = analyzer.validate_results(
    tolerance=0.05,
    cross_validation=True
)

# Comparar con resultados anteriores
comparison = analyzer.compare_with_baseline(
    baseline_file='previous_results.csv'
)
```

---

## 📈 **MÉTRICAS DE ÉXITO**

### **Indicadores Técnicos**
- **Accuracy ML**: >85% en validación cruzada
- **Correlación Algoritmo-ML**: >0.75 (Spearman)
- **Tiempo de Procesamiento**: <30 min para 40k planetas
- **Reproducibilidad**: Resultados idénticos con misma semilla

### **Indicadores Científicos**
- **Cobertura de Candidatos Conocidos**: >90% de objetivos JWST confirmados en top 100
- **Descubrimiento de Nuevos Candidatos**: Identificación de objetivos no considerados previamente
- **Validación por Expertos**: Aprobación de astrónomos especializados

### **Impacto del Proyecto**
- **Optimización de Recursos**: Reducción del 50% en tiempo de selección manual
- **Escalabilidad**: Capacidad de procesar catálogos futuros automáticamente
- **Reproducibilidad Científica**: Criterios objetivos y documentados

---

## 🔮 **FUTURAS MEJORAS**

### **Técnicas Avanzadas**
- **Deep Learning**: Redes neuronales convolucionales para espectros
- **Ensemble Methods**: Combinación ponderada de múltiples modelos
- **Active Learning**: Mejora iterativa con feedback de observaciones
- **Uncertainty Quantification**: Estimación bayesiana de incertidumbres

### **Nuevas Fuentes de Datos**
- **TESS Extended Mission**: Planetas de período largo
- **PLATO Mission**: Análisis sísmico estelar
- **Atmospheric Retrievals**: Incorporación de datos espectrales reales
- **Laboratory Data**: Nuevos gases biosignatura identificados

### **Integración con Observatorios**
- **JWST Proposal Tool**: Integración directa con sistema de propuestas
- **Real-time Updates**: Actualización automática con nuevos descubrimientos
- **Multi-instrument Planning**: Optimización para múltiples telescopios

---

## 📚 **REFERENCIAS Y RECURSOS**

### **Literatura Científica**
1. **Seager et al. (2024)**: "Biosignature Gases in Exoplanet Atmospheres with JWST"
2. **Kopparapu et al. (2013)**: "Habitable Zones Around Main-sequence Stars"
3. **NASA Exoplanet Archive**: Fuente de datos oficial
4. **JWST Technical Documentation**: Especificaciones instrumentales

### **Recursos Técnicos**
- **Scikit-learn Documentation**: Guías de machine learning
- **Pandas User Guide**: Manipulación de datos astronómicos
- **NASA APIs**: Acceso programático a catálogos

### **Contacto y Soporte**
- **Equipo de Desarrollo**: [Información de contacto]
- **Issues y Bugs**: [Sistema de tickets]
- **Contribuciones**: [Guías para colaboradores]

---

*Este documento proporciona una visión completa del proyecto AEE. Para preguntas específicas o implementaciones personalizadas, consulte con el equipo de desarrollo.*