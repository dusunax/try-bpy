import { Vector3 } from "three";

export class StaticObject {
  constructor(public id: string, public position: Vector3, public file: string) {}
}

export class MovingObject extends StaticObject {
  constructor(
    public id: string,
    public position: Vector3,
    public file: string,
    public option: {
      targetPosition: Vector3;
      buttonPosition: Vector3;
    }
  ) {
    super(id, position, file);
  }

  toggleMove() {
    if (this.position.y === this.option.targetPosition.y) {
      this.position.y = 0;
    } else {
      this.position.y = this.option.targetPosition.y;
    }
  }
}

export class AnimatedObject extends StaticObject {
  constructor(
    public id: string,
    public position: Vector3,
    public file: string,
    public option: {
      buttonPosition: Vector3;
      isPlaying: boolean;
    }
  ) {
    super(id, position, file);
  }

  togglePlay() {
    this.option.isPlaying = !this.option.isPlaying;
  }
}

export type ObjectSpec = StaticObject | MovingObject | AnimatedObject;
