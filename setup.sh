#!/bin/bash
# ============================================================================
# EXOPLANET HUNTER - INICIO AUTOMATICO (Linux/Ubuntu)
# Ejecuta: chmod +x setup.sh && ./setup.sh
# ============================================================================

# Colores para terminal
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Banner
clear
echo ""
echo "============================================================================"
echo -e "${CYAN} 🔭 EXOPLANET HUNTER - NASA SPACE APPS CHALLENGE 2025${NC}"
echo "============================================================================"
echo " Iniciando aplicacion automaticamente..."
echo "============================================================================"
echo ""

# Directorio del script
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

# ============================================================================
# VERIFICAR PYTHON
# ============================================================================

echo -e "${BLUE}[1/5]${NC} Verificando Python..."

# Detectar si estamos en Windows (Git Bash) o Linux real
if [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "win32" ]] || [[ "$OSTYPE" == "cygwin" ]]; then
    # Estamos en Windows (Git Bash)
    PYTHON_CMD="python"
else
    # Estamos en Linux/Mac
    PYTHON_CMD="python3"
fi

if ! command -v $PYTHON_CMD &> /dev/null; then
    echo -e "${RED}     ❌ Python no encontrado${NC}"
    
    if [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "win32" ]] || [[ "$OSTYPE" == "cygwin" ]]; then
        # En Windows, no intentamos instalar, solo avisamos
        echo -e "${YELLOW}     📥 Por favor ejecuta INICIO.bat en su lugar${NC}"
        echo -e "${YELLOW}     O instala Python desde https://python.org${NC}"
        exit 1
    else
        # En Linux, intentamos instalar
        echo -e "${YELLOW}     📥 Instalando Python...${NC}"
        
        # Detectar distribución
        if [ -f /etc/os-release ]; then
            . /etc/os-release
            if [[ "$ID" == "ubuntu" ]] || [[ "$ID" == "debian" ]]; then
                sudo apt update
                sudo apt install -y python3 python3-pip python3-venv
            elif [[ "$ID" == "fedora" ]] || [[ "$ID" == "rhel" ]] || [[ "$ID" == "centos" ]]; then
                sudo dnf install -y python3 python3-pip
            elif [[ "$ID" == "arch" ]]; then
                sudo pacman -S --noconfirm python python-pip
            else
                echo -e "${RED}     ❌ Distribución no soportada. Por favor instala Python 3.8+ manualmente.${NC}"
                exit 1
            fi
        fi
        
        if ! command -v $PYTHON_CMD &> /dev/null; then
            echo -e "${RED}     ❌ Error instalando Python${NC}"
            exit 1
        fi
        
        echo -e "${GREEN}     ✅ Python instalado${NC}"
    fi
else
    PYTHON_VERSION=$($PYTHON_CMD --version)
    echo -e "${GREEN}     ✅ $PYTHON_VERSION${NC}"
fi
echo ""

# ============================================================================
# VERIFICAR NODE.JS
# ============================================================================

echo -e "${BLUE}[2/5]${NC} Verificando Node.js..."

if ! command -v node &> /dev/null; then
    echo -e "${RED}     ❌ Node.js no encontrado${NC}"
    echo -e "${YELLOW}     📥 Instalando Node.js...${NC}"
    
    # Instalar Node.js usando NodeSource
    if [[ -f /etc/os-release ]]; then
        . /etc/os-release
        if [[ "$ID" == "ubuntu" ]] || [[ "$ID" == "debian" ]]; then
            curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
            sudo apt install -y nodejs
        elif [[ "$ID" == "fedora" ]] || [[ "$ID" == "rhel" ]] || [[ "$ID" == "centos" ]]; then
            curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
            sudo dnf install -y nodejs
        elif [[ "$ID" == "arch" ]]; then
            sudo pacman -S --noconfirm nodejs npm
        fi
    fi
    
    if ! command -v node &> /dev/null; then
        echo -e "${RED}     ❌ Error instalando Node.js${NC}"
        echo -e "${YELLOW}     📥 Por favor instala Node.js desde https://nodejs.org${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}     ✅ Node.js instalado${NC}"
else
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}     ✅ Node.js $NODE_VERSION${NC}"
fi
echo ""

# ============================================================================
# CONFIGURAR BACKEND
# ============================================================================

echo -e "${BLUE}[3/5]${NC} 🐍 Configurando Backend..."
cd "$SCRIPT_DIR/Back-end"

if [ ! -d "venv" ]; then
    echo "     └─ Creando entorno virtual..."
    $PYTHON_CMD -m venv venv
    if [ $? -ne 0 ]; then
        echo -e "${RED}     ❌ Error creando entorno virtual${NC}"
        exit 1
    fi
fi

# Detectar activación según el OS
if [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "win32" ]] || [[ "$OSTYPE" == "cygwin" ]]; then
    # Windows (Git Bash)
    VENV_PYTHON="venv/Scripts/python"
    VENV_ACTIVATE="venv/Scripts/activate"
    if [ ! -f "$VENV_PYTHON.exe" ]; then
        echo -e "${RED}     ❌ Error: entorno virtual incompleto${NC}"
        exit 1
    fi
else
    # Linux/Mac
    VENV_PYTHON="venv/bin/python"
    VENV_ACTIVATE="venv/bin/activate"
    if [ ! -f "$VENV_PYTHON" ]; then
        echo -e "${RED}     ❌ Error: entorno virtual incompleto${NC}"
        exit 1
    fi
fi

echo "     └─ Instalando dependencias..."
source "$VENV_ACTIVATE"
$PYTHON_CMD -m pip install --upgrade pip --quiet 2>/dev/null
pip install -r requirements.txt --quiet 2>/dev/null

if [ ! -f "models/exoplanet_model.pkl" ]; then
    echo "     └─ Entrenando modelo ML (puede tardar 2-3 min)..."
    $PYTHON_CMD -c "from services.model_service import ModelService; m = ModelService(); m.train_model()" 2>/dev/null || echo -e "${YELLOW}     ⚠️  Advertencia: Error entrenando modelo (se entrenara al iniciar)${NC}"
fi

deactivate 2>/dev/null || true
echo -e "${GREEN}     ✅ Backend configurado${NC}"
echo ""

# ============================================================================
# CONFIGURAR FRONTEND
# ============================================================================

echo -e "${BLUE}[4/5]${NC} ⚛️  Configurando Frontend..."
cd "$SCRIPT_DIR/Front-end"

if [ ! -d "node_modules" ]; then
    echo "     └─ Instalando dependencias (puede tardar 2-3 min)..."
    npm install --loglevel=error 2>/dev/null || echo -e "${YELLOW}     ⚠️  Advertencia: Error instalando dependencias npm${NC}"
fi

echo -e "${GREEN}     ✅ Frontend configurado${NC}"
echo ""

cd "$SCRIPT_DIR"

# ============================================================================
# CREAR ARCHIVOS .ENV
# ============================================================================

if [ ! -f "Back-end/.env" ] && [ -f "Back-end/.env.example" ]; then
    cp "Back-end/.env.example" "Back-end/.env"
fi

if [ ! -f "Front-end/.env" ] && [ -f "Front-end/.env.example" ]; then
    cp "Front-end/.env.example" "Front-end/.env"
fi

# ============================================================================
# INICIAR SERVIDORES
# ============================================================================

echo -e "${BLUE}[5/5]${NC} 🚀 Iniciando servicios..."
echo ""

# Verificar que los entornos existan
if [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "win32" ]] || [[ "$OSTYPE" == "cygwin" ]]; then
    VENV_PYTHON="Back-end/venv/Scripts/python"
else
    VENV_PYTHON="Back-end/venv/bin/python"
fi

if [ ! -f "$VENV_PYTHON" ] && [ ! -f "$VENV_PYTHON.exe" ]; then
    echo -e "${RED}❌ Error: Backend no configurado correctamente${NC}"
    exit 1
fi

if [ ! -d "Front-end/node_modules" ]; then
    echo -e "${RED}❌ Error: Frontend no configurado correctamente${NC}"
    exit 1
fi

# Función para limpiar procesos al salir
cleanup() {
    echo ""
    echo -e "${YELLOW}Deteniendo servidores...${NC}"
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit 0
}

trap cleanup SIGINT SIGTERM

# Iniciar Backend en segundo plano
echo "     └─ Iniciando Backend (Flask)..."
cd "$SCRIPT_DIR/Back-end"
if [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "win32" ]] || [[ "$OSTYPE" == "cygwin" ]]; then
    source venv/Scripts/activate
    $PYTHON_CMD app.py > /tmp/exoplanet-backend.log 2>&1 &
else
    source venv/bin/activate
    $PYTHON_CMD app.py > /tmp/exoplanet-backend.log 2>&1 &
fi
BACKEND_PID=$!
deactivate

echo -e "${GREEN}     ✅ Backend iniciado en http://localhost:5000${NC}"
echo ""

# Esperar a que el backend esté listo
sleep 5

# Iniciar Frontend en segundo plano
echo "     └─ Iniciando Frontend (Vite)..."
cd "$SCRIPT_DIR/Front-end"
npm run dev > /tmp/exoplanet-frontend.log 2>&1 &
FRONTEND_PID=$!

echo -e "${GREEN}     ✅ Frontend iniciando en http://localhost:3000${NC}"
echo ""

# Esperar a que el frontend esté listo
sleep 8

# ============================================================================
# ABRIR NAVEGADOR
# ============================================================================

echo "============================================================================"
echo -e "${GREEN} ✅ APLICACION INICIADA CORRECTAMENTE${NC}"
echo "============================================================================"
echo ""
echo " 📡 Backend:  http://localhost:5000"
echo " 🌐 Frontend: http://localhost:3000"
echo ""
echo " 🚀 Abriendo navegador..."
echo "============================================================================"
echo ""

# Detectar y abrir navegador
if command -v xdg-open &> /dev/null; then
    xdg-open http://localhost:3000 2>/dev/null &
elif command -v gnome-open &> /dev/null; then
    gnome-open http://localhost:3000 2>/dev/null &
elif command -v open &> /dev/null; then
    open http://localhost:3000 2>/dev/null &
else
    echo -e "${YELLOW} ⚠️  No se pudo abrir el navegador automáticamente.${NC}"
    echo " Por favor abre manualmente: http://localhost:3000"
fi

sleep 3

clear
echo ""
echo "============================================================================"
echo -e "${CYAN} 🎉 ¡EXOPLANET HUNTER ESTA CORRIENDO!${NC}"
echo "============================================================================"
echo ""
echo " La aplicacion deberia abrirse en tu navegador."
echo ""
echo " Si no se abrio automaticamente, ve a: ${BLUE}http://localhost:3000${NC}"
echo ""
echo "============================================================================"
echo " 📊 SERVIDORES ACTIVOS:"
echo "============================================================================"
echo ""
echo " Backend:  http://localhost:5000 (PID: $BACKEND_PID)"
echo " Frontend: http://localhost:3000 (PID: $FRONTEND_PID)"
echo ""
echo "============================================================================"
echo " ℹ️  INFORMACION:"
echo "============================================================================"
echo ""
echo " - Logs del backend:  /tmp/exoplanet-backend.log"
echo " - Logs del frontend: /tmp/exoplanet-frontend.log"
echo " - Para detener: presiona Ctrl+C en esta terminal"
echo ""
echo "============================================================================"
echo ""
echo -e "${YELLOW} Presiona Ctrl+C para detener los servidores...${NC}"
echo ""

# Mantener el script corriendo y monitorear los procesos
while kill -0 $BACKEND_PID 2>/dev/null && kill -0 $FRONTEND_PID 2>/dev/null; do
    sleep 1
done

echo -e "${RED}⚠️  Un servidor se detuvo inesperadamente${NC}"
cleanup
