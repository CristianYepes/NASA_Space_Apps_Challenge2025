# 🐧 INICIO RÁPIDO PARA LINUX/UBUNTU

## ¡SÚPER FÁCIL!

### Un solo comando:

```bash
chmod +x setup.sh && ./setup.sh
```

**Eso es TODO.** El script automáticamente:

✅ Verifica si tienes Python3 y Node.js  
✅ Los instala si faltan (soporta Ubuntu, Debian, Fedora, Arch)  
✅ Configura el Backend (Flask + ML)  
✅ Configura el Frontend (React + Vite)  
✅ Entrena el modelo de Machine Learning  
✅ Inicia ambos servidores en segundo plano  
✅ Abre tu navegador en http://localhost:3000  

---

## 📋 Distribuciones Soportadas

El script detecta automáticamente tu distribución:

- ✅ **Ubuntu / Debian** - Usa `apt`
- ✅ **Fedora / RHEL / CentOS** - Usa `dnf`
- ✅ **Arch Linux** - Usa `pacman`
- ✅ **Otras** - Requiere Python3 y Node.js preinstalados

---

## ⏱️ Tiempos Estimados

| Situación | Tiempo |
|-----------|--------|
| Primera vez sin Python/Node.js | ~10 minutos |
| Primera vez con Python/Node.js | ~3 minutos |
| Próximas veces | ~30 segundos |

---

## 🔧 Características del Script

### Detección Automática
- Detecta distribución Linux
- Verifica Python3 y Node.js
- Instala dependencias del sistema si es necesario

### Configuración
- Crea entorno virtual de Python
- Instala dependencias de Python (requirements.txt)
- Instala dependencias de Node.js (package.json)
- Entrena modelo ML si no existe

### Ejecución
- Inicia Backend en segundo plano
- Inicia Frontend en segundo plano
- Logs guardados en:
  - `/tmp/exoplanet-backend.log`
  - `/tmp/exoplanet-frontend.log`

### Limpieza
- Presiona **Ctrl+C** para detener ambos servidores
- El script limpia procesos automáticamente

---

## 🌐 URLs

Una vez iniciado:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

---

## 🆘 Solución de Problemas

### "Permission denied"
```bash
chmod +x setup.sh
```

### "sudo: command not found"
Ejecuta como root o instala sudo:
```bash
# Como root
su -
./setup.sh
```

### Instalar Python3/Node.js manualmente

#### Ubuntu/Debian:
```bash
sudo apt update
sudo apt install python3 python3-pip python3-venv nodejs npm
```

#### Fedora:
```bash
sudo dnf install python3 python3-pip nodejs npm
```

#### Arch:
```bash
sudo pacman -S python python-pip nodejs npm
```

### Ver logs en tiempo real

```bash
# Backend
tail -f /tmp/exoplanet-backend.log

# Frontend
tail -f /tmp/exoplanet-frontend.log
```

### Reiniciar servidores

Si algo falla, presiona Ctrl+C y vuelve a ejecutar:
```bash
./setup.sh
```

---

## 🎮 Usando la Aplicación

Una vez que se abra el navegador, verás:

1. **🔭 Header** con logo y navegación
2. **🌍 Planeta 3D** animado que crece al hacer scroll
3. **📊 Dashboard** con métricas del modelo
4. **Pestañas**:
   - Dashboard - Vista general
   - Upload Data - Subir CSV
   - Manual Input - Clasificar un objeto
   - Model Stats - Estadísticas detalladas
   - Tuning - Ajustar hiperparámetros

---

## 🛑 Detener la Aplicación

Presiona **Ctrl+C** en la terminal donde ejecutaste el script.

El script automáticamente:
- Detiene el Backend
- Detiene el Frontend
- Limpia los procesos

---

## 📚 Más Información

- `README.md` - Documentación completa
- `DOCUMENTATION.md` - Detalles técnicos
- `QUICKSTART.md` - Guía rápida en inglés

---

## 🎉 ¡Disfruta detectando exoplanetas!

**NASA Space Apps Challenge 2025**  
*A World Away: Hunting for Exoplanets with AI*

🚀 Made with ❤️ for space exploration
