import React, { Fragment, useContext } from "react";
import useFetch from "../../../hooks/use-fetch";
import { NavLink } from "react-router-dom";
import { ToggleSwitch, HoverBox, Button } from "../../Ui";
import SettingsContext from "../../../context/SettingsContext";
import classes from "./NavBar.module.css";
import AppContext from "../../../context/AppContext";

const NavBar = (props) => {
  const settingCtx = useContext(SettingsContext);
  const { user, token, fieldOfStudy, setFieldOfStudy, logout } =
    useContext(AppContext);
  const { isLoading, error, sendRequest: sendLogoutRequest } = useFetch();

  const logoutHandler = async () => {
    await sendLogoutRequest(
      {
        url: `http://localhost:5000/users/logout`,
        method: "POST",
      },
      (data) => {
        logout();
      }
    );
  };

  const renderFields = () => {
    return user?.organization?.fields.map((field) => {
      return (
        <option key={field._id} value={field.title}>
          {field.title}
        </option>
      );
    });
  };

  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <ul>
          <li className={classes.settings}>
            <HoverBox i="cog">
              <ToggleSwitch onChange={settingCtx.onThemeSwitch} />
              {user && (
                <>
                  <select
                    className={classes.select}
                    name="fields"
                    onChange={(e) => setFieldOfStudy(e.target.value)}
                  >
                    <option disabled selected value>
                      -- Select Field Of Study --
                    </option>
                    {renderFields()}
                  </select>
                  <div className={classes.btn}>
                    <Button
                      onClick={() => logoutHandler()}
                      isLoading={isLoading}
                    >
                      Logout
                    </Button>
                  </div>
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
