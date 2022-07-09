import '../styles/styles.scss';
import * as THREE from 'three';
import { useRef, useState } from 'react';
import { useFrame, useThree, useLoader } from '@react-three/fiber';
import { 
  Text, 
  MeshReflectorMaterial, 
  Html, 
  Image, 
  useScroll, 
  useGLTF,
 } from '@react-three/drei';
import { gsap } from 'gsap';

import font from '../assets/fonts/Inter-Bold.woff';
import mac from '../assets/models/mac-draco.glb';
import logo from '../assets/logos/fd..svg';
import ultradentLogo from '../assets/logos/ultradent-white.svg';
import monumetricLogo from '../assets/logos/monumetric-stacked-white.svg';
import linkedInLogo from '../assets/logos/linkedin-logo.png';
import git from '../assets/logos/git-logo.png';

const SocialSphere = ({texture, position, rotation, scale, url}) => {
  const [hovered, setHovered] = useState(false);
  const sphereRef = useRef();

  useFrame((state, delta) => {
    // console.log( sphereRef.current.scale );
    if( hovered ) {
      gsap.to( sphereRef.current.scale, {
        x: 1.2,
        y: 1.2,
        z: 1.2
      } );
    } else {
      gsap.to( sphereRef.current.scale, {
        x: 1,
        y: 1,
        z: 1
      } );
    }
  })

  function routeToSocial() {
    window.open(url, '_blank');
  }

  return (
    <mesh ref={sphereRef} onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)} onPointerDown={() => routeToSocial()} receiveShadow castShadow position={position} rotation={rotation}>
      <sphereBufferGeometry args={scale} />
      <meshPhysicalMaterial attach="material" color={"white"} map={texture} />
    </mesh>
  );
};

const App = () => {
  const imageGroupRef = useRef();
  const sectionOneRef = useRef();
  const sectionTwoRef = useRef();
  const spotlightRef = useRef();
  const directionalLightRef = useRef();
  const lightingTarget = useRef();
  const spheresRef = useRef();
  const { camera, gl } = useThree();
  const [screenClicked, setScreenClicked] = useState(false);
  const linkedin = useLoader(THREE.TextureLoader, linkedInLogo);
  const gitTexture = useLoader(THREE.TextureLoader, git);

  const mbp16 = useRef();
  const xW = 0.7 + 0.15;
  const [rnd] = useState( () => Math.random() );
  const scroll = useScroll();
  const { nodes, materials } = useGLTF(mac);

  useFrame((state, delta) => {
    const r1 = scroll.range(0 / 4, 1 / 4);
    const r2 = scroll.range(1 / 4, 2 / 4);
    sectionOneRef.current.rotation.y = -Math.sin(rnd * state.clock.elapsedTime) / 8;
    sectionTwoRef.current.rotation.y = -Math.sin(rnd * state.clock.elapsedTime) / 8;
    imageGroupRef.current.position.y = scroll.offset * 14;
    spheresRef.current.position.y = scroll.offset * 14;

    if ( !r2 || scroll.range( 2 / 4, 2 / 4 ) ) {
      setScreenClicked( false );
      gsap.to( state.camera.position, {
        z: 0
      } );
    }

    gsap.to( state.camera.position, {
      x: screenClicked && r2 ? 0.66 : 0,
      z: screenClicked && r2 ? -1.5 : 0
    } );
    gsap.to( state.camera.rotation, {
      y: screenClicked && r2 ? -0.5 : 0
    } );

    if( scroll.range(1 / 3, 2 / 3) ) {
      gsap.to( sectionOneRef.current.position, {x: -5} );
    } else {
      gsap.to( sectionOneRef.current.position, {x: -1.85} );
    }

    if( scroll.range(1 / 3, 2 / 3) ) {
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
      {/* <OrbitControls args={[camera, gl.domElement]} /> */}
      <color attach="background" args={["#FAF9F6"]} />

      <mesh receiveShadow position={[0, 0, -4]} rotation={[0, 0, 0]}>
        <planeGeometry args={[150, 150]} />
        <meshStandardMaterial attach="material" color="#FAF9F6" />
      </mesh>

      <group ref={spheresRef}>

        <SocialSphere texture={linkedin} position={[1, 0, -3]} scale={[0.4]} rotation={[0, -1.8, -0.2]} url="https://www.linkedin.com/in/frank-delaguila/"/>
        <SocialSphere texture={gitTexture} position={[2.5, 0, -3]} scale={[0.4]} rotation={[0, -2, -0.2]} url="https://github.com/franky212/"/>
        
      </group>

      <spotLight
        shadow-mapSize-width={1024 * 4}
        shadow-mapSize-height={1024 * 4}
        // shadow={{ bias: 0 }}
        ref={spotlightRef}
        position={[-1.5, 0, 3]}
        penumbra={0.4}
        target={lightingTarget.current}
        distance={11}
        angle={0.4}
        intensity={3}
        castShadow />
      <directionalLight
        ref={directionalLightRef}
        position={[-1.5, 1, 2]}
        target={lightingTarget.current}
        intensity={1}
        castShadow />
      <pointLight position={[0, 0, 3]} intensity={0.2} />
      <ambientLight position={[0, 0, 4]} intensity={0.5} />

      <group position={[0, -1, 0]}>
        <Text
          ref={sectionOneRef}
          font={font}
          lineHeight={-0.8}
          maxWidth={3}
          fontSize={0.8}
          position={[-1.85, 1, -3]}
          rotation={[0, 0, 0]}
          color={"black"}>
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
          maxWidth={5}
          fontSize={0.6}
          position={[-5, 1, -3.2]}
          rotation={[0, 0, 0]}
          color={"black"}>
          Experience
          <meshStandardMaterial />
        </Text>
      </group>

      <group ref={lightingTarget}>
        <group ref={imageGroupRef} position={[0, 0, 0]}>

          <group position={[1.5, -6, -3]} rotation={[0, -0.5, 0]} ref={mbp16} dispose={null} scale={[0.2, 0.2, 0.2]}>
            <group position={[0, 2.85, 0.4]}>
              <group position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <mesh castShadow material={materials.aluminium} geometry={nodes['Cube008'].geometry} />
                <mesh castShadow material={materials['matte.001']} geometry={nodes['Cube008_1'].geometry} />
                <mesh castShadow geometry={nodes['Cube008_2'].geometry}>
                  {/* Drei's HTML component can now "hide behind" canvas geometry */}
                  <Html className="content" rotation-x={-Math.PI / 2} position={[0, 0.05, -0.09]} transform occlude>
                    <div className="text-xs text-white">
                      <div className="px-4 wrapper">
                        <nav className="flex items-center justify-between py-2">
                          <img alt="Frank Delaguila - Designer and Developer Logo (FD.)" className="w-6" src={logo} />
                          <div className="flex items-center">
                            <p className="mr-2">{!screenClicked ? 'Zoom In' : 'Zoom Out'}</p>
                            <div onMouseDown={() => setScreenClicked(!screenClicked)} className="cursor-pointer bg-zinc-800 py-2 px-4 rounded-sm hover:bg-zinc-700 transition-colors">
                              {!screenClicked ? <i className="fa-solid fa-magnifying-glass-plus"></i> : <i className="fa-solid fa-magnifying-glass-minus"></i>}
                            </div>
                          </div>
                        </nav>

                        <div className="bg-zinc-800 w-full rounded p-4 mb-2">
                          <a target="_blank" href="https://www.monumetric.com/">
                            <img className="w-16 mb-2" src={monumetricLogo} alt="Monumetric Logo - Graphic of the Pale Blue Dot from Caral Sagan with Monumetric below" />
                          </a>
                          <p><span className="font-bold">Frontend Developer and UX/UI Designer<br /></span>Technologies Used:<br />Angular 3/7/13+, Javascript, SCSS(Sass), UX/UI Design, Adobe XD, Figma</p>
                        </div>

                        <div className="bg-zinc-800 w-full rounded p-4 mb-2">
                          <a target="_blank" href="https://www.ultradent.com/">
                            <img className="w-12 mb-2" src={ultradentLogo} alt="Ultradent Logo - UPI in white for Ultradent Products Inc." />
                          </a>
                          <p><span className="font-bold">Front End Developer<br /></span>Technologies Used:<br />React/Preact, Javascript, jQuery, Webpack, Storybook, React Testing Library, SCSS(Sass), Razor Views, Figma, Sketch</p>
                        </div>

                      </div>
                    </div>
                  </Html>
                </mesh>
              </group>
            </group>
            <mesh castShadow material={materials.keys} geometry={nodes.keyboard.geometry} position={[1.79, 0, 3.45]} />
            <group position={[0, -0.1, 3.39]}>
              <mesh castShadow material={materials.aluminium} geometry={nodes['Cube002'].geometry} />
              <mesh material={materials.trackpad} geometry={nodes['Cube002_1'].geometry} />
            </group>
            <mesh castShadow material={materials.touchbar} geometry={nodes.touchbar.geometry} position={[0, -0.03, 1.2]} />
          </group>
        </group>

      </group>
    </>
  );
};

export default App;