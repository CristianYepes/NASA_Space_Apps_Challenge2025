import React, { useEffect, useState, useRef } from 'react';
import './Planet3D.css';

export default function Planet3D({ planetRadius = 2.26, temperature = 793 }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const planetRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const progress = Math.min(scrolled / Math.max(scrollHeight, 1), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determinar tipo de planeta según tamaño
  const getPlanetType = () => {
    if (planetRadius < 1.5) return 'super-earth';
    if (planetRadius < 4) return 'neptune';
    if (planetRadius < 10) return 'sub-neptune';
    return 'gas-giant';
  };

  const getPlanetColor = () => {
    if (planetRadius < 1.5) return '#4A90E2'; // Azul
    if (planetRadius < 4) return '#E67E22'; // Naranja
    if (planetRadius < 10) return '#9B59B6'; // Morado
    return '#F39C12'; // Dorado
  };

  const planetType = getPlanetType();
  const planetColor = getPlanetColor();

  // Calcular transformaciones basadas en el scroll - MÁS DRAMÁTICO
  const normalizedSize = Math.max(0.5, Math.min(planetRadius / 3, 3));
  const baseScale = normalizedSize * 0.8; // Más pequeño al inicio
  const scale = baseScale + (scrollProgress * 2); // Crece mucho más al hacer scroll
  const translateZ = scrollProgress * 500; // Más profundidad
  const rotate = scrollProgress * 360; // Rotación completa
  const translateY = -scrollProgress * 200; // Se mueve hacia arriba

  return (
    <div className="planet-3d-container">
      {/* Fondo estrellado mejorado */}
      <div className="stars-background">
        {[...Array(200)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
              opacity: Math.random() * 0.8 + 0.2,
            }}
          />
        ))}
      </div>

      {/* Nebulosa de fondo */}
      <div className="nebula-background"></div>

      {/* Planeta principal */}
      <div
        ref={planetRef}
        className={`planet-3d-wrapper planet-type-${planetType}`}
        style={{
          transform: `
            translate(-50%, -50%)
            translateZ(${translateZ}px)
            translateY(${translateY}px)
            scale3d(${scale}, ${scale}, ${scale})
            rotateY(${rotate}deg)
            rotateX(${scrollProgress * 30}deg)
            rotateZ(${scrollProgress * 10}deg)
          `,
        }}
      >
        {/* Núcleo del planeta */}
        <div 
          className="planet-sphere"
          style={{
            /* Gradiente radial para dar VOLUMEN 3D real */
            background: `
              radial-gradient(
                circle at 35% 35%,
                ${planetColor}ff 0%,
                ${planetColor}ee 20%,
                ${planetColor}cc 40%,
                ${planetColor}99 60%,
                ${planetColor}66 75%,
                ${planetColor}33 90%,
                ${planetColor}11 100%
              )
            `,
            boxShadow: `
              /* Brillo exterior según el color del planeta */
              0 0 120px ${planetColor}88,
              /* Sombra interior PROFUNDA para dar volumen */
              inset -80px -80px 150px rgba(0, 0, 0, 0.9),
              /* Highlight superior izquierdo para simular luz */
              inset 60px 60px 120px rgba(255, 255, 255, 0.25),
              /* Sombra proyectada */
              30px 30px 100px rgba(0, 0, 0, 0.7)
            `,
          }}
        >
          {/* Textura de superficie */}
          <div className="planet-texture"></div>

          {/* Nubes (solo para planetas pequeños) */}
          {planetRadius < 3 && (
            <div className="planet-clouds"></div>
          )}

          {/* Atmósfera brillante */}
          <div 
            className="planet-atmosphere"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${planetColor}44, transparent)`,
              boxShadow: `0 0 80px ${planetColor}88`,
            }}
          ></div>
        </div>

        {/* Anillo (solo para planetas grandes) */}
        {planetRadius > 10 && (
          <div className="planet-ring-system">
            <div 
              className="planet-ring"
              style={{
                background: `
                  radial-gradient(
                    ellipse,
                    transparent 40%,
                    ${planetColor}44 45%,
                    ${planetColor}88 50%,
                    ${planetColor}44 55%,
                    transparent 60%
                  )
                `,
                boxShadow: `0 0 40px ${planetColor}66`,
              }}
            ></div>
          </div>
        )}

        {/* Lunas (para planetas medianos) */}
        {planetRadius > 3 && planetRadius < 10 && (
          <>
            <div className="moon-orbit moon-orbit-1">
              <div className="moon moon-1"></div>
            </div>
            <div className="moon-orbit moon-orbit-2">
              <div className="moon moon-2"></div>
            </div>
          </>
        )}
      </div>

      {/* HUD de información */}
      <div className="planet-info-hud">
        <div className="hud-header">
          <span className="hud-icon">⚡</span>
          <span className="hud-title">LIVE EXOPLANET DATA</span>
        </div>
        
        <div className="hud-data-row">
          <span className="hud-label">🌍 Radius:</span>
          <span className="hud-value hud-value-primary">
            {planetRadius.toFixed(2)} R⊕
          </span>
        </div>
        
        <div className="hud-data-row">
          <span className="hud-label">🌡️ Temp:</span>
          <span 
            className="hud-value hud-value-secondary"
            style={{ color: temperature > 1000 ? '#E74C3C' : '#F39C12' }}
          >
            {temperature} K
          </span>
        </div>

        <div className="hud-data-row">
          <span className="hud-label">🎯 Type:</span>
          <span className="hud-value hud-value-type">
            {planetType === 'super-earth' && '🔵 Super-Earth'}
            {planetType === 'neptune' && '🟠 Neptune-like'}
            {planetType === 'sub-neptune' && '🟣 Sub-Neptune'}
            {planetType === 'gas-giant' && '🟡 Gas Giant'}
          </span>
        </div>
        
        <div className="hud-footer">
          🖱️ Scroll to zoom • 🔄 Auto-rotate
        </div>
      </div>

      {/* Badge NASA */}
      <div className="nasa-badge">
        <span className="badge-icon">🛰️</span>
        <span className="badge-text">NASA VERIFIED DATA</span>
      </div>

      {/* Partículas flotantes */}
      <div className="space-particles">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 12}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}


