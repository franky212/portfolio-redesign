import '../styles/styles.scss';
import * as THREE from 'three';
import { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text, Environment, MeshReflectorMaterial, useTexture, Html, Image, Scroll, useScroll, ScrollControls } from '@react-three/drei';
import { gsap } from 'gsap';

import dreiVideo from '../assets/videos/drei.mp4';
import floorTexture from '../assets/textures/texture1.jpg';
import floorTextureNormal from '../assets/textures/texture1_normal.jpg';
import font from '../assets/fonts/Inter-Bold.woff';
import logo from '../assets/logos/fd..svg';

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

const Dog = ({position, scale}) => {
  const ref = useRef();
  const { offset } = useScroll();

  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    // ref.current.position.x = THREE.MathUtils.damp(ref.current.position.x, position[0] - 2, 6, delta);
    ref.current.scale.x = THREE.MathUtils.damp(ref.current.scale.x, hovered ? 0.9 : scale[0], 6, delta);
    ref.current.scale.y = THREE.MathUtils.damp(ref.current.scale.y, hovered ? scale[1] + 0.2 : scale[1], 8, delta);
    // ref.current.position.x = (position[0] - 1) * scroll.current;
    // console.log( ref.current.position.x );
  });
  return (
      <Image onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} ref={ref} url="https://picsum.photos/id/237/1920/1024" position={position} rotation={[0, 0, 0]} scale={scale}/>
  );
};

const App = () => {
  const textRef = useRef();
  const cloudRef = useRef();
  const { width } = useThree( (state) => state.viewport );
  const scroll = useScroll();
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

  const xW = 0.7 + 0.15;

  return (
    <>
      <color attach="background" args={["black"]} />
      <fog attach="fog" args={["black", 1, 4]} />
      <ScrollControls horizontal damping={10} pages={5}>
        <Scroll>
          <Dog position={[1.5 * xW, 0.5, -2.5]} scale={[0.7, 2, 1]} />
          <Dog position={[2.5 * xW, 0.5, -2.5]} scale={[0.7, 2, 1]} />
          <Dog position={[3.5 * xW, 0.5, -2.5]} scale={[0.7, 2, 1]} />
        </Scroll>
      </ScrollControls>
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
        <Html position={[0, 0, 0]} rotation={[0, 0, 0]}>
          <nav className="flex items-center justify-center w-100">
            <img src={logo} alt="" />
            <h1 onClick={meshAnimation} className="text-4xl font-bold text-white cursor-pointer">HELLO</h1>
          </nav>
        </Html>
        <pointLight position={[-1, 0, 0]} />
        <Floor />
      </group>
      <Environment preset="city" />
    </>
  );
};

export default App;