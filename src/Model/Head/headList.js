import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Paper,
  TableRow,
  TableContainer,
  TableCell,
  TableBody,
  Table,
} from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import "../../App.css";
import { getData } from "../../helper";
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
  useEffect(() => {
    getDatas();
  }, []);

  function getDatas() {
    getData("http://192.168.0.109/travel/api/app/head", setData);
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
                  "http://192.168.0.109/travel/wwwroot/Images/" + data.imageName
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
