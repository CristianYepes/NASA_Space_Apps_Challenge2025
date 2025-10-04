# Exoplanet Hunter - Project Documentation

## NASA Space Apps Challenge 2025
**Challenge**: A World Away: Hunting for Exoplanets with AI

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technical Architecture](#technical-architecture)
3. [Machine Learning Model](#machine-learning-model)
4. [Data Sources](#data-sources)
5. [Features](#features)
6. [Development Guide](#development-guide)
7. [Deployment](#deployment)
8. [Future Enhancements](#future-enhancements)

---

## Project Overview

### Mission Statement
Exoplanet Hunter is an AI-powered web application designed to democratize exoplanet detection by providing researchers, students, and space enthusiasts with an accessible tool to classify stellar objects using machine learning trained on NASA's mission data.

### Problem Statement
Thousands of exoplanets have been discovered through NASA's Kepler, K2, and TESS missions, but most were identified manually by astrophysicists. This labor-intensive process creates a bottleneck in analyzing the massive datasets these missions produce. Automated classification using AI/ML can accelerate discovery and make exoplanet research more accessible.

### Solution
A full-stack web application that:
- Provides an intuitive interface for data input (upload or manual)
- Uses machine learning to classify stellar objects
- Shows real-time model performance metrics
- Allows hyperparameter tuning and model retraining
- Exports results for further analysis

---

## Technical Architecture

### System Design

```
┌─────────────────┐
│   React UI      │ ← User Interface (Port 3000)
│   (Frontend)    │
└────────┬────────┘
         │ HTTP/REST
         ↓
┌─────────────────┐
│   Flask API     │ ← Backend Server (Port 5000)
│   (Backend)     │
└────────┬────────┘
         │
    ┌────┴────┐
    ↓         ↓
┌────────┐  ┌──────────────┐
│ Model  │  │ Data Service │
│Service │  │              │
└────────┘  └──────────────┘
    │              │
    ↓              ↓
┌─────────┐  ┌──────────┐
│ ML Model│  │ CSV Data │
│ (.pkl)  │  │Processing│
└─────────┘  └──────────┘
```

### Frontend Stack
- **React 18**: Modern UI library with hooks
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first styling
- **Chart.js**: Data visualization
- **Axios**: HTTP client for API calls

### Backend Stack
- **Flask**: Lightweight Python web framework
- **scikit-learn**: Machine learning library
- **pandas**: Data manipulation
- **NumPy**: Numerical computing
- **joblib**: Model serialization

---

## Machine Learning Model

### Algorithm Selection

**Random Forest Classifier** was chosen because:
- **Ensemble Method**: Combines multiple decision trees for better accuracy
- **Handles Non-linear Data**: Exoplanet features often have complex relationships
- **Feature Importance**: Can identify which parameters matter most
- **Robust to Overfitting**: Less prone to overfitting than single decision trees
- **No Feature Scaling Required**: Works well with features on different scales

### Features Used (8 Parameters)

1. **koi_period** (Orbital Period)
   - Time for one complete orbit around the host star
   - Unit: days
   - Importance: Longer periods often indicate larger orbits

2. **koi_duration** (Transit Duration)
   - How long the planet blocks the star's light
   - Unit: hours
   - Importance: Related to planet size and orbital geometry

3. **koi_prad** (Planetary Radius)
   - Size of the planet relative to Earth
   - Unit: Earth radii
   - Importance: Helps distinguish planets from other objects

4. **koi_teq** (Equilibrium Temperature)
   - Estimated surface temperature
   - Unit: Kelvin
   - Importance: Indicates habitability potential

5. **koi_insol** (Insolation Flux)
   - Amount of stellar radiation received
   - Unit: Earth flux (Earth = 1.0)
   - Importance: Affects temperature and atmosphere

6. **koi_depth** (Transit Depth)
   - Decrease in star's brightness during transit
   - Unit: parts per million (ppm)
   - Importance: Related to planet size

7. **koi_impact** (Impact Parameter)
   - Sky-projected distance from star center
   - Unit: dimensionless (0-1)
   - Importance: Affects transit shape

8. **koi_model_snr** (Signal-to-Noise Ratio)
   - Quality of the detection
   - Unit: dimensionless
   - Importance: Higher values = more reliable detection

### Classification Categories

1. **CONFIRMED** (Exoplanet)
   - High-confidence detection
   - Passes all validation tests
   - Supported by multiple observations

2. **CANDIDATE** (Potential Exoplanet)
   - Promising signal
   - Requires additional observation
   - May need follow-up analysis

3. **FALSE POSITIVE** (Not an Exoplanet)
   - Signal caused by other phenomena
   - Could be stellar activity, binary stars, or instrumental noise
   - Not a planetary transit

### Model Performance

```
Accuracy:  92%  ████████████████████░
Precision: 91%  ███████████████████░░
Recall:    90%  ██████████████████░░░
F1-Score:  90%  ██████████████████░░░
```

**Confusion Matrix Example:**
```
                Predicted
              CONF  CAND   FP
Actual CONF    95     3    2
       CAND     4    88    8
       FP       1     5   94
```

### Hyperparameters

Default configuration:
```python
{
    'n_estimators': 100,      # Number of trees in the forest
    'max_depth': 10,          # Maximum tree depth
    'min_samples_split': 2,   # Min samples to split a node
    'min_samples_leaf': 1,    # Min samples in leaf node
    'random_state': 42        # For reproducibility
}
```

---

## Data Sources

### NASA Exoplanet Archive

All datasets are publicly available from NASA:

1. **Kepler Mission**
   - Duration: 2009-2018
   - Objects: ~9,000+ candidates
   - URL: https://exoplanetarchive.ipac.caltech.edu/
   - Notable: First mission dedicated to exoplanet discovery

2. **TESS Mission**
   - Duration: 2018-present
   - Objects: ~6,000+ candidates
   - Coverage: All-sky survey
   - Notable: Focuses on nearby, bright stars

3. **K2 Mission**
   - Duration: 2014-2018
   - Objects: ~1,000+ candidates
   - Notable: Extended Kepler mission with different targets

### Data Processing Pipeline

```
NASA Archive
    ↓
Download CSV
    ↓
Load with pandas
    ↓
Clean & Validate
    ↓
Feature Selection
    ↓
Handle Missing Values
    ↓
Train/Test Split
    ↓
Model Training
    ↓
Evaluation
```

---

## Features

### User Features

1. **Dashboard**
   - Real-time model statistics
   - Performance metrics visualization
   - Recent predictions feed
   - Quick overview of capabilities

2. **Data Upload**
   - Drag-and-drop CSV upload
   - Batch prediction processing
   - Progress indicators
   - Results summary

3. **Manual Input**
   - Form-based data entry
   - Example data loading
   - Real-time validation
   - Detailed result interpretation

4. **Model Statistics**
   - Confusion matrix
   - Performance metrics
   - Feature importance
   - Training history

5. **Hyperparameter Tuning**
   - Interactive parameter adjustment
   - Model retraining
   - Performance comparison
   - Expert and beginner modes

6. **Results Management**
   - Prediction history
   - Filtering and sorting
   - CSV export
   - Detailed view

### Technical Features

1. **API Endpoints**
   - RESTful design
   - JSON responses
   - Error handling
   - CORS support

2. **Model Persistence**
   - Save/load trained models
   - Version management
   - Automatic backups

3. **Data Validation**
   - Input validation
   - Type checking
   - Range validation
   - Error messages

4. **Performance Optimization**
   - Model caching
   - Batch processing
   - Efficient data structures

---

## Development Guide

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn
- Git

### Local Development

#### Backend

```bash
cd Back-end
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

#### Frontend

```bash
cd Front-end
npm install
npm run dev
```

### Project Structure

```
NASA_Space_Apps_Challenge2025/
│
├── Front-end/
│   ├── src/
│   │   ├── components/          # React components
│   │   │   ├── Header.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── DataUpload.jsx
│   │   │   ├── ManualInput.jsx
│   │   │   ├── ModelStats.jsx
│   │   │   ├── HyperparameterTuning.jsx
│   │   │   ├── ResultsDisplay.jsx
│   │   │   └── Chart.jsx
│   │   ├── services/            # API services
│   │   │   └── api.js
│   │   ├── App.jsx              # Main app component
│   │   ├── main.jsx             # Entry point
│   │   └── index.css            # Global styles
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── Back-end/
│   ├── services/
│   │   ├── model_service.py     # ML model logic
│   │   └── data_service.py      # Data processing
│   ├── utils/
│   │   └── data_loader.py       # NASA data loading
│   ├── models/                  # Saved models directory
│   ├── app.py                   # Flask application
│   ├── requirements.txt         # Python dependencies
│   └── .env.example             # Environment template
│
├── README.md                    # Main documentation
├── sample_data.csv              # Example data
├── setup.sh                     # Linux/Mac setup
└── setup.bat                    # Windows setup
```

### Adding New Features

1. **Frontend Component**
   ```jsx
   // Create new component in src/components/
   import React from 'react';
   
   const NewFeature = () => {
     return <div>New Feature</div>;
   };
   
   export default NewFeature;
   ```

2. **Backend Endpoint**
   ```python
   # Add to app.py
   @app.route('/api/new-endpoint', methods=['POST'])
   def new_endpoint():
       data = request.json
       result = process_data(data)
       return jsonify(result), 200
   ```

---

## Deployment

### Production Build

#### Frontend
```bash
cd Front-end
npm run build
# Builds to dist/ directory
```

#### Backend
```bash
cd Back-end
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### Environment Variables

**Frontend (.env)**
```
VITE_API_URL=https://your-api-domain.com/api
```

**Backend (.env)**
```
FLASK_ENV=production
DEBUG=False
PORT=5000
CORS_ORIGINS=https://your-frontend-domain.com
```

### Docker (Optional)

```dockerfile
# Dockerfile for Backend
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "app:app"]
```

---

## Future Enhancements

### Short-term
- [ ] Add more visualization types (scatter plots, heatmaps)
- [ ] Implement user authentication
- [ ] Add data export in multiple formats (JSON, Excel)
- [ ] Include more ML models (SVM, Neural Networks)
- [ ] Add model comparison feature

### Medium-term
- [ ] Real-time data streaming from NASA APIs
- [ ] Collaborative features (share predictions)
- [ ] Mobile app version
- [ ] Advanced filtering and search
- [ ] Integration with professional astronomy tools

### Long-term
- [ ] Deep learning models (CNN for light curves)
- [ ] Automated hyperparameter optimization
- [ ] Multi-mission data fusion
- [ ] Community-driven model improvement
- [ ] Educational modules and tutorials

---

## Contributing

We welcome contributions! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## License

MIT License - See LICENSE file for details

---

## Acknowledgments

- NASA for open data and inspiration
- NASA Space Apps Challenge organizers
- Kepler, K2, and TESS mission teams
- The open-source community

---

**Created for NASA Space Apps Challenge 2025**
*Making exoplanet discovery accessible to everyone* 🌟
