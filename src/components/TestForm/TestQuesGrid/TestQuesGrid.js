import React, { useState, useEffect, Fragment } from "react";
import { useStore } from "../../../store/store";
import useFetch from "../../../hooks/use-fetch";

import { Typography, Line, Button, Pagination, Shimmer } from "../../Ui";
import QuestionSearch from "../../questionsPage/questionSearch/QuestionSearch";
import GridItem from "./GridItem/GridItem";
import classes from "./TestQuesGrid.module.css";

const PER_PAGE = 5;

const TestQuesGrid = (props) => {
  console.log("RENDER_TestQuesGrid");
  const [{ questionsToShow }, dispatch] = useStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [questionsPerPage, setQuestionsPerPage] = useState(PER_PAGE);
  const [isAllShown, setIsAllShown] = useState(false);
  const { isLoading, error, sendRequest: sendGetTestsRequest } = useFetch();
  const getQuestionsHandler = async () => {
    await sendGetTestsRequest(
      {
        url: `${process.env.REACT_APP_BASE_URL}/qusetions`,
        method: "GET",
      },
      (questions) => {
        dispatch("SET_QUESTIONS", questions);
      }
    );
  };

  useEffect(() => {
    getQuestionsHandler();
  }, []);

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

  const renderTableBody = () => {
    return currentQuestions.map((quest, indx) => {
      return (
        <GridItem
          key={quest._id}
          quest={quest}
          dispatch={props.dispatch}
          selectedQuestions={props.selectedQuestions.value}
        />
      );
    });
  };

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
        <table className={classes.table}>
          <thead className={classes.head}>
            <tr className={classes.row}>
              <th className={classes.head}>
                <Typography className={classes.cell}>Title And Tags</Typography>
              </th>
              <th className={classes.head}>
                <Typography className={classes.cell}>Options</Typography>
              </th>
            </tr>
          </thead>
          <tbody>{isLoading ? renderLoadingTable() : renderTableBody()}</tbody>
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
      <p className="errorMsg">{props.selectedQuestions.error}</p>
    </div>
  );
};

export default React.memo(TestQuesGrid);
