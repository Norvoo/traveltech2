import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MenuList from "../../Model/Menu/UpdateMenu.js";
import Update from "../../Model/MenuItem/list.js";
import HeadLogo from "../../Model/Head/update.js";
import ListLink from "../../Model/Iinks/ListLink.js";
import ViewHeadlineIcon from "@material-ui/icons/ViewHeadline";
import "../../App.css";
import LinkIcon from "@material-ui/icons/Link";
import Footer from "../../Model/Footer/Footer.js";
import FooterIcons from "../../Model/Footer/FooterIcon/FooterIconsList.js";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import FooterMenu from "../../Model/Footer/FooterMenu/FooterMenuList";
export default function SimpleAccordion() {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <ViewHeadlineIcon />
          <Typography>Header</Typography>
        </AccordionSummary>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <MenuOpenIcon />
            <Typography>Menus</Typography>
          </AccordionSummary>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <ArrowDropDownIcon />
              <Typography>Menu Items</Typography>
            </AccordionSummary>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <LinkIcon />
                <Typography>Links</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <ListLink className="accorlogo" />
              </AccordionDetails>
            </Accordion>
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
          <Typography>Footer Items</Typography>
        </AccordionSummary>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography>Footer</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Footer />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography>Footer Icons</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FooterIcons />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography>Footer Menus</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FooterMenu />
          </AccordionDetails>
        </Accordion>
      </Accordion>
    </div>
  );
}
