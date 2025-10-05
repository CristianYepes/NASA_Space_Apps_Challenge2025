import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Planet3D from '../components/Planet3D';
import Planet3DGLB from '../components/Planet3DGLB';
import './Home.css';

const Home: React.FC = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<'moon' | 'jupiter' | 'earth' | 'planet' | 'planet1'>('moon');
  const planetSize = 0.8;

  // Configuración de cámara específica para cada planeta
  const getCameraSettings = (planet: 'moon' | 'jupiter' | 'earth' | 'planet' | 'planet1') => {
    switch (planet) {
      case 'jupiter':
        return {
          cameraOrbit: "60deg -15deg 50m",
          rotationSpeed: 0.2,
          fieldOfView: "75deg"
        };
      case 'earth':
        return {
          cameraOrbit: "60deg -15deg 35m",
          rotationSpeed: 0.25,
          fieldOfView: "70deg"
        };
      case 'planet':
        return {
          cameraOrbit: "60deg -15deg 40m",
          rotationSpeed: 0.3,
          fieldOfView: "68deg"
        };
      case 'planet1':
        return {
          cameraOrbit: "60deg -15deg 45m",
          rotationSpeed: 0.28,
          fieldOfView: "72deg"
        };
      case 'moon':
      default:
        return {
          cameraOrbit: "60deg -15deg 30m",
          rotationSpeed: 0.3,
          fieldOfView: "65deg"
        };
    }
  };

  const cameraSettings = getCameraSettings(selectedPlanet);


  return (
    <div className="home">
      <Navbar />
      <Header />
      
      <section className="planet-section">
        <div className="container">
          <h2 className="section-title">Planeta 3D Interactivo</h2>
          <p className="section-description">
            Explora y personaliza tu propio planeta con diferentes configuraciones
          </p>
          
          <div className="planet-showcase">
            <div className="planet-selection">
              <h3>Selecciona un Planeta</h3>
              <div className="radio-group">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="planet"
                    value="moon"
                    checked={selectedPlanet === 'moon'}
                    onChange={(e) => setSelectedPlanet(e.target.value as 'moon' | 'jupiter' | 'earth' | 'planet' | 'planet1')}
                  />
                  <span className="radio-custom"></span>
                  <span className="radio-label">🌙 Luna</span>
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="planet"
                    value="jupiter"
                    checked={selectedPlanet === 'jupiter'}
                    onChange={(e) => setSelectedPlanet(e.target.value as 'moon' | 'jupiter' | 'earth' | 'planet' | 'planet1')}
                  />
                  <span className="radio-custom"></span>
                  <span className="radio-label">🪐 Júpiter</span>
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="planet"
                    value="earth"
                    checked={selectedPlanet === 'earth'}
                    onChange={(e) => setSelectedPlanet(e.target.value as 'moon' | 'jupiter' | 'earth' | 'planet' | 'planet1')}
                  />
                  <span className="radio-custom"></span>
                  <span className="radio-label">🌍 Tierra</span>
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="planet"
                    value="planet"
                    checked={selectedPlanet === 'planet'}
                    onChange={(e) => setSelectedPlanet(e.target.value as 'moon' | 'jupiter' | 'earth' | 'planet' | 'planet1')}
                  />
                  <span className="radio-custom"></span>
                  <span className="radio-label">🪨 Planeta</span>
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="planet"
                    value="planet1"
                    checked={selectedPlanet === 'planet1'}
                    onChange={(e) => setSelectedPlanet(e.target.value as 'moon' | 'jupiter' | 'earth' | 'planet' | 'planet1')}
                  />
                  <span className="radio-custom"></span>
                  <span className="radio-label">⭐ Planeta 1</span>
                </label>
              </div>
            </div>

            <div className="planet-display">
              <Planet3DGLB 
                planetType={selectedPlanet}
                size={planetSize}
                rotationSpeed={cameraSettings.rotationSpeed}
                autoRotate={true}
                shadowIntensity={1.2}
                cameraOrbit={cameraSettings.cameraOrbit}
                fieldOfView={cameraSettings.fieldOfView}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
