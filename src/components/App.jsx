import '../styles/styles.scss';
import * as THREE from 'three';
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Environment, MeshReflectorMaterial, useTexture, MeshDistortMaterial, Html } from '@react-three/drei';
import { gsap } from 'gsap';

import dreiVideo from '../assets/videos/drei.mp4';
import floorTexture from '../assets/textures/texture1.jpg';
import floorTextureNormal from '../assets/textures/texture1_normal.jpg';
import font from '../assets/fonts/Inter-Bold.woff';

const Floor = () => {
  const [floor, normal] = useTexture([floorTexture, floorTextureNormal]);
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry attach='geometry' args={[15, 7]} />
      <MeshReflectorMaterial
        blur={[400, 100]}
        resolution={2048}
        mixBlur={6}
        mirror={1}
        mixStrength={0.5}
        roughnessMap={floor}
        roughness={10}
        metalness={0.1}
        normalMap={normal}
        normalScale={[2, 2]}
        depthScale={1.2}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
      />
    </mesh>
  );
};

const App = () => {
  const textRef = useRef();
  const cloudRef = useRef();
  const [video] = useState(() => {
    const vid = document.createElement('video');
    vid.src = dreiVideo;
    vid.crossOrigin = "Anonymous";
    vid.loop = true;
    vid.muted = true;
    vid.play();
    return vid;
  });

  const meshAnimation = () => {
    gsap.to( cloudRef.current.scale, {x: "1.2", y: "1.2", z: "1.2" } );
    gsap.to( cloudRef.current.position, {x: "3"} );
  };

  useFrame((state) => {
    // console.log( state );
  });
  return (
    <>
      <color attach="background" args={["black"]} />
      <fog attach="fog" args={["black", 1, 4]} />
      <group position={[0, -1, 0]}>
        <Text
          ref={textRef}
          font={font}
          lineHeight={-0.8}
          maxWidth={3}
          fontSize={1}
          position={[-1.5, 1.4, -3.2]}
          rotation={[0, 0, 0]}
        >
          Designer and Developer
          <meshStandardMaterial toneMapped={false} fog={false}>
            <videoTexture
              attach="map"
              args={[video]}
              encoding={THREE.sRGBEncoding}
            />
          </meshStandardMaterial>
        </Text>
        <Html position={[-1.5, 1.4, -3.2]} rotation={[0, 0, 0]}>
          <h1 onClick={meshAnimation} className="text-4xl font-bold text-white cursor-pointer">HELLO</h1>
        </Html>
        <mesh position={[2, 1.8, -3.2]} ref={cloudRef} fog={false}>
          <sphereBufferGeometry attach="geometry" />
          <MeshDistortMaterial
            attach="material"
            color="#EDEDED"
            distort={0.5} // Strength, 0 disables the effect (default=1)
            speed={1} // Speed (default=1)
          />
        </mesh>
        <pointLight position={[-1, 0, 0]} />
        <Floor />
      </group>
      <Environment preset="city" />
    </>
  );
};

export default App;