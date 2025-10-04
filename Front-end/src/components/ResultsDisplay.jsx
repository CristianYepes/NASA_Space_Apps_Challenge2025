import React, { useState } from 'react';
import { FileText, Download, Filter } from 'lucide-react';

const ResultsDisplay = ({ predictions }) => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const filteredPredictions = predictions.filter(pred => {
    if (filter === 'all') return true;
    return pred.classification === filter;
  });

  const sortedPredictions = [...filteredPredictions].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.timestamp) - new Date(a.timestamp);
    } else if (sortBy === 'oldest') {
      return new Date(a.timestamp) - new Date(b.timestamp);
    } else if (sortBy === 'confidence') {
      return b.confidence - a.confidence;
    }
    return 0;
  });

  const exportToCSV = () => {
    const headers = ['Timestamp', 'Classification', 'Confidence', 'Data'];
    const rows = predictions.map(pred => [
      new Date(pred.timestamp).toISOString(),
      pred.classification,
      pred.confidence,
      JSON.stringify(pred.data || {}),
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.join(',')),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `exoplanet_predictions_${new Date().toISOString()}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getClassificationColor = (classification) => {
    switch (classification) {
      case 'CONFIRMED':
        return 'text-green-400 bg-green-900 bg-opacity-30 border-green-700';
      case 'CANDIDATE':
        return 'text-yellow-400 bg-yellow-900 bg-opacity-30 border-yellow-700';
      case 'FALSE POSITIVE':
        return 'text-red-400 bg-red-900 bg-opacity-30 border-red-700';
      default:
        return 'text-gray-400 bg-gray-900 bg-opacity-30 border-gray-700';
    }
  };

  const stats = {
    total: predictions.length,
    confirmed: predictions.filter(p => p.classification === 'CONFIRMED').length,
    candidates: predictions.filter(p => p.classification === 'CANDIDATE').length,
    falsePositives: predictions.filter(p => p.classification === 'FALSE POSITIVE').length,
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <FileText className="w-6 h-6 mr-2" />
          Prediction Results
        </h2>
        {predictions.length > 0 && (
          <button
            onClick={exportToCSV}
            className="btn-secondary flex items-center"
          >
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <p className="text-gray-400 text-sm">Total Predictions</p>
          <p className="text-3xl font-bold text-white mt-2">{stats.total}</p>
        </div>
        <div className="card bg-green-900 bg-opacity-20">
          <p className="text-gray-400 text-sm">Confirmed</p>
          <p className="text-3xl font-bold text-green-400 mt-2">{stats.confirmed}</p>
        </div>
        <div className="card bg-yellow-900 bg-opacity-20">
          <p className="text-gray-400 text-sm">Candidates</p>
          <p className="text-3xl font-bold text-yellow-400 mt-2">{stats.candidates}</p>
        </div>
        <div className="card bg-red-900 bg-opacity-20">
          <p className="text-gray-400 text-sm">False Positives</p>
          <p className="text-3xl font-bold text-red-400 mt-2">{stats.falsePositives}</p>
        </div>
      </div>

      <div className="card">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="input-field"
            >
              <option value="all">All Classifications</option>
              <option value="CONFIRMED">Confirmed Only</option>
              <option value="CANDIDATE">Candidates Only</option>
              <option value="FALSE POSITIVE">False Positives Only</option>
            </select>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input-field"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="confidence">Highest Confidence</option>
          </select>
        </div>

        {sortedPredictions.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 mx-auto text-gray-600 mb-4" />
            <p className="text-gray-400 text-lg">No predictions yet</p>
            <p className="text-gray-500 text-sm mt-2">
              Upload data or use manual input to start making predictions
            </p>
          </div>
        ) : (
          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
            {sortedPredictions.map((pred, idx) => (
              <div
                key={idx}
                className="bg-gray-700 bg-opacity-30 rounded-lg p-4 border border-gray-600 hover:border-nasa-blue transition duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getClassificationColor(pred.classification)}`}>
                        {pred.classification}
                      </span>
                      <span className="text-sm text-gray-400">
                        Confidence: {(pred.confidence * 100).toFixed(2)}%
                      </span>
                    </div>
                    
                    {pred.data && Object.keys(pred.data).length > 0 && (
                      <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2">
                        {Object.entries(pred.data).slice(0, 4).map(([key, value]) => (
                          <div key={key} className="bg-gray-800 bg-opacity-50 rounded px-2 py-1">
                            <p className="text-xs text-gray-500">{key}</p>
                            <p className="text-sm text-gray-300">{typeof value === 'number' ? value.toFixed(3) : value}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="text-right ml-4">
                    <p className="text-xs text-gray-500">
                      {new Date(pred.timestamp).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-gray-600">
                      {new Date(pred.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsDisplay;
