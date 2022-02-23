import React, { useEffect, useState, useCallback, Fragment } from "react";
import classes from "./QuestionGrid.module.css";
// import QUESTIONS from "../../../mocks/questionsMock.json";
import { useStore } from "../../../store/store";
import QuestionSearch from "../questionSearch/QuestionSearch";
import QuestionAndTags from "../questionAnbdTags/QuestionAndTags";
import QuestionPreview from "../questionPreview/QuestionPreview";
import NewQuestion from "../newQuestion/NewQuestion";
import { Typography, Line, Button } from "../../Ui";
import Pagination from "../../Ui/pagination/Pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";

const PER_PAGE = 5;

const QuestionGrid = () => {
  // const [questions, setQuestions] = useState(QUESTIONS);
  const [questions, dispatch] = useStore();
  console.log(questions);
  const [renderPreview, setRenderPreview] = useState(false);
  const [renderEdit, setRenderEdit] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [questionsPerPage, setQuestionsPerPage] = useState(PER_PAGE);
  const [isAllShown, setIsAllShown] = useState(false);

  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questions.questions.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );

  const paginate = (number) => {
    setCurrentPage(number);
  };

  const handleShowAll = () => {
    setCurrentPage(1);
    setQuestionsPerPage(questions.questions.length);
    setIsAllShown(true);
  };
  const handleHide = () => {
    setQuestionsPerPage(PER_PAGE);
    setIsAllShown(false);
  };

  const handleSetRenderPreview = () => {
    setRenderPreview((preState) => !preState);
  };
  const handleSetRenderEdit = () => {
    setRenderEdit(!renderEdit);
  };

  const getNumberOfTests = (questionId) => {
    //api call to get number of tests the current question's id appeares on
  };
  const handleOpenPreviewClick = (question) => {
    handleSetRenderPreview();
    dispatch("TOGGLE_SELECTED", question._id);
    // setSelectedQuestion(question);
  };

  const handleOpenEdit = (question) => {
    handleSetRenderEdit();
    dispatch("TOGGLE_SELECTED", question._id);
    // setSelectedQuestion(question);
  };

  const renderTableBody = () => {
    return currentQuestions.map((quest, indx) => {
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
              <Typography className={classes.cell}>
                {quest.updatedAt}
              </Typography>
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
                  <Button>Delete</Button>
                </div>
              </Typography>
            </TableCell>
          </TableRow>
          {questions.selectedQuestion &&
            renderPreview &&
            questions.selectedQuestion._id === quest._id && (
              <QuestionPreview
                setClose={handleSetRenderPreview}
                question={questions.selectedQuestion}
              />
            )}
          {questions.selectedQuestion &&
            renderEdit &&
            questions.selectedQuestion._id === quest._id && (
              <NewQuestion
                isEdit={true}
                setClose={handleSetRenderEdit}
                question={questions.selectedQuestion}
              />
            )}
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
                <Typography className={classes.cell}>
                  Question text and tags
                </Typography>
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
          totalItems={questions.questions.length}
        />
        <div>
          {!isAllShown && <Button onClick={handleShowAll}>Show All</Button>}
          {isAllShown && <Button onClick={handleHide}>Hide</Button>}
        </div>
      </Line>
    </div>
  );
};

export default QuestionGrid;
