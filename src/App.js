import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Getdata from './component/api';
import Singlepost from "./component/Singlepost";


function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Getdata />}></Route>
        <Route path='/view/:id' element={<Singlepost/>}></Route>
      </Routes>
      
    </BrowserRouter>
  )
}

export default App;
