import React, { useContext } from "react";
import { Route } from "react-router-dom";
import LoginSignUpManager from "./components/LoginSignUpManager";
import NavBar from "./components/NavBar/NavBar";
import SettingsContext from "./context/SettingsContext";
import Welcome from "./pages/Welcome";
import Products from "./pages/Products";
import "./App.css";

function App() {
  const ctx = useContext(SettingsContext);

  return (
    <div className="app" data-theme={`${ctx.theme ? "light" : "dark"}`}>
      <NavBar />
      <main>
        <Route path="/login">
          <LoginSignUpManager />
        </Route>
        <Route path="/products">
          <Products />
        </Route>
      </main>
    </div>
  );
}

export default App;
