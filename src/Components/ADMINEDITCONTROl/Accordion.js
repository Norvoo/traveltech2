import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import MenuList from "../../Model/Menu/UpdateMenu.js";
import DropAdd from "../../Model/MenuItem/AddDrop.js";

import Update from "../../Model/MenuItem/list.js";
import HeadLogo from "../../Model/Head/headList";
import ListLink from "../../Model/Iinks/ListLink.js";
import { BrowserRouter, Route } from "react-router-dom";
// import Form from "./list";
// import List from "./table";
export default function SimpleAccordion() {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Header</Typography>
        </AccordionSummary>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Menu</Typography>
          </AccordionSummary>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>Drop</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Update />
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
            <Typography>Link</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ListLink />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Head-Logo-Update</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <HeadLogo />
          </AccordionDetails>
        </Accordion>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>Footer</Typography>
        </AccordionSummary>
      </Accordion>
    </div>
  );
}
