import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Loader } from '@react-three/drei';
import { render } from 'react-dom';
import { Scroll, ScrollControls } from '@react-three/drei';

import MainContent from '../components/MainContent';
import App from '../components/App';

render(
  <>
    <Suspense fallback={null}>
      <MainContent />
      <Canvas shadows mode='concurrent' dpr={Math.max(window.devicePixelRatio, 2)} gl={{ antialias: true }} camera={{position: [0, 0, 0]}} id="canvas-container" style={{position: 'absolute'}}>
        <ScrollControls damping={10} pages={1}>
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
