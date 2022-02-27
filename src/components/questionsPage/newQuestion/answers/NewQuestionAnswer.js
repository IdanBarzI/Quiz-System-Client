import React, { useContext, useEffect, useState } from "react";
import { Input, Button } from "../../../Ui";
import classes from "./NewQuestionAnswer.module.css";

const NewQuestionAnswer = (props) => {
  const [error, setError] = useState("");

  const handleMultiCorrectChange = () => {
    [...props.answers].filter((ans) => {
      if (ans === props.answer) {
        ans.isCorrect = !ans.isCorrect;
      }
    });

    props.setAnswers([...props.answers]);
  };

  const handleRadioCorrectChange = () => {
    [...props.answers].filter((ans) => {
      if (ans === props.answer) {
        ans.isCorrect = !ans.isCorrect;
      } else {
        ans.isCorrect = false;
      }
    });

    props.setAnswers([...props.answers]);
  };

  const handleTextChange = (e) => {
    console.log(e.target.value);
    if (e.target.value.length < 1) {
      setError("Answer Can not be Empty");
    } else {
      setError("");
    }

    [...props.answers].filter((ans) => {
      if (ans === props.answer) {
        ans.title = e.target.value;
      }
    });

    props.setAnswers([...props.answers]);
  };

  const renderCorrect = () => {
    console.log(props.answer.isCorrect);
    if (!props.isMultiple) {
      return (
        <div>
          <input
            type="radio"
            id="isCorrect"
            name="isCorrect"
            checked={props.answer.isCorrect}
            onChange={handleRadioCorrectChange}
          />
        </div>
      );
    } else {
      return (
        <div>
          <input
            type="checkbox"
            name="multiCorrect"
            id="multiCorrect"
            checked={props.answer.isCorrect}
            onChange={handleMultiCorrectChange}
          />
        </div>
      );
    }
  };

  return (
    <div className={classes.container}>
      <Button onClick={props.onRemove}>X</Button>
      <div className={classes.answerContainer}>
        <Input
          defaultValue={props.answer.title}
          hasError={true}
          touched={true}
          errorMsg={error}
          name="answer"
          onBlur={handleTextChange}
        />
      </div>
      {renderCorrect()}
    </div>
  );
};

export default NewQuestionAnswer;
