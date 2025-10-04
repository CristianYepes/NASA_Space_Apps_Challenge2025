import React, { useState } from 'react';
import { Edit, Sparkles, Info } from 'lucide-react';
import { exoplanetService } from '../services/api';

const ManualInput = ({ onPrediction }) => {
  const [formData, setFormData] = useState({
    koi_period: '',
    koi_duration: '',
    koi_prad: '',
    koi_teq: '',
    koi_insol: '',
    koi_depth: '',
    koi_impact: '',
    koi_model_snr: '',
  });
  const [predicting, setPredicting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const fields = [
    { name: 'koi_period', label: 'Orbital Period', unit: 'days', description: 'Time for one complete orbit' },
    { name: 'koi_duration', label: 'Transit Duration', unit: 'hours', description: 'Duration of the transit event' },
    { name: 'koi_prad', label: 'Planetary Radius', unit: 'Earth radii', description: 'Size relative to Earth' },
    { name: 'koi_teq', label: 'Equilibrium Temperature', unit: 'K', description: 'Estimated surface temperature' },
    { name: 'koi_insol', label: 'Insolation Flux', unit: 'Earth flux', description: 'Stellar radiation received' },
    { name: 'koi_depth', label: 'Transit Depth', unit: 'ppm', description: 'Depth of the light curve dip' },
    { name: 'koi_impact', label: 'Impact Parameter', unit: '', description: 'Sky-projected distance' },
    { name: 'koi_model_snr', label: 'Model SNR', unit: '', description: 'Signal-to-noise ratio' },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate that at least some fields are filled
    const filledFields = Object.values(formData).filter(val => val !== '').length;
    if (filledFields === 0) {
      setError('Please fill in at least one field');
      return;
    }

    try {
      setPredicting(true);
      setError(null);
      
      // Convert string values to numbers
      const data = {};
      Object.keys(formData).forEach(key => {
        if (formData[key] !== '') {
          data[key] = parseFloat(formData[key]);
        }
      });

      const response = await exoplanetService.predictSingle(data);
      setResult(response);
      
      onPrediction({
        classification: response.classification,
        confidence: response.confidence,
        timestamp: new Date().toISOString(),
        data: data,
      });
    } catch (err) {
      setError(err.message || 'Failed to make prediction. Please check your input.');
    } finally {
      setPredicting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      koi_period: '',
      koi_duration: '',
      koi_prad: '',
      koi_teq: '',
      koi_insol: '',
      koi_depth: '',
      koi_impact: '',
      koi_model_snr: '',
    });
    setResult(null);
    setError(null);
  };

  const loadExample = () => {
    setFormData({
      koi_period: '9.4877',
      koi_duration: '2.732',
      koi_prad: '1.94',
      koi_teq: '1134',
      koi_insol: '141.7',
      koi_depth: '615.8',
      koi_impact: '0.146',
      koi_model_snr: '131.9',
    });
    setResult(null);
    setError(null);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <Edit className="w-6 h-6 mr-2" />
            Manual Data Input
          </h2>
          <button
            onClick={loadExample}
            className="btn-secondary text-sm"
          >
            Load Example Data
          </button>
        </div>

        <div className="bg-blue-900 bg-opacity-20 border border-blue-800 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <Info className="w-5 h-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
            <p className="text-gray-300 text-sm">
              Enter the parameters of a stellar object to classify it. You don't need to fill all fields - 
              the model can work with partial data. Values should be numeric.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map((field) => (
              <div key={field.name}>
                <label className="label">
                  {field.label}
                  {field.unit && <span className="text-gray-500 ml-1">({field.unit})</span>}
                </label>
                <input
                  type="number"
                  step="any"
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.description}
                  className="input-field"
                />
              </div>
            ))}
          </div>

          {error && (
            <div className="bg-red-900 bg-opacity-50 border border-red-700 text-red-100 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={predicting}
              className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {predicting ? (
                <span className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Analyzing...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Predict Classification
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition duration-300"
            >
              Reset
            </button>
          </div>
        </form>
      </div>

      {result && (
        <div className="card">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <Sparkles className="w-6 h-6 mr-2 text-yellow-400" />
            Prediction Result
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-gray-700 bg-opacity-50 rounded-lg p-6">
                <p className="text-gray-400 text-sm mb-2">Classification</p>
                <p className={`text-3xl font-bold ${
                  result.classification === 'CONFIRMED' ? 'text-green-400' :
                  result.classification === 'CANDIDATE' ? 'text-yellow-400' :
                  'text-red-400'
                }`}>
                  {result.classification}
                </p>
              </div>
              
              <div className="bg-gray-700 bg-opacity-50 rounded-lg p-6">
                <p className="text-gray-400 text-sm mb-2">Confidence Level</p>
                <div className="flex items-end space-x-2">
                  <p className="text-3xl font-bold text-white">
                    {(result.confidence * 100).toFixed(2)}%
                  </p>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2 mt-3">
                  <div
                    className="bg-nasa-blue h-2 rounded-full transition-all duration-500"
                    style={{ width: `${result.confidence * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="bg-gray-700 bg-opacity-50 rounded-lg p-6">
              <p className="text-gray-400 text-sm mb-3">Interpretation</p>
              <div className="space-y-2 text-gray-300 text-sm">
                {result.classification === 'CONFIRMED' && (
                  <p>✓ This object shows strong characteristics of a confirmed exoplanet. The model is highly confident in this classification.</p>
                )}
                {result.classification === 'CANDIDATE' && (
                  <p>⚠ This object is a potential exoplanet candidate. Further observation and analysis may be needed for confirmation.</p>
                )}
                {result.classification === 'FALSE POSITIVE' && (
                  <p>✗ This object is likely not an exoplanet. The signal may be caused by stellar activity or instrumental noise.</p>
                )}
                <div className="mt-4 pt-4 border-t border-gray-600">
                  <p className="font-semibold mb-2">Recommendation:</p>
                  {result.confidence > 0.8 ? (
                    <p>High confidence prediction - classification is reliable.</p>
                  ) : result.confidence > 0.6 ? (
                    <p>Moderate confidence - consider additional data points.</p>
                  ) : (
                    <p>Low confidence - more data needed for accurate classification.</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {result.probabilities && (
            <div className="mt-6 bg-gray-700 bg-opacity-30 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-3">Class Probabilities</p>
              <div className="space-y-2">
                {Object.entries(result.probabilities).map(([className, prob]) => (
                  <div key={className} className="flex items-center justify-between">
                    <span className="text-gray-300">{className}</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-48 bg-gray-600 rounded-full h-2">
                        <div
                          className="bg-nasa-blue h-2 rounded-full transition-all duration-500"
                          style={{ width: `${prob * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-gray-400 text-sm w-16 text-right">
                        {(prob * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ManualInput;
