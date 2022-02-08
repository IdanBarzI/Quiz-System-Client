import React, { useContext } from "react";

import classes from "./Layout.module.css";
import NavBar from "./NavBar";
import SettingsContext from "../../context/SettingsContext";

const Layout = (props) => {
  const ctx = useContext(SettingsContext);
  return (
    <div className={classes.app} data-theme={`${ctx.theme ? "light" : "dark"}`}>
      <NavBar />
      <main className={classes.main}>{props.children}</main>
    </div>
  );
};

export default Layout;
