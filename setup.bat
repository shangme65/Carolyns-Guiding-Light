@echo off
echo.
echo ========================================================================
echo     Carolyn's Guiding Light - Windows Setup Script
echo ========================================================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed. Please install Node.js 18+ first.
    echo Download from: https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo [OK] Node.js %NODE_VERSION% detected
echo.

REM Check if npm is installed
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] npm is not installed.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo [OK] npm %NPM_VERSION% detected
echo.

REM Install dependencies
echo [STEP 1/5] Installing dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install dependencies
    pause
    exit /b 1
)
echo [OK] Dependencies installed successfully
echo.

REM Check for .env.local
if not exist .env.local (
    echo [STEP 2/5] Creating .env.local from .env.example...
    copy .env.example .env.local
    echo [OK] Created .env.local
    echo.
    echo [WARNING] Please update .env.local with your actual values:
    echo    - DATABASE_URL from Neon PostgreSQL
    echo    - NEXTAUTH_SECRET generate with: openssl rand -base64 32
    echo.
) else (
    echo [STEP 2/5] .env.local already exists
    echo.
)

REM Generate Prisma Client
echo [STEP 3/5] Generating Prisma Client...
call npx prisma generate
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to generate Prisma Client
    pause
    exit /b 1
)
echo [OK] Prisma Client generated
echo.

REM Ask about database setup
set /p DB_SETUP="[STEP 4/5] Push database schema to your database? (Y/N): "
if /i "%DB_SETUP%"=="Y" (
    echo Pushing database schema...
    call npm run db:push
    if %ERRORLEVEL% NEQ 0 (
        echo [ERROR] Failed to push database schema
        echo Make sure your DATABASE_URL is correct in .env.local
        pause
        exit /b 1
    )
    echo [OK] Database schema pushed successfully
    echo.
    
    REM Ask about seeding
    set /p DB_SEED="[STEP 5/5] Seed database with sample data? (Y/N): "
    if /i "%DB_SEED%"=="Y" (
        echo Seeding database...
        call npm run db:seed
        if %ERRORLEVEL% NEQ 0 (
            echo [ERROR] Failed to seed database
            pause
            exit /b 1
        )
        echo [OK] Database seeded successfully
        echo.
        echo Default login credentials:
        echo    Admin: admin@carolynsguidinglight.com / admin123
        echo    Demo: demo@example.com / demo123
        echo.
    )
) else (
    echo [STEP 4/5] Skipped database schema push
    echo [STEP 5/5] Skipped database seeding
    echo.
)

echo ========================================================================
echo     Setup Completed Successfully!
echo ========================================================================
echo.
echo To start the development server, run:
echo    npm run dev
echo.
echo For deployment instructions, see DEPLOYMENT.md
echo.
echo Don't forget to:
echo    1. Update your .env.local with real credentials
echo    2. Change default passwords in production
echo    3. Review the README.md for more information
echo.
echo ========================================================================
echo.
pause
