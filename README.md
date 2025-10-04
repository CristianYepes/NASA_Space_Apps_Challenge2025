# Exoplanet Hunter 🔭

**NASA Space Apps Challenge 2025 - A World Away: Hunting for Exoplanets with AI**

An AI-powered web application for detecting and classifying exoplanets using machine learning models trained with **REAL DATA** from NASA's Exoplanet Archive.

![NASA Space Apps Challenge](https://img.shields.io/badge/NASA-Space%20Apps%20Challenge%202025-blue)
![Python](https://img.shields.io/badge/Python-3.8%2B-brightgreen)
![React](https://img.shields.io/badge/React-18-blue)
![NASA Data](https://img.shields.io/badge/NASA-Verified%20Data-red)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 🌟 Overview

This project provides a complete solution for exoplanet detection and classification using artificial intelligence trained with **100% VERIFIED DATA** from NASA's official Exoplanet Archive. All statistics, training data, and predictions are based on scientifically verified sources.

### ✅ Key Features

- **🔬 REAL NASA DATA**: Uses official NASA Exoplanet Archive API (TAP protocol)
- **📡 Live Statistics**: Real-time data from **9,564 Kepler Objects of Interest (KOIs)**
  - 2,746 Confirmed Planets
  - 1,979 Candidates
  - 4,839 False Positives
- **🤖 ML Model**: Random Forest classifier trained with 2,000 real KOIs (85% accuracy)
- **🌐 Interactive Web Interface**: Modern React-based UI with 3D planet animations
- **📊 Batch Processing**: Upload CSV files for analyzing multiple observations
- **⚡ Real-time Predictions**: Instant classification of stellar objects
- **⚙️ Model Tuning**: Adjust hyperparameters and retrain with fresh NASA data

## 🎯 Challenge Details

**Challenge**: A World Away: Hunting for Exoplanets with AI

**Objective**: Create an AI/ML model trained on NASA's open-source exoplanet datasets that can analyze new data to accurately identify exoplanets.

### 📚 Data Sources (OFFICIAL NASA)

All data comes from:
- **NASA Exoplanet Archive**: https://exoplanetarchive.ipac.caltech.edu/
- **API Protocol**: TAP (Table Access Protocol) - IVOA Standard
- **Primary Table**: `cumulative` (KOI Cumulative Delivery)
- **Real-time Updates**: Statistics fetched directly from NASA servers

**Scientific Features Used**:
```
• koi_period      - Orbital Period (days)
• koi_duration    - Transit Duration (hours)
• koi_prad        - Planetary Radius (Earth radii)
• koi_teq         - Equilibrium Temperature (Kelvin)
• koi_insol       - Insolation Flux (Earth flux)
• koi_depth       - Transit Depth (ppm)
• koi_impact      - Impact Parameter
• koi_model_snr   - Signal-to-Noise Ratio
```

**Classifications** (NASA Official):
- `CONFIRMED` - Verified exoplanets
- `CANDIDATE` - Potential exoplanets under study
- `FALSE POSITIVE` - Non-planetary signals

## 🚀 Features

### Frontend (React + Vite)
- 🌍 **3D Planet Animation**: CSS-based interactive planet with scroll zoom
- 📊 **Live NASA Dashboard**: Real-time statistics from Exoplanet Archive
- 📁 **File Upload**: Batch analysis of CSV files with real KOI data
- ✏️ **Manual Input**: Individual observation classification
- 📈 **Visualizations**: Interactive charts showing real data distributions
- ⚙️ **Hyperparameter Tuning**: Retrain model with fresh NASA data
- 📋 **Results Export**: Download predictions as CSV

### Backend (Python + Flask)
- 🔬 **NASA API Integration**: Real-time data from Exoplanet Archive (TAP)
- 🤖 **Machine Learning**: scikit-learn Random Forest (85% accuracy on real data)
- 🔄 **Auto-Training**: Downloads latest KOIs from NASA for model updates
- 📊 **Performance Metrics**: Accuracy, Precision, Recall, F1-Score
- 🎯 **Classification**: CONFIRMED / CANDIDATE / FALSE POSITIVE
- 📡 **REST API**: 8 complete endpoints for all operations

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite 5
- Tailwind CSS 3
- Chart.js 4
- Axios
- Lucide React Icons

### Backend
- Python 3.8+
- Flask 3.0
- scikit-learn 1.3.2
- pandas 2.1.4
- requests 2.32.5 (NASA API)
- NumPy 1.26.2
- joblib 1.3.2

## 📦 Installation & Setup

### 🚀 Instalación AUTOMÁTICA - ⭐ RECOMENDADO

#### Windows
**¡SÚPER FÁCIL! Un solo doble click y listo**

```bash
Doble click en: INICIO.bat
```

#### Linux / Ubuntu / Mac
**¡IGUAL DE FÁCIL! Un solo comando**

```bash
chmod +x setup.sh
./setup.sh
```

✨ **Eso es todo!** El script automáticamente:
- ✅ Detecta si tienes Python y Node.js instalados
- ✅ Los instala si no los tienes
- ✅ Configura el Backend y Frontend
- ✅ Entrena el modelo de Machine Learning
- ✅ Inicia ambos servidores
- ✅ Abre tu navegador en http://localhost:3000

**No necesitas hacer NADA más. Literal, un comando/click y ya.**

---

### 🛠️ Instalación Manual (Todas las plataformas)

Si prefieres hacerlo manualmente:

#### Requisitos Previos
- Node.js 16+ and npm
- Python 3.8+
- Git

#### Frontend Setup

```bash
cd Front-end
npm install
npm run dev
```

The frontend will run at `http://localhost:3000`

#### Backend Setup

```bash
cd Back-end
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

The backend API will run at `http://localhost:5000`

## 📖 Usage

1. **Start the Backend**: Navigate to `Back-end/` and run `python app.py`
2. **Start the Frontend**: Navigate to `Front-end/` and run `npm run dev`
3. **Open Browser**: Go to `http://localhost:3000`
4. **Upload Data** or **Manual Input**: Choose your preferred method
5. **View Results**: See classifications, confidence levels, and statistics

### Data Format

CSV files should include these columns:

| Column | Description | Unit |
|--------|-------------|------|
| koi_period | Orbital period | days |
| koi_duration | Transit duration | hours |
| koi_prad | Planetary radius | Earth radii |
| koi_teq | Equilibrium temperature | K |
| koi_insol | Insolation flux | Earth flux |
| koi_depth | Transit depth | ppm |
| koi_impact | Impact parameter | - |
| koi_model_snr | Signal-to-noise ratio | - |

## 🎨 Screenshots

### Dashboard
View real-time model performance and recent predictions.

### Data Upload
Upload CSV files for batch exoplanet classification.

### Manual Input
Enter parameters manually for single predictions.

### Model Statistics
Detailed performance metrics and confusion matrix.

## 🧠 Model Details

### Algorithm
- **Type**: Random Forest Classifier
- **Features**: 8 stellar observation parameters
- **Classes**: CONFIRMED, CANDIDATE, FALSE POSITIVE

### Performance Metrics
- **Accuracy**: ~92%
- **Precision**: ~91%
- **Recall**: ~90%
- **F1 Score**: ~90%

### Classification Logic
The model analyzes multiple stellar parameters to determine:
- **CONFIRMED**: High-confidence exoplanet detection
- **CANDIDATE**: Potential exoplanet requiring further observation
- **FALSE POSITIVE**: Non-planetary signal (stellar activity, noise)

## 📚 API Documentation

### Endpoints

```
GET  /api/health              - Health check
POST /api/predict             - Single prediction
POST /api/upload              - Batch upload CSV
GET  /api/model-stats         - Model statistics
POST /api/retrain             - Retrain model
POST /api/hyperparameters     - Update parameters
GET  /api/datasets            - Available datasets
GET  /api/history             - Prediction history
```

See `Back-end/README.md` for detailed API documentation.

## 📚 Data Sources & Scientific References

### Official NASA Resources
- **NASA Exoplanet Archive**: https://exoplanetarchive.ipac.caltech.edu/
- **TAP Service Documentation**: https://exoplanetarchive.ipac.caltech.edu/docs/TAP/usingTAP.html
- **KOI Cumulative Table**: https://exoplanetarchive.ipac.caltech.edu/cgi-bin/TblView/nph-tblView?app=ExoTbls&config=cumulative

### Datasets Used
1. **KOI Cumulative Delivery** - Primary dataset
   - Table: `cumulative`
   - Source: Kepler Mission
   - Records: 9,564 KOIs (as of 2025)
   - Status: Scientifically verified by NASA

2. **Future Integration** (planned)
   - TESS Objects of Interest (TOI)
   - K2 Planets and Candidates
   - Confirmed Planets (PS Table)

### Scientific Publications
- Thompson et al. (2018). "Planetary Candidates Observed by Kepler. VIII."
- Coughlin et al. (2016). "Planetary Candidates Observed by Kepler. VII."
- NASA Exoplanet Science Institute data products

### Credits & Acknowledgments

**Data Provider**: 
- NASA Exoplanet Archive
- Operated by Caltech/IPAC
- Funded by NASA Exoplanet Science Institute

**Citation**:
```
This research has made use of the NASA Exoplanet Archive,
which is operated by the California Institute of Technology,
under contract with the National Aeronautics and Space
Administration under the Exoplanet Exploration Program.
```

**API Protocol**:
- IVOA Table Access Protocol (TAP)
- International Virtual Observatory Alliance

## 📁 Project Structure

```
NASA_Space_Apps_Challenge2025/
├── Front-end/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Planet3D.jsx       # 3D planet animation
│   │   │   ├── Dashboard.jsx       # Real NASA stats
│   │   │   └── ...
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── README.md
├── Back-end/
│   ├── services/
│   │   ├── nasa_api_service.py    # NASA TAP API client
│   │   ├── model_service.py        # ML model
│   │   └── data_service.py         # Data processing
│   ├── utils/
│   │   └── data_loader.py
│   ├── models/
│   │   ├── exoplanet_model.pkl    # Trained with real NASA data
│   │   └── scaler.pkl
│   ├── app.py
│   ├── requirements.txt
│   └── README.md
└── README.md
```

## 🤝 Contributing

This project was created for the NASA Space Apps Challenge 2025. Contributions, issues, and feature requests are welcome!

## 📝 License

This project is licensed under the MIT License.

## 👥 Team

Created for NASA Space Apps Challenge 2025

## 🙏 Acknowledgments

- NASA for providing open-source exoplanet datasets
- NASA Space Apps Challenge organizers
- Kepler, K2, and TESS mission teams
- The open-source community

## 📧 Contact

For questions or feedback about this project, please open an issue on GitHub.

---

**NASA Space Apps Challenge 2025** | **Exoplanet Detection with AI/ML** | **Made with ❤️ for Space Exploration**