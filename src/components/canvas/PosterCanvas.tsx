import dynamic from 'next/dynamic';

const PosterCanvas = dynamic(() => import('./PosterCanvasImpl'), {
  ssr: false,
});

export default PosterCanvas;
