import { Scene } from "three";

export default function Scenes({ scenes }: { scenes: Scene[] }) {
  return (
    <>
      {scenes.map((scene) => (
        <mesh key={scene.id} position={scene.position}>
          <primitive object={scene} />
        </mesh>
      ))}
    </>
  );
}
