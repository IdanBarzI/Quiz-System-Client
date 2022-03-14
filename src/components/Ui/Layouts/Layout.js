import React, { useContext } from "react";

import classes from "./Layout.module.css";
import NavBar from "./NavBar";
import SettingsContext from "../../../context/SettingsContext";

const Layout = (props) => {
  const ctx = useContext(SettingsContext);
  return (
    <div className={classes.app} data-theme={`${ctx.theme ? "light" : "dark"}`}>
      <div id="backdrop-root"></div>
      <div id="overlay-root"></div>
      <div id="snackbar-root"></div>
      <div id="prompt-root"></div>
      {!window.location.href.includes("student/test") && <NavBar />}
      <main className={classes.main}>{props.children}</main>
    </div>
  );
};

export default Layout;
