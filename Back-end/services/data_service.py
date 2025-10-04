import pandas as pd
import io
import logging

logger = logging.getLogger(__name__)

class DataService:
    def __init__(self):
        self.prediction_history = []
        self.datasets = {
            'kepler': {
                'name': 'Kepler Objects of Interest (KOI)',
                'url': 'https://exoplanetarchive.ipac.caltech.edu/cgi-bin/TblView/nph-tblView?app=ExoTbls&config=cumulative',
                'description': 'Comprehensive list of all confirmed exoplanets, planetary candidates, and false positives from Kepler mission'
            },
            'tess': {
                'name': 'TESS Objects of Interest (TOI)',
                'url': 'https://exoplanetarchive.ipac.caltech.edu/cgi-bin/TblView/nph-tblView?app=ExoTbls&config=TOI',
                'description': 'Objects identified by the TESS mission'
            },
            'k2': {
                'name': 'K2 Planets and Candidates',
                'url': 'https://exoplanetarchive.ipac.caltech.edu/cgi-bin/TblView/nph-tblView?app=ExoTbls&config=k2candidates',
                'description': 'Exoplanet data from the K2 mission'
            }
        }
    
    def process_csv(self, file):
        """Process uploaded CSV file"""
        try:
            # Read CSV file
            content = file.read()
            df = pd.read_csv(io.BytesIO(content))
            
            logger.info(f"CSV file processed: {len(df)} rows, {len(df.columns)} columns")
            
            # Validate required columns (at least some features should be present)
            feature_columns = [
                'koi_period', 'koi_duration', 'koi_prad', 'koi_teq',
                'koi_insol', 'koi_depth', 'koi_impact', 'koi_model_snr'
            ]
            
            available_features = [col for col in feature_columns if col in df.columns]
            
            if len(available_features) == 0:
                raise ValueError(f"CSV must contain at least one of these columns: {', '.join(feature_columns)}")
            
            logger.info(f"Available features: {available_features}")
            
            return df
            
        except Exception as e:
            logger.error(f"CSV processing error: {str(e)}")
            raise
    
    def add_to_history(self, prediction):
        """Add prediction to history"""
        self.prediction_history.append(prediction)
        
        # Keep only last 1000 predictions
        if len(self.prediction_history) > 1000:
            self.prediction_history = self.prediction_history[-1000:]
    
    def get_prediction_history(self, limit=100):
        """Get prediction history"""
        return {
            'predictions': self.prediction_history[-limit:],
            'total': len(self.prediction_history)
        }
    
    def get_available_datasets(self):
        """Get available NASA datasets"""
        return {
            'datasets': self.datasets
        }
    
    def clear_history(self):
        """Clear prediction history"""
        self.prediction_history = []
        logger.info("Prediction history cleared")
