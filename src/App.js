import "./App.css";
import Navbar from "./Components/Navbar/NavBar";
import AddDrop from "./Model/MenuItem/AddDrop";
import EDIT from "./Components/ADMINEDITCONTROl/EdidButton.js";
import { BrowserRouter, Route } from "react-router-dom";

import Kkk from "./Model/Head/update.js";

import Ftr from "./Components/Footer/Footer";
function changeColorHeader() {
  let color = document.getElementById("colorInput").value;
  document.getElementById("headerId").style.backgroundColor = color;
  document.getElementById("colorInputText").value = color;
}
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <EDIT />

        {/* <FIcon /> */}

        {/* <Route path="/update/:id">
          <TestUpdate />
        </Route> */}
        <Route path="/updateList/:id">
          <Kkk />
        </Route>
        <Route path="/"></Route>
        <Route path="/drop/add">
          <AddDrop />
        </Route>
        <Ftr />
      </BrowserRouter>
      <input type="text" id="colorInputText" />
      <input type="color" id="colorInput" />
      <input
        type="button"
        id="colorButton"
        value="change"
        onClick={changeColorHeader}
      />
      {/* hjhjj */}
    </div>
  );
}

export default App;
