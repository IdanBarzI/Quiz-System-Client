import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import ToggleSwitch from "../../Ui/Elements/ToggleSwitch";
import SettingsContext from "../../context/SettingsContext";
import classes from "./MainHeader.module.css";

const NavBar = (props) => {
  const ctx = useContext(SettingsContext);
  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <li className={classes.toggle}>
            <ToggleSwitch onChange={ctx.onThemeSwitch} />
          </li>
          <li>
            <NavLink activeClassName={classes.active} to="/products">
              Products
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
