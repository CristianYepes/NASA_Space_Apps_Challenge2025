import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';
import './Planet3D.css';

interface Planet3DProps {
  color?: string;
  size?: number;
  lightIntensity?: number;
  lightColor?: string;
  rotationSpeed?: number;
  wireframe?: boolean;
  metalness?: number;
  roughness?: number;
  craterDensity?: number;
  mountainHeight?: number;
}

const PlanetMesh: React.FC<Planet3DProps> = ({ 
  color = '#4a90e2', 
  size = 1, 
  rotationSpeed = 1,
  wireframe = false,
  metalness = 0.1,
  roughness = 0.8,
  craterDensity = 1.0,
  mountainHeight = 0.1
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  // Generar geometría procedural con relieve lunar realista
  const geometry = useMemo(() => {
    const sphereGeometry = new THREE.SphereGeometry(size, 128, 128);
    const positions = sphereGeometry.attributes.position.array as Float32Array;
    const normals = sphereGeometry.attributes.normal.array as Float32Array;
    
    // Crear relieve base con ruido orgánico (no espiral)
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      const z = positions[i + 2];
      
      // Crear coordenadas esféricas para el ruido
      const phi = Math.acos(y / size);
      const theta = Math.atan2(z, x);
      
      // Ruido orgánico multi-octava (como la superficie lunar)
      const noise1 = Math.sin(phi * 12 + theta * 12) * 0.015;
      const noise2 = Math.sin(phi * 24 + theta * 24) * 0.008;
      const noise3 = Math.sin(phi * 48 + theta * 48) * 0.004;
      const noise4 = Math.sin(phi * 96 + theta * 96) * 0.002;
      
      // Ruido de textura fina
      const fineNoise = Math.sin(phi * 200 + theta * 200) * 0.001;
      
      // Combinar ruidos para relieve natural
      const baseRelief = noise1 + noise2 + noise3 + noise4 + fineNoise;
      
      // Aplicar el relieve base
      const normalX = normals[i];
      const normalY = normals[i + 1];
      const normalZ = normals[i + 2];
      
      positions[i] += normalX * baseRelief;
      positions[i + 1] += normalY * baseRelief;
      positions[i + 2] += normalZ * baseRelief;
    }
    
    // Crear montañas lunares (cordilleras y picos)
    const mountainCount = Math.floor(mountainHeight * 8);
    const mountains: Array<{x: number, y: number, z: number, height: number, radius: number}> = [];
    
    for (let m = 0; m < mountainCount; m++) {
      const phi = Math.random() * Math.PI;
      const theta = Math.random() * Math.PI * 2;
      const x = Math.sin(phi) * Math.cos(theta);
      const y = Math.cos(phi);
      const z = Math.sin(phi) * Math.sin(theta);
      
      mountains.push({
        x, y, z,
        height: 0.03 + Math.random() * 0.08,
        radius: 0.1 + Math.random() * 0.2
      });
    }
    
    // Crear cráteres lunares realistas
    const craterCount = Math.floor(craterDensity * 100);
    const craters: Array<{x: number, y: number, z: number, depth: number, radius: number}> = [];
    
    for (let c = 0; c < craterCount; c++) {
      const phi = Math.random() * Math.PI;
      const theta = Math.random() * Math.PI * 2;
      const x = Math.sin(phi) * Math.cos(theta);
      const y = Math.cos(phi);
      const z = Math.sin(phi) * Math.sin(theta);
      
      // Distribución realista de cráteres lunares
      const sizeRandom = Math.random();
      let radius, depth;
      
      if (sizeRandom < 0.7) {
        // 70% cráteres pequeños
        radius = 0.01 + Math.random() * 0.03;
        depth = 0.003 + Math.random() * 0.01;
      } else if (sizeRandom < 0.9) {
        // 20% cráteres medianos
        radius = 0.03 + Math.random() * 0.05;
        depth = 0.008 + Math.random() * 0.02;
      } else {
        // 10% cráteres grandes
        radius = 0.05 + Math.random() * 0.1;
        depth = 0.015 + Math.random() * 0.03;
      }
      
      craters.push({
        x, y, z,
        depth,
        radius
      });
    }
    
    // Aplicar montañas y cráteres sobre el relieve base
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      const z = positions[i + 2];
      
      let totalEffect = 0;
      
      // Aplicar montañas
      for (const mountain of mountains) {
        const distance = Math.sqrt(
          Math.pow(x - mountain.x, 2) + 
          Math.pow(y - mountain.y, 2) + 
          Math.pow(z - mountain.z, 2)
        );
        
        if (distance < mountain.radius) {
          const normalizedDistance = distance / mountain.radius;
          const smoothTransition = Math.pow(1 - normalizedDistance, 2);
          const mountainEffect = smoothTransition * mountain.height;
          totalEffect += mountainEffect;
        }
      }
      
      // Aplicar cráteres
      for (const crater of craters) {
        const distance = Math.sqrt(
          Math.pow(x - crater.x, 2) + 
          Math.pow(y - crater.y, 2) + 
          Math.pow(z - crater.z, 2)
        );
        
        if (distance < crater.radius) {
          const normalizedDistance = distance / crater.radius;
          const smoothTransition = Math.pow(1 - normalizedDistance, 1.8);
          const craterEffect = smoothTransition * crater.depth;
          totalEffect -= craterEffect;
        }
      }
      
      // Aplicar el efecto a la posición
      const normalX = normals[i];
      const normalY = normals[i + 1];
      const normalZ = normals[i + 2];
      
      positions[i] += normalX * totalEffect;
      positions[i + 1] += normalY * totalEffect;
      positions[i + 2] += normalZ * totalEffect;
    }
    
    sphereGeometry.attributes.position.needsUpdate = true;
    sphereGeometry.computeVertexNormals();
    
    return sphereGeometry;
  }, [size, craterDensity, mountainHeight]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Rotación desde el eje interno del planeta (eje Y)
      meshRef.current.rotation.y += delta * rotationSpeed;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial
        color={color}
        wireframe={wireframe}
        metalness={metalness}
        roughness={roughness}
        normalScale={new THREE.Vector2(0.5, 0.5)}
      />
    </mesh>
  );
};

const Planet3D: React.FC<Planet3DProps> = ({
  color = '#4a90e2',
  size = 1,
  lightIntensity = 1,
  lightColor = '#ffffff',
  rotationSpeed = 1,
  wireframe = false,
  metalness = 0.1,
  roughness = 0.8,
  craterDensity = 1.0,
  mountainHeight = 0.1
}) => {
  return (
    <div className="planet-container">
      <Canvas
        camera={{ position: [5, 3, 8], fov: 60 }}
        style={{ width: '100%', height: '500px' }}
      >
        <ambientLight intensity={0.2} />
        <directionalLight
          position={[8, 6, 4]}
          intensity={lightIntensity}
          color={lightColor}
        />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color={lightColor} />
        
        <PlanetMesh
          color={color}
          size={size}
          rotationSpeed={rotationSpeed}
          wireframe={wireframe}
          metalness={metalness}
          roughness={roughness}
          craterDensity={craterDensity}
          mountainHeight={mountainHeight}
        />
        
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          autoRotate={false}
          minDistance={size * 3}
          maxDistance={size * 15}
        />
        
        <Environment preset="night" />
      </Canvas>
    </div>
  );
};

export default Planet3D;
