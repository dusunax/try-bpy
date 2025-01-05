import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimationAction,
  AnimationMixer,
  LoopOnce,
  Mesh,
  MeshStandardMaterial,
  Scene,
  Texture,
  TextureLoader,
} from "three";
import { useFrame } from "@react-three/fiber";
import { GLTF, GLTFLoader } from "three/examples/jsm/Addons.js";
import {
  AnimatedObject,
  MovingObject,
  ObjectSpec,
} from "../interface/ObjectSpec";
import useTabSelection from "./useTabSelection";

interface UseCanvasRenderProps {
  objects: ObjectSpec[];
  selection: {
    selectedColor: ReturnType<typeof useTabSelection>["selectedColor"];
    selectedTexture: ReturnType<typeof useTabSelection>["selectedTexture"];
  };
}

const DEFAULT_COLOR = "#00ffff";
const textureCache = new Map<string, Texture>();

const loadMaterial = (color: string, textures: Record<string, string>) => {
  const diffuseTexture = textures.diffuse
    ? textureCache.get(textures.diffuse) ||
      new TextureLoader().load(textures.diffuse, (texture) =>
        textureCache.set(textures.diffuse, texture)
      )
    : null;
  const roughnessTexture = textures.roughness
    ? textureCache.get(textures.roughness) ||
      new TextureLoader().load(textures.roughness, (texture) =>
        textureCache.set(textures.roughness, texture)
      )
    : null;

  return new MeshStandardMaterial({
    color,
    map: diffuseTexture,
    roughnessMap: roughnessTexture,
    roughness: 1,
    metalness: 0,
  });
};

export default function useCanvasRender({
  objects,
  selection,
}: UseCanvasRenderProps) {
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
    [objects, selection]
  );

  useEffect(() => {
    scenes.forEach((scene) =>
      scene.traverse((child) => {
        if ((child as any).isMesh) {
          const mesh = child as Mesh;
          if (mesh.material instanceof MeshStandardMaterial) {
            mesh.material.color.set(
              selection.selectedColor.value || DEFAULT_COLOR
            );
          }
        }
      })
    );
  }, [selection.selectedColor, scenes]);

  useEffect(() => {
    const loader = new GLTFLoader();

    objects.forEach((object) => {
      if (gltfs[object.id]) return;

      loader.load(object.file, (gltf) => {
        gltf.scene.name = object.id;
        gltf.scene.traverse((child) => {
          if ((child as any).isMesh) {
            const mesh = child as Mesh;
            const material = loadMaterial(
              selection.selectedColor.value || DEFAULT_COLOR,
              selection.selectedTexture.textures || {}
            );
            mesh.material = material;
          }
        });

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
