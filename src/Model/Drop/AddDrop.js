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
  const [links, setLink] = useState([]);
  console.warn("link", links);
  useEffect(async () => {
    let result = await fetch("http://192.168.0.111/traveltech2/api/app/links");
    result = await result.json();
    console.log(result);
    setLink(result);
  }, []);

  const [name, setName] = useState("");
  const [desc, setDescription] = useState("");
  const [menusID, setMenuId] = useState("");
  const [link, setLin] = useState([]);
  const getValue = (e) => {
    let datalink = link;
    datalink.push({ id: parseInt(e.target.value) });
    setLin(datalink);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const partner = { name, desc, menusID, link };

    fetch("http://192.168.0.111/traveltech2/api/app/menuItems", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(partner),
    }).then(() => {
      console.log("new Menu items");
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
            <Select value={menusID} onChange={(e) => setMenuId(e.target.value)}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {data.map((item) => {
                return (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>
            {links.map((item) => {
              return (
                <>
                  <input
                    key={item.id}
                    type="checkbox"
                    onChange={(e) => getValue(e)}
                    value={item.id}
                  />
                  <label>{item.name}</label>
                </>
              );
            })}
          </FormControl>

          <br />
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
};
export default AddUrl;
