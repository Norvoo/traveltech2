import { useState, useEffect } from "react";
import { FormControl, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { SettingsRemoteRounded } from "@material-ui/icons";
import "../../App.css";
const AddPartner = () => {
  const [data, setData] = useState([]);
  const [headID, setHeadId] = useState(null);
  useEffect(async () => {
    let result = await fetch("http://192.168.0.109/travel/api/app");
    result = await result.json();
    console.log(result);
    setHeadId(result["headID"]);
    setData(result);
  }, []);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const clearState = () => {
    setName("");
    setUrl("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const partner = { name, url, headID };

    fetch("http://192.168.0.109/travel/api/app/menus", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(partner),
    }).then(() => {
      console.log("new Menu");
      clearState();
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
    <div className="add-item">
      <h1>Add Menu</h1>
      <form onSubmit={handleSubmit}>
        <div className="col-sm-6 offset-sm-4">
          <br />
          <FormControl variant="outlined" className={classes.formControl}>
            <div className={classes.root}>
              <TextField
                label="Menu Name"
                value={name}
                variant="outlined"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
          </FormControl>
          <br />
          <FormControl variant="outlined" className={classes.formControl}>
            <div className={classes.root}>
              <TextField
                label="Url"
                value={url}
                variant="outlined"
                onChange={(e) => setUrl(e.target.value)}
                name="description"
              />
            </div>
          </FormControl>

          <br />
          <input
            type="hidden"
            required
            className="form-control"
            value={headID || ""}
            name="headID"
          />

          <Button variant="contained" color="primary" type="submit">
            Add
          </Button>
        </div>
      </form>
    </div>
  );
};
export default AddPartner;
