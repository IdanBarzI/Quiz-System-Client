import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useStickyState from "../hooks/use-sticky-state";
import { SettingsContextProvider } from "./SettingsContext";

let logoutTimer;
let defultExpirationTime = 3600000;

const AppContext = React.createContext({
  user: null,
  setUser: () => {},
  token: null,
  setToken: () => {},
  fieldOfStudy: null,
  setFieldOfStudy: () => {},
  login: () => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

export const AppContextProvider = (props) => {
  const [user, setUser] = useStickyState(null, "user");
  const [token, setToken] = useStickyState(null, "token");
  const [fieldOfStudy, setFieldOfStudy] = useStickyState(null, "fieldOfStudy");
  const navigate = useNavigate();

  const logout = useCallback(() => {
    console.log("object");
    setUser(null);
    localStorage.removeItem("user");
    setToken(null);
    localStorage.removeItem("token");
    setFieldOfStudy(null);
    localStorage.removeItem("fieldOfStudy");
    navigate("/", { replace: true });
  }, []);

  const login = (user, token, expirationTime) => {
    setUser(user);
    setToken(token);
    navigate("/admin/main-menu", { replace: true });

    inactivityTime();
  };

  var inactivityTime = function () {
    console.log("inactivityTime");
    window.onload = resetTimer;
    document.onmousemove = resetTimer;
    document.onkeydown = resetTimer;

    function resetTimer() {
      console.log("resetTimer");
      clearTimeout(logoutTimer);
      logoutTimer = setTimeout(logout, defultExpirationTime);
    }
  };

  return (
    <SettingsContextProvider>
      <AppContext.Provider
        value={{
          user,
          setUser: setUser,
          token,
          setToken: setToken,
          fieldOfStudy,
          setFieldOfStudy: setFieldOfStudy,
          login: login,
          logout: logout,
        }}
      >
        {props.children}
      </AppContext.Provider>
    </SettingsContextProvider>
  );
};

export default AppContext;
