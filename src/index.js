import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { AppContextProvider } from "./context/AppContext";
import { StudentTestContextProvider } from "./context/StudentTestContext";

ReactDOM.render(
  <BrowserRouter>
    <AppContextProvider>
      <StudentTestContextProvider>
        <App />
      </StudentTestContextProvider>
    </AppContextProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
