import {
  StaticObject,
  MovingObject,
  ObjectSpec,
  AnimatedObject,
} from "../interface/ObjectSpec";
import { Vector3 } from "three";

export interface ItemData {
  id: string;
  objects: ObjectSpec[];
}

export const currentItemData: ItemData = {
  id: "test-item",
  objects: [
    new MovingObject("box-a", new Vector3(0, 0, 0), "/models/box.glb", {
      targetPosition: new Vector3(0, 1, 0),
      buttonPosition: new Vector3(0, 2.5, 0),
    }),
    new StaticObject("box-b", new Vector3(2.02, 0, 0), "/models/box.glb"),
    new AnimatedObject(
      "box-c",
      new Vector3(-1.04, -1, 1),
      "/models/animating-box.glb",
      {
        buttonPosition: new Vector3(-2, 2, 1),
        isPlaying: false,
      }
    ),
  ],
};
