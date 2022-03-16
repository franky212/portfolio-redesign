import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Loader } from '@react-three/drei';
import { render } from 'react-dom';
import App from '../components/App';

render(
  <>
    <Suspense fallback={null}>
      <Canvas mode='concurrent' gl={{ antialias: true }} dpr={[1, 1.5]} camera={{ position: [0, 0, 0]}} id="canvas-container" style={{position: 'absolute'}}>
        <App />
      </Canvas>
    </Suspense>
    <Loader />
  </>,
   document.getElementById("root") );

if (module['hot']) {
  module['hot'].accept();
}
