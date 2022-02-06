import React, { useState } from "react";
import LoginSignUpManager from "./components/LoginSignUpManager";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";

function App() {
  const [theme, setTheme] = useState(true);
  const onThemeSwitch = () => {
    setTheme((prevCheck) => !prevCheck);
  };
  return (
    <div className="app" data-theme={`${theme ? "light" : "dark"}`}>
      <NavBar onChange={onThemeSwitch} />
      <LoginSignUpManager />
    </div>
  );
}

export default App;
