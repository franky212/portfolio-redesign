import '../styles/styles.scss';
import * as THREE from 'three';
import { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MeshReflectorMaterial, Environment, ContactShadows, Text } from '@react-three/drei';
import { gsap } from 'gsap';

const Box = (props) => {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef();
  
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    gsap.to( ref.current.rotation, {
      x: "+= 0.1"
    });
  });

  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
};

const App = () => {
  const [video] = useState(() => Object.assign(document.createElement('video'), { src: '../assets/videos/drei.mp4', crossOrigin: 'Anonymous', loop: true }))
  return (
    <>
      <Canvas flat dpr={[1, 2]} camera={{ fov: 25, position: [-8, 0, 0] }} id="canvas-container" style={{position: 'absolute'}}>
        <color attach="background" args={['#191920']} />
        <fog attach="fog" args={['#191920', 0, 15]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Text font='' position={[0, 0.5, 0]} fontSize={2} letterSpacing={-0.06} rotation={[0, -Math.PI / 2, 0]}>
          drei
          <meshBasicMaterial toneMapped={false}>
            <videoTexture attach="map" args={[video]} encoding={THREE.sRGBEncoding} />
          </meshBasicMaterial>
        </Text>
        <group position={[0, -0.5, 0]}>
          {/* <Box position={[-1.2, 1, 0]} />
          <Box position={[1.2, 1, 0]} /> */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
            <planeBufferGeometry args={[50, 50]}></planeBufferGeometry>
            <MeshReflectorMaterial
              blur={[300, 100]}
              resolution={2048}
              mixBlur={1}
              mixStrength={40}
              roughness={1}
              depthScale={1.2}
              minDepthThreshold={0.4}
              maxDepthThreshold={1.4}
              color="#101010"
              metalness={0.5}
            />
          </mesh>
        </group>
        <Environment preset="city" />
        <ContactShadows frames={1}></ContactShadows>
      </Canvas>
    </>
  );
};

export default App;