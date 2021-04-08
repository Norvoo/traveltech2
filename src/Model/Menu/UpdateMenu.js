import React, { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { makeStyles } from "@material-ui/core/styles";
import Up from "./AddMenu.js";
function App() {
  const [menus, setMenus] = useState([]);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [headID, setHeadId] = useState(null);
  const [id, setId] = useState(null);

  const [head, setHead] = useState([]);
  useEffect(async () => {
    let result = await fetch("http://192.168.0.111/traveltech2/api/app/head");
    result = await result.json();

    setHead(result);
  }, []);

  useEffect(() => {
    getmenus();
  }, []);
  function getmenus() {
    fetch("http://192.168.0.111/traveltech2/api/app/menus").then((result) => {
      result.json().then((resp) => {
        setMenus(resp);
        setName(resp[0].name);
        setUrl(resp[0].url);
        setHeadId(resp[0].headID);
        setId(resp[0].id);
      });
    });
  }

  function deleteMenu(id) {
    fetch("http://192.168.0.111/traveltech2/api/app/menus/" + id, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((resp) => {
        getmenus();
      });
    });
  }
  function seletMenu(id) {
    var data;
    let item = menus.map((menu) => {
      if (menu.id == id) data = menu;
    });
    console.log(data);
    setName(data.name);
    setUrl(data.url);
    setHeadId(data.headID);
    setId(data.id);
  }
  function updateMenu() {
    let item = { name, url, headID, id };
    console.warn("item", item);
    fetch("http://192.168.0.111/traveltech2/api/app/menus/" + id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    }).then((result) => {
      result.json().then((resp) => {
        getmenus();
      });
    });
  }
  const useStyles = makeStyles((theme) => ({
    root: {
      "& > * ": {
        margin: theme.spacing(1),
        minWidth: "100%",
        fontSize: "1rem",
        background: "#d8d7d7",
      },
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
      fontSize: "1rem",
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  return (
    <div className="App">
      <Button onClick={handleClickOpen("body")}>Add Menu</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <Up />
      </Dialog>
      <h1>Menu Update </h1>
      <table border="1" style={{ float: "left" }}>
        <tbody>
          <tr>
            <td>ID</td>
            <td>Name</td>
            <td>Url</td>
          </tr>
          {menus.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.url}</td>

              <td>
                <button onClick={() => deleteMenu(item.id)}>Delete</button>
              </td>
              <td>
                <button onClick={() => seletMenu(item.id)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <FormControl variant="outlined" className={classes.formControl}>
          <div className={classes.root}>
            <TextField
              label="Title"
              value={name}
              variant="outlined"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
          <div className={classes.root}>
            <TextField
              label="Url"
              value={url}
              variant="outlined"
              onChange={(e) => {
                setUrl(e.target.value);
              }}
            />
          </div>
        </FormControl>
        <br />

        <input type="hidden" value={headID || ""} name="headID" />
        <br />
        <button onClick={updateMenu}>Update menu</button>
      </div>
    </div>
  );
}
export default App;
