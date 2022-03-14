import React, { useEffect, useContext } from "react";
import { useStore } from "../../store/store";
import NewQuestion from "./newQuestion/NewQuestion";
import QuestionGrid from "./questionGrid/QuestionGrid";
import useFetch from "../../hooks/use-fetch";
import { LoadingSpinner } from "../Ui";
import classes from "./Question.module.css";

const QuestionsManager = () => {
  const dispatch = useStore()[1];
  const { isLoading, error, sendRequest: sendGetQuestionsRequest } = useFetch();
  const getQuestionsHandler = async () => {
    await sendGetQuestionsRequest(
      {
        url: `${process.env.REACT_APP_BASE_URL}/qusetions`,
        method: "GET",
      },
      (questions) => {
        dispatch("SET_QUESTIONS", questions);
      }
    );
  };
  useEffect(() => {
    getQuestionsHandler();
  }, []);

  return (
    <>
      <div className={classes.question}>
        <QuestionGrid isLoading={isLoading} />
      </div>
      {error && <p className={`${classes.error} centered`}>{error}</p>}
    </>
  );
};

export default QuestionsManager;
