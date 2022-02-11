import React, { Fragment, useContext, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { ToggleSwitch, HoverBox } from "../Ui";
import SettingsContext from "../../context/SettingsContext";
import classes from "./NavBar.module.css";
import AppContext from "../../context/AppContext";

const NavBar = (props) => {
  const settingCtx = useContext(SettingsContext);
  const appCtx = useContext(AppContext);

  const renderFields = () => {
    return appCtx.user.organization.fields.map((field) => {
      return (
        <option key={field._id} value={JSON.stringify(field)} >
          {field.title}
        </option>
      );
    });
  };
  useEffect(() => {}, [appCtx]);
  return (
    <header className={classes.header}>
      <div className={classes.logo}></div>
      <nav className={classes.nav}>
        <ul>
          <li className={classes.settings}>
            <HoverBox i="cog">
              <ToggleSwitch onChange={settingCtx.onThemeSwitch} />
              {appCtx.user && 
                <>
                  <p>Please select field of study:</p>
                  <select className={classes.select} name="fields" onChange={(e)=>appCtx.setFieldOfStudy(JSON.parse(e.target.value))}>{renderFields()}</select>
                </>
                
              }
            </HoverBox>
          </li>
          {!appCtx.token && (
            <Fragment>
              <li>
                <NavLink
                  className={(navData) =>
                    navData.isActive ? classes.active : ""
                  }
                  to="/signup"
                >
                  Signup
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={(navData) =>
                    navData.isActive ? classes.active : ""
                  }
                  to="/login"
                  to="/"
                >
                  Login
                </NavLink>
              </li>
            </Fragment>
          )}
          {appCtx.token && (
            <Fragment>
              <li>
                <NavLink
                  className={(navData) =>
                    navData.isActive ? classes.active : ""
                  }
                  to="/admin/questions"
                >
                  Questions
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={(navData) =>
                    navData.isActive ? classes.active : ""
                  }
                  to="/admin/tests"
                >
                  Tests
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={(navData) =>
                    navData.isActive ? classes.active : ""
                  }
                  to="/admin/reports"
                >
                  Reports
                </NavLink>
              </li>
            </Fragment>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
