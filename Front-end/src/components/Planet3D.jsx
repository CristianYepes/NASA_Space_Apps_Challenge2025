import React, { useEffect, useState } from 'react';
import './Planet3D.css';

export default function Planet3D() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const progress = Math.min(scrolled / Math.max(scrollHeight, 1), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calcular transformaciones basadas en el scroll
  const scale = 1 + scrollProgress * 3; // De 1 a 4x
  const translateZ = scrollProgress * 200; // Acercamiento
  const rotate = scrollProgress * 360; // Rotación completa

  return (
    <div className="planet-container">
      <div className="stars-background"></div>
      
      <div
        className="planet-wrapper"
        style={{
          transform: `scale(${scale}) translateZ(${translateZ}px) rotateY(${rotate}deg)`,
        }}
      >
        {/* Planeta principal */}
        <div className="planet">
          <div className="planet-surface"></div>
          <div className="planet-atmosphere"></div>
          <div className="planet-glow"></div>
        </div>

        {/* Anillo */}
        <div className="planet-ring"></div>

        {/* Luna orbitando */}
        <div className="moon-orbit">
          <div className="moon"></div>
        </div>

        {/* Segunda luna */}
        <div className="moon-orbit-2">
          <div className="moon moon-2"></div>
        </div>
      </div>

      {/* Partículas flotantes */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
