import React, { useState, useEffect } from "react";
import "../aoo.css";
import { Link } from "react-router-dom";
import {
  ClickAwayListener,
  Grow,
  Button,
  Paper,
  Popper,
  MenuList,
} from "@material-ui/core";
import { makeStyles, styled } from "@material-ui/core/styles";
import {
  FooterContainer,
  FooterWrap,
  FooterLinksContainer,
  FooterLinkWrapper,
  FooterLinkItems,
  FooterLinkTitle,
  FooterLink,
} from "../dp.js";
import { BrowserRouter, Router } from "react-router-dom";

const MyMenuList = styled(MenuList)({
  background: "black",
  paddingTop: "0px",
  paddingBottom: "0px",
  top: "16px",
});
const MyPaper = styled(Paper)({
  backgroundColor: "#fff0",
});
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    marginRight: theme.spacing(0),
  },
}));
export default function NavBar() {
  const [data, setData] = useState([]);
  useEffect(async () => {
    let result = await fetch("http://192.168.0.111/traveltech2/api/app/menus");
    result = await result.json();
    console.log(result);
    setData(result);
  }, []);
  console.warn("data", data);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className="header">
      <nav className="navs">
        <ul>
          {data.map((item) => {
            if (item.drop) {
              console.log(item.drop);
              if (item.drop instanceof Array && item.drop.length > 0) {
                return (
                  <li data-isdrop="true">
                    <div className={classes.root}>
                      <Button
                        ref={anchorRef}
                        aria-controls={open ? "menu-list-grow" : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                        className="a-links"
                      >
                        {item.name}
                      </Button>
                      <Popper
                        open={open}
                        anchorEl={anchorRef.current}
                        role={undefined}
                        transition
                        disablePortal
                      >
                        {({ TransitionProps, placement }) => (
                          <Grow
                            {...TransitionProps}
                            style={{
                              transformOrigin:
                                placement === "bottom"
                                  ? "center top"
                                  : "center bottom",
                            }}
                          >
                            <MyPaper>
                              <ClickAwayListener onClickAway={handleClose}>
                                <MyMenuList
                                  autoFocusItem={open}
                                  id="menu-list-grow"
                                  onKeyDown={handleListKeyDown}
                                >
                                  <FooterContainer>
                                    <FooterWrap>
                                      <FooterLinksContainer>
                                        <FooterLinkWrapper>
                                          {item.drop.map((i) => {
                                            return (
                                              <FooterLinkItems key={i.id}>
                                                <FooterLinkTitle>
                                                  {i.name}
                                                </FooterLinkTitle>
                                                <FooterLink to="/">
                                                  {i.desc}
                                                </FooterLink>
                                              </FooterLinkItems>
                                            );
                                          })}
                                        </FooterLinkWrapper>
                                      </FooterLinksContainer>
                                    </FooterWrap>
                                  </FooterContainer>
                                </MyMenuList>
                              </ClickAwayListener>
                            </MyPaper>
                          </Grow>
                        )}
                      </Popper>
                    </div>
                  </li>
                );
              } else {
                return (
                  <li data-isdrop="false" key={item.id}>
                    <Link to={item.url} className="a-links">
                      {item.name}
                    </Link>
                  </li>
                );
              }
            }
          })}
        </ul>
      </nav>
    </div>
  );
}
