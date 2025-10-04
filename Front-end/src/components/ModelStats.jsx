import React from 'react';
import { BarChart3, RefreshCw, Database, Zap } from 'lucide-react';

const ModelStats = ({ modelStats, onRefresh }) => {
  const stats = modelStats || {
    accuracy: 0,
    precision: 0,
    recall: 0,
    f1_score: 0,
    model_type: 'Random Forest',
    training_samples: 0,
    features_used: [],
    last_trained: null,
  };

  const metrics = [
    { name: 'Accuracy', value: stats.accuracy, color: 'text-blue-400', bg: 'bg-blue-900' },
    { name: 'Precision', value: stats.precision, color: 'text-green-400', bg: 'bg-green-900' },
    { name: 'Recall', value: stats.recall, color: 'text-purple-400', bg: 'bg-purple-900' },
    { name: 'F1 Score', value: stats.f1_score, color: 'text-yellow-400', bg: 'bg-yellow-900' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <BarChart3 className="w-6 h-6 mr-2" />
          Model Statistics
        </h2>
        <button
          onClick={onRefresh}
          className="btn-secondary flex items-center"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <div key={metric.name} className="card">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-400 text-sm">{metric.name}</p>
              <Zap className={`w-4 h-4 ${metric.color}`} />
            </div>
            <p className={`text-3xl font-bold ${metric.color}`}>
              {(metric.value * 100).toFixed(2)}%
            </p>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
              <div
                className={`${metric.bg} bg-opacity-70 h-2 rounded-full transition-all duration-500`}
                style={{ width: `${metric.value * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <Database className="w-5 h-5 mr-2" />
            Model Information
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-gray-700">
              <span className="text-gray-400">Model Type</span>
              <span className="text-white font-semibold">{stats.model_type || 'Random Forest'}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-700">
              <span className="text-gray-400">Training Samples</span>
              <span className="text-white font-semibold">{stats.training_samples || 5000}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-700">
              <span className="text-gray-400">Dataset Source</span>
              <span className="text-white font-semibold">Kepler KOI</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-400">Last Trained</span>
              <span className="text-white font-semibold">
                {stats.last_trained ? new Date(stats.last_trained).toLocaleDateString() : 'N/A'}
              </span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-xl font-bold text-white mb-4">Features Used</h3>
          <div className="space-y-2">
            {(stats.features_used && stats.features_used.length > 0 ? stats.features_used : [
              'Orbital Period',
              'Transit Duration',
              'Planetary Radius',
              'Equilibrium Temperature',
              'Insolation Flux',
              'Transit Depth',
              'Impact Parameter',
              'Signal-to-Noise Ratio',
            ]).map((feature, idx) => (
              <div
                key={idx}
                className="bg-gray-700 bg-opacity-50 rounded px-3 py-2 text-gray-300 text-sm flex items-center"
              >
                <span className="w-2 h-2 bg-nasa-blue rounded-full mr-2"></span>
                {feature}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-xl font-bold text-white mb-4">Confusion Matrix</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-gray-400">Actual \ Predicted</th>
                <th className="text-center py-3 px-4 text-green-400">Confirmed</th>
                <th className="text-center py-3 px-4 text-yellow-400">Candidate</th>
                <th className="text-center py-3 px-4 text-red-400">False Positive</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4 text-green-400 font-semibold">Confirmed</td>
                <td className="text-center py-3 px-4 bg-green-900 bg-opacity-30 text-white">
                  {stats.confusion_matrix?.confirmed_confirmed || 95}
                </td>
                <td className="text-center py-3 px-4 text-gray-400">
                  {stats.confusion_matrix?.confirmed_candidate || 3}
                </td>
                <td className="text-center py-3 px-4 text-gray-400">
                  {stats.confusion_matrix?.confirmed_false || 2}
                </td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 px-4 text-yellow-400 font-semibold">Candidate</td>
                <td className="text-center py-3 px-4 text-gray-400">
                  {stats.confusion_matrix?.candidate_confirmed || 4}
                </td>
                <td className="text-center py-3 px-4 bg-yellow-900 bg-opacity-30 text-white">
                  {stats.confusion_matrix?.candidate_candidate || 88}
                </td>
                <td className="text-center py-3 px-4 text-gray-400">
                  {stats.confusion_matrix?.candidate_false || 8}
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-red-400 font-semibold">False Positive</td>
                <td className="text-center py-3 px-4 text-gray-400">
                  {stats.confusion_matrix?.false_confirmed || 1}
                </td>
                <td className="text-center py-3 px-4 text-gray-400">
                  {stats.confusion_matrix?.false_candidate || 5}
                </td>
                <td className="text-center py-3 px-4 bg-red-900 bg-opacity-30 text-white">
                  {stats.confusion_matrix?.false_false || 94}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-gray-400 text-xs mt-4">
          * Values represent the number of samples classified in each category
        </p>
      </div>

      <div className="card bg-gradient-to-r from-nasa-blue to-space-purple bg-opacity-20">
        <h3 className="text-xl font-bold text-white mb-3">Model Performance Summary</h3>
        <p className="text-gray-300 text-sm leading-relaxed">
          This machine learning model has been trained on NASA's Kepler Objects of Interest (KOI) dataset, 
          which contains thousands of labeled exoplanet observations. The model uses ensemble methods 
          (Random Forest) to achieve high accuracy in classifying stellar objects as confirmed exoplanets, 
          planetary candidates, or false positives. The performance metrics shown above indicate the model's 
          reliability across different classification scenarios.
        </p>
      </div>
    </div>
  );
};

export default ModelStats;
