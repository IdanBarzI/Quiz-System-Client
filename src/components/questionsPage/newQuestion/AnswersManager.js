import classes from "./AnswersManager.module.css";
import React, { useContext, useEffect, useState } from "react";
import NewQuestionAnswer from "./answers/NewQuestionAnswer";
import { Button } from "../../Ui";

const EMPTY_ANSWER = {
  title: "",
};

const AnswersManager = (props) => {
  console.log(props.answers);
  const handleRemoveAnswer = (answer) => {
    if (props.answers.includes(answer)) {
      const newAnswers = [...props.answers];
      for (let i = 0; i < newAnswers.length; i++) {
        if (newAnswers[i] === answer) {
          newAnswers.splice(i, 1);
          break;
        }
      }
      props.setAnswers(newAnswers);
    }
  };

  const renderAnswers = (e) => {
    return props.answers.map((answer, idx) => {
      return (
        <NewQuestionAnswer
          key={answer._id || idx}
          isMultiple={props.isMultiple}
          correct={answer.isCorrect}
          onRemove={() => handleRemoveAnswer(answer)}
          answers={props.answers}
          setAnswers={props.setAnswers}
          answer={answer}
        />
      );
    });
  };

  const addAnswer = (e) => {
    e.preventDefault();
    let newAnswer = { title: "", isCorrect: false };
    props.setAnswers([...props.answers, newAnswer]);
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
