import pandas as pd

def verify_datasets():
    """Verifica integridad de los datasets descargados"""

    print("\n🔍 VERIFICANDO DATASETS...")

    # Cargar datos
    df_nasa = pd.read_csv('exoplanet_data/nasa_cumulative.csv')
    df_tess = pd.read_csv('exoplanet_data/tess_toi.csv')
    df_k2 = pd.read_csv('exoplanet_data/k2_planets.csv')

    # Columnas críticas para habitabilidad
    critical_columns = ['pl_name', 'pl_orbper', 'pl_orbsmax', 'pl_rade', 'pl_bmasse', 'st_teff', 'st_lum']

    print("📋 Dataset Cumulative:")
    print(f"   - Planetas: {len(df_nasa)}")
    print(f"   - Columnas disponibles: {len(df_nasa.columns)}")
    print(f"   - Columnas críticas presentes: {all(col in df_nasa.columns for col in critical_columns)}")

    print("📋 Dataset TESS TOI:")
    print(f"   - Candidatos: {len(df_tess)}")

    print("📋 Dataset K2:")
    print(f"   - Planetas: {len(df_k2)}")

    # Planetas en zona habitable aproximada
    habitable_approx = df_nasa[
        (df_nasa['pl_rade'] >= 0.8) &
        (df_nasa['pl_rade'] <= 2.0) &
        (df_nasa['pl_orbper'] >= 10) &  # Período no demasiado corto
        (df_nasa['pl_orbper'] <= 400)   # Período no demasiado largo
    ]

    print(f"🌍 Planetas potencialmente habitables (filtro básico): {len(habitable_approx)}")

# Ejecutar verificación
verify_datasets()
