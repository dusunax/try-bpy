import { Html } from "@react-three/drei";
import { MovingObject } from "../interface/ObjectSpec";

export default function AnimateButtons({movingObjects, moveToggle}: {movingObjects: MovingObject[], moveToggle: (movingObject: MovingObject)=>void}){
  return movingObjects.map((movingObject) => {
    return (
      <Html position={movingObject.buttonPosition} key={movingObject.id}>
        <button
          onClick={() => moveToggle(movingObject)}
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
    )
  })
}

