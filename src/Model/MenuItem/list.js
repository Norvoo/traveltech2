import React, { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Dialog,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddMenuItem from "./AddDrop.js";
function App() {
  const [menuItems, setMenuItems] = useState([]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [menusId, setMenusId] = useState("");
  const [id, setId] = useState(null);
  const [links, setLin] = useState([]);
  const getValue = (e) => {
    let datalink = link;
    datalink.push({ id: parseInt(e.target.value) });
    setLin(datalink);
  };
  const [menu, setMenu] = useState([]);
  useEffect(async () => {
    let result = await fetch("http://192.168.0.111/traveltech2/api/app/menus");
    result = await result.json();

    setMenu(result);
  }, []);

  useEffect(() => {
    getmenuItemss();
  }, []);
  const [link, setLink] = useState([]);
  useEffect(async () => {
    let result = await fetch("http://192.168.0.111/traveltech2/api/app/links");
    result = await result.json();

    setLink(result);
  }, []);

  function getmenuItemss() {
    fetch("http://192.168.0.111/traveltech2/api/app/menuItems").then(
      (result) => {
        result.json().then((resp) => {
          setMenuItems(resp);
          setName(resp[0].name);
          setDesc(resp[0].desc);
          setMenusId(resp[0].menusID);
          setLin(resp[0].links);
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
        getmenuItemss();
      });
    });
  }
  function seletMenu(id) {
    var data;
    let item = menuItems.map((menu) => {
      if (menu.id == id) data = menu;
    });
    setName(data.name);
    setDesc(data.desc);
    setMenusId(data.menusID);
    setLin(data.links);
    setId(data.id);
  }
  function updateMenu() {
    let item = { name, desc, menusId, id, links };

    fetch("http://192.168.0.111/traveltech2/api/app/menuItems/" + id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    }).then((result) => {
      result.json().then((resp) => {
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
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="App">
      <Button onClick={handleClickOpen("body")}>Add Menu Item</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <AddMenuItem />
      </Dialog>
      <h1>Update Menu Item</h1>
      <table border="1" style={{ float: "left" }}>
        <tbody>
          <tr>
            <td>ID</td>
            <td>Name</td>
            <td>Description</td>
          </tr>
          {menuItems.map((item, i) => (
            <tr key={item.id}>
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
              value={name || ""}
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
              value={desc || ""}
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
        {link.map((i) => {
          var has = links.filter((li) => {
            if (li.id == i.id) {
              return li;
            }
          });
          if (has.length > 0) {
            return (
              <>
                <input
                  key={i.id}
                  type="checkbox"
                  checked="true"
                  onChange={(e) => getValue(e)}
                  value={i.id || ""}
                />
                <label>{i.name}</label>
              </>
            );
          } else {
            return (
              <>
                <input
                  key={i.id}
                  type="checkbox"
                  onChange={(e) => getValue(e)}
                  value={i.id || ""}
                />
                <label>{i.name}</label>
              </>
            );
          }
        })}
        <br />
        <button onClick={updateMenu}>Update User</button>
      </div>
    </div>
  );
}
export default App;
// onChange={(e) => {
//   let checked = e.target.checked;
//   setLin(
//     links.map((data) => {
//       if (i.id == data.id) {
//         data = true;
//       }
//       return data;
//     })
//   );
// }}
