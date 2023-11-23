import { Route, Routes } from "react-router-dom";
import "./App.css";





import DisplayData from "./components/Todo";


function App() {
  return (
    <div className="App">
    
      <Routes>
       
        <Route path="/" element={<DisplayData/>} />
      </Routes>
    </div>
  );
}

export default App;
