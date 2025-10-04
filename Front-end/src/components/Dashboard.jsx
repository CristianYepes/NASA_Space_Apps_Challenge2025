import React from 'react';
import { Activity, Target, TrendingUp, Database } from 'lucide-react';
import Chart from './Chart';

const Dashboard = ({ modelStats, predictions }) => {
  const stats = modelStats || {
    accuracy: 0,
    precision: 0,
    recall: 0,
    f1_score: 0,
    total_predictions: 0,
  };

  const recentPredictions = predictions.slice(0, 5);

  const getClassificationColor = (classification) => {
    switch (classification) {
      case 'CONFIRMED':
        return 'text-green-400 bg-green-900 bg-opacity-30';
      case 'CANDIDATE':
        return 'text-yellow-400 bg-yellow-900 bg-opacity-30';
      case 'FALSE POSITIVE':
        return 'text-red-400 bg-red-900 bg-opacity-30';
      default:
        return 'text-gray-400 bg-gray-900 bg-opacity-30';
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Model Accuracy</p>
              <p className="text-3xl font-bold text-white mt-2">
                {(stats.accuracy * 100).toFixed(2)}%
              </p>
            </div>
            <Target className="w-12 h-12 text-nasa-blue opacity-50" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Precision</p>
              <p className="text-3xl font-bold text-white mt-2">
                {(stats.precision * 100).toFixed(2)}%
              </p>
            </div>
            <Activity className="w-12 h-12 text-green-500 opacity-50" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Recall</p>
              <p className="text-3xl font-bold text-white mt-2">
                {(stats.recall * 100).toFixed(2)}%
              </p>
            </div>
            <TrendingUp className="w-12 h-12 text-purple-500 opacity-50" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Predictions</p>
              <p className="text-3xl font-bold text-white mt-2">
                {stats.total_predictions || predictions.length}
              </p>
            </div>
            <Database className="w-12 h-12 text-yellow-500 opacity-50" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-bold text-white mb-4">Model Performance</h2>
          <Chart type="bar" modelStats={stats} />
        </div>

        <div className="card">
          <h2 className="text-xl font-bold text-white mb-4">Classification Distribution</h2>
          <Chart type="doughnut" modelStats={stats} />
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center">
          <Activity className="w-5 h-5 mr-2" />
          Recent Predictions
        </h2>
        {recentPredictions.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No predictions yet. Try uploading data or using manual input.</p>
        ) : (
          <div className="space-y-3">
            {recentPredictions.map((pred, idx) => (
              <div key={idx} className="bg-gray-700 bg-opacity-50 rounded-lg p-4 border border-gray-600">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-gray-400">Prediction #{predictions.length - idx}</p>
                    <div className="flex items-center mt-2 space-x-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getClassificationColor(pred.classification)}`}>
                        {pred.classification}
                      </span>
                      <span className="text-sm text-gray-300">
                        Confidence: {(pred.confidence * 100).toFixed(2)}%
                      </span>
                    </div>
                  </div>
                  <div className="text-right text-xs text-gray-500">
                    {new Date(pred.timestamp).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="card bg-gradient-to-r from-nasa-blue to-space-purple bg-opacity-20">
        <div className="flex items-start space-x-4">
          <div className="bg-white bg-opacity-10 p-3 rounded-lg">
            <Database className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white mb-2">About This Project</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              This AI-powered exoplanet detection system uses machine learning models trained on NASA's Kepler, K2, and TESS mission datasets. 
              The system can analyze transit light curves and other stellar parameters to identify potential exoplanets with high accuracy.
              Upload your own data or use the manual input to classify new observations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
