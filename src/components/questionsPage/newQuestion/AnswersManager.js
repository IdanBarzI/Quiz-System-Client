import classes from "./AnswersManager.module.css";
import React, { useEffect } from "react";
import NewQuestionAnswer from "./answers/NewQuestionAnswer";
import TransitionGroup from "react-transition-group/TransitionGroup";
import CSSTransition from "react-transition-group/CSSTransition";
import { Button } from "../../Ui";

const AnswersManager = (props) => {
  useEffect(() => {
    if (props.answers.length === 0) {
      props.setAnswers([]);
    }
  }, []);

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
        <CSSTransition
          key={answer._id || idx}
          classNames={{
            enter: classes.answerEnter,
            enterActive: classes.answerEnterActive,
            exit: classes.answerExit,
            exitActive: classes.answerExitActive,
          }}
          timeout={1000}
        >
          <NewQuestionAnswer
            isMultiple={props.isMultiple}
            correct={answer.isCorrect}
            onRemove={() => handleRemoveAnswer(answer)}
            answers={props.answers}
            setAnswers={props.setAnswers}
            answer={answer}
          />
        </CSSTransition>
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
      <TransitionGroup component="div">{renderAnswers()}</TransitionGroup>
      <div className={classes.buttons}>
        <Button onClick={(e) => addAnswer(e)}>Add an answer</Button>
      </div>
    </div>
  );
};

export default AnswersManager;
