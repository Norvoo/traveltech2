import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Head from "../Model/Head/update.js";
import Menu from "../Model/Menu/MenuList";
import MenuItem from "../Model/MenuItem/list";
import MenuItemUpdate from "../Model/MenuItem/UpdateMenuitem";
import LinkList from "../Model/Iinks/ListLink";
import Footer from "../Model/Footer/Footer";
import FooterMenu from "../Model/Footer/FooterMenu/FooterMenuList";
import FooterIcon from "../Model/Footer/FooterIcon/FooterIconsList";
import Page from "../Model/AddPage";
export default function LocalPatch() {
  return (
    <div>
      <Switch>
        <Route path="/Head" component={Head} />
        <Route path="/menuList" component={Menu} />
        <Route path="/menuItemList" component={MenuItem} />
        <Route path="/menuitemupdate/:id" component={MenuItemUpdate} />
        <Route path="/linkList" component={LinkList} />
        <Route path="/footer" component={Footer} />
        <Route path="/footermenu" component={FooterMenu} />
        <Route path="/footericon" component={FooterIcon} />
        <Route path="/page" component={Page} />
      </Switch>
    </div>
  );
}
