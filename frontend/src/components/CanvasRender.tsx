import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import Floor from "./Floor";
import Models from "./Model";
import AnimateButtons from "./AnimateButtons";
import { MovingObject } from "../interface/ObjectSpec";
import { ItemData } from "../mocks/ItemData";

export default function CanvasRender({itemData}: {itemData: ItemData}) {
  const objects = itemData.objects;
  const movingObjects = objects.filter((object) => object instanceof MovingObject);
  const moveToggle = (movingObject: MovingObject) => movingObject.move();

  return (
    <div style={{ width: "100%", height: "100vh", backgroundColor: "#dddddd" }}>
      <Canvas>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} />

        <Models objects={objects} />
        <AnimateButtons movingObjects={movingObjects} moveToggle={moveToggle} />

        <Floor />
        <OrbitControls 
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2}
          />
        <Environment preset="sunset" />
      </Canvas>
    </div>
  );
};
