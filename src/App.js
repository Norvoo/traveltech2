import "./App.css";
import Navbar from "./Components/Navbar/NavBar";
import AddDrop from "./Model/MenuItem/AddDrop";
import EDIT from "./Components/ADMINEDITCONTROl/EdidButton.js";
import { BrowserRouter, Route } from "react-router-dom";

import Kkk from "./Model/Head/update.js";

import Ftr from "./Components/Footer/Footer";
import { HeadProvider } from "./Context/headContext";
import React, { useContext } from "react";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <HeadProvider>
          <Navbar />
        </HeadProvider>
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
    </div>
  );
}
export default App;
