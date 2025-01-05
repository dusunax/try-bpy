import { Html } from "@react-three/drei";
import useCanvasRender from "../hooks/useCanvasRender";

export default function AnimateButtons({
  animatingObjects,
  handleToggle,
}: {
  animatingObjects: ReturnType<typeof useCanvasRender>["animatingObjects"];
  handleToggle: ReturnType<typeof useCanvasRender>["handleToggle"];
}) {
  return animatingObjects.map((object) => {
    return (
      <Html position={object.option.buttonPosition} key={object.id}>
        <button
          onClick={() => handleToggle(object)}
          style={{
            backgroundColor: "#00ffff55",
            padding: "10px",
            outline: "none",
            border: "none",
            borderRadius: "100%",
            cursor: "pointer",
          }}
          type="button"
        >
          <div
            style={{
              width: "3px",
              height: "3px",
              backgroundColor: "#00ffff",
              borderRadius: "100%",
            }}
          />
        </button>
      </Html>
    );
  });
}

