import React, { Fragment, useState, useEffect } from "react";
import { useStore } from "../../../store/store";
import { Link } from "react-router-dom";
import TestSearch from "../test-search/TestSearch";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Line, Pagination, Button, Typography } from "../../Ui";
import classes from "./TestGrid.module.css";

const PER_PAGE = 5;

const TestGrid = () => {
  const [{ testsToShow }, dispatch] = useStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [testsPerPage, setTestsPerPage] = useState(PER_PAGE);
  const [isAllShown, setIsAllShown] = useState(false);

  const indexOfLastTest = currentPage * testsPerPage;
  const indexOfFirstTest = indexOfLastTest - testsPerPage;
  const currentTests = testsToShow.slice(indexOfFirstTest, indexOfLastTest);

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

  const handleCopyLinkToClipBoard = (link) => {
    navigator.clipboard.writeText(link);
    alert("Copied to clipboard");
  };

  const renderTableBody = () => {
    return currentTests.map((test, idx) => {
      return (
        <Fragment key={idx}>
          <TableRow key={test._id} className={classes.row}>
            <TableCell className={classes.cell}>
              <Typography className={classes.cell}>{idx + 1}</Typography>
            </TableCell>
            <TableCell className={classes.cell}>
              <Button onClick={() => handleCopyLinkToClipBoard(test.testUrl)}>
                Copy Link
              </Button>
            </TableCell>
            <TableCell className={classes.cell}>
              <Typography className={classes.cell}>{test.title}</Typography>
            </TableCell>
            <TableCell className={classes.cell}>
              <Typography className={classes.cell}>
                {test.questions.length}
              </Typography>
            </TableCell>
            <TableCell className={classes.cell}>
              <Line>
                <Button onClick={() => dispatch("TOGGLE_SELECTED", test._id)}>
                  <Link className={classes.btn} to={`/admin/tests/${test._id}`}>
                    Edit
                  </Link>
                </Button>
                <Button disabled={true}>Duplicate</Button>
              </Line>
            </TableCell>
          </TableRow>
        </Fragment>
      );
    });
  };

  return (
    <div className={classes.container}>
      <TestSearch />
      <TableContainer>
        <Table className={classes.table} aria-label="simple-table">
          <TableHead className={classes.head}>
            <TableRow className={classes.row}>
              <TableCell>
                <div className={classes.cell}>Id</div>
              </TableCell>
              <TableCell>
                <div className={classes.cell}>Link</div>
              </TableCell>
              <TableCell>
                <div className={classes.cell}>Test Name</div>
              </TableCell>
              <TableCell>
                <div className={classes.cell}>Number of Questions</div>
              </TableCell>
              <TableCell>
                <div className={classes.cell}>Options</div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderTableBody()}</TableBody>
        </Table>
      </TableContainer>
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
    </div>
  );
};

export default TestGrid;
