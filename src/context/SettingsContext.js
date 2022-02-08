import React, { useState } from "react";

const SettingsContext = React.createContext({
  theme: true,
  onThemeSwitch: () => {},
  field: null,
  fieldSwitchHandler: (field) => {},
});

export const SettingsContextProvider = (props) => {
  const [theme, setTheme] = useState(true);
  const [field, setField] = useState(null);

  const themeSwitchHandler = () => {
    setTheme((prevCheck) => !prevCheck);
  };

  const fieldSwitchHandler = (field) => {
    setField(field);
  };

  return (
    <SettingsContext.Provider
      value={{
        theme,
        onThemeSwitch: themeSwitchHandler,
        field,
        onFieldSwitch: fieldSwitchHandler,
      }}
    >
      {props.children}
    </SettingsContext.Provider>
  );
};

export default SettingsContext;
