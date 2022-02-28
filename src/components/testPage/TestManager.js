import React, { useEffect } from "react";
import { useStore } from "../../store/store";
import { Link } from "react-router-dom";
import useAxiosFetch from "../../hooks/use-axios";
import classes from "./TestManager.module.css";
import TestGrid from "./tests-grid/TestGrid";

const TestManager = () => {
  const [{}, dispatch] = useStore();
  const { data, fetchError, isLoading } = useAxiosFetch(`/tests`);

  useEffect(() => {
    dispatch("SET_TESTS", data);
  }, [data]);

  const handleSetNewTestOpen = () => {};
  return (
    <div>
      <TestGrid />
      <div className={classes.buttons}>
        <a className={classes.backButton} href="/admin/main-menu">
          back
        </a>
        <button onClick={handleSetNewTestOpen}>
          <Link className={classes.btn} to={`/admin/tests/1`}>
            Create New Test
          </Link>
        </button>
      </div>
    </div>
  );
};

export default TestManager;
