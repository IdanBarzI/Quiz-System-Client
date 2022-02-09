import React, { Fragment, useContext } from "react";
import { Route, Routes } from "react-router-dom";
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
import AppContext from "./context/AppContext";

function App() {
  const context = useContext(AppContext);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<SignUp />} />
        {context.token && (
          <Fragment>
            <Route path="/admin/main-menu" element={<MainMenu />} />

            <Route path="/admin/questions" element={<Questions />} />

            <Route path="/admin/tests" element={<Tests />} />

            <Route path="/admin/reports" component={<Report />} />

            <Route path="/student/test" element={<StudentTest />} />
          </Fragment>
        )}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
