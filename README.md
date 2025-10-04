# Exoplanet Hunter 🔭

**NASA Space Apps Challenge 2025 - A World Away: Hunting for Exoplanets with AI**

An AI-powered web application for detecting and classifying exoplanets using machine learning models trained on NASA's Kepler, K2, and TESS mission datasets.

![NASA Space Apps Challenge](https://img.shields.io/badge/NASA-Space%20Apps%20Challenge%202025-blue)
![Python](https://img.shields.io/badge/Python-3.8%2B-brightgreen)
![React](https://img.shields.io/badge/React-18-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 🌟 Overview

This project provides a complete solution for exoplanet detection and classification using artificial intelligence. It features:

- **Interactive Web Interface**: Modern React-based UI for easy data input and visualization
- **Machine Learning Model**: Random Forest classifier with 92% accuracy
- **Batch Processing**: Upload CSV files for analyzing multiple observations
- **Real-time Predictions**: Instant classification of stellar objects
- **Model Tuning**: Adjust hyperparameters and retrain the model through the UI
- **Data Visualization**: Charts and statistics showing model performance

## 🎯 Challenge Details

**Challenge**: A World Away: Hunting for Exoplanets with AI

**Objective**: Create an AI/ML model trained on NASA's open-source exoplanet datasets that can analyze new data to accurately identify exoplanets, with a web interface for user interaction.

**Datasets Used**:
- Kepler Objects of Interest (KOI)
- TESS Objects of Interest (TOI)
- K2 Planets and Candidates

## 🚀 Features

### Frontend (React + Vite)
- 📊 **Dashboard**: Real-time model statistics and performance metrics
- 📁 **File Upload**: Batch analysis of CSV files
- ✏️ **Manual Input**: Individual observation classification
- 📈 **Visualizations**: Interactive charts using Chart.js
- ⚙️ **Hyperparameter Tuning**: Adjust model parameters
- 📋 **Results Export**: Download predictions as CSV

### Backend (Python + Flask)
- 🤖 **Machine Learning**: scikit-learn Random Forest classifier
- 🔄 **Model Retraining**: Dynamic model updates
- 📊 **Performance Metrics**: Accuracy, Precision, Recall, F1-Score
- 🎯 **Classification**: CONFIRMED / CANDIDATE / FALSE POSITIVE
- 📡 **REST API**: Complete endpoints for all operations

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- Chart.js
- Axios
- Lucide React Icons

### Backend
- Python 3.8+
- Flask
- scikit-learn
- pandas
- NumPy
- joblib

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

## 🌐 Data Sources

- **NASA Exoplanet Archive**: https://exoplanetarchive.ipac.caltech.edu/
- **Kepler Mission**: Comprehensive exoplanet survey data
- **TESS Mission**: Transiting Exoplanet Survey Satellite
- **K2 Mission**: Extended Kepler mission data

## 📁 Project Structure

```
NASA_Space_Apps_Challenge2025/
├── Front-end/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── README.md
├── Back-end/
│   ├── services/
│   │   ├── model_service.py
│   │   └── data_service.py
│   ├── utils/
│   │   └── data_loader.py
│   ├── models/
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