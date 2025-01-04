import { useEffect,  useState } from "react";
import { Mesh } from "three";
import { useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { ObjectSpec } from "../interface/ObjectSpec";

export default function Models({ objects }: { objects: ObjectSpec[] }) {
  const [models, setModels] = useState<Record<string, Mesh>>({});

  useEffect(() => {
    const loader = new GLTFLoader();

    objects.forEach((object) => {
      loader.load(object.file, (gltf) => {
        gltf.scene.name = object.id;
        
        if(models[object.id] === undefined) {
          setModels((prev) => ({...prev, [object.id]: gltf.scene as unknown as Mesh}));
        }
      });
    });
  }, []);

  const modelValues = Object.values(models);
  useFrame(() => {
    if (modelValues.length > 0) {
      modelValues.forEach((model) => {
        const currentPosition = model.position;
        const targetPosition = objects.find((object) => object.id === model.name)?.position;
        
        if(targetPosition && currentPosition !== targetPosition) {
          currentPosition.lerp(targetPosition, 0.2);
        }
      });
    }
  });

  return (
    <>
      {modelValues.map((model) => (
        <mesh key={model.id} position={model.position}>
          <primitive object={model} />
        </mesh>
      ))}
    </>
  );
}
