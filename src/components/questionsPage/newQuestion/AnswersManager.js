import classes from "./AnswersManager.module.css";
import React, { useContext, useEffect, useState } from "react";
import NewQuestionAnswer from "./answers/NewQuestionAnswer";
import AnswersContext from "../../../context/AnswersContext";
import { Button } from "../../Ui";

const EMPTY_ANSWER = {
  title: "",
};

const AnswersManager = ({ isMultiple }) => {
  const { answers, setAnswers } = useContext(AnswersContext);

  const handleRemoveAnswer = (answer) => {
    if (answers.includes(answer)) {
      const newAnswers = [...answers];
      for (let i = 0; i < newAnswers.length; i++) {
        if (newAnswers[i] === answer) {
          newAnswers.splice(i, 1);
          break;
        }
      }
      setAnswers(newAnswers);
    }
  };

  const renderAnswers = (e) => {
    return answers.map((answer) => {
      return (
        <NewQuestionAnswer
          key={answer._id}
          isMultiple={isMultiple}
          correct={answer.isCorrect}
          onRemove={() => handleRemoveAnswer(answer)}
          answer={answer}
        />
      );
    });
  };

  const addAnswer = (e) => {
    e.preventDefault();
    setAnswers((prevState) => [...prevState, EMPTY_ANSWER]);
  };
  return (
    <div className={classes.answers}>
      <div>{renderAnswers()}</div>
      <div className={classes.buttons}>
        <Button onClick={(e) => addAnswer(e)}>Add an answer</Button>
      </div>
    </div>
  );
};

export default AnswersManager;
