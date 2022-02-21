import React from "react";
import useStickyState from "../hooks/use-sticky-state";
import { SettingsContextProvider } from "./SettingsContext";

const AppContext = React.createContext({
  user: null,
  setUser: () => {},
  token: null,
  setToken: () => {},
  fieldOfStudy: null,
  setFieldOfStudy: () => {},
});

export const AppContextProvider = (props) => {
  const [user, setUser] = useStickyState(null, "user");
  const [token, setToken] = useStickyState(null, "token");
  const [fieldOfStudy, setFieldOfStudy] = useStickyState(null, "fieldOfStudy");
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
        }}
      >
        {props.children}
      </AppContext.Provider>
    </SettingsContextProvider>
  );
};

export default AppContext;
