import React, { useState, useContext } from "react";
import { SettingsContextProvider } from "./SettingsContext";

const AppContext = React.createContext({
  user: null,
  token: null,
  fieldOfStudy:null
});

export const AppContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [fieldOfStudy,setFieldOfStudy] = useState(null)
  return (
    <SettingsContextProvider>
      <AppContext.Provider
        value={{
          user,
          setUser: setUser,
          token,
          setToken: setToken,
          fieldOfStudy,
          setFieldOfStudy:setFieldOfStudy
        }}
      >
        {props.children}
      </AppContext.Provider>
    </SettingsContextProvider>
  );
};

export default AppContext;
