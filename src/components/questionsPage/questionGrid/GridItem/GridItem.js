import React, { useState } from "react";
import { useStore } from "../../../../store/store";
import useFetch from "../../../../hooks/use-fetch";
import { Typography, Button } from "../../../Ui";
import QuestionAndTags from "../../questionAnbdTags/QuestionAndTags";
import QuestionPreview from "../../questionPreview/QuestionPreview";
import NewQuestion from "../../newQuestion/NewQuestion";
import classes from "./GridItem.module.css";

const GridItem = (props) => {
  const { quest, date } = props;

  const [{ selectedQuestion }, dispatch] = useStore(false);
  const [openPreview, setOpenPreview] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const { isLoading, error, sendRequest: deleteQuestionRequest } = useFetch();
  const deleteQuestionHandler = async () => {
    await deleteQuestionRequest(
      {
        url: `${process.env.REACT_APP_BASE_URL}/questions/${quest._id}`,
        method: "DELETE",
      },
      () => {
        props.snackbarShow("Question Deleted", "success");
        setTimeout(() => dispatch("DELETE_QESTION", quest._id), 0);
      }
    );
  };

  const handleOpenPreviewClick = () => {
    dispatch("TOGGLE_SELECTED_QUESTION", quest._id);
    setOpenPreview(true);
  };

  const handleOpenEdit = () => {
    dispatch("TOGGLE_SELECTED_QUESTION", quest._id);
    setOpenEdit(true);
  };

  const handleDelete = async () => {
    props.promptShow(
      "Are you sure you want to delete?",
      "The question will be deleted"
    );
    props.setPromptOnConfirm(() => deleteQuestionHandler);
  };

  return (
    <>
      <tr className={classes.row}>
        <td className={classes.td}>
          <Typography>{quest._id}</Typography>
        </td>
        <td className={classes.td}>
          <Typography className={classes.cell}>
            <QuestionAndTags question={quest.title} tags={quest.tags} />
          </Typography>
        </td>
        <td className={classes.td}>
          <Typography className={classes.cell}>{date}</Typography>
        </td>
        <td className={classes.td}>
          <Typography className={classes.cell}>
            {quest.isMultipleAnswers ? "Multiple" : "Single"}
          </Typography>
        </td>
        <td className={classes.td}>
          <Typography className={classes.cell}>
            <div className={classes.buttons}>
              <Button onClick={() => handleOpenPreviewClick()}>Show</Button>
              <Button onClick={() => handleOpenEdit()}>Edit</Button>
              <Button isLoading={isLoading} onClick={() => handleDelete()}>
                Delete
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
      {selectedQuestion._id === quest._id && (
        <NewQuestion
          show={openEdit}
          onCancle={() => setOpenEdit(false)}
          promptShow={props.promptShow}
          setPromptOnConfirm={props.setPromptOnConfirm}
          snackbarShow={props.snackbarShow}
        />
      )}
      {error && props.snackbarShow(error, "fail")}
    </>
  );
};

export default React.memo(GridItem);
