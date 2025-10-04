@echo off
REM ============================================================================
REM EXOPLANET HUNTER - SIMPLE START
REM ============================================================================

echo.
echo ============================================================================
echo  EXOPLANET HUNTER - NASA SPACE APPS CHALLENGE 2025
echo ============================================================================
echo.
echo Iniciando servidores...
echo.

REM Ir a la carpeta del script
cd /d "%~dp0"

REM ============================================================================
REM BACKEND
REM ============================================================================

echo [1/2] Iniciando Backend (Flask)...

cd Back-end

if not exist "venv\Scripts\python.exe" (
    echo ERROR: No existe venv\Scripts\python.exe
    echo Creando entorno virtual...
    python -m venv venv
    if errorlevel 1 (
        echo ERROR: No se pudo crear el entorno virtual
        pause
        exit /b 1
    )
    call venv\Scripts\activate.bat
    pip install -r requirements.txt
) else (
    call venv\Scripts\activate.bat
)

start /MIN "Backend - Flask" cmd /k "cd /d "%~dp0Back-end" && venv\Scripts\python.exe app.py"

echo Backend iniciado en http://localhost:5000
echo.

cd ..

REM ============================================================================
REM FRONTEND
REM ============================================================================

echo [2/2] Iniciando Frontend (Vite)...

cd Front-end

if not exist "node_modules" (
    echo Instalando dependencias npm...
    call npm install
)

start /MIN "Frontend - Vite" cmd /k "cd /d "%~dp0Front-end" && npm run dev"

echo Frontend iniciando en http://localhost:3000
echo.

cd ..

REM ============================================================================
REM ABRIR NAVEGADOR
REM ============================================================================

echo Esperando que los servidores inicien...
timeout /t 10 /nobreak

echo.
echo ============================================================================
echo  SERVIDORES INICIADOS
echo ============================================================================
echo.
echo  Backend:  http://localhost:5000
echo  Frontend: http://localhost:3000
echo.
echo  Abriendo navegador...
echo ============================================================================
echo.

start http://localhost:3000

echo.
echo IMPORTANTE: Hay 2 ventanas minimizadas (Backend y Frontend)
echo NO las cierres mientras uses la aplicacion
echo.
echo Presiona cualquier tecla para cerrar ESTA ventana...
echo (Los servidores seguiran corriendo en las ventanas minimizadas)
echo.

pause
