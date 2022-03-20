import '../styles/styles.scss';
import * as THREE from 'three';
import { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { 
  Text, 
  MeshReflectorMaterial, 
  useTexture, 
  Html, 
  Image, 
  Scroll, 
  useScroll, 
  ScrollControls, 
  useGLTF,
  useHelper,
  OrbitControls
 } from '@react-three/drei';
import { gsap } from 'gsap';

// import floorTexture from '../assets/textures/texture1.jpg';
// import floorTextureNormal from '../assets/textures/texture1_normal.jpg';
import font from '../assets/fonts/Inter-Bold.woff';
// import deskScene from '../assets/models/desk_asset/scene.gltf';
import toyCar from '../assets/models/ToyCar.glb';
import m1 from '../assets/models/mbp-v1-pipe.glb';
import { SpotLightHelper } from 'three';

const rsqw = (t, delta = 0.1, a = 1, f = 1 / (2 * Math.PI)) => (a / Math.atan(1 / delta)) * Math.atan(Math.sin(2 * Math.PI * t * f) / delta)

const Floor = () => {
  // const [floor, normal] = useTexture([floorTexture, floorTextureNormal]);
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry attach='geometry' args={[15, 7]} />
      <MeshReflectorMaterial
        blur={[400, 400]}
        color="#1a1a1d"
        resolution={512}
        mixBlur={7}
        args={[10, 10]}
        mirror={0.5}
        mixStrength={0.2}
        roughnessMap={floor}
        metalness={0.4}
        normalMap={normal}
        normalScale={[3, 3]}
      />
    </mesh>
  );
};

const Dog = ({position, scale}) => {
  const ref = useRef();

  const scroll = useScroll();
  const [hovered, setHovered] = useState(false);
  const [rnd] = useState(() => Math.random());

  useFrame((state, delta) => {
    // console.log( r1 );
    // ref.current.position.x = THREE.MathUtils.damp(ref.current.position.x, position[0] - 2, 6, delta);
    // ref.current.rotation.y = -Math.sin(rnd * state.clock.elapsedTime) / 6;
    // if( !scroll.range(1 / 3, 1 / 3) ) {
    //   ref.current.position.y = scroll.offset * 10;
    // console.log( props );
    // }
    ref.current.scale.x = THREE.MathUtils.damp(ref.current.scale.x, hovered ? 0.75 : scale[0], 6, delta);
    ref.current.scale.y = THREE.MathUtils.damp(ref.current.scale.y, hovered ? scale[1] + 0.1 : scale[1], 8, delta);
    ref.current.material.grayscale = THREE.MathUtils.damp(ref.current.material.grayscale, hovered ? 0 : 1, 6, delta);
    ref.current.material.zoom = 1.5 + Math.sin(rnd * 10000 + state.clock.elapsedTime / 3) / 2;
    ref.current.material.color.lerp(new THREE.Color().set(hovered ? 'white' : '#aaa'), hovered ? 0.3 : 0.1)
    // ref.current.position.x = (position[0] - 1) * scroll.current;
    // console.log( ref.current.position.x );
  });
  return (
      <Image ref={ref} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} url="https://picsum.photos/id/237/1920/1024" position={position} rotation={[0, 0, 0]} scale={scale}/>
  );
};

const App = () => {
  const imageGroupRef = useRef();
  const sectionOneRef = useRef();
  const sectionTwoRef = useRef();
  const spotlightRef = useRef();
  useHelper(spotlightRef, SpotLightHelper, 1);
  const mbp16 = useRef();
  const xW = 0.7 + 0.15;
  const [rnd] = useState( () => Math.random() );
  const scroll = useScroll();
  // const toyCar = useGLTF(toyCar);
  const { nodes, materials } = useGLTF(m1);

  useFrame((state, delta) => {
    const r1 = scroll.range(0 / 4, 1 / 4);
    const r2 = scroll.range(1 / 4, 1 / 4);
    sectionOneRef.current.rotation.y = -Math.sin(rnd * state.clock.elapsedTime) / 6;
    sectionTwoRef.current.rotation.y = -Math.sin(rnd * state.clock.elapsedTime) / 6;
    imageGroupRef.current.position.y = scroll.offset * 10;

    // mbp16.current.rotation.x = Math.PI - (Math.PI / 2) * rsqw(r1) + r2 * 0.33;

    if( scroll.range(1 / 3, 2 / 3) ) {
      gsap.to( sectionOneRef.current.position, {x: -5} );
    } else {
      gsap.to( sectionOneRef.current.position, {x: -1.85} );
      
    }

    if( scroll.range(1 / 3, 2 / 3) ) {
      console.log( sectionOneRef.current );
      gsap.to( sectionOneRef.current, { fillOpacity: 0 });
      gsap.to( sectionTwoRef.current.position, {x: -1.85} );
      gsap.to( sectionTwoRef.current, {fillOpacity: 1} );
    } else {
      gsap.to( sectionTwoRef.current.position, {x: -5} );
      gsap.to( sectionOneRef.current, { fillOpacity: 1 });
      gsap.to( sectionTwoRef.current, { fillOpacity: 0 } );
    }
  });

  return (
    <>
      {/* <OrbitControls /> */}
      <color attach="background" args={["#FAF9F6"]} />
      <fog attach="fog" args={["black", 0, 15]} />

      <mesh receiveShadow position={[0, 0, -4]} rotation={[0, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial attach="material" />
      </mesh>

      <mesh position={[2, 0, -3]} rotation={[0, 0, 0]}>
        <sphereBufferGeometry receiveShadow scale={[0.1, 0.1]} />
        <meshStandardMaterial attach="material" color={"pink"} />
      </mesh>

      <spotLight
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        ref={spotlightRef} position={[1, 0, -1.5]} rotation={[0, 0, 0]} intensity={10} castShadow />
      {/* <directionalLight position={[0, 0, 0]} intensity={0.6} castShadow /> */}
      <ambientLight position={[0, 0, -1.5]} intensity={0.5} />

      <group position={[0, -1, 0]}>
        <Text
          ref={sectionOneRef}
          font={font}
          lineHeight={-0.8}
          maxWidth={3}
          fontSize={0.8}
          position={[-1.85, 1, -3.2]}
          rotation={[0, 0, 0]}
          color={"black"}
        >
          Designer and Developer
          <meshStandardMaterial />
        </Text>
      </group>
      <group position={[0, -1, 0]}>
        <Text
          ref={sectionTwoRef}
          font={font}
          lineHeight={-0.8}
          fillOpacity={0}
          maxWidth={3}
          fontSize={0.6}
          position={[-5, 1, -3.2]}
          rotation={[0, 0, 0]}
          color={"black"}
        >
          Portfolio
          <meshStandardMaterial />
        </Text>
      </group>

      <group ref={imageGroupRef} position={[0, 0, 0]}>
        {/* <Dog position={[1.5 * xW, -0.1, -2.5]} scale={[0.7, 2, 1]} />
        <Dog position={[2.5 * xW, -0.1, -2.5]} scale={[0.7, 2, 1]} />
        <Dog position={[3.5 * xW, -0.1, -2.5]} scale={[0.7, 2, 1]} /> */}

        {/* <group rotation={[Math.PI / 2, 0, 0]} position={[1.5, -1, -3]} scale={[0.01, 0.01, 0.01]}>
              <mesh receiveShadow castShadow geometry={toyCar.nodes.ToyCar.geometry} />
            </group> */}

        {/*}
        <group
          castShadow
          ref={mbp16}
          position={[1.5, -1, -3]}
          scale={[0.08, 0.08, 0.08]}
          dispose={null}>
          <group position={[0, -0.43, -11.35]} rotation={[Math.PI / 2, 0, 0]}>
            <mesh
              geometry={nodes.back_1.geometry}
              material={materials.blackmatte}
            />
            <mesh
              receiveShadow
              castShadow
              geometry={nodes.back_2.geometry}
              material={materials.aluminium}
            />
            <mesh geometry={nodes.matte.geometry}>
              <meshLambertMaterial map={texture} toneMapped={false} />
            </mesh>
          </group>
          <mesh
            geometry={nodes.body_1.geometry}
            material={materials.aluminium}
            material-color="#aaaaaf"
            material-envMapIntensity={0.2}
          />
          <mesh
            geometry={nodes.body_2.geometry}
            material={materials.blackmatte}
          />
        </group>
        */}
      </group>
    </>
  );
};

export default App;