import React, { useEffect, useContext } from "react";
import { useStore } from "../../store/store";
import NewQuestion from "./newQuestion/NewQuestion";
import QuestionGrid from "./questionGrid/QuestionGrid";
import useFetch from "../../hooks/use-fetch";
import { Button, LoadingSpinner } from "../Ui";
import classes from "./Question.module.css";

const QuestionsManager = () => {
  const dispatch = useStore()[1];
  const { isLoading, error, sendRequest: sendGetQuestionsRequest } = useFetch();
  const getQuestionsHandler = async () => {
    await sendGetQuestionsRequest(
      {
        url: `http://localhost:5000/qusetions`,
        method: "GET",
      },
      (questions) => {
        console.log(questions);
        dispatch("SET_QUESTIONS", questions);
      }
    );
  };
  useEffect(() => {
    getQuestionsHandler();
  }, []);

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className={classes.question}>
          <QuestionGrid />
        </div>
      )}
    </div>
  );
};

export default QuestionsManager;
