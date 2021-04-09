import React, { useState, useEffect } from "react";
import "../aoo.css";
import { Link } from "react-router-dom";
import { MdExpandMore } from "react-icons/md";
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
  const [data, setData] = useState({ menus: [] });
  // const [imageFile, setFile] = useState("");
  // const [menus, setMenu] = useState([]);
  useEffect(async () => {
    console.log("fetched");
    let result = await fetch("http://192.168.0.111/traveltech2/api/app/head");
    result = await result.json();
    setData(result);
  }, []);
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

  console.log("called");
  return (
    <div className="header">
      <nav className="navs">
        <a href="#" key={data.id}>
          <img
            style={{ width: 100 }}
            src={
              "http://192.168.0.111/traveltech2/wwwroot/Images/" +
              data.imageName
            }
          />
        </a>
        <ul>
          {data.menus.map((it) => {
            if (it.menuItems) {
              console.log(it.menuItems);
              if (it.menuItems instanceof Array && it.menuItems.length > 0) {
                return (
                  <li data-ismenuitems="true" key={it.id}>
                    <div
                      ref={anchorRef}
                      // aria-controls={open ? "menu-list-grow" : undefined}
                      // aria-haspopup="true"
                      onClick={handleToggle}
                      className="a-links"
                    >
                      {it.name}
                      <MdExpandMore />
                    </div>
                    <Popper
                      open={open}
                      anchorEl={anchorRef.current}
                      role={undefined}
                      transition
                      // disablePortal
                    >
                      {({ TransitionProps, placement }) => (
                        <Grow
                          {...TransitionProps}
                          style={
                            {
                              // transformOrigin:
                              //   // placement === "bottom"
                              //     ? "center top"
                              //     : "center bottom",
                            }
                          }
                        >
                          <MyPaper>
                            <ClickAwayListener onClickAway={handleClose}>
                              <MyMenuList
                                autoFocusit={open}
                                id="menu-list-grow"
                                onKeyDown={handleListKeyDown}
                              >
                                <FooterContainer>
                                  <FooterWrap>
                                    <FooterLinksContainer>
                                      <FooterLinkWrapper>
                                        {it.menuItems.map((i) => {
                                          return (
                                            <FooterLinkItems key={i.id}>
                                              <FooterLinkTitle>
                                                {i.name}
                                              </FooterLinkTitle>
                                              <FooterLink to="/">
                                                {i.desc}
                                              </FooterLink>
                                              {i.links.map((l) => {
                                                return (
                                                  <ul>
                                                    <li key={l.id}>
                                                      <a href={l.url}>
                                                        {l.name}
                                                      </a>
                                                    </li>
                                                  </ul>
                                                );
                                              })}
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
                  </li>
                );
              } else {
                return (
                  <li data-ismenuitems="false" key={it.id}>
                    <a href={it.url} className="a-links">
                      {it.name}
                    </a>
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
