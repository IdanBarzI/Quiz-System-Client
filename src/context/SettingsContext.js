import React, { useState } from "react";

const SettingsContext = React.createContext({
  theme: true,
  onThemeSwitch: () => {},
});

export const SettingsContextProvider = (props) => {
  const [theme, setTheme] = useState(true);

  const themeSwitchHandler = () => {
    setTheme((prevCheck) => !prevCheck);
  };

  return (
    <SettingsContext.Provider
      value={{
        theme: theme,
        onThemeSwitch: themeSwitchHandler,
      }}
    >
      {props.children}
    </SettingsContext.Provider>
  );
};

export default SettingsContext;
