import React, { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { makeStyles } from "@material-ui/core/styles";
import Up from "./AddFooterIcon";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { styled } from "@material-ui/core/styles";
import "../../../App.css";
function App() {
  const [footerIcons, setFooterIcons] = useState([]);
  const [url, setUrl] = useState("");
  const [imageFile, setFile] = useState("");
  const [footerID, setFooterId] = useState(null);
  const [id, setId] = useState(null);

  const [footer, setFooter] = useState("");
  useEffect(async () => {
    let result = await fetch("http://192.168.0.109/travel/api/app/footer");
    result = await result.json();
    setFooter(result);
  }, []);

  useEffect(() => {
    getfootericons();
  }, []);
  function getfootericons() {
    fetch("http://192.168.0.109/travel/api/app/footericons").then((result) => {
      result.json().then((resp) => {
        setFooterIcons(resp);
        setFile(resp[0].imageFile);
        setUrl(resp[0].url);
        setFooterId(resp[0].footerID);
        setId(resp[0].id);
      });
    });
  }

  function deleteMenu(id) {
    fetch("http://192.168.0.109/travel/api/app/footericons/" + id, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((resp) => {
        getfootericons();
      });
    });
  }
  function seletMenu(id) {
    var data;
    let item = footerIcons.map((menu) => {
      if (menu.id == id) data = menu;
    });
    console.log(data);
    setFile(data.imageFile);
    setUrl(data.url);
    setFooterId(data.footerID);
    setId(data.id);
  }
  function updateMenu() {
    const formData = new FormData();
    formData.append("Id", id);
    formData.append("imageFile", imageFile);
    formData.append("url", url);
    formData.append("footerID", footerID);
    fetch(
      "http://192.168.0.109/travel/api/app/footericons/" + id + "?_method=PUT",
      {
        method: "Put",
        body: formData,
      }
    ).then((result) => {
      result.json().then((resp) => {
        getfootericons();
      });
    });
    alert("data saved");
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

  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  const MyButton = styled(Button)({
    background: "linear-gradient(45deg, #4e6cf1 30%, #794cf5 50%)",
    border: 0,
    borderRadius: 3,

    color: "white",
  });
  return (
    <div className="App">
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpen("body")}
      >
        Add Footer ICON
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <Up />
      </Dialog>
      <h1>Menu Update </h1>
      <TableContainer component={Paper}>
        <Table className={classes.root} aria-label="caption table">
          <TableHead>
            <TableCell>Name </TableCell>

            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableHead>
          <TableBody>
            {footerIcons.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.url}</TableCell>
                <TableCell>
                  <img
                    className="logo-size"
                    src={
                      "http://192.168.0.109/travel/wwwroot/Images/" +
                      item.imageName
                    }
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => deleteMenu(item.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => seletMenu(item.id)}
                  >
                    Update
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        <FormControl variant="outlined" className={classes.formControl}>
          <div className={classes.root}>
            <TextField
              label="Url"
              value={url}
              variant="outlined"
              onChange={(e) => {
                setUrl(e.target.value);
              }}
            />
          </div>
        </FormControl>
        <br />
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          defaultValue={footerIcons.imageName}
        />
        <img
          value={imageFile}
          className="logo-size"
          type="file"
          style={{ width: 100 }}
          src={
            "http://192.168.0.109/travel/wwwroot/Images/" +
            footerIcons.imageName
          }
        />
        <input type="hidden" value={footerID || ""} name="footerID" />
        <br />
        <MyButton onClick={updateMenu}>Update Footer Icon</MyButton>
      </div>
    </div>
  );
}
export default App;
