import classes from "./QuestionPreview.module.css";
import React, { useEffect } from "react";
import { Modal, Icon, Typography } from "../../Ui";

const QuestionPreview = ({ setClose, question }) => {
  useEffect(() => {
    console.log(question);
  });

  return (
    <Modal onCancle={setClose} title={question.title}>
      <div className={classes.answers}>
        {question.answers.map((answer, index) => {
          return (
            <div className={classes.answer} key={index}>
              <div className={classes.body}>
                <Typography>{index + 1}.</Typography>
                <Typography>{answer.title}</Typography>
              </div>
              <div className={classes.isCorrect}>
                {answer.isCorrect ? (
                  <Icon className={classes.iconV} i="circle" />
                ) : (
                  <Icon className={classes.iconX} i="circle" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};

export default QuestionPreview;
