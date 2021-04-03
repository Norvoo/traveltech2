import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MenuAdd from "../../Model/Menu/AddMenu.js";
import MenuList from "../../Model/Menu/UpdateMenu.js";
import DropAdd from "../../Model/Drop/AddDrop.js";
import DropList from "../../Model/Drop/droplist.js";
import Update from "../../Model/Drop/list.js";
import HeadLogo from "../../Model/Head/headList";
import Headupdate from "../../Model/Head/update";
import { BrowserRouter, Route } from "react-router-dom";
// import Form from "./list";
// import List from "./table";
const useStyles = makeStyles((theme) => ({}));

export default function SimpleAccordion() {
  const classes = useStyles();

  return (
    <div className={classes}>
      <Accordion className={classes}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Header</Typography>
        </AccordionSummary>
        {/* 
                            
                            Head
                            
                            */}
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className={classes.heading}>Menu</Typography>
          </AccordionSummary>
          {/* 
                            
                           Head-Menu
                            
                            */}
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>Drop</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <DropAdd />
            </AccordionDetails>
            <AccordionDetails>
              <DropList />
            </AccordionDetails>
          </Accordion>
          <AccordionDetails>
            <MenuList />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className={classes.heading}>Logo Image</Typography>
          </AccordionSummary>
          {/* 
                            
                           Head-Logo
                            
                            */}
          <AccordionDetails>
            <Update />
          </AccordionDetails>
          <AccordionDetails>
            <BrowserRouter>
              <Route path="/updateList/:id">
                <Headupdate />
              </Route>
            </BrowserRouter>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className={classes.heading}>
              Head-Logo-Update
            </Typography>
          </AccordionSummary>
          {/* 
                            
                           Head-Logo
                            
                            */}
          <AccordionDetails>
            <HeadLogo />
          </AccordionDetails>
          <AccordionDetails>
            <Headupdate />
          </AccordionDetails>
        </Accordion>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography className={classes.heading}>Footer</Typography>
        </AccordionSummary>
      </Accordion>
    </div>
  );
}
