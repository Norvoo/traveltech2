import { useState, useEffect } from "react";
import { FormControl, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { SettingsRemoteRounded } from "@material-ui/icons";
import "../../App.css";
import { jsonDataPost, getConnectIdData } from "../../helper";
const AddPartner = () => {
  const [data, setData] = useState([]);
  const [headID, setHeadId] = useState(null);
  useEffect(async () => {
    getConnectIdData(
      "http://192.168.0.109/travel/api/app",
      setHeadId,
      setData,
      "headID"
    );
  }, []);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const partner = { name, url, headID };

    jsonDataPost(partner, "http://192.168.0.109/travel/api/app/menus").then(
      () => {
        console.log("new Menu");
      }
    );
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
