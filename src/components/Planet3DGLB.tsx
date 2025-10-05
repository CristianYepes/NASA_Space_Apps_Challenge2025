import React, { useEffect, useRef } from 'react';
import './Planet3D.css';

interface Planet3DGLBProps {
  planetType?: 'moon' | 'jupiter' | 'earth' | 'planet' | 'planet1';
  size?: number;
  rotationSpeed?: number;
  autoRotate?: boolean;
  shadowIntensity?: number;
  environmentImage?: string;
  cameraOrbit?: string;
  rotationAxis?: string;
  rotationOrigin?: string;
  fieldOfView?: string;
}

const Planet3DGLB: React.FC<Planet3DGLBProps> = ({
  planetType = 'moon',
  size = 1,
  rotationSpeed = 1,
  autoRotate = true,
  shadowIntensity = 1,
  environmentImage,
  cameraOrbit = "60deg -15deg 30m",
  rotationAxis = "0 1 0",
  rotationOrigin = "0 0 0",
  fieldOfView = "65deg"
}) => {
  const modelViewerRef = useRef<HTMLDivElement>(null);

  const getPlanetPath = (planet: string) => {
    switch (planet) {
      case 'moon':
        return '/glb_planets/Moon.glb';
      case 'jupiter':
        return '/glb_planets/Jupiter.glb';
      case 'earth':
        return '/glb_planets/Earth.glb';
      case 'planet':
        return '/glb_planets/Planet.glb';
      case 'planet1':
        return '/glb_planets/Planet (1).glb';
      default:
        return '/glb_planets/Moon.glb';
    }
  };

  useEffect(() => {
    // Cargar el script de model-viewer si no está cargado
    if (!document.querySelector('script[src*="model-viewer"]')) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js';
      document.head.appendChild(script);
    }
  }, []);

  // Los atributos se configuran directamente en el HTML

  return (
    <div className="planet-container">
      <div
        ref={modelViewerRef}
        dangerouslySetInnerHTML={{
          __html: `
            <model-viewer
              src="${getPlanetPath(planetType)}"
              alt="${planetType} 3D model"
              style="width: 100%; height: 100%; --poster-color: transparent; display: block; margin: 0 auto; transform-origin: center center; object-fit: contain;"
              camera-controls
              touch-action="pan-y"
              shadow-intensity="${shadowIntensity}"
              ${environmentImage ? `environment-image="${environmentImage}"` : ''}
              min-camera-orbit="auto auto 25"
              max-camera-orbit="auto auto 200"
              camera-orbit="${cameraOrbit}"
              field-of-view="${fieldOfView}"
              camera-target="0m 0m 0m"
              interaction-policy="allow-when-focused"
              auto-rotate-delay="0"
              ${autoRotate ? 'auto-rotate' : ''}
              rotation-per-second="${rotationSpeed}rad"
              rotation-axis="0 1 0"
              rotation-origin="0 0 0"
            ></model-viewer>
          `
        }}
      />
    </div>
  );
};

export default Planet3DGLB;
