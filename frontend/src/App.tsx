import './index.css'
import { currentItemData } from "./mocks/ItemData";
import CanvasWrapper from "./components/CanvasWrapper";
import CanvasRender from "./components/CanvasRender";
import TabList from "./components/TabList";
import useTabSelection from "./hooks/useTabSelection";

function App() {
  const itemData = currentItemData;
  const useTabSelectionProps = useTabSelection();
  const selection = {
    selectedColor: useTabSelectionProps.selectedColor,
    selectedTexture: useTabSelectionProps.selectedTexture,
  };

  return (
    <>
      <CanvasWrapper>
        <CanvasRender itemData={itemData} selection={selection} />
      </CanvasWrapper>
      <TabList {...useTabSelectionProps} />
    </>
  );
}

export default App
