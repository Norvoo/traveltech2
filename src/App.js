import "./App.css";
import Navbar from "./Components/Navbar/NavBar";
import AddMenu from "./Model/Menu/AddMenu.js";
import AddDrop from "./Model/Drop/AddDrop";
import ListDrop from "./Model/Drop/droplist.js";
import EDIT from "./Components/ADMINEDITCONTROl/EdidButton.js";
import { BrowserRouter, Route } from "react-router-dom";

import TestUpdate from "./TestUpdate.js";
import Kkk from "./Model/Head/update.js";

// import II from "./testdialog";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <EDIT />

        {/* <II /> */}
        <Route path="/update/:id">
          <TestUpdate />
        </Route>
        <Route path="/updateList/:id">
          <Kkk />
        </Route>
        <Route path="/"></Route>
        <Route path="/drop/add">
          <AddDrop />
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
