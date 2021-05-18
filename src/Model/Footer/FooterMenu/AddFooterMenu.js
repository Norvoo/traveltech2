import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "../../../App.css";
import { jsonDataPost } from "../../../helper";
const AddFooterMenu = () => {
  const [Appdata, setAppData] = useState([]);
  const [footerID, setFooterId] = useState(null);
  useEffect(async () => {
    let result = await fetch("http://192.168.0.109/travel/api/app");
    result = await result.json();
    console.log(result);
    setFooterId(result["footerID"]);
    setAppData(result);
  }, []);
  const [link, setLink] = useState([]);
  useEffect(async () => {
    let result = await fetch("http://192.168.0.109/travel/api/app/links");
    result = await result.json();
    console.log(result);
    setLink(result);
  }, []);

  console.warn("link", link);
  const [name, setName] = useState("");
  const [links, setLin] = useState([]);
  const getValue = (e) => {
    let datalink = links;
    datalink.push({ id: parseInt(e.target.value) });
    setLin(datalink);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const partner = { name, footerID, links };
    jsonDataPost(
      partner,
      "http://192.168.0.109/travel/api/app/footermenus"
    ).then(() => {
      console.log("new Footer Menu ");
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
    <div className="add-item">
      <h1>Add Drop</h1>
      <form onSubmit={handleSubmit}>
        <div className="col-sm-6 offset-sm-4">
          <br />
          <input
            type="text"
            required
            className="form-control"
            value={name || ""}
            onChange={(e) => setName(e.target.value)}
            name="name"
            placeholder="Footer Menu Title"
          />
          <br />
          <input
            type="hidden"
            required
            className="form-control"
            value={footerID || ""}
            name="footerID"
          />
          <br />

          {link.map((i) => {
            return (
              <>
                <input
                  key={i.id}
                  type="checkbox"
                  onChange={(e) => getValue(e)}
                  value={i.id || ""}
                />
                <label>{i.name}</label>
              </>
            );
          })}

          <br />
          <Button variant="contained" color="primary" type="submit">
            Add FooterMenu
          </Button>
        </div>
      </form>
    </div>
  );
};
export default AddFooterMenu;
