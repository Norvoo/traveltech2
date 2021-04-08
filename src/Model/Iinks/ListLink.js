import React, { useEffect, useState } from "react";
import { FormControl, TextField, Dialog, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddLink from "./AddLink.js";
function App() {
  const [links, setLinks] = useState([]);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [id, setId] = useState(null);
  useEffect(() => {
    getLinks();
  }, []);
  function getLinks() {
    fetch("http://192.168.0.111/traveltech2/api/app/links").then((result) => {
      result.json().then((resp) => {
        setLinks(resp);
        setName(resp[0].name);
        setUrl(resp[0].url);
        setId(resp[0].id);
      });
    });
  }

  function deleteMenu(id) {
    fetch("http://192.168.0.111/traveltech2/api/app/links/" + id, {
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

    fetch("http://192.168.0.111/traveltech2/api/app/links/" + id, {
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
      <Button onClick={handleClickOpen("body")}>Add Link</Button>
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
      <table border="1" style={{ float: "left" }}>
        <tbody>
          <tr>
            <td>ID</td>
            <td>Name</td>
            <td>url</td>
          </tr>
          {links.map((item) => (
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
        <button onClick={updateLink}>Update Link</button>
      </div>
    </div>
  );
}
export default App;
