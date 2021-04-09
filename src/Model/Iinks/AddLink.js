import { useState, useEffect } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";
const AddLink = () => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const partner = { name, url };

    fetch("http://192.168.0.111/traveltech2/api/app/links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(partner),
    }).then(() => {
      console.log("new Link");
    });
    alert("new Menu");
  };
  const useStyles = makeStyles((theme) => ({
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
    <div>
      <h1>Add Menu</h1>
      <form onSubmit={handleSubmit}>
        <div className="col-sm-6 offset-sm-4">
          <br />

          <>
            <TextField
              variant="outlined"
              type="text"
              required
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="name"
              placeholder="Link Name"
            />
          </>
          <br />
          <>
            <TextField
              variant="outlined"
              type="text"
              className="form-control"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              name="url"
              placeholder="Link url"
            />
          </>

          <br />

          <Button variant="contained" color="primary" type="submit">
            Add
          </Button>
        </div>
      </form>
    </div>
  );
};
export default AddLink;
