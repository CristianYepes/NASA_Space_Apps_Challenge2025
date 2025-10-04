from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
import logging

from services.model_service import ModelService
from services.data_service import DataService

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize services
model_service = ModelService()
data_service = DataService()

# Load or train initial model
try:
    model_service.load_model()
    logger.info("Model loaded successfully")
except Exception as e:
    logger.warning(f"Could not load model: {e}. Training new model...")
    model_service.train_model()

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'model_loaded': model_service.model is not None
    })

@app.route('/api/predict', methods=['POST'])
def predict_single():
    """Predict classification for a single observation"""
    try:
        data = request.json
        
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        # Make prediction
        result = model_service.predict_single(data)
        
        return jsonify(result), 200
        
    except Exception as e:
        logger.error(f"Prediction error: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/upload', methods=['POST'])
def upload_file():
    """Upload CSV file and get batch predictions"""
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400
        
        file = request.files['file']
        
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        if not file.filename.endswith('.csv'):
            return jsonify({'error': 'Only CSV files are supported'}), 400
        
        # Process file
        df = data_service.process_csv(file)
        
        # Make predictions
        results = model_service.predict_batch(df)
        
        return jsonify(results), 200
        
    except Exception as e:
        logger.error(f"Upload error: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/model-stats', methods=['GET'])
def get_model_stats():
    """Get model statistics and performance metrics"""
    try:
        stats = model_service.get_stats()
        return jsonify(stats), 200
        
    except Exception as e:
        logger.error(f"Stats error: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/retrain', methods=['POST'])
def retrain_model():
    """Retrain the model with new hyperparameters"""
    try:
        config = request.json or {}
        
        # Retrain model
        model_service.train_model(config)
        
        return jsonify({
            'status': 'success',
            'message': 'Model retrained successfully'
        }), 200
        
    except Exception as e:
        logger.error(f"Retrain error: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/hyperparameters', methods=['POST'])
def update_hyperparameters():
    """Update model hyperparameters"""
    try:
        params = request.json
        
        if not params:
            return jsonify({'error': 'No parameters provided'}), 400
        
        # Update hyperparameters
        model_service.update_hyperparameters(params)
        
        return jsonify({
            'status': 'success',
            'message': 'Hyperparameters updated successfully'
        }), 200
        
    except Exception as e:
        logger.error(f"Hyperparameter error: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/datasets', methods=['GET'])
def get_datasets():
    """Get available datasets"""
    try:
        datasets = data_service.get_available_datasets()
        return jsonify(datasets), 200
        
    except Exception as e:
        logger.error(f"Dataset error: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/history', methods=['GET'])
def get_history():
    """Get prediction history"""
    try:
        history = data_service.get_prediction_history()
        return jsonify(history), 200
        
    except Exception as e:
        logger.error(f"History error: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    debug = os.getenv('DEBUG', 'True').lower() == 'true'
    
    app.run(
        host='0.0.0.0',
        port=port,
        debug=debug
    )
