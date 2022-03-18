import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Loader } from '@react-three/drei';
import { render } from 'react-dom';
import { Scroll, useScroll, ScrollControls } from '@react-three/drei';

import MainContent from '../components/MainContent';
import App from '../components/App';

render(
  <>
    <MainContent />
    <Suspense fallback={null}>
      <Canvas mode='concurrent' gl={{ antialias: true }} dpr={[1, 1.5]} camera={{position: [0, 0, 0]}} id="canvas-container" style={{position: 'absolute'}}>
        <spotLight position={[0, 0, 0]} intensity={10} />
        <directionalLight color={"red"} position={[0, 0, 0]} intensity={10} />
        <ambientLight position={[0, 0, -1]} intensity={0.5} />
        <ScrollControls damping={10} pages={10}>
          <Scroll>
            <App />
          </Scroll>
        </ScrollControls>
      </Canvas>
    </Suspense>
    <Loader />
  </>,
   document.getElementById("root") );

if (module['hot']) {
  module['hot'].accept();
}
