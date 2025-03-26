import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Create from "./create";
import Read from "./read";


function App() {
  return (
   
      <Routes>
        <Route path="/" element={<Create />} />
        <Route path="/read" element={<Read/>} />
      </Routes>
   
  );
}

export default App;
