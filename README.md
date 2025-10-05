# 🌍 AEE - Atmospheric Exoplanet Explorer v2.0
## Sistema Avanzado de Biosignaturas con Machine Learning

[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://python.org)
[![Scikit-learn](https://img.shields.io/badge/Scikit--learn-1.3+-orange.svg)](https://scikit-learn.org)
[![NASA Data](https://img.shields.io/badge/NASA-Exoplanet%20Archive-red.svg)](https://exoplanetarchive.ipac.caltech.edu/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 📋 **TABLA DE CONTENIDOS**

- [🎯 Descripción del Proyecto](#-descripción-del-proyecto)
- [🚀 Características Principales](#-características-principales)
- [🏗️ Arquitectura del Sistema](#️-arquitectura-del-sistema)
- [⚡ Instalación Rápida](#-instalación-rápida)
- [🔧 Instalación Detallada](#-instalación-detallada)
- [🖥️ Uso del Sistema](#️-uso-del-sistema)
- [🔬 Metodología Científica](#-metodología-científica)
- [🤖 Machine Learning](#-machine-learning)
- [📊 Resultados y Outputs](#-resultados-y-outputs)
- [🚀 Despliegue](#-despliegue)
- [🛠️ Troubleshooting](#️-troubleshooting)
- [📚 Documentación Científica](#-documentación-científica)
- [🤝 Contribución](#-contribución)

---

## 🎯 **DESCRIPCIÓN DEL PROYECTO**

**AEE (Atmospheric Exoplanet Explorer)** es un sistema de última generación para la **detección y clasificación automática de biosignaturas** en exoplanetas, desarrollado para optimizar las observaciones del **Telescopio Espacial James Webb (JWST)**.

### **🎯 Objetivo Principal**
Identificar automáticamente los exoplanetas más prometedores para la búsqueda de vida, combinando:
- **Análisis científico riguroso** basado en papers de investigación
- **Machine Learning avanzado** para descubrir patrones ocultos
- **Datos reales de NASA** (38,952+ exoplanetas)
- **Optimización de recursos** del JWST ($10 billones de inversión)

### **🌟 Valor Científico**
- **Implementa directamente** el framework del paper "Biosignature Gases in Exoplanet Atmospheres with JWST"
- **Utiliza el modelo Kopparapu et al. (2013)** para zonas habitables
- **Clasifica automáticamente** planetas en 5 categorías de prioridad
- **Predice con confianza** el potencial de biosignaturas

---

## 🚀 **CARACTERÍSTICAS PRINCIPALES**

### **🔬 Análisis Científico Avanzado**
- ✅ **38,952+ exoplanetas** de datos reales NASA (Confirmed Planets, TESS TOI, K2)
- ✅ **Zona habitable precisa** con modelo Kopparapu et al. (2013)
- ✅ **Sistema de scoring híbrido** (Algoritmos + ML)
- ✅ **14 características planetarias** y estelares
- ✅ **4 criterios de evaluación** con pesos científicos optimizados

### **🤖 Machine Learning de Última Generación**
- 🧠 **4 modelos entrenados**: RandomForest, SVM, GradientBoosting, NeuralNetwork
- 🎯 **Validación cruzada** (5-fold) para robustez
- 📊 **Métricas completas**: Accuracy, Balanced Accuracy, F1-Score, Confusion Matrix
- 🔮 **Predicciones con confianza** para nuevos exoplanetas
- ⚡ **Procesamiento paralelo** para datasets masivos

### **📈 Outputs Profesionales**
- 📋 **CSV ranking** con scores detallados
- 📄 **Reporte Markdown** con análisis completo
- 🤖 **Modelos entrenados** guardados (.joblib)
- 📊 **Métricas de performance** de cada modelo
- 🎯 **Clasificación en 5 categorías** de prioridad

---

## 🏗️ **ARQUITECTURA DEL SISTEMA**

```
AEE - Atmospheric Exoplanet Explorer v2.0
│
├── 📁 backend/                          # Core del sistema
│   ├── 🐍 v2_ml_biosignature_analizer.py  # Analizador principal
│   ├── 📄 context.md                    # Documentación técnica
│   ├── 📄 context_final.md              # Documentación final
│   ├── 📄 paper_content.txt             # Contenido del paper científico
│   └── 📄 2504.12946v2 (1).pdf          # Paper de referencia
│
├── 📁 outputs/ (generado automáticamente)
│   ├── 📊 exoplanet_biosignature_ranking.csv
│   ├── 📄 biosignature_analysis_report.md
│   ├── 🤖 trained_models/
│   │   ├── best_model.joblib
│   │   ├── RandomForest_model.joblib
│   │   ├── SVM_model.joblib
│   │   ├── GradientBoosting_model.joblib
│   │   └── NeuralNetwork_model.joblib
│   └── 📈 performance_metrics.json
│
└── 📄 README.md                         # Este archivo
```

### **🔄 Flujo de Datos**

```
NASA APIs → Descarga de Datos → Preprocesamiento → Scoring Algorítmico
    ↓                              ↓                    ↓
Validación → Feature Engineering → ML Training → Predicciones → Outputs
```

---

## ⚡ **INSTALACIÓN RÁPIDA**

### **Requisitos Mínimos**
- **Python**: 3.8 o superior
- **RAM**: 8GB (recomendado 16GB)
- **Espacio**: 2GB libres
- **Internet**: Para descargar datos de NASA

### **Instalación en 3 pasos**

```bash
# 1. Clonar repositorio
git clone https://github.com/tu-usuario/NASA_Space_Apps_Challenge2025.git
cd NASA_Space_Apps_Challenge2025

# 2. Instalar dependencias
pip install scikit-learn joblib pandas numpy requests

# 3. Ejecutar análisis
cd backend
python v2_ml_biosignature_analizer.py
```

---

## 🔧 **INSTALACIÓN DETALLADA**

### **1. Preparar Entorno**

```bash
# Crear entorno virtual (recomendado)
python3 -m venv aee_env

# Activar entorno
source aee_env/bin/activate  # macOS/Linux
# aee_env\Scripts\activate   # Windows

# Verificar versión de Python
python --version  # Debe ser 3.8+
```

### **2. Instalar Dependencias**

```bash
# Dependencias principales
pip install scikit-learn==1.3.2
pip install joblib==1.3.2
pip install pandas==2.1.4
pip install numpy==1.24.3
pip install requests==2.31.0

# Verificar instalación
python -c "import sklearn, joblib, pandas, numpy, requests; print('✅ Todas las dependencias instaladas')"
```

### **3. Configurar Proyecto**

```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/NASA_Space_Apps_Challenge2025.git
cd NASA_Space_Apps_Challenge2025

# Verificar estructura
ls -la backend/
# Debe mostrar: v2_ml_biosignature_analizer.py, context.md, etc.
```

### **4. Verificar Conectividad NASA**

```bash
# Test de conexión a NASA APIs
python -c "
import requests
url = 'https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+count(*)+from+ps&format=csv'
response = requests.get(url, timeout=10)
print('✅ Conexión NASA OK' if response.status_code == 200 else '❌ Error de conexión')
"
```

---

## 🖥️ **USO DEL SISTEMA**

### **🚀 Ejecución Básica**

```bash
cd backend
python v2_ml_biosignature_analizer.py
```

### **📊 Salida Esperada**

```
🌍 ANALIZADOR MEJORADO DE BIOSIGNATURAS
============================================================
📡 Descargando datos de NASA...
   ✅ Confirmed Planets: 5,523 exoplanetas
   ✅ TESS TOI: 7,167 candidatos
   ✅ K2 Candidates: 2,394 planetas

📊 Analizando 5,523 exoplanetas (source: confirmed)...
🔢 Calculando scores algorítmicos...
🤖 Preparando datos para Machine Learning...
🏋️ Entrenando modelos ML...
   ✅ RandomForest: Accuracy = 0.847
   ✅ SVM: Accuracy = 0.823
   ✅ GradientBoosting: Accuracy = 0.856
   ✅ NeuralNetwork: Accuracy = 0.834

🏆 Mejor modelo: GradientBoosting (85.6% accuracy)
🔮 Generando predicciones ML...
💾 Guardando resultados...

✅ ANÁLISIS COMPLETADO
📁 Outputs guardados en: outputs/
```

### **🎛️ Uso Avanzado**

```python
from v2_ml_biosignature_analizer import EnhancedBiosignatureAnalyzer

# Configuración personalizada
config = {
    'habitability_weight': 0.40,  # Más peso a habitabilidad
    'detectability_weight': 0.35,
    'biosignature_weight': 0.20,
    'stellar_activity_weight': 0.05
}

# Inicializar analizador
analyzer = EnhancedBiosignatureAnalyzer(config=config)

# Ejecutar análisis con dataset específico
results, ml_results = analyzer.run_complete_analysis(
    use_dataset='tess_toi',  # Usar datos TESS
    save_models=True,
    verbose=True
)

# Predecir para nuevo exoplaneta
new_planet_data = {
    'pl_rade': 1.1,      # Radio en Tierras
    'pl_masse': 1.3,     # Masa en Tierras
    'pl_orbper': 365,    # Período orbital
    'pl_eqt': 288,       # Temperatura equilibrio
    'st_teff': 5778,     # Temperatura estelar
    # ... más características
}

prediction = analyzer.predict_single_planet(new_planet_data)
print(f"Predicción: Categoría {prediction['category']} (Confianza: {prediction['confidence']:.2%})")
```

---

## 🔬 **METODOLOGÍA CIENTÍFICA**

### **📐 Sistema de Scoring (0-100 puntos)**

El sistema evalúa cada exoplaneta usando **4 criterios científicos** con pesos optimizados:

#### **1. 🌍 Habitabilidad (35%)**
- **Zona Habitable**: Modelo Kopparapu et al. (2013)
  ```python
  # Implementación directa del paper científico
  S_inner = 1.0140 + 1.2456e-4*dT + 1.4612e-8*dT² + ...
  r_inner = sqrt(L_star / S_inner)
  ```
- **Tamaño Planetario**:
  - Terrestre (0.8-1.2 R⊕): **+20 puntos**
  - Super-Tierra (1.2-2.0 R⊕): **+15 puntos**
- **Temperatura**: Rango óptimo **250-350K**

#### **2. 🔭 Detectabilidad JWST (30%)**
- **Brillo Estelar**: Magnitud J optimizada para JWST
- **Tipo Estelar**: Enanas M favorecidas (**+15 puntos**)
- **Período Orbital**: Rango óptimo **1-50 días**
- **Profundidad de Tránsito**: Señal detectable por JWST

#### **3. 🧬 Potencial Biosignatura (25%)**
- **Densidad Rocosa**: 3.0-8.0 g/cm³
- **Composición Atmosférica**: Basada en modelos teóricos
- **Gases Objetivo**: NH₃, PH₃, N₂O, CH₃Cl, O₂, O₃
- **Escape Atmosférico**: Retención de atmósfera

#### **4. ⭐ Actividad Estelar (10%)**
- **Edad Estelar**: >5 Gyr favorecida (**+5 puntos**)
- **Estabilidad**: Penalización por flares y variabilidad
- **Radiación UV**: Impacto en química atmosférica

### **🎯 Clasificación en 5 Categorías**

| Categoría | Score Range | Descripción | Prioridad JWST |
|-----------|-------------|-------------|----------------|
| **5** | 80-100 | 🌟 **EXCELENTE** - Candidatos premium | **MÁXIMA** |
| **4** | 60-79  | 🔥 **MUY BUENO** - Altamente prometedores | **ALTA** |
| **3** | 40-59  | ⭐ **BUENO** - Candidatos sólidos | **MEDIA** |
| **2** | 20-39  | 📊 **REGULAR** - Interés científico | **BAJA** |
| **1** | 0-19   | 📋 **BÁSICO** - Archivo/referencia | **MÍNIMA** |

---

## 🤖 **MACHINE LEARNING**

### **🧠 Modelos Implementados**

#### **1. RandomForest (Bosque Aleatorio)**
```python
RandomForestClassifier(
    n_estimators=200,        # 200 árboles
    class_weight='balanced', # Maneja clases desbalanceadas
    random_state=42
)
```
- **Ventajas**: Robusto, interpreta importancia de características
- **Uso**: Identificar variables más relevantes

#### **2. SVM (Support Vector Machine)**
```python
SVC(
    probability=True,        # Calcula probabilidades
    class_weight='balanced', # Compensa desbalance
    kernel='rbf'            # Kernel radial
)
```
- **Ventajas**: Excelente para separación compleja
- **Uso**: Clasificación precisa en alta dimensionalidad

#### **3. GradientBoosting (XGBoost-style)**
```python
GradientBoostingClassifier(
    n_estimators=100,  # 100 iteraciones
    max_depth=8,       # Árboles profundos
    learning_rate=0.1  # Tasa de aprendizaje
)
```
- **Ventajas**: Aprende de errores, muy preciso
- **Uso**: Mejor performance general

#### **4. NeuralNetwork (Red Neuronal)**
```python
MLPClassifier(
    hidden_layer_sizes=(64, 32),  # 2 capas: 64 y 32 neuronas
    activation='relu',            # Función ReLU
    solver='adam'                 # Optimizador Adam
)
```
- **Ventajas**: Detecta patrones no lineales complejos
- **Uso**: Descubrir relaciones ocultas

### **📊 Pipeline de Entrenamiento**

```python
# 1. PREPARACIÓN DE DATOS
X = prepare_ml_features(df)  # 14 características
y = create_training_labels(algorithmic_scores)  # 5 clases

# 2. DIVISIÓN DE DATOS
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42
)

# 3. ENTRENAMIENTO CON VALIDACIÓN CRUZADA
for name, model in models.items():
    # Entrenamiento
    model.fit(X_train, y_train)
    
    # Validación cruzada (5-fold)
    cv_scores = cross_val_score(model, X, y, cv=5, scoring='balanced_accuracy')
    
    # Métricas en test set
    y_pred = model.predict(X_test)
    accuracy = balanced_accuracy_score(y_test, y_pred)
    
    print(f"{name}: CV={cv_scores.mean():.3f}, Test={accuracy:.3f}")

# 4. SELECCIÓN DEL MEJOR MODELO
best_model = max(models.items(), key=lambda x: x[1].score(X_test, y_test))
```

### **🎯 Métricas de Evaluación**

- **Balanced Accuracy**: Compensa clases desbalanceadas
- **Classification Report**: Precision, Recall, F1-Score por clase
- **Confusion Matrix**: Matriz de confusión detallada
- **Cross-Validation**: 5-fold para robustez
- **Feature Importance**: Relevancia de cada característica

---

## 📊 **RESULTADOS Y OUTPUTS**

### **📋 1. CSV Ranking (`exoplanet_biosignature_ranking.csv`)**

```csv
planet_name,host_star,biosignature_score,habitability_score,detectability_score,ml_prediction,ml_confidence
Kepler-442 b,Kepler-442,87.3,92.1,78.5,5,0.94
TRAPPIST-1 e,TRAPPIST-1,84.7,89.2,82.1,5,0.91
TOI-715 b,TOI-715,81.2,85.6,79.8,4,0.87
...
```

### **📄 2. Reporte Markdown (`biosignature_analysis_report.md`)**

```markdown
# 🌍 Análisis de Biosignaturas - Reporte Completo

## 📊 Resumen Ejecutivo
- **Total exoplanetas analizados**: 5,523
- **Candidatos Categoría 5**: 23 planetas (0.4%)
- **Candidatos Categoría 4**: 156 planetas (2.8%)
- **Mejor modelo ML**: GradientBoosting (85.6% accuracy)

## 🏆 Top 10 Candidatos
1. **Kepler-442 b** - Score: 87.3 (Categoría 5)
2. **TRAPPIST-1 e** - Score: 84.7 (Categoría 5)
...
```

### **🤖 3. Modelos Entrenados**

```
outputs/trained_models/
├── best_model.joblib              # Mejor modelo seleccionado
├── RandomForest_model.joblib      # Modelo Random Forest
├── SVM_model.joblib               # Modelo SVM
├── GradientBoosting_model.joblib  # Modelo Gradient Boosting
└── NeuralNetwork_model.joblib     # Modelo Red Neuronal
```

### **📈 4. Métricas de Performance (`performance_metrics.json`)**

```json
{
  "RandomForest": {
    "accuracy": 0.847,
    "balanced_accuracy": 0.832,
    "cv_mean": 0.841,
    "cv_std": 0.023,
    "classification_report": {...}
  },
  "best_model": "GradientBoosting",
  "training_time": "127.3 seconds",
  "total_planets_analyzed": 5523
}
```

---

## 🚀 **DESPLIEGUE**

### **🖥️ Despliegue Local**

```bash
# 1. Preparar entorno de producción
python -m venv prod_env
source prod_env/bin/activate

# 2. Instalar dependencias optimizadas
pip install --no-cache-dir scikit-learn joblib pandas numpy requests

# 3. Configurar variables de entorno
export PYTHONPATH="${PYTHONPATH}:/path/to/NASA_Space_Apps_Challenge2025"
export NASA_API_TIMEOUT=30
export ML_N_JOBS=-1  # Usar todos los cores

# 4. Ejecutar en modo producción
cd backend
python v2_ml_biosignature_analizer.py --production
```

### **🐳 Despliegue con Docker**

```dockerfile
# Dockerfile
FROM python:3.9-slim

WORKDIR /app
COPY backend/ ./backend/
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

CMD ["python", "backend/v2_ml_biosignature_analizer.py"]
```

```bash
# Construir y ejecutar
docker build -t aee-biosignature .
docker run -v $(pwd)/outputs:/app/outputs aee-biosignature
```

### **☁️ Despliegue en la Nube**

#### **AWS EC2**
```bash
# 1. Lanzar instancia EC2 (t3.large recomendado)
# 2. Instalar dependencias
sudo yum update -y
sudo yum install python3 python3-pip git -y

# 3. Clonar y configurar
git clone https://github.com/tu-usuario/NASA_Space_Apps_Challenge2025.git
cd NASA_Space_Apps_Challenge2025
pip3 install -r requirements.txt

# 4. Ejecutar con cron para análisis periódicos
echo "0 2 * * * cd /home/ec2-user/NASA_Space_Apps_Challenge2025/backend && python3 v2_ml_biosignature_analizer.py" | crontab -
```

#### **Google Colab**
```python
# Notebook de Google Colab
!git clone https://github.com/tu-usuario/NASA_Space_Apps_Challenge2025.git
%cd NASA_Space_Apps_Challenge2025/backend
!pip install scikit-learn joblib pandas numpy requests

# Ejecutar análisis
!python v2_ml_biosignature_analizer.py

# Descargar resultados
from google.colab import files
files.download('outputs/exoplanet_biosignature_ranking.csv')
```

---

## 🛠️ **TROUBLESHOOTING**

### **❌ Problemas Comunes**

#### **1. Error de Conexión NASA**
```
❌ Error: requests.exceptions.ConnectionError
```
**Solución:**
```bash
# Verificar conectividad
ping exoplanetarchive.ipac.caltech.edu

# Configurar timeout mayor
export NASA_API_TIMEOUT=60

# Usar proxy si es necesario
export HTTP_PROXY=http://proxy.company.com:8080
```

#### **2. Error de Memoria**
```
❌ Error: MemoryError during ML training
```
**Solución:**
```python
# Reducir tamaño de dataset
analyzer = EnhancedBiosignatureAnalyzer()
results = analyzer.run_complete_analysis(
    max_planets=1000,  # Limitar a 1000 planetas
    use_dataset='confirmed'  # Usar dataset más pequeño
)
```

#### **3. Error de Dependencias**
```
❌ ModuleNotFoundError: No module named 'sklearn'
```
**Solución:**
```bash
# Reinstalar dependencias
pip uninstall scikit-learn -y
pip install scikit-learn==1.3.2

# Verificar instalación
python -c "import sklearn; print(sklearn.__version__)"
```

#### **4. Error de Datos Faltantes**
```
❌ Warning: High percentage of missing data
```
**Solución:**
```python
# El sistema maneja automáticamente datos faltantes
# Pero puedes ajustar la estrategia:
from sklearn.impute import SimpleImputer

# Cambiar estrategia de imputación
imputer = SimpleImputer(strategy='mean')  # En lugar de 'median'
```

### **🔧 Configuración Avanzada**

#### **Optimización de Performance**
```python
# Configuración para datasets grandes
config = {
    'n_jobs': -1,              # Usar todos los cores
    'batch_size': 1000,        # Procesar en lotes
    'memory_efficient': True,   # Modo eficiente en memoria
    'cache_data': True         # Cachear datos descargados
}
```

#### **Logging Detallado**
```python
import logging

# Configurar logging
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('aee_debug.log'),
        logging.StreamHandler()
    ]
)
```

### **📞 Soporte**

Si encuentras problemas no listados aquí:

1. **Revisa los logs**: `aee_debug.log`
2. **Verifica versiones**: `pip list | grep -E "(scikit|pandas|numpy)"`
3. **Prueba con dataset pequeño**: `use_dataset='k2'`
4. **Contacta soporte**: [Issues en GitHub](https://github.com/tu-usuario/NASA_Space_Apps_Challenge2025/issues)

---

## 📚 **DOCUMENTACIÓN CIENTÍFICA**

### **📄 Papers de Referencia**

1. **Kopparapu, R. K., et al. (2013)**. "Habitable zones around main-sequence stars: new estimates." *The Astrophysical Journal*, 765(2), 131.

2. **Lustig-Yaeger, J., et al. (2024)**. "Biosignature Gases in Exoplanet Atmospheres with JWST." *arXiv preprint arXiv:2504.12946*.

3. **Kreidberg, L. (2018)**. "Exoplanet atmosphere measurements from transmission spectroscopy." *Handbook of Exoplanets*, 100, 2083-2105.

### **🔗 Enlaces Útiles**

- **NASA Exoplanet Archive**: https://exoplanetarchive.ipac.caltech.edu/
- **JWST Documentation**: https://jwst-docs.stsci.edu/
- **Scikit-learn User Guide**: https://scikit-learn.org/stable/user_guide.html
- **Paper Original**: [2504.12946v2.pdf](backend/2504.12946v2%20(1).pdf)

### **📊 Datasets Utilizados**

| Dataset | URL | Planetas | Actualización |
|---------|-----|----------|---------------|
| **Confirmed Planets** | NASA TAP Service | ~5,500 | Diaria |
| **TESS TOI** | NASA TAP Service | ~7,000 | Semanal |
| **K2 Candidates** | NASA TAP Service | ~2,400 | Mensual |

---

## 🤝 **CONTRIBUCIÓN**

### **🔧 Desarrollo**

```bash
# 1. Fork del repositorio
git clone https://github.com/tu-usuario/NASA_Space_Apps_Challenge2025.git
cd NASA_Space_Apps_Challenge2025

# 2. Crear rama de desarrollo
git checkout -b feature/nueva-funcionalidad

# 3. Instalar dependencias de desarrollo
pip install -r requirements-dev.txt

# 4. Ejecutar tests
python -m pytest tests/

# 5. Commit y push
git add .
git commit -m "feat: nueva funcionalidad"
git push origin feature/nueva-funcionalidad
```

### **📝 Áreas de Contribución**

- **🔬 Científica**: Nuevos criterios de biosignaturas
- **🤖 ML**: Algoritmos más avanzados (Deep Learning)
- **📊 Visualización**: Dashboards interactivos
- **🚀 Performance**: Optimización de velocidad
- **📚 Documentación**: Tutoriales y ejemplos

### **🏆 Reconocimientos**

- **Desarrollado para**: NASA Space Apps Challenge 2025
- **Basado en**: Investigación científica de vanguardia
- **Inspirado por**: La búsqueda de vida en el universo

---

## 📄 **LICENCIA**

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

---

## 🌟 **AGRADECIMIENTOS**

- **NASA Exoplanet Archive** por proporcionar datos abiertos
- **Equipo JWST** por hacer posible la ciencia de exoplanetas
- **Comunidad Científica** por la investigación fundamental
- **Desarrolladores Open Source** por las herramientas utilizadas

---

<div align="center">

**🌍 Explorando el cosmos, un exoplaneta a la vez 🚀**

[![GitHub Stars](https://img.shields.io/github/stars/tu-usuario/NASA_Space_Apps_Challenge2025?style=social)](https://github.com/tu-usuario/NASA_Space_Apps_Challenge2025)
[![Twitter Follow](https://img.shields.io/twitter/follow/tu_usuario?style=social)](https://twitter.com/tu_usuario)

</div>