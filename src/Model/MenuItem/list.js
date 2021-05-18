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
import AddMenuItem from "./AddDrop.js";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import UpdateMenuItem from "../MenuItem/UpdateMenuitem";
import { Link } from "react-router-dom";
import "../../App.css";
function App() {
  const [menuItems, setMenuItems] = useState([]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [menusId, setMenusId] = useState("");
  const [id, setId] = useState(null);
  const [links, setLin] = useState([]);
  const [link, setLink] = useState([]);
  const [menu, setMenu] = useState([]);
  // const getValue = (e) => {
  //   var val = e.target.checked;
  //   let datalink = links;
  //   if (val == true) {
  //     datalink.push({ id: parseInt(e.target.value) });
  //   } else {
  //     datalink = datalink.filter((link) => {
  //       if (link.id != e.target.value) {
  //         return link;
  //       }
  //     });
  //   }
  //   setLin(datalink);
  // };
  useEffect(async () => {
    let result = await fetch("http://192.168.0.109/travel/api/app/menus");
    result = await result.json();

    setMenu(result);
  }, []);

  useEffect(() => {
    getmenuItemss();
  }, []);
  useEffect(async () => {
    let result = await fetch("http://192.168.0.109/travel/api/app/links");
    result = await result.json();

    setLink(result);
  }, []);

  function getmenuItemss() {
    fetch("http://192.168.0.109/travel/api/app/menuItems").then((result) => {
      result.json().then((resp) => {
        setMenuItems(resp);
        setName(resp[0].name);
        setDesc(resp[0].desc);
        setMenusId(resp[0].menusID);
        setLin(resp[0].links);
        setId(resp[0].id);
      });
    });
  }

  function deleteMenu(id) {
    fetch("http://192.168.0.109/travel/api/app/menuItems/" + id, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((resp) => {
        getmenuItemss();
      });
    });
  }
  // function seletMenu(id) {
  //   var data;
  //   let item = menuItems.map((menu) => {
  //     if (menu.id == id) data = menu;
  //   });
  //   setName(data.name);
  //   setDesc(data.desc);
  //   setMenusId(data.menusID);
  //   setLin(data.links);
  //   setId(data.id);
  // }
  // function updateMenu() {
  //   let item = { name, desc, menusId, id, links };

  //   fetch("http://192.168.0.109/travel/api/app/menuItems/" + id, {
  //     method: "PUT",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(item),
  //   });
  //   getmenuItemss();
  // }
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
        <AddMenuItem />
      </Dialog>
      <h1>Update Menu Item</h1>
      <TableContainer component={Paper}>
        <Table className={classes.root} aria-label="caption table">
          <TableHead>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableHead>
          <TableBody>
            {menuItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.desc}</TableCell>
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
                  <Button variant="contained" color="primary">
                    <Link className="update" to={"/menuitemupdate/" + item.id}>
                      Update
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <br />
      <br />
      <br />
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
