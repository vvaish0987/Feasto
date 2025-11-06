@echo off
REM FEASTO Quick Deploy Script for Windows
REM This script helps you deploy to Vercel quickly

echo ========================================
echo    FEASTO Deployment Helper
echo ========================================
echo.

REM Check if Vercel CLI is installed
where vercel >nul 2>nul
if %errorlevel% neq 0 (
    echo [WARNING] Vercel CLI not found!
    echo Installing Vercel CLI globally...
    call npm install -g vercel
    echo [SUCCESS] Vercel CLI installed!
    echo.
)

REM Check if logged in to Vercel
echo [INFO] Checking Vercel login status...
call vercel whoami >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Not logged in to Vercel
    echo Please login to Vercel:
    call vercel login
) else (
    echo [SUCCESS] Already logged in to Vercel
)

echo.
echo [INFO] Building project locally first...
call npm run build

if %errorlevel% equ 0 (
    echo [SUCCESS] Build successful!
    echo.
    echo Ready to deploy!
    echo.
    echo Choose deployment option:
    echo 1^) Deploy to preview
    echo 2^) Deploy to production
    echo 3^) Cancel
    echo.
    set /p choice="Enter choice (1-3): "

    if "%choice%"=="1" (
        echo [INFO] Deploying to preview environment...
        call vercel
    ) else if "%choice%"=="2" (
        echo [INFO] Deploying to production...
        call vercel --prod
    ) else if "%choice%"=="3" (
        echo [INFO] Deployment cancelled
        exit /b 0
    ) else (
        echo [ERROR] Invalid choice
        exit /b 1
    )
) else (
    echo [ERROR] Build failed! Please fix errors before deploying.
    exit /b 1
)

echo.
echo [SUCCESS] Deployment complete!
echo [REMINDER] Don't forget to update Firebase authorized domains!
pause
