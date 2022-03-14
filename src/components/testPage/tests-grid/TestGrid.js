import React, { Fragment, useState, useRef } from "react";
import { useStore } from "../../../store/store";
import { useNavigate } from "react-router-dom";
import TestSearch from "../test-search/TestSearch";
import GridItem from "./GridItem/GridItem";
import {
  Line,
  Pagination,
  Button,
  Typography,
  Snackbar,
  Shimmer,
} from "../../Ui";
import classes from "./TestGrid.module.css";

const PER_PAGE = 5;

const TestGrid = (props) => {
  console.log("RENDER_TestGrid");
  const [{ testsToShow }, dispatchStore] = useStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [testsPerPage, setTestsPerPage] = useState(PER_PAGE);
  const [isAllShown, setIsAllShown] = useState(false);
  const navigate = useNavigate();

  const indexOfLastTest = currentPage * testsPerPage;
  const indexOfFirstTest = indexOfLastTest - testsPerPage;
  const currentTests = testsToShow.slice(indexOfFirstTest, indexOfLastTest);

  const snackbarRef = useRef(null);

  const paginate = (page) => {
    setCurrentPage(page);
  };

  const handleShowAll = () => {
    setCurrentPage(1);
    setTestsPerPage(testsToShow.length);
    setIsAllShown(true);
  };

  const handleHide = () => {
    setTestsPerPage(PER_PAGE);
    setIsAllShown(false);
  };

  const newTestHandler = () => {
    dispatchStore("TOGGLE_SELECTED", null);
    navigate(`/admin/tests/new-test`);
  };

  const renderTableBody = () => {
    return currentTests.map((test, idx) => {
      return (
        <GridItem
          key={test._id}
          test={test}
          idx={idx}
          snackbarShow={snackbarShow}
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
    for (var i = 0; i < testsPerPage; i++) {
      rows.push(objectRow(i));
    }
    return rows;
  };

  const snackbarShow = (type, content) => {
    snackbarRef.current.show(type, content);
  };

  return (
    <div className={classes.container}>
      <TestSearch />
      <div className={classes.tableContainer}>
        <table className={classes.table}>
          <thead className={classes.head}>
            <tr className={classes.row}>
              <th className={classes.head}>
                <Typography className={classes.cell}>Id</Typography>
              </th>
              <th className={classes.head}>
                <Typography className={classes.cell}>Link</Typography>
              </th>
              <th className={classes.head}>
                <Typography className={classes.cell}>Test Name</Typography>
              </th>
              <th className={classes.head}>
                <Typography className={classes.cell}>
                  Number of Questions
                </Typography>
              </th>
              <th className={classes.head}>
                <Typography className={classes.cell}>Options</Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {props.isLoading ? renderLoadingTable() : renderTableBody()}
          </tbody>
        </table>
      </div>
      <Line justify="between">
        <Pagination
          itemsPerPage={testsPerPage}
          totalItems={testsToShow.length}
          currentPage={currentPage}
          paginate={paginate}
        />
        <Button onClick={!isAllShown ? handleShowAll : handleHide}>
          {!isAllShown ? <div>Show All</div> : <div>Hide</div>}
        </Button>
      </Line>
      <Line justify="between">
        <Button onClick={() => navigate(`/admin/main-menu`)}>Back</Button>
        <Button onClick={() => newTestHandler()}>Create New Test</Button>
      </Line>
      <Snackbar ref={snackbarRef} />
    </div>
  );
};

export default TestGrid;
