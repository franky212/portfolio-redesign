import '../styles/styles.scss';
import * as THREE from 'three';
import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Environment, MeshReflectorMaterial, useTexture } from '@react-three/drei';
import { gsap } from 'gsap';

import dreiVideo from '../assets/videos/drei.mp4';
import floorTexture from '../assets/textures/texture1.jpg';
import floorTextureNormal from '../assets/textures/texture1_normal.jpg';

const Floor = () => {
  const [floor, normal] = useTexture([floorTexture, floorTextureNormal]);
  return (
    // <MeshReflectorMaterial blur={[400, 100]} resolution={512} args={[10, 10]} mirror={0.5} mixBlur={6} mixStrength={1.5} rotation={[0, 0, 0]} color="#a0a0a0" metalness={0.4} roughnessMap={floor} normalMap={normal} normalScale={[2, 2]} />
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry attach='geometry' args={[20, 20]} />
          <MeshReflectorMaterial
            blur={[400, 100]}
            resolution={2048}
            mixBlur={6}
            mirror={1}
            mixStrength={0.2}
            roughnessMap={floor}
            roughness={10}
            metalness={0.4}
            normalMap={normal}
            normalScale={[2, 2]}
          />
    </mesh>
  );
};

const App = () => {
  const [video] = useState(() => {
    const vid = document.createElement('video');
    vid.src = dreiVideo;
    vid.crossOrigin = "Anonymous";
    vid.loop = true;
    vid.muted = true;
    vid.play();
    return vid;
  });
  return (
    <>
      <Canvas concurrent gl={{ alpha: false}} pixelRatio={[1, 1.5]} camera={{ position: [0, 0, 0]}} id="canvas-container" style={{position: 'absolute'}}>
        <color attach="background" args={['black']} />
        <fog attach="fog" args={['black', 0, 9]} />
        <group position={[0, -1, 0]}>
          <Text lineHeight={-0.8} maxWidth={4} fontSize={1} position={[-1, 1.5, -4]} rotation={[0, 0, 0]}>
            Designer and Developer
            <meshStandardMaterial>
              <videoTexture attach="map" args={[video]}/>
            </meshStandardMaterial>
          </Text>
          <Floor />
        </group>
        <ambientLight intensity={0.5} />
        <spotLight position={[0, 0, 0]} intensity={0.3} />
        <directionalLight position={[0, 0, 0]} intensity={0.7} />
        <Environment preset='city' />
      </Canvas>
    </>
  );
};

export default App;