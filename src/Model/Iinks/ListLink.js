import React, { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
function App() {
  const [links, setLinks] = useState([]);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [id, setId] = useState(null);
  console.warn("link", links);
  useEffect(() => {
    getLinks();
  }, []);
  function getLinks() {
    fetch("http://192.168.0.111/traveltech2/api/app/links").then((result) => {
      result.json().then((resp) => {
        console.log(resp);
        // console.warn(resp)
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
        console.warn(resp);
        getLinks();
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
    setUrl(data.url);
    setId(data.id);
  }
  function updateLink() {
    let item = { name, url, id };
    console.warn("item", item);
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

  return (
    <div className="App">
      <h1>Update User Data With API </h1>
      <table border="1" style={{ float: "left" }}>
        <tbody>
          <tr>
            <td>ID</td>
            <td>Name</td>
            <td>url</td>
          </tr>
          {inks.map((item, i) => (
            <tr key={i}>
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
          <br />
        </FormControl>
        <br />
        <button onClick={updateLink}>Update Link</button>
      </div>
    </div>
  );
}
export default App;
