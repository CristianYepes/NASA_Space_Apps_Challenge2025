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
              alt="${planetType} 3D model from NASA Space Apps Challenge"
              style="width: 100%; height: 100%; --poster-color: transparent; display: block; margin: 0 auto; transform-origin: center center; object-fit: contain; --progress-bar-color: #4a90e2; --progress-mask: #ffffff;"
              camera-controls
              touch-action="pan-y"
              shadow-intensity="${shadowIntensity}"
              shadow-softness="0.2"
              exposure="2.0"
              tone-mapping="aces"
              ${environmentImage ? `environment-image="${environmentImage}"` : 'environment-image="https://modelviewer.dev/shared-assets/environments/spruit_sunrise_1k_HDR.jpg"'}
              min-camera-orbit="auto auto 5m"
              max-camera-orbit="auto auto 100m"
              camera-orbit="${cameraOrbit}"
              field-of-view="${fieldOfView}"
              camera-target="0m 0m 0m"
              interaction-policy="always-allow"
              auto-rotate-delay="1000"
              ${autoRotate ? 'auto-rotate' : ''}
              rotation-per-second="${rotationSpeed * 30}deg"
              interpolation-decay="200"
              loading="eager"
              reveal="auto"
              ar
              ar-modes="webxr scene-viewer quick-look"
              ar-scale="fixed"
              disable-zoom="false"
              disable-pan="false"
              disable-tap="false"
              animation-name=""
              animation-crossfade-duration="300"
            ></model-viewer>
          `
        }}
      />
    </div>
  );
};

export default Planet3DGLB;
