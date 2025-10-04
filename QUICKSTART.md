# 🚀 Quick Start Guide - Exoplanet Hunter

## Get Started in 5 Minutes!

### Option 1: Automated Setup (Recommended)

**Windows:**
```bash
setup.bat
```

**Linux/Mac:**
```bash
chmod +x setup.sh
./setup.sh
```

### Option 2: Manual Setup

#### Step 1: Backend Setup
```bash
cd Back-end
python -m venv venv
venv\Scripts\activate          # Windows
source venv/bin/activate       # Linux/Mac
pip install -r requirements.txt
```

#### Step 2: Frontend Setup
```bash
cd Front-end
npm install
```

#### Step 3: Run the Application

**Terminal 1 - Start Backend:**
```bash
cd Back-end
venv\Scripts\activate          # Windows
source venv/bin/activate       # Linux/Mac
python app.py
```

**Terminal 2 - Start Frontend:**
```bash
cd Front-end
npm run dev
```

#### Step 4: Open Browser
```
http://localhost:3000
```

---

## 🎯 First Steps

### 1. Try Manual Input
- Click "Manual Input" tab
- Click "Load Example Data"
- Click "Predict Classification"
- See the results!

### 2. Upload Sample Data
- Click "Upload Data" tab
- Upload the `sample_data.csv` file from the project root
- Click "Upload and Analyze"
- View batch predictions!

### 3. Explore Model Stats
- Click "Model Stats" tab
- See accuracy, precision, recall, F1-score
- View confusion matrix
- Check feature importance

### 4. Tune Hyperparameters
- Click "Tuning" tab
- Adjust model parameters
- Retrain the model
- Compare performance

---

## 📊 Understanding Results

### Classification Types

**🟢 CONFIRMED**
- High confidence exoplanet detection
- Passes all validation criteria
- Ready for scientific publication

**🟡 CANDIDATE**
- Potential exoplanet
- Requires further observation
- Needs follow-up analysis

**🔴 FALSE POSITIVE**
- Not an exoplanet
- Stellar activity or instrumental noise
- Rejected from catalog

### Confidence Levels

- **> 80%**: High confidence - Very reliable
- **60-80%**: Moderate confidence - Likely accurate
- **< 60%**: Low confidence - Needs more data

---

## 🔧 Troubleshooting

### Backend won't start
```bash
# Check Python version
python --version  # Should be 3.8+

# Reinstall dependencies
pip install --upgrade -r requirements.txt
```

### Frontend won't start
```bash
# Check Node version
node --version  # Should be 16+

# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Model training fails
```bash
# Create models directory manually
mkdir Back-end/models

# Run Python script to train model
cd Back-end
python -c "from services.model_service import ModelService; m = ModelService(); m.train_model()"
```

### CORS errors
- Make sure backend is running on port 5000
- Make sure frontend is running on port 3000
- Check `.env` files are configured correctly

---

## 📖 API Testing

### Test Backend Health
```bash
curl http://localhost:5000/api/health
```

### Test Single Prediction
```bash
curl -X POST http://localhost:5000/api/predict \
  -H "Content-Type: application/json" \
  -d '{
    "koi_period": 9.4877,
    "koi_duration": 2.732,
    "koi_prad": 1.94,
    "koi_teq": 1134,
    "koi_insol": 141.7,
    "koi_depth": 615.8,
    "koi_impact": 0.146,
    "koi_model_snr": 131.9
  }'
```

### Get Model Statistics
```bash
curl http://localhost:5000/api/model-stats
```

---

## 🎓 Example Workflow

1. **Upload Your Data**
   - Prepare CSV with exoplanet observations
   - Upload through the UI
   - Get instant predictions

2. **Analyze Results**
   - Review classifications
   - Check confidence levels
   - Export to CSV

3. **Tune the Model**
   - Adjust hyperparameters
   - Retrain with your data
   - Compare performance

4. **Share Discoveries**
   - Export predictions
   - Share with team
   - Contribute to science!

---

## 📚 Learn More

- **Full Documentation**: See `DOCUMENTATION.md`
- **Backend API**: See `Back-end/README.md`
- **Frontend Guide**: See `Front-end/README.md`
- **NASA Data**: https://exoplanetarchive.ipac.caltech.edu/

---

## 🆘 Need Help?

1. Check the troubleshooting section above
2. Review the full documentation
3. Open an issue on GitHub
4. Contact the team

---

## 🌟 Next Steps

- Explore different datasets
- Try tuning hyperparameters
- Compare model performance
- Share your findings!

**Happy Exoplanet Hunting! 🔭✨**
