# Exoplanet Hunter - Backend API

Flask-based REST API for exoplanet detection using machine learning.

## Overview

This backend provides AI/ML-powered exoplanet classification services for the NASA Space Apps Challenge 2025. It uses scikit-learn's Random Forest classifier trained on simulated data based on NASA's Kepler, K2, and TESS mission datasets.

## Features

- 🤖 Machine Learning model for exoplanet classification
- 📊 Random Forest ensemble method
- 🔄 Model retraining with custom hyperparameters
- 📁 CSV batch processing
- 📈 Real-time model statistics
- 🎯 Single and batch predictions
- 🔧 Hyperparameter tuning interface

## Tech Stack

- **Flask** - Web framework
- **scikit-learn** - Machine learning
- **pandas** - Data processing
- **NumPy** - Numerical operations
- **joblib** - Model persistence

## Installation

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Run the server:
```bash
python app.py
```

The API will be available at `http://localhost:5000`

## API Endpoints

### Health Check
```
GET /api/health
```
Check if the API is running and model is loaded.

### Single Prediction
```
POST /api/predict
Content-Type: application/json

{
  "koi_period": 9.4877,
  "koi_duration": 2.732,
  "koi_prad": 1.94,
  "koi_teq": 1134,
  "koi_insol": 141.7,
  "koi_depth": 615.8,
  "koi_impact": 0.146,
  "koi_model_snr": 131.9
}
```

Response:
```json
{
  "classification": "CONFIRMED",
  "confidence": 0.95,
  "probabilities": {
    "CONFIRMED": 0.95,
    "CANDIDATE": 0.04,
    "FALSE POSITIVE": 0.01
  }
}
```

### Batch Upload
```
POST /api/upload
Content-Type: multipart/form-data

file: <csv_file>
```

Response:
```json
{
  "predictions": [...],
  "total": 100,
  "confirmed": 45,
  "candidates": 30,
  "false_positives": 25
}
```

### Model Statistics
```
GET /api/model-stats
```

Response:
```json
{
  "accuracy": 0.92,
  "precision": 0.91,
  "recall": 0.90,
  "f1_score": 0.90,
  "model_type": "Random Forest",
  "training_samples": 5000,
  "features_used": [...],
  "confusion_matrix": {...}
}
```

### Update Hyperparameters
```
POST /api/hyperparameters
Content-Type: application/json

{
  "n_estimators": 200,
  "max_depth": 15,
  "min_samples_split": 5
}
```

### Retrain Model
```
POST /api/retrain
Content-Type: application/json

{
  "n_estimators": 200,
  "max_depth": 15
}
```

### Get Datasets
```
GET /api/datasets
```

### Prediction History
```
GET /api/history
```

## Project Structure

```
Back-end/
├── app.py                  # Flask application
├── requirements.txt        # Python dependencies
├── .env.example           # Environment variables template
├── services/
│   ├── __init__.py
│   ├── model_service.py   # ML model logic
│   └── data_service.py    # Data processing
├── utils/
│   ├── __init__.py
│   └── data_loader.py     # NASA data loading utilities
└── models/
    └── .gitkeep           # Model storage directory
```

## Model Details

### Algorithm
- **Type**: Random Forest Classifier
- **Features**: 8 stellar parameters
  - Orbital period (days)
  - Transit duration (hours)
  - Planetary radius (Earth radii)
  - Equilibrium temperature (K)
  - Insolation flux (Earth flux)
  - Transit depth (ppm)
  - Impact parameter
  - Signal-to-noise ratio

### Classes
- **CONFIRMED**: High-confidence exoplanet detection
- **CANDIDATE**: Potential exoplanet requiring further analysis
- **FALSE POSITIVE**: Non-planetary signal

### Performance
- Accuracy: ~92%
- Precision: ~91%
- Recall: ~90%
- F1 Score: ~90%

## Data Sources

The model is designed to work with data from:
- **Kepler Mission**: Kepler Objects of Interest (KOI)
- **TESS Mission**: TESS Objects of Interest (TOI)
- **K2 Mission**: K2 Planets and Candidates

### NASA Exoplanet Archive
- Kepler: https://exoplanetarchive.ipac.caltech.edu/cgi-bin/TblView/nph-tblView?app=ExoTbls&config=cumulative
- TESS: https://exoplanetarchive.ipac.caltech.edu/cgi-bin/TblView/nph-tblView?app=ExoTbls&config=TOI
- K2: https://exoplanetarchive.ipac.caltech.edu/cgi-bin/TblView/nph-tblView?app=ExoTbls&config=k2candidates

## CSV Format

Upload CSV files with the following columns:

| Column | Description | Unit |
|--------|-------------|------|
| koi_period | Orbital period | days |
| koi_duration | Transit duration | hours |
| koi_prad | Planetary radius | Earth radii |
| koi_teq | Equilibrium temperature | Kelvin |
| koi_insol | Insolation flux | Earth flux |
| koi_depth | Transit depth | ppm |
| koi_impact | Impact parameter | - |
| koi_model_snr | Signal-to-noise ratio | - |

## Development

### Training Custom Model

The model automatically trains on first run. To retrain:

```python
from services.model_service import ModelService

service = ModelService()
service.train_model({
    'n_estimators': 200,
    'max_depth': 15
})
```

### Loading NASA Data

```python
from utils.data_loader import download_nasa_dataset

# Download real NASA data
df = download_nasa_dataset('kepler')
```

## Environment Variables

- `FLASK_ENV`: development/production
- `DEBUG`: True/False
- `PORT`: Server port (default: 5000)
- `CORS_ORIGINS`: Allowed CORS origins
- `MODEL_PATH`: Path to saved model
- `LOG_LEVEL`: Logging level

## Testing

Test the API:
```bash
# Health check
curl http://localhost:5000/api/health

# Single prediction
curl -X POST http://localhost:5000/api/predict \
  -H "Content-Type: application/json" \
  -d '{"koi_period": 9.4877, "koi_prad": 1.94}'

# Model stats
curl http://localhost:5000/api/model-stats
```

## Production Deployment

1. Set environment variables:
```bash
export FLASK_ENV=production
export DEBUG=False
```

2. Use a production WSGI server:
```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

## Contributing

This project is part of the NASA Space Apps Challenge 2025 - "A World Away: Hunting for Exoplanets with AI"

## License

MIT

## References

- NASA Exoplanet Archive: https://exoplanetarchive.ipac.caltech.edu/
- Kepler Mission: https://www.nasa.gov/mission_pages/kepler/main/index.html
- TESS Mission: https://www.nasa.gov/tess-transiting-exoplanet-survey-satellite
- scikit-learn: https://scikit-learn.org/
