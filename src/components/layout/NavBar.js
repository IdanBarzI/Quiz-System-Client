import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ToggleSwitch, Accordion } from "../Ui";
import SettingsContext from "../../context/SettingsContext";
import classes from "./NavBar.module.css";
import AppContext from "../../context/AppContext";

const NavBar = (props) => {
  const settingCtx = useContext(SettingsContext);
  const appCtx = useContext(AppContext);

  const renderFields = () => {
    return appCtx.user.organization.fields.map((field) => {
      return (
        <option key={field._id} value={field}>
          {field.title}
        </option>
      );
    });
  };
  useEffect(() => {}, [appCtx]);
  return (
    <header className={classes.header}>
      <div className={classes.logo}></div>
      <nav>
        <ul>
          <li className={classes.settings}>
            <ToggleSwitch onChange={settingCtx.onThemeSwitch} />
            {appCtx.user && <select name="fields">{renderFields()}</select>}
          </li>
          <li></li>
          <li>
            <NavLink activeClassName={classes.active} to="/signup">
              Signup
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={classes.active} to="/login">
              Login
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={classes.active} to="/admin/main-menu">
              Menu
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
