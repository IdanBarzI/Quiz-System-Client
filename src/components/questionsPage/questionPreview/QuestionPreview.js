import classes from "./QuestionPreview.module.css";
import React, { useEffect } from "react";
import { Modal, Icon, Typography } from "../../Ui";
import { useStore } from "../../../store/store";

const QuestionPreview = (props) => {
  const [{ selectedQuestion, questionPage }, dispatch] = useStore();
  // console.log(selectedQuestion, questionPage);

  return (
    <Modal
      onCancle={() => dispatch("TOGGLE_MODAL_PREVIEW")}
      title={selectedQuestion.title}
      scroll={false}
    >
      <div className={classes.answers}>
        {selectedQuestion.answers.map((answer, index) => {
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
