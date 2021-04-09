import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import "../../App.css";
import Up from "../Head/update.js";
import { BrowserRouter, Route } from "react-router-dom";
const useStyles = makeStyles({
  table: {
    minWidth: 6,
  },
});

export default function AcccessibleTable() {
  const [open, setOpen] = React.useState(false);
  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  const classes = useStyles();
  const [data, setData] = useState([]);
  useEffect(async () => {
    getData();
  }, []);
  // console.warn("data", data);
  async function getData() {
    let result = await fetch("http://192.168.0.111/traveltech2/api/app/head");
    result = await result.json();
    //console.log(result);
    setData(result);
  }
  // console.warn("data", data);
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="caption table">
        <TableBody>
          <TableRow key={data.id}>
            <TableCell>
              {console.log(data.imageName)}
              <img
                className="img-size"
                src={
                  "http://192.168.0.111/traveltech2/wwwroot/Images/" +
                  data.imageName
                }
              />
            </TableCell>
            <TableCell>
              <Button variant="contained" color="inherit">
                <Link className="a-links" to={"/updateList/" + data.id}>
                  update
                </Link>
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
