import { Vector3 } from "three";

export class StaticObject {
  constructor(public id: string, public position: Vector3, public file: string) {}
}

export class MovingObject extends StaticObject {
  constructor(
    public id: string,
    public position: Vector3,
    private targetPosition: Vector3,
    public buttonPosition: Vector3,
    public file: string
  ) {
    super(id, position, file);
  }

  move() {
    if (this.position.y === this.targetPosition.y) {
      this.position.y = 0;
    } else {
      this.position.y = this.targetPosition.y;
    }
  }
}

export type ObjectSpec = StaticObject | MovingObject;
