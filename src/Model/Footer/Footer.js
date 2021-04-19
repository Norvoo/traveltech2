import React, { useEffect, useState } from "react";
import { FormControl, TextField, TextareaAutosize } from "@material-ui/core";
import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";

import { styled } from "@material-ui/core/styles";
function App() {
  const [footers, setFooter] = useState([]);
  const [name, setName] = useState("");
  const [desc, setDescription] = useState("");

  const [id, setId] = useState(null);
  useEffect(() => {
    getmenus();
  }, []);
  function getmenus() {
    fetch("http://192.168.0.109/travel/api/app/footer").then((result) => {
      result.json().then((resp) => {
        setFooter(resp);
        console.log("dd", resp);
        setName(resp.name);
        setDescription(resp.desc);
        setId(resp.id);
      });
    });
  }
  function updateMenu() {
    let item = { name, desc, id };
    console.warn("item", item);
    fetch("http://192.168.0.109/travel/api/app/footer/" + id, {
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
  const MyButton = styled(Button)({
    background: "linear-gradient(45deg, #4e6cf1 30%, #794cf5 50%)",
    border: 0,
    borderRadius: 3,

    color: "white",
  });
  return (
    <div className="App">
      <h1>Footer Update </h1>
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
            <label>Description</label>
            <TextareaAutosize
              value={desc}
              aria-label="minimum height"
              rowsMin={3}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
        </FormControl>
        <br />

        <MyButton onClick={updateMenu}>Update menu</MyButton>
      </div>
    </div>
  );
}
export default App;
