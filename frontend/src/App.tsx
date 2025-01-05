import './index.css'
import { currentItemData } from "./mocks/ItemData";
import CanvasWrapper from "./components/CanvasWrapper";
import CanvasRender from "./components/CanvasRender";

function App() {
  const itemData = currentItemData;

  return (
    <CanvasWrapper>
      <CanvasRender itemData={itemData} />
    </CanvasWrapper>
  );
}

export default App
