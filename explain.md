# PROYECTO DE ANÁLISIS DE BIOFIRMAS EN EXOPLANETAS
## Agencia Española Espacial (AEE)

---

## 📋 RESUMEN DEL PROYECTO

Este proyecto desarrolla un **sistema profesional de análisis y ranking de exoplanetas** basado en su potencial para albergar biofirmas detectables por el telescopio espacial James Webb (JWST). El sistema integra datos de múltiples fuentes de NASA y aplica metodologías científicas avanzadas para identificar los candidatos más prometedores para futuras observaciones.

---

## 🎯 OBJETIVOS PRINCIPALES

1. **Identificar exoplanetas habitables** usando datos de NASA Exoplanet Archive
2. **Calcular zonas habitables** basadas en parámetros estelares y planetarios
3. **Desarrollar un sistema de scoring** para biofirmas basado en literatura científica
4. **Generar rankings profesionales** para priorizar observaciones JWST
5. **Crear documentación técnica** para la Agencia Española Espacial

---

## 📊 DATASETS UTILIZADOS

### Fuentes de Datos NASA:
- **NASA Cumulative Archive**: 38,952 exoplanetas confirmados
- **TESS TOI (Targets of Interest)**: 7,703 candidatos
- **K2 Mission Data**: 4,004 planetas
- **JWST Priority Targets**: 18 objetivos prioritarios

### Archivos Procesados:
```
exoplanet_data/
├── nasa_cumulative.csv      # Datos principales confirmados
├── tess_toi.csv            # Candidatos TESS
├── k2_planets.csv          # Planetas K2
├── jwst_priority_targets.csv # Objetivos JWST
└── download_metadata.csv   # Metadatos de descarga
```

---

## 🧬 METODOLOGÍA CIENTÍFICA

### Base Teórica:
El proyecto se basa en el artículo científico **"Prospects for Detecting Signs of Life on Exoplanets in the JWST Era"** que establece:

- **Gases biofirma detectables** por JWST
- **Metodologías de espectroscopía** de transmisión
- **Criterios de habitabilidad** actualizados
- **Factores de falsos positivos** en detección

### Algoritmo de Zona Habitable:
Implementamos el modelo de **Kopparapu et al. (2013)**:

```python
# Zona Conservadora
hz_inner = sqrt(L_star / 1.1)  # Límite interno
hz_outer = sqrt(L_star / 0.53) # Límite externo

# Zona Optimista  
hz_inner_opt = sqrt(L_star / 1.8)
hz_outer_opt = sqrt(L_star / 0.28)
```

### Sistema de Scoring de Biofirmas (0-100):

1. **Zona Habitable (30%)**:
   - Conservadora: 1.0 puntos
   - Optimista: 0.7 puntos
   - Fuera: 0.0 puntos

2. **Tamaño Terrestre (25%)**:
   - Radio: 0.5-2.0 R⊕ = 1.0 puntos
   - Fuera del rango = 0.0 puntos

3. **Similitud Terrestre (20%)**:
   - Índice ESI combinado (radio, masa, temperatura)

4. **Estabilidad Orbital (10%)**:
   - Excentricidad < 0.3 = 1.0 puntos
   - 0.3-0.6 = 0.5 puntos
   - > 0.6 = 0.0 puntos

5. **Temperatura de Equilibrio (15%)**:
   - Rango 200-373 K = 1.0 puntos
   - Fuera del rango = 0.0 puntos

---

## 🔬 GASES BIOFIRMA CONSIDERADOS

### Alta Confianza (Baja probabilidad de falsos positivos):
- **N₂O (Óxido Nitroso)**: Peso 0.9, Riesgo FP: 0.2
- **PH₃ (Fosfina)**: Peso 0.85, Riesgo FP: 0.3
- **CFCs (Clorofluorocarbonos)**: Peso 1.0, Riesgo FP: 0.1 *(tecno-firmas)*

### Moderada Confianza:
- **CH₄ (Metano)**: Peso 0.7, Riesgo FP: 0.7
- **O₂ (Oxígeno)**: Peso 0.6, Riesgo FP: 0.8

### Baja Confianza (Alta probabilidad de falsos positivos):
- **DMS (Dimetil Sulfuro)**: Peso 0.5, Riesgo FP: 0.9
- **H₂O (Vapor de Agua)**: Peso 0.4, Riesgo FP: 0.5

---

## 💻 ARQUITECTURA DEL SISTEMA

### Estructura del Código:

```python
class ExoplanetBiosignatureAnalyzer:
    """Sistema profesional para análisis de biofirmas"""
    
    def __init__(self):
        # Constantes físicas y astronómicas
        # Parámetros de zona habitable
        # Tabla de gases biofirma
        # Criterios de habitabilidad terrestre
    
    def load_existing_data(self):
        # Cargar datasets NASA existentes
    
    def standardize_columns(self):
        # Estandarizar columnas entre datasets
        # Eliminar duplicados
        # Convertir unidades
    
    def calculate_habitable_zone(self):
        # Calcular límites de zona habitable
        # Determinar planetas en HZ
    
    def calculate_earth_similarity_index(self):
        # ESI basado en radio, masa, temperatura
    
    def calculate_biosignature_score(self):
        # Sistema de puntuación integrado
    
    def generate_ranking(self):
        # Ranking final de candidatos
    
    def save_results(self):
        # Guardar CSV, JSON, metadatos
    
    def generate_report(self):
        # Reporte profesional AEE
```

### Flujo de Procesamiento:

1. **Carga de Datos** → Datasets NASA locales
2. **Estandarización** → Columnas uniformes, conversión de unidades
3. **Cálculo HZ** → Zona habitable por sistema estelar
4. **ESI** → Índice de similitud terrestre
5. **Scoring** → Puntuación de biofirmas integrada
6. **Ranking** → Top candidatos ordenados
7. **Exportación** → CSV, JSON, reporte MD

---

## 📈 RESULTADOS OBTENIDOS

### Estadísticas Generales:
- **7,249 exoplanetas únicos** analizados
- **103 planetas** en zona habitable optimista
- **50 planetas** en zona habitable conservadora
- **4 candidatos** de alta prioridad (Score > 60)

### Top 10 Candidatos JWST:

| Rank | Planeta | Sistema | Score | Clase | ESI | Radio (R⊕) |
|------|---------|---------|-------|-------|-----|-------------|
| 1 | TRAPPIST-1 f | TRAPPIST-1 | 66.5 | Alto | 0.827 | 1.04 |
| 2 | TRAPPIST-1 e | TRAPPIST-1 | 66.5 | Alto | 0.826 | 0.92 |
| 3 | TRAPPIST-1 d | TRAPPIST-1 | 64.2 | Alto | 0.712 | 0.77 |
| 4 | TOI-1266 c | TOI-1266 | 63.3 | Alto | 0.667 | 1.56 |
| 5 | TOI-1452 b | TOI-1452 | 59.8 | Moderado | 0.491 | 1.67 |
| 6 | TOI-2095 c | TOI-2095 | 59.0 | Moderado | 0.449 | 1.33 |
| 7 | LHS 1140 b | LHS 1140 | 58.7 | Moderado | 0.437 | 1.43 |
| 8 | Gliese 12 b | Gliese 12 | 57.4 | Moderado | 0.620 | 0.96 |
| 9 | LP 791-18 d | LP 791-18 | 52.7 | Moderado | 0.887 | 1.03 |
| 10 | TRAPPIST-1 g | TRAPPIST-1 | 51.2 | Moderado | 0.810 | 1.13 |

---

## 📁 ARCHIVOS GENERADOS

### Outputs del Sistema:

1. **`exoplanet_biosignature_ranking_YYYYMMDD_HHMMSS.csv`**
   - Ranking completo de 100 mejores candidatos
   - Todas las métricas calculadas
   - Metadatos de fuente

2. **`AEE_Biosignature_Report_YYYYMMDD_HHMMSS.md`**
   - Reporte profesional para AEE
   - Resumen ejecutivo
   - Metodología detallada
   - Recomendaciones técnicas

3. **`exoplanet_biosignature_ranking_YYYYMMDD_HHMMSS_metadata.json`**
   - Metadatos del análisis
   - Estadísticas de procesamiento
   - Información de versión

### Scripts del Proyecto:

- **`exoplanet_biosignature_system.py`**: Sistema principal completo
- **`python_SCRIPTS_BASS.py`**: Descarga inicial de datos NASA
- **`pruebas.py`**: Verificación y análisis básico
- **`read_pdf_full.py`**: Extracción de información del artículo científico

---

## 🔧 INSTALACIÓN Y USO

### Requisitos del Sistema:
```bash
# Crear entorno virtual
python3 -m venv venv
source venv/bin/activate

# Instalar dependencias
pip install pandas numpy requests matplotlib seaborn
```

### Ejecución:
```bash
# Activar entorno
source venv/bin/activate

# Ejecutar análisis completo
python exoplanet_biosignature_system.py
```

### Estructura de Directorios:
```
BASES DE DATOS/
├── exoplanet_biosignature_system.py  # Sistema principal
├── exoplanet_data/                   # Datos y resultados
│   ├── nasa_cumulative.csv          # Datos NASA
│   ├── tess_toi.csv                 # Datos TESS
│   ├── k2_planets.csv               # Datos K2
│   └── [resultados_YYYYMMDD_HHMMSS.*] # Outputs
├── venv/                            # Entorno virtual
└── 2504.12946v2 (1).pdf            # Artículo científico base
```

---

## 🎯 APLICACIONES Y FUTURO

### Uso Inmediato:
- **Priorización de observaciones JWST** para la AEE
- **Selección de targets** para espectroscopía de transmisión
- **Planificación de misiones** de seguimiento

### Desarrollos Futuros:
- **Integración con datos atmosféricos** de JWST
- **Algoritmos de machine learning** para detección de patrones
- **Corrección de actividad estelar** en enanas M
- **Preparación para telescopios post-JWST**

### Escalabilidad:
- **Modular y extensible** para nuevos datasets
- **Actualizable** con nuevos criterios científicos
- **Integrable** con pipelines de observación

---

## 📚 REFERENCIAS CIENTÍFICAS

1. **Kopparapu, R. K., et al. (2013)** - "Habitable Zones Around Main-sequence Stars"
2. **Artículo base**: "Prospects for Detecting Signs of Life on Exoplanets in the JWST Era"
3. **NASA Exoplanet Archive** - Datasets oficiales
4. **JWST Mission Documentation** - Capacidades instrumentales

---

## 👥 EQUIPO Y RECONOCIMIENTOS

**Desarrollado para**: Agencia Española Espacial (AEE)  
**Metodología**: Framework JWST para Biofirmas  
**Fecha**: Octubre 2024  
**Versión**: 1.0  

---

*Este documento explica la lógica completa del proyecto de análisis de biofirmas en exoplanetas desarrollado para la Agencia Española Espacial, desde la conceptualización hasta la implementación y resultados obtenidos.*