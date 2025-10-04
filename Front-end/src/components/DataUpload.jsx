import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { exoplanetService } from '../services/api';

const DataUpload = ({ onPrediction }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.name.endsWith('.csv')) {
        setFile(selectedFile);
        setError(null);
      } else {
        setError('Please select a CSV file');
        setFile(null);
      }
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    try {
      setUploading(true);
      setError(null);
      const response = await exoplanetService.uploadFile(file);
      setResults(response);
      
      // Add predictions to the list
      if (response.predictions) {
        response.predictions.forEach(pred => {
          onPrediction({
            ...pred,
            timestamp: new Date().toISOString(),
          });
        });
      }
    } catch (err) {
      setError(err.message || 'Failed to upload file. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.name.endsWith('.csv')) {
      setFile(droppedFile);
      setError(null);
    } else {
      setError('Please drop a CSV file');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="card">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
          <Upload className="w-6 h-6 mr-2" />
          Upload Dataset
        </h2>
        <p className="text-gray-400 mb-6">
          Upload a CSV file containing exoplanet observation data. The file should include columns such as orbital period, 
          transit duration, planetary radius, and other relevant parameters.
        </p>

        <div
          className="border-2 border-dashed border-gray-600 rounded-lg p-12 text-center hover:border-nasa-blue transition duration-300 cursor-pointer"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => document.getElementById('fileInput').click()}
        >
          <input
            id="fileInput"
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="hidden"
          />
          <Upload className="w-16 h-16 mx-auto mb-4 text-gray-500" />
          {file ? (
            <div className="flex items-center justify-center space-x-2">
              <FileText className="w-5 h-5 text-green-400" />
              <p className="text-white font-medium">{file.name}</p>
            </div>
          ) : (
            <>
              <p className="text-gray-300 mb-2">Drag and drop your CSV file here</p>
              <p className="text-gray-500 text-sm">or click to browse</p>
            </>
          )}
        </div>

        {error && (
          <div className="mt-4 bg-red-900 bg-opacity-50 border border-red-700 text-red-100 px-4 py-3 rounded-lg flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={!file || uploading}
          className="btn-primary w-full mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? (
            <span className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Processing...
            </span>
          ) : (
            'Upload and Analyze'
          )}
        </button>
      </div>

      {results && (
        <div className="card">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <CheckCircle className="w-6 h-6 mr-2 text-green-400" />
            Analysis Results
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-700 bg-opacity-50 rounded-lg p-4">
              <p className="text-gray-400 text-sm">Total Analyzed</p>
              <p className="text-2xl font-bold text-white mt-1">{results.total || 0}</p>
            </div>
            <div className="bg-green-900 bg-opacity-30 rounded-lg p-4">
              <p className="text-gray-400 text-sm">Confirmed Exoplanets</p>
              <p className="text-2xl font-bold text-green-400 mt-1">{results.confirmed || 0}</p>
            </div>
            <div className="bg-yellow-900 bg-opacity-30 rounded-lg p-4">
              <p className="text-gray-400 text-sm">Candidates</p>
              <p className="text-2xl font-bold text-yellow-400 mt-1">{results.candidates || 0}</p>
            </div>
          </div>

          {results.predictions && results.predictions.length > 0 && (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              <h4 className="text-lg font-semibold text-white mb-3">Predictions</h4>
              {results.predictions.slice(0, 10).map((pred, idx) => (
                <div key={idx} className="bg-gray-700 bg-opacity-30 rounded p-3 flex items-center justify-between">
                  <span className="text-gray-300">Object {idx + 1}</span>
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      pred.classification === 'CONFIRMED' ? 'bg-green-900 bg-opacity-30 text-green-400' :
                      pred.classification === 'CANDIDATE' ? 'bg-yellow-900 bg-opacity-30 text-yellow-400' :
                      'bg-red-900 bg-opacity-30 text-red-400'
                    }`}>
                      {pred.classification}
                    </span>
                    <span className="text-sm text-gray-400">
                      {(pred.confidence * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              ))}
              {results.predictions.length > 10 && (
                <p className="text-gray-500 text-sm text-center mt-2">
                  Showing 10 of {results.predictions.length} predictions
                </p>
              )}
            </div>
          )}
        </div>
      )}

      <div className="card bg-blue-900 bg-opacity-20">
        <h3 className="text-lg font-bold text-white mb-3">Expected CSV Format</h3>
        <div className="bg-gray-800 bg-opacity-50 rounded p-4 overflow-x-auto">
          <table className="text-sm text-gray-300">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="text-left py-2 px-3">Column</th>
                <th className="text-left py-2 px-3">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-700">
                <td className="py-2 px-3 font-mono text-nasa-blue">koi_period</td>
                <td className="py-2 px-3">Orbital period (days)</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2 px-3 font-mono text-nasa-blue">koi_duration</td>
                <td className="py-2 px-3">Transit duration (hours)</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2 px-3 font-mono text-nasa-blue">koi_prad</td>
                <td className="py-2 px-3">Planetary radius (Earth radii)</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-mono text-nasa-blue">...</td>
                <td className="py-2 px-3">Additional parameters</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataUpload;
