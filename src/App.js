import "./App.css";
import Navbar from "./Components/Navbar/NavBar";
import AddDrop from "./Model/MenuItem/AddDrop";
import EDIT from "./Components/ADMINEDITCONTROl/EdidButton.js";
import { BrowserRouter, Route } from "react-router-dom";

import Kkk from "./Model/Head/update.js";
import Router from "./PATCH/LocalPatch";
import Ftr from "./Components/Footer/Footer";
import { HeadProvider } from "./Context/headContext";
import React, { useContext } from "react";
import { Container } from "@material-ui/core";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <HeadProvider>
          <Navbar />
        </HeadProvider>
        <Container>
          <EDIT />
          <Router />
        </Container>
        <Ftr />
      </BrowserRouter>
    </div>
  );
}
export default App;
