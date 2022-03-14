import '../styles/styles.scss';
import * as THREE from 'three';
import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Environment, MeshReflectorMaterial, useTexture, MeshDistortMaterial } from '@react-three/drei';
import { gsap } from 'gsap';

import dreiVideo from '../assets/videos/drei.mp4';
import floorTexture from '../assets/textures/texture1.jpg';
import floorTextureNormal from '../assets/textures/texture1_normal.jpg';
import font from '../assets/fonts/Inter-Bold.woff';

const Floor = () => {
  const [floor, normal] = useTexture([floorTexture, floorTextureNormal]);
  return (
    // <MeshReflectorMaterial blur={[400, 100]} resolution={512} args={[10, 10]} mirror={0.5} mixBlur={6} mixStrength={1.5} rotation={[0, 0, 0]} color="#a0a0a0" metalness={0.4} roughnessMap={floor} normalMap={normal} normalScale={[2, 2]} />
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry attach='geometry' args={[15, 7]} />
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
        normalScale={[3, 3]}
        depthScale={1.2}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
      />
    </mesh>
  );
};

const App = () => {
  const textRef = useRef();
  const vec = useState(() => new THREE.Vector3());
  const [video] = useState(() => {
    const vid = document.createElement('video');
    vid.src = dreiVideo;
    vid.crossOrigin = "Anonymous";
    vid.loop = true;
    vid.muted = true;
    vid.play();
    return vid;
  });

  useFrame((state) => {
    // state.camera.position.lerp(vec, 0.1);
  });
  return (
    <>
      <color attach="background" args={["black"]} />
      <fog attach="fog" args={["black", 2.8, 3.5]} />
      <group position={[0, -1, 0]}>
        <Text
          ref={textRef}
          font={font}
          textAlign="center"
          lineHeight={-0.8}
          maxWidth={3}
          fontSize={0.75}
          position={[-2, 1.2, -3.2]}
          rotation={[0, 0, 0]}
        >
          Designer &amp; Developer
          <meshStandardMaterial toneMapped={false}>
            <videoTexture
              attach="map"
              args={[video]}
              encoding={THREE.sRGBEncoding}
            />
          </meshStandardMaterial>
        </Text>
        <mesh position={[2, 1.8, -3.2]}>
          <sphereBufferGeometry attach="geometry" />
          <MeshDistortMaterial
            attach="material"
            color="#EDEDED"
            distort={1} // Strength, 0 disables the effect (default=1)
            speed={2} // Speed (default=1)
          />
        </mesh>
        <Floor />
      </group>
      <ambientLight position={[0, 0, -1]} intensity={0.5} />
      <spotLight position={[0, 0, 0]} intensity={0.3} />
      <directionalLight position={[0, 0, 0]} intensity={0.7} />
      <Environment preset="city" />
    </>
  );
};

export default App;