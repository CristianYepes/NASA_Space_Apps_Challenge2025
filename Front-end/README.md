# Exoplanet Hunter - Frontend

React-based web interface for the NASA Space Apps Challenge 2025 - Exoplanet Detection with AI/ML.

## Features

- 🚀 Interactive dashboard with real-time model statistics
- 📊 Data visualization using Chart.js
- 📁 CSV file upload for batch predictions
- ✏️ Manual data input for individual predictions
- 📈 Model performance metrics and confusion matrix
- ⚙️ Hyperparameter tuning interface
- 📋 Results tracking and export
- 🎨 Modern UI with Tailwind CSS

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Chart.js** - Data visualization
- **Axios** - HTTP client
- **Lucide React** - Icons

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file (optional):
```bash
VITE_API_URL=http://localhost:5000/api
```

3. Start development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
Front-end/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Dashboard.jsx
│   │   ├── DataUpload.jsx
│   │   ├── ManualInput.jsx
│   │   ├── ModelStats.jsx
│   │   ├── HyperparameterTuning.jsx
│   │   ├── ResultsDisplay.jsx
│   │   └── Chart.jsx
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## API Integration

The frontend connects to the backend API at `http://localhost:5000/api` by default. All API calls are handled through the `exoplanetService` in `src/services/api.js`.

### Available API Endpoints

- `POST /api/predict` - Single prediction
- `POST /api/upload` - Batch prediction from CSV
- `GET /api/model-stats` - Model statistics
- `POST /api/retrain` - Retrain model
- `POST /api/hyperparameters` - Update hyperparameters
- `GET /api/datasets` - Available datasets
- `GET /api/history` - Prediction history

## Usage

1. **Dashboard**: View overall model performance and recent predictions
2. **Upload Data**: Upload CSV files with exoplanet data for batch analysis
3. **Manual Input**: Enter individual observation parameters
4. **Model Stats**: View detailed model statistics and confusion matrix
5. **Tuning**: Adjust hyperparameters and retrain the model
6. **Results**: View and export all predictions

## Data Format

CSV files should include columns such as:
- `koi_period` - Orbital period (days)
- `koi_duration` - Transit duration (hours)
- `koi_prad` - Planetary radius (Earth radii)
- `koi_teq` - Equilibrium temperature (K)
- `koi_insol` - Insolation flux (Earth flux)
- `koi_depth` - Transit depth (ppm)
- `koi_impact` - Impact parameter
- `koi_model_snr` - Signal-to-noise ratio

## Contributing

This project is part of the NASA Space Apps Challenge 2025.

## License

MIT
