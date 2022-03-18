import '../styles/styles.scss';
import * as THREE from 'three';
import { useRef, useState , forwardRef} from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text, Environment, MeshReflectorMaterial, useTexture, Html, Image, Scroll, useScroll, ScrollControls } from '@react-three/drei';
import { gsap } from 'gsap';

import floorTexture from '../assets/textures/texture1.jpg';
import floorTextureNormal from '../assets/textures/texture1_normal.jpg';
import font from '../assets/fonts/Inter-Bold.woff';

const Floor = () => {
  const [floor, normal] = useTexture([floorTexture, floorTextureNormal]);
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

const Dog = forwardRef((props, ref) => {
  // const ref = useRef();

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
    // ref.current.scale.x = THREE.MathUtils.damp(ref.current.scale.x, hovered ? 0.75 : ref.current.scale[0], 6, delta);
    // ref.current.scale.y = THREE.MathUtils.damp(ref.current.scale.y, hovered ? ref.current.scale[1] + 0.1 : ref.current.scale[1], 8, delta);
    ref.current.material.grayscale = THREE.MathUtils.damp(ref.current.material.grayscale, hovered ? 0 : 1, 6, delta);
    ref.current.material.zoom = 1.5 + Math.sin(rnd * 10000 + state.clock.elapsedTime / 3) / 2;
    ref.current.material.color.lerp(new THREE.Color().set(hovered ? 'white' : '#aaa'), hovered ? 0.3 : 0.1)
    // ref.current.position.x = (position[0] - 1) * scroll.current;
    // console.log( ref.current.position.x );
  });
  return (
      <Image {...props} ref={ref} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} url="https://picsum.photos/id/237/1920/1024" position={props.position} rotation={[0, 0, 0]} scale={props.scale}/>
  );
});

const App = () => {
  const sectionOneRef = useRef();
  const sectionTwoRef = useRef();
  const image1Ref = useRef();
  const image2Ref = useRef();
  const image3Ref = useRef();
  const xW = 0.7 + 0.15;
  const [rnd] = useState( () => Math.random() );
  const scroll = useScroll();

  useFrame((state, delta) => {
    sectionOneRef.current.rotation.y = -Math.sin(rnd * state.clock.elapsedTime) / 6;
    sectionTwoRef.current.rotation.y = -Math.sin(rnd * state.clock.elapsedTime) / 6;
    if( scroll.range(1 / 3, 2 / 3) ) {
      gsap.to( image1Ref.current.position, {y: 5} );
      gsap.to( image2Ref.current.position, {y: 5} );
      gsap.to( image3Ref.current.position, {y: 5} );
      
      gsap.to( sectionOneRef.current.position, {x: -5} );
    } else {
      gsap.to( sectionOneRef.current.position, {x: -1.85} );
      gsap.to( image1Ref.current.position, {y: -0.1} );
      gsap.to( image2Ref.current.position, {y: -0.1} );
      gsap.to( image3Ref.current.position, {y: -0.1} );
      
    }

    if( scroll.range(1 / 3, 2 / 3) ) {
      gsap.to( sectionTwoRef.current.position, {x: -1.85} );
    } else {
      gsap.to( sectionTwoRef.current.position, {x: -5} );
    }
  });

  return (
    <>
      <color attach="background" args={["#FAF9F6"]} />
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

          <Dog ref={image1Ref} position={[1.5 * xW, -0.1, -2.5]} scale={[0.7, 2, 1]} />
          <Dog ref={image2Ref} position={[2.5 * xW, -0.1, -2.5]} scale={[0.7, 2, 1]} />
          <Dog ref={image3Ref} position={[3.5 * xW, -0.1, -2.5]} scale={[0.7, 2, 1]} />

          {/* <Dog ref={imageRef} position={[1.5 * xW, -1, -2.5]} scale={[0.7, 2, 1]} />
          <Dog ref={imageRef} position={[2.5 * xW, -1, -2.5]} scale={[0.7, 2, 1]} />
          <Dog ref={imageRef} position={[3.5 * xW, -1, -2.5]} scale={[0.7, 2, 1]} /> */}
          <Environment preset="city" />
    </>
  );
};

export default App;