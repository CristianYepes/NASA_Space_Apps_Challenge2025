"""
Data loader for NASA exoplanet datasets
"""
import pandas as pd
import requests
import logging

logger = logging.getLogger(__name__)

def load_kepler_data():
    """
    Load Kepler Objects of Interest dataset
    In production, this would download from NASA Exoplanet Archive
    For now, returns sample structure
    """
    logger.info("Loading Kepler dataset...")
    
    # Sample data structure - in production, download from:
    # https://exoplanetarchive.ipac.caltech.edu/cgi-bin/TblView/nph-tblView?app=ExoTbls&config=cumulative
    
    sample_data = {
        'kepid': [10797460, 10811496, 10848459],
        'koi_period': [9.4877, 54.3197, 19.8775],
        'koi_duration': [2.732, 4.754, 3.456],
        'koi_prad': [1.94, 2.71, 1.45],
        'koi_teq': [1134, 672, 891],
        'koi_insol': [141.7, 12.3, 45.6],
        'koi_depth': [615.8, 1234.5, 345.2],
        'koi_impact': [0.146, 0.321, 0.567],
        'koi_model_snr': [131.9, 78.4, 45.2],
        'koi_disposition': ['CONFIRMED', 'CANDIDATE', 'FALSE POSITIVE']
    }
    
    return pd.DataFrame(sample_data)

def load_tess_data():
    """
    Load TESS Objects of Interest dataset
    """
    logger.info("Loading TESS dataset...")
    
    # Sample data structure
    sample_data = {
        'tic_id': [231663901, 178155732, 307210830],
        'koi_period': [12.3456, 3.4567, 45.6789],
        'koi_duration': [3.123, 1.456, 5.678],
        'koi_prad': [2.1, 1.3, 3.4],
        'koi_teq': [956, 1245, 678],
        'koi_insol': [67.8, 234.5, 23.4],
        'koi_depth': [456.7, 789.1, 234.5],
        'koi_impact': [0.234, 0.456, 0.678],
        'koi_model_snr': [89.3, 123.4, 56.7],
        'tfopwg_disp': ['PC', 'CP', 'FP']
    }
    
    return pd.DataFrame(sample_data)

def download_nasa_dataset(dataset_type='kepler'):
    """
    Download dataset from NASA Exoplanet Archive
    
    Args:
        dataset_type: 'kepler', 'tess', or 'k2'
    
    Returns:
        pandas DataFrame
    """
    urls = {
        'kepler': 'https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+*+from+cumulative&format=csv',
        'tess': 'https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+*+from+toi&format=csv',
        'k2': 'https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+*+from+k2candidates&format=csv'
    }
    
    try:
        url = urls.get(dataset_type)
        if not url:
            raise ValueError(f"Unknown dataset type: {dataset_type}")
        
        logger.info(f"Downloading {dataset_type} dataset from NASA...")
        
        # Note: This requires internet connection and proper API access
        response = requests.get(url, timeout=30)
        response.raise_for_status()
        
        df = pd.read_csv(pd.io.common.StringIO(response.text))
        logger.info(f"Downloaded {len(df)} records from {dataset_type} dataset")
        
        return df
        
    except Exception as e:
        logger.error(f"Error downloading dataset: {str(e)}")
        logger.warning("Falling back to sample data")
        
        # Fallback to sample data
        if dataset_type == 'kepler':
            return load_kepler_data()
        elif dataset_type == 'tess':
            return load_tess_data()
        else:
            return pd.DataFrame()

def preprocess_data(df, dataset_type='kepler'):
    """
    Preprocess dataset for model training
    
    Args:
        df: pandas DataFrame
        dataset_type: 'kepler', 'tess', or 'k2'
    
    Returns:
        X (features), y (labels)
    """
    feature_columns = [
        'koi_period', 'koi_duration', 'koi_prad', 'koi_teq',
        'koi_insol', 'koi_depth', 'koi_impact', 'koi_model_snr'
    ]
    
    # Map different label columns
    label_columns = {
        'kepler': 'koi_disposition',
        'tess': 'tfopwg_disp',
        'k2': 'k2c_disp'
    }
    
    label_col = label_columns.get(dataset_type, 'koi_disposition')
    
    # Filter for available features
    available_features = [col for col in feature_columns if col in df.columns]
    
    if not available_features:
        raise ValueError("No feature columns found in dataset")
    
    # Extract features
    X = df[available_features].copy()
    
    # Handle missing values
    X = X.fillna(X.mean())
    
    # Extract labels if available
    if label_col in df.columns:
        y = df[label_col].copy()
        
        # Standardize labels
        label_mapping = {
            'CONFIRMED': 'CONFIRMED',
            'CANDIDATE': 'CANDIDATE',
            'FALSE POSITIVE': 'FALSE POSITIVE',
            'CP': 'CONFIRMED',
            'PC': 'CANDIDATE',
            'FP': 'FALSE POSITIVE',
            'KP': 'CONFIRMED',
            'APC': 'CANDIDATE'
        }
        
        y = y.map(lambda x: label_mapping.get(x, 'CANDIDATE'))
    else:
        y = None
    
    return X, y

if __name__ == '__main__':
    # Test data loading
    logging.basicConfig(level=logging.INFO)
    
    print("Loading Kepler data...")
    kepler_df = load_kepler_data()
    print(f"Kepler data shape: {kepler_df.shape}")
    print(kepler_df.head())
    
    print("\nLoading TESS data...")
    tess_df = load_tess_data()
    print(f"TESS data shape: {tess_df.shape}")
    print(tess_df.head())
