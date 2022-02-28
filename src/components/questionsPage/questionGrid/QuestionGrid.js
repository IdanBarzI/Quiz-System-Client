import React, { useState, useCallback, Fragment } from "react";
import { useStore } from "../../../store/store";
import useFetch from "../../../hooks/use-fetch";
import QuestionSearch from "../questionSearch/QuestionSearch";
import GridItem from "./GridItem/GridItem";
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

  const renderTableBody = useCallback(() => {
    if (currentQuestions && currentQuestions.length > 0) {
      return currentQuestions.map((quest) => {
        console.log("RENDERING");
        let date = "Unknown";
        if (quest.updatedAt) {
          date = new Date(quest?.updatedAt).toISOString().slice(0, 10);
        }
        return (
          <GridItem
            key={quest._id}
            quest={quest}
            selectedQuestion={selectedQuestion}
            questionPage={questionPage}
            date={date}
          />
        );
      });
    }
  }, [currentQuestions]);

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
