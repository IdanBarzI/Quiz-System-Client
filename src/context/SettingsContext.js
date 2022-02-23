import React, { useState } from "react";
import useStickyState from "../hooks/use-sticky-state";

const SettingsContext = React.createContext({
  theme: true,
  onThemeSwitch: () => {},
});

export const SettingsContextProvider = (props) => {
  const [theme, setTheme] = useStickyState(true, "theme");

  const themeSwitchHandler = () => {
    setTheme((prevCheck) => !prevCheck);
  };

  return (
    <SettingsContext.Provider
      value={{
        theme,
        onThemeSwitch: themeSwitchHandler,
      }}
    >
      {props.children}
    </SettingsContext.Provider>
  );
};

export default SettingsContext;
