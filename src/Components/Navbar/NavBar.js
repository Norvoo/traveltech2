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
import { changeElementColor } from "../../helper";

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
    let result = await fetch("http://192.168.0.109/travel/api/app/head");
    result = await result.json();
    setData(result);
    console.log("fe", result);

    changeElementColor("headerId", result.color);
  }, []);

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = (e) => {
    setOpen(e.currentTarget);
  };

  const handleClose = (event) => {
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
  // function changeColorHeader() {
  //   let color = document.getElementById("colorInput").value;
  //   document.getElementById("headerId").style.backgroundColor = color;
  //   document.getElementById("colorInputText").value = color;
  // }
  console.log("called");
  return (
    <div className="header">
      <nav className="navs" id="headerId">
        <a href="#" key={data.id}>
          <img
            style={{ width: 100 }}
            src={"http://192.168.0.109/travel/wwwroot/Images/" + data.imageName}
          />
        </a>
        <ul>
          {data.menus.map((it, i) => {
            if (it.menuItems) {
              console.log(it.menuItems);
              if (it.menuItems instanceof Array && it.menuItems.length > 0) {
                return (
                  <li data-ismenuitems="true" key={it.id}>
                    <div
                      ref={anchorRef}
                      aria-controls={i}
                      aria-haspopup="true"
                      onClick={handleToggle}
                      className="a-links"
                    >
                      {it.name}
                      <MdExpandMore />
                    </div>
                    <Popper
                      open={open}
                      anchorEl={anchorRef.current}
                      transition
                      className="grow"
                    >
                      {({ TransitionProps }) => (
                        <Grow
                          {...TransitionProps}
                          style={{
                            width: "100% !important",
                          }}
                          id={i}
                        >
                          <MyPaper>
                            <ClickAwayListener onClickAway={handleClose}>
                              <MyMenuList onKeyDown={handleListKeyDown}>
                                <div className="services-section">
                                  <div className="inner-width">
                                    <div className="services-container">
                                      {it.menuItems.map((i) => {
                                        return (
                                          <div
                                            className="service-box"
                                            key={i.id}
                                          >
                                            <div className="service-title">
                                              {i.name}
                                            </div>
                                            <div className="service-desc">
                                              {i.desc}
                                            </div>
                                            {i.links.map((l) => {
                                              return (
                                                <div
                                                  className="service-link"
                                                  key={l.id}
                                                >
                                                  <a href={l.url}>{l.name}</a>
                                                </div>
                                              );
                                            })}
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                </div>
                              </MyMenuList>
                            </ClickAwayListener>
                          </MyPaper>
                        </Grow>
                      )}
                    </Popper>
                  </li>
                );
              } else {
                console.log("IT", it);
                return (
                  <li data-ismenuitems="false" key={it.id}>
                    <a href={"https://www." + it.url} className="a-links">
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
