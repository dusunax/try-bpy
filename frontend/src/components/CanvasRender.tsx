import { OrbitControls, Environment, Html } from "@react-three/drei";
import Floor from "./Floor";
Html;
import Scenes from "./Scenes";
import AnimateButtons from "./AnimateButtons";
import { ItemData } from "../mocks/ItemData";
import useCanvasRender from "../hooks/useCanvasRender";

export default function CanvasRender({ itemData }: { itemData: ItemData }) {
  const objects = itemData.objects;
  const { scenes, handleToggle, animatingObjects } = useCanvasRender(objects);

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} />

      <Scenes scenes={scenes} />
      <AnimateButtons
        animatingObjects={animatingObjects}
        handleToggle={handleToggle}
      />

      <Floor />
      <OrbitControls
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
        minDistance={2}
        maxDistance={13}
      />
      <Environment preset="sunset" />
    </>
  );
}
