import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
const useStyles = makeStyles({
  table: {
    minWidth: 6,
  },
});

export default function AcccessibleTable() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  useEffect(async () => {
    getData();
  }, []);
  console.warn("data", data);
  async function getData() {
    let result = await fetch("http://192.168.0.111/traveltech2/api/app/drops");
    result = await result.json();
    console.log(result);
    setData(result);
  }
  console.warn("data", data);
  async function deleteOperation(id) {
    let result = await fetch(
      "http://192.168.0.111/traveltech2/api/app/drops/" + id,
      { method: "delete" }
    );
    result = await result.json();
    console.log(result);
    alert("deleted");
    getData();
  }
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="caption table">
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell>{row.desc}</TableCell>
              <TableCell>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => deleteOperation(row.id)}
                >
                  Delete
                </Button>
                ;
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
