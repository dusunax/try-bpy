import { useState } from "react";

export const COLORS = [
  { name: "A", value: "#ffaaaa" },
  { name: "C", value: "#afaffa" },
  { name: "D", value: "#ff00ff" },
];
export const TEXTURES = [
  {
    name: "Wood",
    textures: {
      diffuse: "/textures/wood/wood_table_001_diff_4k.jpg",
      roughness: "/textures/wood/wood_table_001_rough_4k.exr",
    },
  },
];

export type SelectedColor = (typeof COLORS)[number]["name"];
export type SelectedTexture = (typeof TEXTURES)[number]["name"];

export default function useTabSelection() {
  const [selectedColor, setSelectedColor] = useState<(typeof COLORS)[number]>(
    COLORS[0]
  );
  const [selectedTexture, setSelectedTexture] = useState<
    (typeof TEXTURES)[number]
  >(TEXTURES[0]);

  return {
    selectedColor,
    selectedTexture,
    setSelectedColor,
    setSelectedTexture,
  };
}
