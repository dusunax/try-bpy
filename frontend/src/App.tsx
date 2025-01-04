import './index.css'
import Render from './components/CanvasRender'
import { currentItemData } from './mocks/ItemData';

function App() {
  const itemData = currentItemData;
  
  return (<Render itemData={itemData} />)
}

export default App
