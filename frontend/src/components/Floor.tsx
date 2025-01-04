import * as THREE from "three";
import { useTexture } from "@react-three/drei";

export default function Floor() {
  const floorSize = 1000;
    const texture = useTexture("/textures/floor-texture.jpg");
    texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(700, 700);

  return (
    <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[floorSize, floorSize]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}
