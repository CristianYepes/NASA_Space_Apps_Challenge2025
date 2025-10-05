import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Planet3D from '../components/Planet3D';
import Planet3DGLB from '../components/Planet3DGLB';
import './Home.css';

const Home: React.FC = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<'jupiter'>('jupiter');
  const planetSize = 0.8;

  // Configuración de cámara específica para Jupiter
   const getCameraSettings = () => {
     return {
       cameraOrbit: "45deg -10deg 60m", // Aumentado para que se vea más pequeño
       rotationSpeed: 0.15,
       fieldOfView: "45deg", // Reducido para hacer zoom out
       shadowIntensity: 1.5
     };
   };

  const cameraSettings = getCameraSettings();


  return (
    <div className="home">
      <Navbar />
      
      <section className="hero-planet-section">
        <div className="hero-content">
          <div className="header-content">
            <h1 className="header-title">Space Apps</h1>
            <p className="header-subtitle">Explora el universo digital</p>
          </div>
          
          <div className="planet-showcase">
            <div className="planet-selection">
              <div className="selection-card">
                <h3>Júpiter</h3>
                <div className="radio-group">
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="planet"
                      value="jupiter"
                      checked={true}
                      readOnly
                    />
                    <span className="radio-custom"></span>
                    <span className="radio-label">🪐 Júpiter</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="planet-display">
              <Planet3DGLB
                planetType={selectedPlanet}
                size={planetSize}
                rotationSpeed={cameraSettings.rotationSpeed}
                autoRotate={true}
                shadowIntensity={cameraSettings.shadowIntensity}
                cameraOrbit={cameraSettings.cameraOrbit}
                fieldOfView={cameraSettings.fieldOfView}
                environmentImage="https://modelviewer.dev/shared-assets/environments/spruit_sunrise_1k_HDR.jpg"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
