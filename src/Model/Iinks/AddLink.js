import { useState, useEffect } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const AddLink = () => {
  const [name, setName] = useState("");
  const [url, setDescription] = useState("");

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
          <input
            type="text"
            required
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
            placeholder="Link Name"
          />
          <br />
          <input
            type="text"
            required
            className="form-control"
            value={url}
            onChange={(e) => setDescription(e.target.value)}
            name="url"
            placeholder="Link url"
          />
          <br />

          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
};
export default AddLink;
