import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import DataUpload from './components/DataUpload';
import ManualInput from './components/ManualInput';
import ModelStats from './components/ModelStats';
import ResultsDisplay from './components/ResultsDisplay';
import HyperparameterTuning from './components/HyperparameterTuning';
import Planet3D from './components/Planet3D';
import { exoplanetService } from './services/api';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [modelStats, setModelStats] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Estado del planeta 3D (se actualiza con las predicciones)
  const [planetData, setPlanetData] = useState({
    radius: 2.26,
    temperature: 793
  });

  useEffect(() => {
    loadModelStats();
  }, []);

  const loadModelStats = async () => {
    try {
      setLoading(true);
      const stats = await exoplanetService.getModelStats();
      setModelStats(stats);
      setError(null);
    } catch (err) {
      setError('Failed to load model statistics. Make sure the backend is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePrediction = (newPrediction) => {
    setPredictions(prev => [newPrediction, ...prev]);
    
    // Actualizar planeta 3D con los datos de la predicción
    if (newPrediction.input) {
      setPlanetData({
        radius: newPrediction.input.koi_prad || 2.26,
        temperature: newPrediction.input.koi_teq || 793
      });
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard modelStats={modelStats} predictions={predictions} />;
      case 'upload':
        return <DataUpload onPrediction={handlePrediction} />;
      case 'manual':
        return <ManualInput onPrediction={handlePrediction} />;
      case 'stats':
        return <ModelStats modelStats={modelStats} onRefresh={loadModelStats} />;
      case 'hyperparameters':
        return <HyperparameterTuning onUpdate={loadModelStats} />;
      case 'results':
        return <ResultsDisplay predictions={predictions} />;
      default:
        return <Dashboard modelStats={modelStats} predictions={predictions} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-space-dark via-indigo-950 to-purple-950">
      {/* Planeta 3D animado en el fondo - SE ACTUALIZA CON LAS PREDICCIONES */}
      <Planet3D 
        planetRadius={planetData.radius} 
        temperature={planetData.temperature}
      />
      
      {/* Animated stars background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full star"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="container mx-auto px-4 py-8">
          {error && (
            <div className="bg-red-900 bg-opacity-80 border border-red-700 text-red-100 px-4 py-3 rounded-lg mb-6">
              <p className="font-bold">Error</p>
              <p>{error}</p>
            </div>
          )}
          
          {loading && !modelStats ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-nasa-blue"></div>
            </div>
          ) : (
            renderContent()
          )}
        </main>

        <footer className="text-center text-gray-400 py-6 mt-12">
          <p>NASA Space Apps Challenge 2025 - Exoplanet Hunter</p>
          <p className="text-sm mt-2">Powered by AI/ML for Space Exploration</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
