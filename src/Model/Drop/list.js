import React, { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
function App() {
  const [menuItems, setMenuItems] = useState([]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [menusId, setMenusId] = useState("");
  const [id, setId] = useState(null);

  const [menu, setMenu] = useState([]);
  useEffect(async () => {
    let result = await fetch("http://192.168.0.111/traveltech2/api/app/menus");
    result = await result.json();
    console.log(result);
    setMenu(result);
  }, []);
  console.warn("menu", menu);
  useEffect(() => {
    getmenuItemss();
  }, []);
  function getmenuItemss() {
    fetch("http://192.168.0.111/traveltech2/api/app/menuItems").then(
      (result) => {
        result.json().then((resp) => {
          console.log(resp);
          // console.warn(resp)
          setMenuItems(resp);
          setName(resp[0].name);
          setDesc(resp[0].desc);
          setMenusId(resp[0].menusID);
          setId(resp[0].id);
        });
      }
    );
  }

  function deleteMenu(id) {
    fetch("http://192.168.0.111/traveltech2/api/app/menuItems/" + id, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((resp) => {
        console.warn(resp);
        getmenuItemss();
      });
    });
  }
  function seletMenu(id) {
    var data;
    let item = menuItems.map((menu) => {
      if (menu.id == id) data = menu;
    });
    console.log(data);
    setName(data.name);
    setDesc(data.desc);
    setMenusId(data.menusID);
    setId(data.id);
  }
  function updateMenu() {
    let item = { name, desc, menusId, id };
    console.warn("item", item);
    fetch("http://192.168.0.111/traveltech2/api/app/menuItems/" + id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    }).then((result) => {
      result.json().then((resp) => {
        console.warn(resp);
        getmenuItemss();
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

  return (
    <div className="App">
      <h1>Update User Data With API </h1>
      <table border="1" style={{ float: "left" }}>
        <tbody>
          <tr>
            <td>ID</td>
            <td>Name</td>
            <td>Description</td>
          </tr>
          {menuItems.map((item, i) => (
            <tr key={i}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.desc}</td>
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
              label="Description"
              value={desc}
              variant="outlined"
              onChange={(e) => {
                setDesc(e.target.value);
              }}
            />
          </div>
        </FormControl>
        <br />
        <FormControl variant="outlined" className={classes.formControl}>
          <Select value={menusId} onChange={(e) => setMenusId(e.target.value)}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {menu.map((item) => {
              return (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <br />
        <button onClick={updateMenu}>Update User</button>
      </div>
    </div>
  );
}
export default App;
