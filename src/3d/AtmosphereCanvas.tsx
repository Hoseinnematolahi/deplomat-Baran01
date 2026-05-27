import { Canvas } from '@react-three/fiber';

export function AtmosphereCanvas() {
  return (
    <Canvas
      className="fixed inset-0 -z-10"
      camera={{ position: [0, 0, 2] }}
    >
      <ambientLight intensity={0.5} />
    </Canvas>
  );
}
