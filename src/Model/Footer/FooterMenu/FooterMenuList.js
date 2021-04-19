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
import { makeStyles, styled } from "@material-ui/core/styles";

import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import AdFooterMenu from "./AddFooterMenu.js";
function App() {
  const [footerMenus, setFooterMenus] = useState([]);
  const [name, setName] = useState("");
  const [footerID, setFooterId] = useState(null);
  const [id, setId] = useState(null);
  const [links, setLin] = useState([]);
  const [link, setLink] = useState([]);
  const [footer, setFooter] = useState("");
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
  useEffect(async () => {
    let result = await fetch("http://192.168.0.109/travel/api/app/footer");
    result = await result.json();

    setFooter(result);
  }, []);
  useEffect(() => {
    getfootermenus();
  }, []);
  useEffect(async () => {
    let result = await fetch("http://192.168.0.109/travel/api/app/links");
    result = await result.json();

    setLink(result);
  }, []);

  function getfootermenus() {
    fetch("http://192.168.0.109/travel/api/app/footermenus").then((result) => {
      result.json().then((resp) => {
        setFooterMenus(resp);
        setName(resp[0].name);
        setFooterId(resp[0].footerID);
        setLin(resp[0].links);
        setId(resp[0].id);
      });
    });
  }

  function deleteMenu(id) {
    fetch("http://192.168.0.109/travel/api/app/footermenus/" + id, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((resp) => {
        getfootermenus();
      });
    });
  }
  function seletMenu(id) {
    var data;
    let item = footerMenus.map((menu) => {
      if (menu.id == id) data = menu;
    });
    setName(data.name);
    setFooterId(data.footerID);
    setLin(data.links);
    setId(data.id);
  }
  function updateMenu() {
    let item = { name, footerID, id, links };

    fetch("http://192.168.0.109/travel/api/app/footermenus/" + id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    getfootermenus();
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
  const MyButton = styled(Button)({
    background: "linear-gradient(45deg, #4e6cf1 30%, #794cf5 50%)",
    border: 0,
    borderRadius: 3,

    color: "white",
  });
  return (
    <div className="App">
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpen("body")}
      >
        Add Menu Item
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <AdFooterMenu />
      </Dialog>
      <h1>Update Menu Item</h1>
      <TableContainer component={Paper}>
        <Table className={classes.root} aria-label="caption table">
          <TableHead>
            <TableCell>Title</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableHead>
          <TableBody>
            {footerMenus.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => deleteMenu(item.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => seletMenu(item.id)}
                  >
                    Update
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
        <br />
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
        <input type="hidden" value={footerID || ""} name="footerID" />
        <br />
        <br />
        <MyButton onClick={updateMenu}>Update User</MyButton>
      </div>
    </div>
  );
}
export default App;
