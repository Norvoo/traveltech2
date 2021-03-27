import React, { useState, useEffect } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const AddUrl = () => {
  const [data, setData] = useState([]);
  useEffect(async () => {
    let result = await fetch("http://192.168.0.111/traveltech2/api/app/menus");
    result = await result.json();
    console.log(result);
    setData(result);
  }, []);
  console.warn("data", data);

  const [name, setName] = useState("");
  const [desc, setDescription] = useState("");
  const [menuID, setMenuId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const partner = { name, desc, menuID };

    fetch("http://192.168.0.111/traveltech2/api/app/drops", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(partner),
    }).then(() => {
      console.log("new Drop");
    });
    alert("data saved");
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
      <h1>Add Drop</h1>
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
            placeholder="UrL Source"
          />
          <br />
          <textarea
            type="text"
            required
            className="form-control"
            value={desc}
            onChange={(e) => setDescription(e.target.value)}
            name="description"
            placeholder="Description"
          />
          <br />
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Age</InputLabel>
            <Select value={menuID} onChange={(e) => setMenuId(e.target.value)}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {data.map((item) => {
                return <MenuItem value={item.id}>{item.name}</MenuItem>;
              })}
            </Select>
          </FormControl>
          ;
          <br />
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
};
export default AddUrl;
