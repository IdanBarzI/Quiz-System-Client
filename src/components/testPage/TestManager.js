import React, { useEffect } from "react";
import { useStore } from "../../store/store";
import useFetch from "../../hooks/use-fetch";
import TestGrid from "./tests-grid/TestGrid";
import { LoadingSpinner } from "../Ui";
import classes from "./TestManager.module.css";

const TestManager = () => {
  const dispatch = useStore()[1];
  const { isLoading, error, sendRequest: sendGetTestsRequest } = useFetch();
  const getTestsHandler = async () => {
    await sendGetTestsRequest(
      {
        url: `${process.env.REACT_APP_BASE_URL}/tests`,
        method: "GET",
      },
      (tests) => {
        dispatch("SET_TESTS", tests);
      }
    );
  };
  useEffect(() => {
    getTestsHandler();
  }, []);

  return (
    <>
      <TestGrid isLoading={isLoading} />
      {error && <h2 className="errorMsg centered">{error}</h2>}
    </>
  );
};

export default TestManager;
