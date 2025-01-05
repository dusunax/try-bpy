import { Canvas } from "@react-three/fiber";

export default function CanvasWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Canvas
      style={{ width: "100%", height: "100vh", backgroundColor: "#dddddd" }}
    >
      {children}
    </Canvas>
  );
}
