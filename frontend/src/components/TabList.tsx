import useTabSelection, { COLORS, TEXTURES } from "../hooks/useTabSelection";
import colorWeaver from "../lib/colorWeaver";

interface TabListProps extends ReturnType<typeof useTabSelection> {}

export default function TabList({
  selectedColor,
  selectedTexture,
  setSelectedColor,
  setSelectedTexture,
}: TabListProps) {
  return (
    <nav
      style={{
        height: "4rem",
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        margin: 0,
        backgroundColor: "#dddddd66",
      }}
    >
      <ul
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <li style={{ display: "flex", gap: "0.25rem" }}>
          {COLORS.map((color) => (
            <TabButton
              key={color.name}
              isSelected={selectedColor === color}
              onClick={() => setSelectedColor(color)}
              select={color.name}
              backgroundColor={color.value}
            />
          ))}
        </li>
        <li style={{ display: "flex", gap: "0.25rem" }}>
          {TEXTURES.map((texture) => (
            <TabButton
              key={texture.name}
              isSelected={selectedTexture === texture}
              onClick={() => setSelectedTexture(texture)}
              select={texture.name}
            />
          ))}
        </li>
      </ul>
    </nav>
  );
}

function TabButton({
  isSelected,
  onClick,
  select,
  backgroundColor,
}: {
  isSelected: boolean;
  onClick: () => void;
  select?: string;
  backgroundColor?: string;
}) {
  return (
    <button
      style={{
        ...(backgroundColor
          ? {
              backgroundColor: backgroundColor,
              color: colorWeaver.getTextColor(backgroundColor),
            }
          : {}),
        borderColor: isSelected ? "black" : "transparent",
        padding: "0.5rem 1rem",
        borderRadius: "2rem",
        fontSize: "0.75rem",
      }}
      onClick={onClick}
    >
      {select}
    </button>
  );
}
