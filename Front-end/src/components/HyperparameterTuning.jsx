import React, { useState } from 'react';
import { Settings, Save, RotateCcw } from 'lucide-react';
import { exoplanetService } from '../services/api';

const HyperparameterTuning = ({ onUpdate }) => {
  const [params, setParams] = useState({
    n_estimators: 100,
    max_depth: 10,
    min_samples_split: 2,
    min_samples_leaf: 1,
    learning_rate: 0.1,
    test_size: 0.2,
  });
  const [updating, setUpdating] = useState(false);
  const [retraining, setRetraining] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const value = e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value;
    setParams({
      ...params,
      [e.target.name]: value,
    });
  };

  const handleUpdate = async () => {
    try {
      setUpdating(true);
      setError(null);
      await exoplanetService.updateHyperparameters(params);
      setSuccess('Hyperparameters updated successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message || 'Failed to update hyperparameters');
    } finally {
      setUpdating(false);
    }
  };

  const handleRetrain = async () => {
    try {
      setRetraining(true);
      setError(null);
      await exoplanetService.retrainModel(params);
      setSuccess('Model retrained successfully!');
      if (onUpdate) onUpdate();
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message || 'Failed to retrain model');
    } finally {
      setRetraining(false);
    }
  };

  const resetToDefaults = () => {
    setParams({
      n_estimators: 100,
      max_depth: 10,
      min_samples_split: 2,
      min_samples_leaf: 1,
      learning_rate: 0.1,
      test_size: 0.2,
    });
    setSuccess(null);
    setError(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <Settings className="w-6 h-6 mr-2" />
          Hyperparameter Tuning
        </h2>
        <button
          onClick={resetToDefaults}
          className="flex items-center text-gray-400 hover:text-white transition"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset to Defaults
        </button>
      </div>

      <div className="card">
        <h3 className="text-lg font-bold text-white mb-4">Random Forest Parameters</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="label">
              Number of Estimators
              <span className="text-gray-500 ml-2 text-xs">(Trees in the forest)</span>
            </label>
            <input
              type="number"
              name="n_estimators"
              value={params.n_estimators}
              onChange={handleChange}
              min="10"
              max="1000"
              step="10"
              className="input-field"
            />
            <p className="text-gray-500 text-xs mt-1">
              Higher values improve performance but increase training time. Range: 10-1000
            </p>
          </div>

          <div>
            <label className="label">
              Maximum Depth
              <span className="text-gray-500 ml-2 text-xs">(Tree depth limit)</span>
            </label>
            <input
              type="number"
              name="max_depth"
              value={params.max_depth}
              onChange={handleChange}
              min="1"
              max="50"
              className="input-field"
            />
            <p className="text-gray-500 text-xs mt-1">
              Controls overfitting. Lower values prevent overfitting. Range: 1-50
            </p>
          </div>

          <div>
            <label className="label">
              Min Samples Split
              <span className="text-gray-500 ml-2 text-xs">(Split threshold)</span>
            </label>
            <input
              type="number"
              name="min_samples_split"
              value={params.min_samples_split}
              onChange={handleChange}
              min="2"
              max="20"
              className="input-field"
            />
            <p className="text-gray-500 text-xs mt-1">
              Minimum samples required to split a node. Range: 2-20
            </p>
          </div>

          <div>
            <label className="label">
              Min Samples Leaf
              <span className="text-gray-500 ml-2 text-xs">(Leaf threshold)</span>
            </label>
            <input
              type="number"
              name="min_samples_leaf"
              value={params.min_samples_leaf}
              onChange={handleChange}
              min="1"
              max="20"
              className="input-field"
            />
            <p className="text-gray-500 text-xs mt-1">
              Minimum samples required at a leaf node. Range: 1-20
            </p>
          </div>

          <div>
            <label className="label">
              Learning Rate
              <span className="text-gray-500 ml-2 text-xs">(Boosting only)</span>
            </label>
            <input
              type="number"
              name="learning_rate"
              value={params.learning_rate}
              onChange={handleChange}
              min="0.001"
              max="1"
              step="0.01"
              className="input-field"
            />
            <p className="text-gray-500 text-xs mt-1">
              Step size for gradient boosting. Range: 0.001-1.0
            </p>
          </div>

          <div>
            <label className="label">
              Test Size
              <span className="text-gray-500 ml-2 text-xs">(Train/test split)</span>
            </label>
            <input
              type="number"
              name="test_size"
              value={params.test_size}
              onChange={handleChange}
              min="0.1"
              max="0.5"
              step="0.05"
              className="input-field"
            />
            <p className="text-gray-500 text-xs mt-1">
              Fraction of data used for testing. Range: 0.1-0.5
            </p>
          </div>
        </div>

        {success && (
          <div className="mt-6 bg-green-900 bg-opacity-50 border border-green-700 text-green-100 px-4 py-3 rounded-lg">
            {success}
          </div>
        )}

        {error && (
          <div className="mt-6 bg-red-900 bg-opacity-50 border border-red-700 text-red-100 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <div className="flex space-x-4 mt-6">
          <button
            onClick={handleUpdate}
            disabled={updating}
            className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {updating ? (
              <span className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Updating...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <Save className="w-4 h-4 mr-2" />
                Update Parameters
              </span>
            )}
          </button>

          <button
            onClick={handleRetrain}
            disabled={retraining || updating}
            className="btn-secondary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {retraining ? (
              <span className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Retraining...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <Settings className="w-4 h-4 mr-2" />
                Retrain Model
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="card bg-yellow-900 bg-opacity-20 border border-yellow-800">
        <h3 className="text-lg font-bold text-yellow-400 mb-3">⚠️ Important Notes</h3>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Changing hyperparameters requires retraining the model, which may take several minutes.</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Higher n_estimators and max_depth values will increase training time and memory usage.</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Retraining will temporarily make the model unavailable for predictions.</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Default values are optimized for the Kepler dataset and provide good baseline performance.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HyperparameterTuning;
