import { Suspense } from 'react';
import { Loader } from '@react-three/drei';
import { render } from 'react-dom';
import App from '../components/App';

render(
  <>
    <Suspense fallback={null}>
      <App />
    </Suspense>
    <Loader />
  </>,
   document.getElementById("root") );

if (module['hot']) {
  module['hot'].accept();
}
