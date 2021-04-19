import React, { useEffect, useState } from "react";
import {
  FormControl,
  TextField,
  Dialog,
  Button,
  TableHead,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddLink from "./AddLink.js";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { styled } from "@material-ui/core/styles";
function App() {
  const [links, setLinks] = useState([]);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [id, setId] = useState(null);
  useEffect(() => {
    getLinks();
  }, []);
  function getLinks() {
    fetch("http://192.168.0.109/travel/api/app/links").then((result) => {
      result.json().then((resp) => {
        setLinks(resp);
        setName(resp[0].name);
        setUrl(resp[0].url);
        setId(resp[0].id);
      });
    });
  }

  function deleteMenu(id) {
    fetch("http://192.168.0.109/travel/api/app/links/" + id, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((resp) => {
        getLinks();
      });
    });
  }
  function seletMenu(id) {
    var data;
    let item = links.map((menu) => {
      if (menu.id == id) data = menu;
    });

    setName(data.name);
    setUrl(data.url);
    setId(data.id);
  }
  function updateLink() {
    let item = { name, url, id };

    fetch("http://192.168.0.109/travel/api/app/links/" + id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    }).then((result) => {
      result.json().then((resp) => {
        console.warn(resp);
        getLinks();
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
        Add Link
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <AddLink />
      </Dialog>
      <h1>Update Link </h1>
      <TableContainer component={Paper}>
        <Table className={classes.root} aria-label="caption table">
          <TableHead>
            <TableCell>Link </TableCell>
            <TableCell>Link Url</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableHead>
          <TableBody>
            {links.map((item) => (
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
              label="url"
              value={url}
              variant="outlined"
              onChange={(e) => {
                setUrl(e.target.value);
              }}
            />
          </div>
        </FormControl>

        <br />
        <br />
        <MyButton onClick={updateLink}>Update Link</MyButton>
      </div>
    </div>
  );
}
export default App;
