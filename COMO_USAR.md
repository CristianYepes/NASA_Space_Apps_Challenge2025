# 🚀 CÓMO USAR EXOPLANET HUNTER

## ¡SÚPER FÁCIL! 🎉

### Paso 1: Doble click en `INICIO.bat`

**Eso es TODO.** 

No necesitas hacer nada más. El script automáticamente:

✅ Verifica si tienes Python y Node.js  
✅ Los instala si faltan (usando Chocolatey)  
✅ Configura el Backend (Flask + ML)  
✅ Configura el Frontend (React + Vite)  
✅ Entrena el modelo de Machine Learning  
✅ Inicia ambos servidores  
✅ Abre tu navegador en http://localhost:3000  

---

## ⏱️ Tiempos Estimados

| Situación | Tiempo |
|-----------|--------|
| Primera vez sin Python/Node.js | ~10 minutos |
| Primera vez con Python/Node.js | ~3 minutos |
| Próximas veces | ~30 segundos |

---

## 🎮 Usando la Aplicación

Una vez que se abra el navegador, verás el dashboard con pestañas:

1. **📊 Dashboard**: Vista general de estadísticas del modelo
2. **📁 Upload CSV**: Sube archivos CSV con múltiples observaciones
3. **✏️ Manual Input**: Ingresa datos manualmente para clasificar un objeto
4. **📈 Model Stats**: Métricas detalladas del modelo (accuracy, precision, etc.)
5. **⚙️ Hyperparameters**: Ajusta parámetros y reentrena el modelo

---

## 📋 Formato de Datos

Para subir archivos CSV, usa este formato:

```csv
orbital_period,transit_duration,planetary_radius,equilibrium_temperature,insolation_flux,transit_depth,impact_parameter,signal_to_noise
3.5,2.8,1.2,400,900,0.002,0.5,25
10.2,3.1,0.8,300,500,0.001,0.3,30
```

### Columnas Requeridas:
- `orbital_period`: Período orbital (días)
- `transit_duration`: Duración del tránsito (horas)
- `planetary_radius`: Radio planetario (radios terrestres)
- `equilibrium_temperature`: Temperatura de equilibrio (K)
- `insolation_flux`: Flujo de insolación (flux terrestres)
- `transit_depth`: Profundidad del tránsito
- `impact_parameter`: Parámetro de impacto
- `signal_to_noise`: Relación señal-ruido

---

## 🛑 Detener la Aplicación

Hay **dos ventanas minimizadas** corriendo:

1. **Backend** (Python/Flask en puerto 5000)
2. **Frontend** (Vite dev server en puerto 3000)

Para detener todo:
- Cierra ambas ventanas minimizadas
- O presiona `Ctrl + C` en cada una

---

## ❓ Problemas Comunes

### "La aplicación no se abre en el navegador"
- Espera 30 segundos más (puede tardar un poco)
- Abre manualmente: http://localhost:3000

### "Error al instalar Chocolatey"
- Ejecuta `INICIO.bat` con clic derecho → "Ejecutar como administrador"

### "ModuleNotFoundError en Python"
- Cierra todo
- Borra la carpeta `Back-end/venv`
- Vuelve a ejecutar `INICIO.bat`

### "npm install falla"
- Cierra todo
- Borra la carpeta `Front-end/node_modules`
- Vuelve a ejecutar `INICIO.bat`

---

## 📚 Más Información

- **README.md**: Documentación completa del proyecto
- **DOCUMENTATION.md**: Documentación técnica detallada
- **QUICKSTART.md**: Guía rápida en inglés
- **GUIA_RAPIDA.md**: Guía rápida en español

---

## 🆘 Soporte

Si tienes problemas:
1. Lee `DOCUMENTATION.md` para detalles técnicos
2. Revisa los logs en las ventanas del Backend y Frontend
3. Asegúrate de tener conexión a internet para descargas

---

## 🎉 ¡Disfruta detectando exoplanetas!

**NASA Space Apps Challenge 2025**  
*A World Away: Hunting for Exoplanets with AI*
