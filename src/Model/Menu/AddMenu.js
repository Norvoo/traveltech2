import { useState, useEffect } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const AddPartner = () => {
  const [data, setData] = useState([]);
  const [headID, setHeadId] = useState(null);
  useEffect(async () => {
    let result = await fetch("http://192.168.0.111/traveltech2/api/app");
    result = await result.json();
    console.log(result);
    setHeadId(result["headID"]);
    setData(result);
  }, []);
  const [name, setName] = useState("");
  const [url, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const partner = { name, url, headID };

    fetch("http://192.168.0.111/traveltech2/api/app/menus", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(partner),
    }).then(() => {
      console.log("new Menu");
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
            placeholder="Partners"
          />
          <br />
          <input
            type="text"
            required
            className="form-control"
            value={url}
            onChange={(e) => setDescription(e.target.value)}
            name="description"
            placeholder="Description"
          />
          <br />
          <input
            type="hidden"
            required
            className="form-control"
            value={headID}
            name="headID"
          />

          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
};
export default AddPartner;
