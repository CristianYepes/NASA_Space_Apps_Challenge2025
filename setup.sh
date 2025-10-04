#!/bin/bash

# Exoplanet Hunter - Quick Start Script
# NASA Space Apps Challenge 2025

echo "🔭 Exoplanet Hunter - NASA Space Apps Challenge 2025"
echo "=================================================="
echo ""

# Check if Python is installed
if ! command -v python &> /dev/null; then
    echo "❌ Python is not installed. Please install Python 3.8+ first."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ first."
    exit 1
fi

echo "✅ Prerequisites check passed"
echo ""

# Setup Backend
echo "🐍 Setting up Backend..."
cd Back-end

if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python -m venv venv
fi

echo "Activating virtual environment..."
source venv/bin/activate  # On Windows: venv\Scripts\activate

echo "Installing Python dependencies..."
pip install -r requirements.txt

echo "✅ Backend setup complete"
echo ""

# Setup Frontend
echo "⚛️  Setting up Frontend..."
cd ../Front-end

if [ ! -d "node_modules" ]; then
    echo "Installing Node.js dependencies..."
    npm install
fi

echo "✅ Frontend setup complete"
echo ""

# Instructions
echo "=================================================="
echo "🚀 Setup Complete! Next steps:"
echo ""
echo "1. Start the Backend (in one terminal):"
echo "   cd Back-end"
echo "   source venv/bin/activate  # Windows: venv\\Scripts\\activate"
echo "   python app.py"
echo ""
echo "2. Start the Frontend (in another terminal):"
echo "   cd Front-end"
echo "   npm run dev"
echo ""
echo "3. Open your browser:"
echo "   http://localhost:3000"
echo ""
echo "=================================================="
echo "Happy exoplanet hunting! 🌟"
