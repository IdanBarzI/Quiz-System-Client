import React, { useState, useCallback, useRef, Fragment } from "react";
import { useStore } from "../../../store/store";
import useFetch from "../../../hooks/use-fetch";
import TransitionGroup from "react-transition-group/TransitionGroup";
import CSSTransition from "react-transition-group/CSSTransition";
import QuestionSearch from "../questionSearch/QuestionSearch";
import NewQuestion from "../newQuestion/NewQuestion";
import GridItem from "./GridItem/GridItem";
import {
  Typography,
  Line,
  Button,
  Pagination,
  Snackbar,
  Prompt,
  Shimmer,
} from "../../Ui";
import classes from "./QuestionGrid.module.css";

const PER_PAGE = 5;

const QuestionGrid = (props) => {
  const [{ questionsToShow }, dispatch] = useStore();
  const [openNewQuestion, setOpenNewQuestion] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [questionsPerPage, setQuestionsPerPage] = useState(PER_PAGE);
  const [isAllShown, setIsAllShown] = useState(false);
  const [promptOnConfirm, setPromptOnConfirm] = useState(() => {});

  const snackbarRef = useRef(null);
  const promptRef = useRef(null);

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

  const handleOpenNewQuestion = (question) => {
    dispatch("TOGGLE_SELECTED_QUESTION", -1);
    setOpenNewQuestion(true);
  };

  const promptShow = (title, content) => {
    promptRef.current.show(title, content);
  };

  const snackbarShow = (type, content) => {
    snackbarRef.current.show(type, content);
  };

  const renderTableBody = useCallback(() => {
    if (currentQuestions && currentQuestions.length > 0) {
      return currentQuestions.map((quest) => {
        let date = "Unknown";
        if (quest.updatedAt) {
          date = new Date(quest?.updatedAt).toISOString().slice(0, 10);
        }
        return (
          <CSSTransition
            key={quest._id}
            classNames={{
              enter: classes.fadeEnter,
              enterActive: classes.fadeEnterActive,
              exit: classes.fadeExit,
              exitActive: classes.fadeExitActive,
            }}
            timeout={1000}
          >
            <GridItem
              quest={quest}
              date={date}
              promptShow={promptShow}
              setPromptOnConfirm={setPromptOnConfirm}
              snackbarShow={snackbarShow}
            />
          </CSSTransition>
        );
      });
    }
  }, [currentQuestions]);

  const objectRow = (i) => {
    return (
      <Fragment key={i}>
        <tr className={classes.row}>
          <td className={classes.td}>
            <Shimmer />
          </td>
          <td className={classes.td}>
            <Shimmer />
          </td>
          <td className={classes.td}>
            <Shimmer />
          </td>
          <td className={classes.td}>
            <Shimmer />
          </td>
          <td className={classes.td}>
            <Shimmer />
          </td>
        </tr>
      </Fragment>
    );
  };

  const renderLoadingTable = () => {
    var rows = [];
    for (var i = 0; i < questionsPerPage; i++) {
      rows.push(objectRow(i));
    }
    return rows;
  };

  return (
    <div className={classes.container}>
      <QuestionSearch />
      <div className={classes.tableContainer}>
        <table className={classes.table} aria-label="sticky table">
          <thead className={classes.head}>
            <tr className={classes.row}>
              <th className={classes.head}>
                <Typography className={classes.cell}>Id</Typography>
              </th>
              <th className={classes.head}>
                <Typography className={classes.cell}>Title And Tags</Typography>
              </th>
              <th className={classes.head}>
                <Typography className={classes.cell}>Last Update</Typography>
              </th>
              <th className={classes.head}>
                <Typography className={classes.cell}>Question Type</Typography>
              </th>
              <th className={classes.head}>
                <Typography className={classes.cell}>Options</Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {props.isLoading ? (
              renderLoadingTable()
            ) : questionsToShow.length > 0 ? (
              <TransitionGroup component={Fragment}>
                {renderTableBody()}
              </TransitionGroup>
            ) : (
              <tr className="centered">
                <td>No Questions To Show</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
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
      <Line justify="end">
        <div>
          <Button onClick={() => handleOpenNewQuestion()}>
            Create New Question
          </Button>
        </div>
      </Line>
      <NewQuestion
        show={openNewQuestion}
        onCancle={() => setOpenNewQuestion(false)}
        promptShow={promptShow}
        setPromptOnConfirm={setPromptOnConfirm}
        snackbarShow={snackbarShow}
      />

      <Snackbar ref={snackbarRef} />

      <Prompt
        ref={promptRef}
        confirm={() => promptOnConfirm()}
        cancle={() => {}}
      />
    </div>
  );
};

export default QuestionGrid;
