import React, { Fragment, useContext, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { ToggleSwitch, HoverBox } from "../../Ui";
import SettingsContext from "../../../context/SettingsContext";
import classes from "./NavBar.module.css";
import AppContext from "../../../context/AppContext";

const NavBar = (props) => {
  const settingCtx = useContext(SettingsContext);
  const { user, token, fieldOfStudy, setFieldOfStudy } = useContext(AppContext);

  const renderFields = () => {
    return user?.organization?.fields.map((field) => {
      return (
        <option key={field._id} value={field.title}>
          {field.title}
        </option>
      );
    });
  };
  // useEffect(() => {}, [appCtx]);
  return (
    <header className={classes.header}>
      <div className={classes.logo}></div>
      <nav className={classes.nav}>
        <ul>
          <li className={classes.settings}>
            <HoverBox i="cog">
              <ToggleSwitch onChange={settingCtx.onThemeSwitch} />
              {user && (
                <>
                  <p>Please select field of study:</p>
                  <select
                    className={classes.select}
                    name="fields"
                    onChange={(e) => setFieldOfStudy(e.target.value)}
                  >
                    {renderFields()}
                  </select>
                </>
              )}
            </HoverBox>
          </li>
          {!token && (
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
          {token && fieldOfStudy && (
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
