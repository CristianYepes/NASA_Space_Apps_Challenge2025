# ✅ SCRIPTS DE INICIO - RESUMEN

## 🎯 Ambos Scripts Hacen lo Mismo

### Windows: `INICIO.bat`
```bash
# Doble click en INICIO.bat
```

### Linux/Ubuntu/Mac: `setup.sh`
```bash
chmod +x setup.sh
./setup.sh
```

---

## ⚙️ Funcionalidad Idéntica

Ambos scripts:

1. ✅ **Verifican** Python y Node.js
2. ✅ **Instalan** automáticamente si faltan
3. ✅ **Configuran** Backend (Python + Flask + ML)
4. ✅ **Configuran** Frontend (React + Vite + Tailwind)
5. ✅ **Entrenan** el modelo ML si no existe
6. ✅ **Inician** ambos servidores
7. ✅ **Abren** el navegador automáticamente

---

## 📊 Comparación

| Característica | INICIO.bat (Windows) | setup.sh (Linux) |
|----------------|---------------------|------------------|
| **Auto-instala Python** | ✅ (Chocolatey) | ✅ (apt/dnf/pacman) |
| **Auto-instala Node.js** | ✅ (Chocolatey) | ✅ (NodeSource) |
| **Configura Backend** | ✅ | ✅ |
| **Configura Frontend** | ✅ | ✅ |
| **Entrena Modelo ML** | ✅ | ✅ |
| **Inicia Servidores** | ✅ (minimizados) | ✅ (background) |
| **Abre Navegador** | ✅ | ✅ |
| **Logs** | Ventanas minimizadas | /tmp/*.log |
| **Detener** | Cerrar ventanas | Ctrl+C |

---

## 🔧 Detalles Técnicos

### INICIO.bat (Windows)
- Usa `cmd.exe` / PowerShell
- Instala con Chocolatey
- Ventanas minimizadas con `start /MIN`
- Abre con `start http://localhost:3000`

### setup.sh (Linux)
- Bash script con colores ANSI
- Detecta distribución (Ubuntu/Debian/Fedora/Arch)
- Procesos en background con `&`
- Trap para limpieza con Ctrl+C
- Abre con `xdg-open` / `gnome-open` / `open`

---

## 📝 Archivos Creados

Ambos scripts generan:

```
Back-end/
├── venv/                          # Entorno virtual Python
├── models/
│   └── exoplanet_model.pkl       # Modelo entrenado
└── .env                          # Variables de entorno

Front-end/
├── node_modules/                 # Dependencias npm
└── .env                          # Variables de entorno
```

---

## 🌐 Resultado Final

Ambos scripts abren:

**http://localhost:3000**

Con:
- 🔭 Header con navegación
- 🌍 Planeta 3D animado con scroll
- 📊 Dashboard interactivo
- 📁 Carga de archivos CSV
- ✏️ Input manual
- 📈 Estadísticas del modelo
- ⚙️ Ajuste de hiperparámetros

---

## 🎯 Uso Recomendado

### Para Desarrollo
```bash
# Windows
INICIO.bat

# Linux
./setup.sh
```

### Para Producción
Ver `DOCUMENTATION.md` para configuración con nginx/gunicorn

---

## 🆘 Problemas Comunes

### Ambas Plataformas

**Puerto ocupado:**
```bash
# Detener proceso en puerto 5000
# Windows: netstat -ano | findstr :5000
# Linux: lsof -ti:5000 | xargs kill
```

**Error de dependencias:**
```bash
# Borrar y reinstalar
# Windows: rmdir /s venv node_modules
# Linux: rm -rf venv node_modules
```

---

## ✨ Características Especiales

### Windows (INICIO.bat)
- ✅ No requiere permisos de admin (excepto para Chocolatey)
- ✅ Ventanas visibles pero minimizadas
- ✅ Códigos de color en consola
- ✅ Mensajes en español

### Linux (setup.sh)
- ✅ Colores ANSI en terminal
- ✅ Logs separados en /tmp
- ✅ Soporte multi-distro
- ✅ Limpieza automática con trap
- ✅ Detección inteligente de navegador

---

## 🎉 ¡Ambos Funcionan Perfectamente!

**Usa el que corresponda a tu sistema operativo.**

---

**NASA Space Apps Challenge 2025**  
*Cross-Platform Ready* 🚀
