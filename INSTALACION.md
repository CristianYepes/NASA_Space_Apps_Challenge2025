# 🎯 Guía de Instalación - Exoplanet Hunter

## 🚀 Instalación en 1 Click (Windows)

### Opción 1: Instalación Automática Completa ⭐ RECOMENDADO

**Instala TODO automáticamente (Python, Node.js, dependencias, etc.)**

1. Haz doble click en: **`SETUP_COMPLETO.bat`**
2. Acepta los permisos de administrador
3. Espera a que termine (puede tardar 5-10 minutos)
4. ¡Listo! 🎉

**¿Qué hace?**
- ✅ Instala Chocolatey (gestor de paquetes)
- ✅ Instala Python 3.11 automáticamente
- ✅ Instala Node.js LTS automáticamente
- ✅ Configura el backend (Flask + ML)
- ✅ Configura el frontend (React + Vite)
- ✅ Entrena el modelo de Machine Learning
- ✅ Crea scripts de inicio automáticos
- ✅ Te pregunta si quieres iniciar la app

---

### Opción 2: Instalación Inteligente

**Si ya tienes Python/Node.js instalado**

1. Haz doble click en: **`SETUP_INTELIGENTE.bat`**
2. Detecta qué falta y solo instala lo necesario
3. ¡Mucho más rápido!

---

### Opción 3: Instalación Rápida

**Si ya tienes Python Y Node.js**

1. Haz doble click en: **`setup.bat`**
2. Solo configura dependencias
3. ¡Super rápido!

---

## 🎮 Cómo Iniciar la Aplicación

Una vez instalado, tienes 3 formas de iniciar:

### Forma 1: Todo en Uno ⭐ MÁS FÁCIL
Doble click en: **`START_APP.bat`**
- Inicia backend y frontend automáticamente
- Abre el navegador en http://localhost:3000
- ¡Listo para usar!

### Forma 2: Por Separado
**Backend:**
- Doble click en: `START_BACKEND.bat`
- Se ejecuta en http://localhost:5000

**Frontend:**
- Doble click en: `START_FRONTEND.bat`  
- Se ejecuta en http://localhost:3000

### Forma 3: Manual (para desarrolladores)

**Terminal 1 - Backend:**
```bash
cd Back-end
venv\Scripts\activate
python app.py
```

**Terminal 2 - Frontend:**
```bash
cd Front-end
npm run dev
```

---

## 📋 Requisitos Previos

### Si usas SETUP_COMPLETO.bat
- ✅ Solo Windows 10/11
- ✅ Conexión a Internet
- ✅ Permisos de Administrador
- ✅ **¡ESO ES TODO!**

### Si usas setup.bat
- Python 3.8 o superior
- Node.js 16 o superior
- npm
- Git (opcional)

---

## 🔧 Instalación Manual (Linux/Mac)

```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/NASA_Space_Apps_Challenge2025.git
cd NASA_Space_Apps_Challenge2025

# Backend
cd Back-end
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py  # En terminal separado

# Frontend
cd ../Front-end
npm install
npm run dev  # En terminal separado
```

---

## ❓ Troubleshooting

### Error: "Python is not installed"
**Solución:** Usa `SETUP_COMPLETO.bat` - instala Python automáticamente

### Error: "Node.js is not installed"  
**Solución:** Usa `SETUP_COMPLETO.bat` - instala Node.js automáticamente

### Error: "No se puede ejecutar scripts"
**Solución:** 
1. Ejecuta PowerShell como administrador
2. Ejecuta: `Set-ExecutionPolicy RemoteSigned`
3. Vuelve a ejecutar el setup

### Error: "Access Denied" o "Permisos"
**Solución:**
1. Click derecho en el archivo .bat
2. "Ejecutar como administrador"

### Backend no inicia
```bash
cd Back-end
venv\Scripts\activate
pip install --upgrade -r requirements.txt
python app.py
```

### Frontend no inicia
```bash
cd Front-end
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Puerto 5000 o 3000 ya en uso
**Backend (5000):**
```bash
# Encuentra y mata el proceso
netstat -ano | findstr :5000
taskkill /PID [número_de_proceso] /F
```

**Frontend (3000):**
```bash
# Encuentra y mata el proceso
netstat -ano | findstr :3000
taskkill /PID [número_de_proceso] /F
```

---

## 📊 Verificar Instalación

### 1. Verificar Backend
Abre: http://localhost:5000/api/health

Deberías ver:
```json
{
  "status": "healthy",
  "model_loaded": true
}
```

### 2. Verificar Frontend
Abre: http://localhost:3000

Deberías ver el dashboard de Exoplanet Hunter

### 3. Verificar API
```bash
curl http://localhost:5000/api/model-stats
```

---

## 🎯 Próximos Pasos

Una vez instalado:

1. ✅ Abre http://localhost:3000
2. ✅ Prueba "Manual Input" con datos de ejemplo
3. ✅ Sube el archivo `sample_data.csv`
4. ✅ Explora las estadísticas del modelo
5. ✅ Ajusta hiperparámetros
6. ✅ ¡Empieza a descubrir exoplanetas! 🌟

---

## 📚 Documentación Adicional

- **Guía Rápida:** `QUICKSTART.md`
- **Documentación Completa:** `DOCUMENTATION.md`
- **README Principal:** `README.md`
- **Backend API:** `Back-end/README.md`
- **Frontend:** `Front-end/README.md`

---

## 🆘 Soporte

Si tienes problemas:

1. Revisa esta guía de troubleshooting
2. Consulta `QUICKSTART.md`
3. Abre un issue en GitHub
4. Contacta al equipo

---

## ✨ Características Post-Instalación

Después de instalar, tendrás:

- 🎯 **START_APP.bat** - Inicia todo con un click
- 🐍 **START_BACKEND.bat** - Solo backend
- ⚛️ **START_FRONTEND.bat** - Solo frontend
- 📊 Modelo ML pre-entrenado
- 📁 Datos de ejemplo listos
- 📚 Documentación completa
- 🔧 Scripts de utilidad

---

## 🎉 ¡Listo!

Si seguiste cualquiera de las opciones, ya tienes todo instalado.

**Inicia la aplicación con:**
```
START_APP.bat
```

**¡A cazar exoplanetas! 🔭✨**
