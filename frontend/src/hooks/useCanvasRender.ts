import { useEffect, useMemo, useRef, useState } from "react";
import { AnimationAction, AnimationMixer, LoopOnce, Scene } from "three";
import { useFrame } from "@react-three/fiber";
import { GLTF, GLTFLoader } from "three/examples/jsm/Addons.js";
import {
  AnimatedObject,
  MovingObject,
  ObjectSpec,
} from "../interface/ObjectSpec";

export default function useCanvasRender(objects: ObjectSpec[]) {
  const [gltfs, setGltfs] = useState<Record<string, GLTF>>({});
  const mixers = useRef<Record<string, AnimationMixer>>({});
  const actions = useRef<Record<string, AnimationAction>>({});

  const scenes = useMemo(() => {
    return Object.values(gltfs).map((model) => model.scene);
  }, [gltfs]) as unknown as Scene[];
  const animatingObjects = useMemo(
    () =>
      objects.filter(
        (obj) => obj instanceof AnimatedObject || obj instanceof MovingObject
      ),
    [objects]
  );

  useEffect(() => {
    const loader = new GLTFLoader();

    objects.forEach((object) => {
      if (gltfs[object.id]) return;

      loader.load(object.file, (gltf) => {
        gltf.scene.name = object.id;
        setGltfs((prev) => ({
          ...prev,
          [object.id]: gltf,
        }));

        const animations = gltf.animations;
        if (animations?.length) {
          const mixer = new AnimationMixer(gltf.scene);
          animations.forEach((clip) => {
            const action = mixer.clipAction(clip);
            action.clampWhenFinished = true;
            action.loop = LoopOnce;
            actions.current[object.id] = action;
          });
          mixers.current[object.id] = mixer;
        }
      });
    });
  }, [objects, gltfs]);

  // animated objects
  useFrame((_, delta) => {
    Object.values(mixers.current).forEach((mixer) => mixer.update(delta));
  });

  // moving objects position
  useFrame(() => {
    scenes.forEach((model) => {
      const targetPosition = objects.find(
        (object) => object.id === model.name
      )?.position;

      if (targetPosition && !model.position.equals(targetPosition)) {
        model.position.lerp(targetPosition, 0.2);
      }
    });
  });

  // handlers
  const play = (obj: AnimatedObject) => {
    if (obj.option.isPlaying) return;
    obj.option.isPlaying = true;

    animate(obj, "forward");
  };

  const rewind = (obj: AnimatedObject) => {
    if (!obj.option.isPlaying) return;
    obj.option.isPlaying = false;

    animate(obj, "backward");
  };

  const animate = (obj: AnimatedObject, direction: "forward" | "backward") => {
    const action = actions.current[obj.id];
    action.timeScale = direction === "forward" ? 1 : -1;
    action.paused = false;
    action.play();
  };

  const handleToggle = (obj: AnimatedObject | MovingObject) => {
    if (obj instanceof AnimatedObject) {
      obj.option.isPlaying ? rewind(obj) : play(obj);
    }

    if (obj instanceof MovingObject) {
      obj.toggleMove();
    }
  };

  return {
    mixers,
    actions,
    scenes,
    animatingObjects,
    handleToggle,
  };
}
