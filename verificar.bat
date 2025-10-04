@echo off
REM Script de verificación - NO USES ESTE, usa INICIO.bat
REM Este es solo para verificar que todo está en su lugar

echo ===============================================
echo  VERIFICACION DE ARCHIVOS
echo ===============================================
echo.

echo Verificando estructura del proyecto...
echo.

REM Frontend
if exist "Front-end\package.json" (
    echo [OK] Front-end\package.json
) else (
    echo [ERROR] Front-end\package.json NO ENCONTRADO
)

if exist "Front-end\vite.config.js" (
    echo [OK] Front-end\vite.config.js
) else (
    echo [ERROR] Front-end\vite.config.js NO ENCONTRADO
)

if exist "Front-end\postcss.config.js" (
    echo [OK] Front-end\postcss.config.js
) else (
    echo [ERROR] Front-end\postcss.config.js NO ENCONTRADO
)

if exist "Front-end\src\App.jsx" (
    echo [OK] Front-end\src\App.jsx
) else (
    echo [ERROR] Front-end\src\App.jsx NO ENCONTRADO
)

if exist "Front-end\src\services\api.js" (
    echo [OK] Front-end\src\services\api.js
) else (
    echo [ERROR] Front-end\src\services\api.js NO ENCONTRADO
)

echo.

REM Backend
if exist "Back-end\app.py" (
    echo [OK] Back-end\app.py
) else (
    echo [ERROR] Back-end\app.py NO ENCONTRADO
)

if exist "Back-end\requirements.txt" (
    echo [OK] Back-end\requirements.txt
) else (
    echo [ERROR] Back-end\requirements.txt NO ENCONTRADO
)

if exist "Back-end\services\model_service.py" (
    echo [OK] Back-end\services\model_service.py
) else (
    echo [ERROR] Back-end\services\model_service.py NO ENCONTRADO
)

if exist "Back-end\services\data_service.py" (
    echo [OK] Back-end\services\data_service.py
) else (
    echo [ERROR] Back-end\services\data_service.py NO ENCONTRADO
)

echo.

REM Documentación
if exist "README.md" (
    echo [OK] README.md
) else (
    echo [ERROR] README.md NO ENCONTRADO
)

if exist "DOCUMENTATION.md" (
    echo [OK] DOCUMENTATION.md
) else (
    echo [ERROR] DOCUMENTATION.md NO ENCONTRADO
)

if exist "LEEME.txt" (
    echo [OK] LEEME.txt
) else (
    echo [ERROR] LEEME.txt NO ENCONTRADO
)

if exist "COMO_USAR.md" (
    echo [OK] COMO_USAR.md
) else (
    echo [ERROR] COMO_USAR.md NO ENCONTRADO
)

if exist "PROYECTO_LISTO.md" (
    echo [OK] PROYECTO_LISTO.md
) else (
    echo [ERROR] PROYECTO_LISTO.md NO ENCONTRADO
)

echo.

REM Script principal
if exist "INICIO.bat" (
    echo [OK] INICIO.bat - Script principal
) else (
    echo [ERROR] INICIO.bat NO ENCONTRADO - ¡ESTE ES CRITICO!
)

echo.

REM Verificar que NO existan los scripts viejos
if exist "START_APP.bat" (
    echo [ADVERTENCIA] START_APP.bat todavia existe - deberia estar eliminado
) else (
    echo [OK] START_APP.bat eliminado correctamente
)

if exist "SETUP_COMPLETO.bat" (
    echo [ADVERTENCIA] SETUP_COMPLETO.bat todavia existe - deberia estar eliminado
) else (
    echo [OK] SETUP_COMPLETO.bat eliminado correctamente
)

if exist "SETUP_INTELIGENTE.bat" (
    echo [ADVERTENCIA] SETUP_INTELIGENTE.bat todavia existe - deberia estar eliminado
) else (
    echo [OK] SETUP_INTELIGENTE.bat eliminado correctamente
)

echo.
echo ===============================================
echo  VERIFICACION COMPLETADA
echo ===============================================
echo.
echo Si todos los checks dicen [OK], estas listo!
echo.
echo Para iniciar la aplicacion:
echo   Doble click en INICIO.bat
echo.
pause
