import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import {
  Login,
  SignUp,
  MainMenu,
  Questions,
  Tests,
  Report,
  StudentTest,
  NotFound,
} from "./pages";
import Layout from "./components/layout/Layout";
import "./App.css";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/login" component={Login} />

        <Route path="/signup" component={SignUp} />

        <Route path="/admin/main-menu" component={MainMenu} exact />

        <Route path="/admin/questions" component={Questions} exact />

        <Route path="/admin/tests" component={Tests} exact />

        <Route path="/admin/reports" component={Report} exact />

        <Route path="/student/test" component={StudentTest} exact />

        <Route path="*" component={NotFound} />
      </Switch>
    </Layout>
  );
}

export default App;
