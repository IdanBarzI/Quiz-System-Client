import React, { useState, useEffect, Fragment } from "react";
import { useStore } from "../../../store/store";
import useFetch from "../../../hooks/use-fetch";
import QuestionSearch from "../questionSearch/QuestionSearch";
import QuestionAndTags from "../questionAnbdTags/QuestionAndTags";
import QuestionPreview from "../questionPreview/QuestionPreview";
import NewQuestion from "../newQuestion/NewQuestion";
import { Typography, Line, Button, Pagination } from "../../Ui";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import classes from "./QuestionGrid.module.css";

const PER_PAGE = 5;

const QuestionGrid = (props) => {
  const [{ questionsToShow, selectedQuestion, questionPage }, dispatch] =
    useStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [questionsPerPage, setQuestionsPerPage] = useState(PER_PAGE);
  const [isAllShown, setIsAllShown] = useState(false);

  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questionsToShow.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );

  const { isLoading, error, sendRequest: sendUpdateUserRequest } = useFetch();
  const enterUserHandler = async (questionId) => {
    console.log(questionId);
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

  const paginate = (number) => {
    setCurrentPage(number);
  };

  const handleShowAll = () => {
    setCurrentPage(1);
    setQuestionsPerPage(questionsToShow.length);
    setIsAllShown(true);
  };
  const handleHide = () => {
    setQuestionsPerPage(PER_PAGE);
    setIsAllShown(false);
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

  const renderTableBody = () => {
    return currentQuestions.map((quest, indx) => {
      let date = "Unknown";
      if (quest.updatedAt) {
        date = new Date(quest?.updatedAt).toISOString().slice(0, 10);
      }
      return (
        <Fragment key={quest._id}>
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
  };

  return (
    <div className={classes.container}>
      <QuestionSearch />
      <TableContainer>
        <Table className={classes.table} aria-label="simple-table">
          <TableHead className={classes.head}>
            <TableRow className={classes.row}>
              <TableCell>
                <Typography className={classes.cell}>Id</Typography>
              </TableCell>
              <TableCell>
                <Typography className={classes.cell}>Title And Tags</Typography>
              </TableCell>
              <TableCell>
                <Typography className={classes.cell}>Last Update</Typography>
              </TableCell>
              <TableCell>
                <Typography className={classes.cell}>Question Type</Typography>
              </TableCell>
              <TableCell>
                <Typography className={classes.cell}># of Tests</Typography>
              </TableCell>
              <TableCell className={classes.cellContiner}>
                <Typography className={classes.cell}>Options</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderTableBody()}</TableBody>
        </Table>
      </TableContainer>
      <Line justify="between">
        <Pagination
          itemsPerPage={questionsPerPage}
          currentPage={currentPage}
          paginate={paginate}
          totalItems={questionsToShow.length}
        />
        <div>
          <Button onClick={!isAllShown ? handleShowAll : handleHide}>
            {!isAllShown ? <div>Show All</div> : <div>Hide</div>}
          </Button>
        </div>
      </Line>
    </div>
  );
};

export default QuestionGrid;
