import React, { useState, useContext } from "react";
import { SettingsContextProvider } from "./SettingsContext";

const AppContext = React.createContext({
  user: null,
  token: null,
});

export const AppContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  return (
    <SettingsContextProvider>
      <AppContext.Provider
        value={{
          user: user,
          setUser: setUser,
          token: token,
          setToken: setToken,
        }}
      >
        {props.children}
      </AppContext.Provider>
    </SettingsContextProvider>
  );
};

export default AppContext;
