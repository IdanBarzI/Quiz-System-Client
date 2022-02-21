import React, { Fragment, useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AppContext from "../../../context/AppContext";

const ProtectedRoute = (props) => {
  const { token } = useContext(AppContext);
  return token ? <Outlet /> : <Navigate to="404" />;
};

export default ProtectedRoute;
