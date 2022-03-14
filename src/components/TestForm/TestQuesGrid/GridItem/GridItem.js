import React, { Fragment, useState } from "react";
import { useStore } from "../../../../store/store";
import {
  UPDATE_SELECTED_QUESTIONS,
  onFocusOut,
} from "../../../../lib/testFormUtils";
import { Typography, Button } from "../../../Ui";
import QuestionAndTags from "../../../questionsPage/questionAnbdTags/QuestionAndTags";
import QuestionPreview from "../../../questionsPage/questionPreview/QuestionPreview";
import classes from "../TestQuesGrid.module.css";

const GridItem = (props) => {
  const { quest, selectedQuestions } = props;
  const [{ selectedTest, selectedQuestion }, dispatch] = useStore(false);
  const [openPreview, setOpenPreview] = useState(false);

  const isSelected = (question) => {
    if (selectedQuestions.length > 0) {
      for (let ques of selectedQuestions) {
        if (question._id === ques._id) return classes.rowSelected;
      }
    }
    return classes.row;
  };

  const handleSelectQuestion = (question) => {
    props.dispatch({ type: UPDATE_SELECTED_QUESTIONS, data: { question } });
  };

  const handleOpenPreviewClick = (event) => {
    event.stopPropagation();
    dispatch("TOGGLE_SELECTED_QUESTION", quest._id);
    setOpenPreview(true);
  };

  return (
    <>
      <tr
        className={isSelected(quest)}
        key={quest._id}
        onClick={() => handleSelectQuestion(quest)}
      >
        <td className={classes.td}>
          <Typography>
            <QuestionAndTags question={quest.title} tags={quest.tags} />
          </Typography>
        </td>
        <td className={classes.td}>
          <Typography>
            <div className={classes.buttons}>
              <Button onClick={(event) => handleOpenPreviewClick(event)}>
                Show
              </Button>
            </div>
          </Typography>
        </td>
      </tr>
      {selectedQuestion._id === quest._id && (
        <QuestionPreview
          show={openPreview}
          onCancle={() => setOpenPreview(false)}
        />
      )}
    </>
  );
};

export default GridItem;
