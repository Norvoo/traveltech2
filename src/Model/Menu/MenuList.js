import React, { useEffect, useState } from "react";
import { FormControl, TextField, Container } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { makeStyles } from "@material-ui/core/styles";
import Up from "./AddMenu.js";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { styled } from "@material-ui/core/styles";
import { getData } from "../../helper";
function App() {
  const [menus, setMenus] = useState([]);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [headID, setHeadId] = useState(null);
  const [id, setId] = useState(null);

  const [head, setHead] = useState([]);
  useEffect(() => {
    getData("http://192.168.0.109/travel/api/app/head", setHead);
    getmenus();
  }, []);
  function getmenus() {
    fetch("http://192.168.0.109/travel/api/app/menus").then((result) => {
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
    fetch("http://192.168.0.109/travel/api/app/menus/" + id, {
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
    fetch("http://192.168.0.109/travel/api/app/menus/" + id, {
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
        fontSize: "rem",
        background: "#d8d7d7",
      },
    },
    table: {
      minWidth: "100%",
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
  const MyButton = styled(Button)({
    background: "linear-gradient(45deg, #4e6cf1 30%, #794cf5 50%)",
    border: 0,
    borderRadius: 3,

    color: "white",
  });
  return (
    <div className="App">
      <Container maxWidth="lg">
        <Button
          variant="contained"
          color="primary"
          onClick={handleClickOpen("body")}
        >
          Add Menu
        </Button>
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
        <TableContainer component={Paper}>
          <Table className={classes.root} aria-label="caption table">
            <TableHead>
              <TableCell>Menu </TableCell>
              <TableCell>Name</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableHead>
            <TableBody>
              {menus.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.url}</TableCell>
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
          <div>
            <input type="hidden" value={headID || ""} name="headID" />
            <br />
          </div>
          <MyButton onClick={updateMenu}>Update menu</MyButton>
        </div>
      </Container>
    </div>
  );
}
export default App;
