"""
NASA Exoplanet Archive API Service
===================================
Servicio para consumir datos REALES del NASA Exoplanet Archive
usando TAP (Table Access Protocol).

Fuente oficial: https://exoplanetarchive.ipac.caltech.edu/
Documentación TAP: https://exoplanetarchive.ipac.caltech.edu/docs/TAP/usingTAP.html

Tabla usada: 'cumulative' (KOI Cumulative Delivery)
Contiene todos los Kepler Objects of Interest (KOI) con sus disposiciones:
- CONFIRMED: Planetas confirmados
- CANDIDATE: Candidatos a planetas
- FALSE POSITIVE: Falsos positivos

Author: NASA Space Apps Challenge 2025
License: NASA Open Data Policy
"""

import requests
import pandas as pd
import logging
from typing import Dict, List, Optional, Tuple
from io import StringIO

logger = logging.getLogger(__name__)


class NASAExoplanetAPI:
    """Cliente para la API TAP del NASA Exoplanet Archive"""
    
    # URL base del servicio TAP de NASA
    TAP_URL = "https://exoplanetarchive.ipac.caltech.edu/TAP/sync"
    
    # Tabla cumulative de Kepler (KOI)
    TABLE = "cumulative"
    
    # Columnas científicas relevantes para ML
    FEATURE_COLUMNS = [
        'kepoi_name',           # Nombre del KOI
        'koi_disposition',      # CONFIRMED, CANDIDATE, FALSE POSITIVE
        'koi_period',           # Período orbital (días)
        'koi_duration',         # Duración del tránsito (horas)
        'koi_prad',             # Radio planetario (Tierra radios)
        'koi_teq',              # Temperatura de equilibrio (K)
        'koi_insol',            # Flujo de insolación (Tierra flux)
        'koi_depth',            # Profundidad del tránsito (ppm)
        'koi_impact',           # Parámetro de impacto
        'koi_model_snr',        # Signal-to-noise ratio
    ]
    
    def __init__(self):
        """Inicializa el cliente de la API de NASA"""
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'NASA-Space-Apps-Challenge-2025/1.0'
        })
        
    def build_query(self, select_cols: List[str], where_clause: str = "", 
                    limit: Optional[int] = None) -> str:
        """
        Construye una query ADQL válida para TAP
        
        Args:
            select_cols: Lista de columnas a seleccionar
            where_clause: Condición WHERE (opcional)
            limit: Límite de registros (opcional)
            
        Returns:
            Query ADQL formateada
        """
        cols = ','.join(select_cols)
        query = f"SELECT {cols} FROM {self.TABLE}"
        
        if where_clause:
            query += f" WHERE {where_clause}"
            
        if limit:
            query += f" TOP {limit}"
            
        return query
    
    def execute_query(self, query: str, format: str = "csv") -> pd.DataFrame:
        """
        Ejecuta una query contra la API TAP de NASA
        
        Args:
            query: Query ADQL
            format: Formato de salida (csv, json, votable)
            
        Returns:
            DataFrame con los resultados
        """
        try:
            params = {
                'query': query,
                'format': format
            }
            
            logger.info(f"Consultando NASA Exoplanet Archive: {query[:100]}...")
            response = self.session.get(self.TAP_URL, params=params, timeout=30)
            response.raise_for_status()
            
            # Parsear CSV
            if format == "csv":
                df = pd.read_csv(StringIO(response.text))
                logger.info(f"✅ Recibidos {len(df)} registros de NASA")
                return df
            else:
                raise ValueError(f"Formato {format} no soportado")
                
        except requests.RequestException as e:
            logger.error(f"❌ Error consultando NASA API: {e}")
            raise
    
    def get_all_kois(self, limit: Optional[int] = None) -> pd.DataFrame:
        """
        Obtiene todos los KOIs con características completas
        
        Args:
            limit: Número máximo de registros (None = todos)
            
        Returns:
            DataFrame con KOIs y sus características
        """
        # Filtrar solo KOIs con datos completos (no nulos)
        where = " AND ".join([f"{col} IS NOT NULL" for col in self.FEATURE_COLUMNS[1:]])
        
        query = self.build_query(self.FEATURE_COLUMNS, where_clause=where, limit=limit)
        return self.execute_query(query)
    
    def get_confirmed_planets(self) -> pd.DataFrame:
        """Obtiene solo planetas CONFIRMADOS"""
        where = "koi_disposition = 'CONFIRMED'"
        query = self.build_query(self.FEATURE_COLUMNS, where_clause=where)
        return self.execute_query(query)
    
    def get_candidates(self) -> pd.DataFrame:
        """Obtiene solo CANDIDATOS a planetas"""
        where = "koi_disposition = 'CANDIDATE'"
        query = self.build_query(self.FEATURE_COLUMNS, where_clause=where)
        return self.execute_query(query)
    
    def get_false_positives(self) -> pd.DataFrame:
        """Obtiene solo FALSOS POSITIVOS"""
        where = "koi_disposition = 'FALSE POSITIVE'"
        query = self.build_query(self.FEATURE_COLUMNS, where_clause=where)
        return self.execute_query(query)
    
    def get_statistics(self) -> Dict[str, int]:
        """
        Obtiene estadísticas REALES del catálogo de NASA
        
        Returns:
            Dict con conteos de cada categoría
        """
        try:
            # Query para contar por disposición
            query = f"""
                SELECT koi_disposition, COUNT(*) as count 
                FROM {self.TABLE} 
                WHERE koi_disposition IS NOT NULL 
                GROUP BY koi_disposition
            """
            
            df = self.execute_query(query)
            
            stats = {
                'total': int(df['count'].sum()),
                'confirmed': 0,
                'candidate': 0,
                'false_positive': 0
            }
            
            for _, row in df.iterrows():
                disp = row['koi_disposition'].upper()
                count = int(row['count'])
                
                if disp == 'CONFIRMED':
                    stats['confirmed'] = count
                elif disp == 'CANDIDATE':
                    stats['candidate'] = count
                elif disp == 'FALSE POSITIVE':
                    stats['false_positive'] = count
            
            logger.info(f"📊 Estadísticas NASA: {stats}")
            return stats
            
        except Exception as e:
            logger.error(f"❌ Error obteniendo estadísticas: {e}")
            raise
    
    def get_training_data(self, sample_size: int = 1000) -> Tuple[pd.DataFrame, pd.Series]:
        """
        Obtiene datos para entrenar el modelo ML
        
        Args:
            sample_size: Número de muestras (None = todos)
            
        Returns:
            (X_features, y_labels)
        """
        df = self.get_all_kois(limit=sample_size)
        
        # Separar features y labels
        X = df[self.FEATURE_COLUMNS[2:]]  # Sin nombre ni disposición
        y = df['koi_disposition']
        
        logger.info(f"🎯 Dataset de entrenamiento: {len(X)} muestras, {len(X.columns)} features")
        logger.info(f"   Distribución: {y.value_counts().to_dict()}")
        
        return X, y
    
    def save_dataset_to_csv(self, filepath: str, limit: int = 1000):
        """
        Descarga y guarda un dataset de KOIs en CSV
        
        Args:
            filepath: Ruta del archivo CSV
            limit: Número de registros
        """
        logger.info(f"📥 Descargando {limit} KOIs de NASA...")
        df = self.get_all_kois(limit=limit)
        df.to_csv(filepath, index=False)
        logger.info(f"💾 Dataset guardado en {filepath}")
        return df


# Instancia global del cliente
nasa_api = NASAExoplanetAPI()


if __name__ == "__main__":
    # Test del servicio
    logging.basicConfig(level=logging.INFO)
    
    print("🚀 NASA Exoplanet Archive API Service - Test")
    print("=" * 60)
    
    # Test 1: Estadísticas
    print("\n📊 Estadísticas del catálogo cumulative:")
    stats = nasa_api.get_statistics()
    print(f"   Total KOIs: {stats['total']:,}")
    print(f"   ✅ Confirmados: {stats['confirmed']:,}")
    print(f"   🔍 Candidatos: {stats['candidate']:,}")
    print(f"   ❌ Falsos Positivos: {stats['false_positive']:,}")
    
    # Test 2: Muestra de datos
    print("\n📥 Obteniendo muestra de 10 KOIs...")
    sample = nasa_api.get_all_kois(limit=10)
    print(sample[['kepoi_name', 'koi_disposition', 'koi_period', 'koi_prad']].to_string())
    
    print("\n✅ Test completado!")
