import "./App.css";
import Navbar from "./Components/Navbar/NavBar";
import AddMenu from "./Model/Drop/AddDrop.js";
import Url from "./Model/Url/AddUrl";
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <Route path="/add">
          <AddMenu />
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
