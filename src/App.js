import "./App.css";
import Navbar from "./Components/Navbar/NavBar";
import AddMenu from "./Model/Menu/AddMenu.js";
import AddDrop from "./Model/Drop/AddDrop";
import ListDrop from "./Model/Drop/droplist.js";
import EDIT from "./Components/ADMINEDITCONTROl/EdidButton.js";
import { BrowserRouter, Route } from "react-router-dom";
import UP from "./Model/Drop/UpdateDrop.js";
import UPd from "./Model/Drop/list.js";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <EDIT />
        <Route path="/menu/add">
          <AddMenu />
        </Route>
        <Route path="/drop/add">
          <AddDrop />
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
