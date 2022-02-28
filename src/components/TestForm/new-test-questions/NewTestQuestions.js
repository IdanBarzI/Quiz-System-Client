import React, { useState, useEffect, Fragment } from "react";
import { useStore } from "../../../store/store";
import useAxiosFetch from "../../../hooks/use-axios";
import { Typography, Line, Button, Pagination } from "../../Ui";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import QuestionAndTags from "../../questionsPage/questionAnbdTags/QuestionAndTags";
import QuestionPreview from "../../questionsPage/questionPreview/QuestionPreview";
import QuestionSearch from "../../questionsPage/questionSearch/QuestionSearch";
import classes from "./NewTestQuestions.module.css";

const PER_PAGE = 5;

const NewTestQuestions = (props) => {
  const [{ questionsToShow, selectedQuestion, questionPage }, dispatch] =
    useStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [questionsPerPage, setQuestionsPerPage] = useState(PER_PAGE);
  const [isAllShown, setIsAllShown] = useState(false);
  const { data, fetchError, isLoading } = useAxiosFetch(`/qusetions`);

  useEffect(() => {
    dispatch("SET_QUESTIONS", data);
  }, [data]);

  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questionsToShow.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );

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

  const handleOpenPreviewClick = (question) => {
    console.log(question);
    dispatch("TOGGLE_SELECTED_QUESTION", question._id);
    dispatch("TOGGLE_MODAL_PREVIEW");
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
              <Typography className={classes.cell}>
                <QuestionAndTags question={quest.title} tags={quest.tags} />
              </Typography>
            </TableCell>
            <TableCell>
              <Typography className={classes.cell}>
                <div className={classes.buttons}>
                  <Button onClick={() => handleOpenPreviewClick(quest)}>
                    Show
                  </Button>
                </div>
              </Typography>
            </TableCell>
          </TableRow>
          {selectedQuestion &&
            questionPage.modalPreviewOpen &&
            selectedQuestion._id === quest._id && <QuestionPreview />}
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
                <Typography className={classes.cell}>Title And Tags</Typography>
              </TableCell>
              <TableCell>
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

export default NewTestQuestions;
