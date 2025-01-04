import { StaticObject, MovingObject, ObjectSpec } from "../interface/ObjectSpec";
import { Vector3 } from "three";

export interface ItemData {
  id: string;
  objects: ObjectSpec[];
}

export const currentItemData: ItemData = {
  id: "test-item",
  objects:[
    new MovingObject(
      "box-a",
      new Vector3(0, 0, 0),
      new Vector3(0, 1, 0),
      new Vector3(0, 2, 0),
      "/models/box.glb"
  ),
    new StaticObject("box-b", new Vector3(2.02, 0, 0), "/models/box.glb"),
  ],
};
