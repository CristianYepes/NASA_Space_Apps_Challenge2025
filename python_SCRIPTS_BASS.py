import pandas as pd
import requests
from datetime import datetime
import os

def download_nasa_datasets():
    """Descarga todos los datasets NASA esenciales"""

    print("🛰️  INICIANDO DESCARGA DATASETS NASA/CSA...")

    # Crear directorio de datos
    os.makedirs('exoplanet_data', exist_ok=True)

    # 1. DATASET CUMULATIVO (Exoplanetas Confirmados)
    print("📥 Descargando dataset cumulative...")
    url_cumulative = "https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+*+from+ps&format=csv"
    df_cumulative = pd.read_csv(url_cumulative)
    df_cumulative.to_csv('exoplanet_data/nasa_cumulative.csv', index=False)
    print(f"   ✅ {len(df_cumulative)} exoplanetas descargados")

    # 2. CANDIDATOS TESS
    print("📥 Descargando candidatos TESS...")
    url_tess = "https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+*+from+toi&format=csv"
    df_tess = pd.read_csv(url_tess)
    df_tess.to_csv('exoplanet_data/tess_toi.csv', index=False)
    print(f"   ✅ {len(df_tess)} candidatos TESS descargados")

    # 3. DATOS K2
    print("📥 Descargando datos K2...")
    url_k2 = "https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+*+from+k2pandc&format=csv"
    df_k2 = pd.read_csv(url_k2)
    df_k2.to_csv('exoplanet_data/k2_planets.csv', index=False)
    print(f"   ✅ {len(df_k2)} planetas K2 descargados")

    # 4. CREAR DATASET JWST PRIORITY (basado en literatura)
    jwst_targets = [
        "TRAPPIST-1b", "TRAPPIST-1c", "TRAPPIST-1d", "TRAPPIST-1e",
        "TRAPPIST-1f", "TRAPPIST-1g", "TRAPPIST-1h",
        "LHS 1140 b", "K2-18b", "GJ 1214b", "GJ 486b",
        "TOI-700d", "TOI-270d", "LHS 475b", "GJ 367b",
        "WASP-39b", "WASP-96b", "WASP-107b"
    ]

    df_jwst = pd.DataFrame(jwst_targets, columns=['planet_name'])
    df_jwst['telescope'] = 'JWST'
    df_jwst['priority'] = 'HIGH'
    df_jwst.to_csv('exoplanet_data/jwst_priority_targets.csv', index=False)
    print(f"   ✅ {len(df_jwst)} objetivos JWST priorizados")

    # METADATOS
    metadata = {
        'download_date': datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        'total_confirmed_planets': len(df_cumulative),
        'total_tess_candidates': len(df_tess),
        'total_k2_planets': len(df_k2),
        'jwst_priority_targets': len(df_jwst)
    }

    pd.DataFrame([metadata]).to_csv('exoplanet_data/download_metadata.csv', index=False)

    print("🎉 DESCARGA COMPLETADA!")
    print(f"📊 Total planetas confirmados: {len(df_cumulative)}")
    print(f"📊 Total candidatos TESS: {len(df_tess)}")
    print(f"📊 Total planetas K2: {len(df_k2)}")
    print(f"🎯 Objetivos JWST prioritarios: {len(df_jwst)}")

    return {
        'cumulative': df_cumulative,
        'tess': df_tess,
        'k2': df_k2,
        'jwst': df_jwst
    }

# EJECUTAR DESCARGA
if __name__ == "__main__":
    datasets = download_nasa_datasets()
