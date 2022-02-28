import React, { Fragment } from "react";
import { useStore } from "../../../../store/store";
import useFetch from "../../../../hooks/use-fetch";
import { Typography, Button } from "../../../Ui";
import { TableCell, TableRow } from "@material-ui/core";
import QuestionAndTags from "../../questionAnbdTags/QuestionAndTags";
import QuestionPreview from "../../questionPreview/QuestionPreview";
import NewQuestion from "../../newQuestion/NewQuestion";
import classes from "./GridItem.module.css";

const GridItem = React.memo((props) => {
  const { quest, selectedQuestion, questionPage, date } = props;
  const dispatch = useStore(false)[1];

  const { isLoading, error, sendRequest: sendUpdateUserRequest } = useFetch();
  const enterUserHandler = async (questionId) => {
    await sendUpdateUserRequest(
      {
        url: `http://localhost:5000/questions/${questionId}`,
        method: "DELETE",
      },
      () => {
        dispatch("DELETE_QESTION", questionId);
      }
    );
  };

  const getNumberOfTests = (questionId) => {
    //api call to get number of tests the current question's id appeares on
  };

  const handleOpenPreviewClick = (question) => {
    dispatch("TOGGLE_SELECTED_QUESTION", question._id);
    dispatch("TOGGLE_MODAL_PREVIEW");
  };

  const handleOpenEdit = (question) => {
    dispatch("TOGGLE_SELECTED_QUESTION", question._id);
    dispatch("TOGGLE_MODAL_EDIT");
  };

  const handleDelete = (question) => {
    enterUserHandler(question._id);
  };

  return (
    <Fragment>
      <TableRow className={classes.row} key={quest._id}>
        <TableCell>
          <Typography className={classes.cell}>{quest._id}</Typography>
        </TableCell>
        <TableCell>
          <Typography className={classes.cell}>
            <QuestionAndTags question={quest.title} tags={quest.tags} />
          </Typography>
        </TableCell>
        <TableCell>
          <Typography className={classes.cell}>{date}</Typography>
        </TableCell>
        <TableCell>
          <Typography className={classes.cell}>
            {quest.isMultipleAnswers ? "Multiple" : "Single"}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography className={classes.cell}>
            {getNumberOfTests(quest._id)}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography className={classes.cell}>
            <div className={classes.buttons}>
              <Button onClick={() => handleOpenPreviewClick(quest)}>
                Show
              </Button>
              <Button onClick={() => handleOpenEdit(quest)}>Edit</Button>
              <Button onClick={() => handleDelete(quest)}>Delete</Button>
            </div>
          </Typography>
        </TableCell>
      </TableRow>
      {selectedQuestion &&
        questionPage.modalPreviewOpen &&
        selectedQuestion._id === quest._id && <QuestionPreview />}
      {selectedQuestion &&
        questionPage.modalEditOpen &&
        selectedQuestion._id === quest._id && <NewQuestion />}
    </Fragment>
  );
});

export default GridItem;
