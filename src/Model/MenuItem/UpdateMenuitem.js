import React, { useEffect, useState } from "react";
import { Select, MenuItem, FormControl, Button } from "@material-ui/core";
import { makeStyles, styled } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";

function UpdateMenuitem(prop) {
  const id = prop.match.params.id;
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [menusId, setMenusId] = useState("");
  const [links, setLin] = useState([]);
  const [link, setLink] = useState([]);
  const [menu, setMenu] = useState([]);
  const [menui, setMenuItems] = useState([]);
  const getValue = (e) => {
    var val = e.target.checked;
    let datalink = links;
    if (val == true) {
      datalink.push({ id: parseInt(e.target.value) });
    } else {
      datalink = datalink.filter((link) => {
        if (link.id != e.target.value) {
          return link;
        }
      });
    }
    setLin(datalink);
  };

  useEffect(() => {
    getmenuItemss();
    getMenu();
    getlink();
  }, []);

  async function getlink() {
    let result = await fetch("http://192.168.0.109/travel/api/app/links");
    result = await result.json();

    setLink(result);
  }
  async function getMenu() {
    let result = await fetch("http://192.168.0.109/travel/api/app/menus");
    result = await result.json();

    setMenu(result);
  }
  async function getmenuItemss() {
    let result = await fetch(
      "http://192.168.0.109/travel/api/app/menuItems/" + id
    );

    result = await result.json();
    setMenuItems(result);
    setName(result.name);
    setDesc(result.desc);
    setMenusId(result.menusID);
    setLin(result.links);
  }
  console.log("dfsf", menui);

  function updateMenu() {
    let item = { name, desc, menusId, id, links };

    fetch("http://192.168.0.109/travel/api/app/menuItems/" + id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    getmenuItemss();
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
  const MyButton = styled(Button)({
    background: "linear-gradient(45deg, #4e6cf1 30%, #794cf5 50%)",
    border: 0,
    borderRadius: 3,

    color: "white",
  });
  const classes = useStyles();
  return (
    <div>
      <div>
        <from>
          <div>
            <input
              defaultValue={menui.name}
              className="inpute"
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Menu Item Name"
            />
          </div>
          <textarea
            defaultValue={menui.desc}
            variant="outlined"
            onChange={(e) => {
              setDesc(e.target.value);
            }}
            placeholder="Description"
          />
          <br />
          <FormControl variant="outlined" className={classes.formControl}>
            <Select
              value={menui.menusId}
              onChange={(e) => setMenusId(e.target.value)}
            >
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
          <div className="inputGrid">
            {link.map((i) => {
              var has = links.filter((li) => {
                if (li.id == i.id) {
                  return li;
                }
              });
              if (has.length != 0) {
                return (
                  <div>
                    <input
                      key={i.id}
                      type="checkbox"
                      checked={true}
                      onChange={(e) => getValue(e)}
                      value={i.id || ""}
                    />
                    <label>{i.name}</label>
                  </div>
                );
              } else {
                console.log("its false");
                return (
                  <div>
                    <input
                      key={i.id}
                      type="checkbox"
                      checked={false}
                      onChange={(e) => getValue(e)}
                      value={i.id || ""}
                    />
                    <label>{i.name}</label>
                  </div>
                );
              }
            })}
          </div>
          <br />
          <MyButton onClick={updateMenu}>Update menu item</MyButton>
        </from>
        <br />
      </div>
      <br />
      <br />
      <br />
    </div>
  );
}
export default withRouter(UpdateMenuitem);
