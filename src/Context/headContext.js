import React, { useState, createContext, useEffect } from "react";
import { changeElementColor } from "../helper";
export const HeadContext = createContext();

export const HeadProvider = (props) => {
  const [head, setHead] = useState({ menus: [] });
  useEffect(async () => {
    let result = await fetch("http://192.168.0.109/travel/api/app/head");
    result = await result.json();
    setHead(result);
    console.log("fe", result);
    changeElementColor("headerId", result.color);
  }, []);
  const [data, setData] = useState({ footerIcons: [], footerMenus: [] });

  useEffect(async () => {
    console.log("fetched");
    let result = await fetch("http://192.168.0.109/travel/api/app/footer");
    result = await result.json();
    setData(result);
  }, []);
  return (
    <HeadContext.Provider value={head}>{props.children}</HeadContext.Provider>
  );
};
