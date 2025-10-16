
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";


import StorePage from './pages/storePage';
function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <StorePage />
    </BrowserRouter>
    </div>
  );
}

export default App;
