import classes from "./TestGrid.module.css";
import TestSearch from "../test-search/TestSearch";
import React, { Fragment, useContext, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import serverAccess from "../../../api/serverAccess";
import NewTest from "../new-test/NewTest";
import sendAuthTokenHeader from "../../../api/tokenConfig";
import AppContext from "../../../context/AppContext";
import { Line, Pagination } from "../../Ui";

const PER_PAGE = 5;

const TestGrid = () => {
  const [tests, setTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState();
  const [renderEdit, setRenderEdit] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [testsPerPage, setTestsPerPage] = useState(PER_PAGE);
  const [isAllShown, setIsAllShown] = useState(false);

  const appCtx = useContext(AppContext);

  const indexOfLastTest = currentPage * testsPerPage;
  const indexOfFirstTest = indexOfLastTest - testsPerPage;
  const currentTests = tests.slice(indexOfFirstTest, indexOfLastTest);

  useEffect(() => {
    serverAccess
      .get("/tests", sendAuthTokenHeader(appCtx.token))
      .then((res) => {
        setTests(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const paginate = (page) => {
    setCurrentPage(page);
  };
  const handleShowAll = () => {
    setCurrentPage(1);
    setTestsPerPage(tests.length);
    setIsAllShown(true);
  };
  const handleHide = () => {
    setTestsPerPage(PER_PAGE);
    setIsAllShown(false);
  };
  const handleSetRenderEdit = () => {
    setRenderEdit(!renderEdit);
  };

  const handleOpenEditPage = (test) => {
    handleSetRenderEdit();
    setSelectedTest(test);
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
            <TableCell>{idx + 1}</TableCell>
            <TableCell>
              <button onClick={() => handleCopyLinkToClipBoard(test.testUrl)}>
                Copy Link
              </button>
            </TableCell>
            <TableCell>{test.title}</TableCell>
            <TableCell>{test.questions.length}</TableCell>
            <TableCell>
              <div className={classes.options}>
                <button onClick={() => handleOpenEditPage(test)}>Edit</button>
                <button disabled>Duplicate</button>
              </div>
            </TableCell>
          </TableRow>
          {selectedTest && renderEdit && (
            <NewTest setClose={handleSetRenderEdit} />
          )}
        </Fragment>
      );
    });
  };

  return (
    <div className={classes.container}>
      <TestSearch />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple-table">
          <TableHead className={classes.head}>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Link</TableCell>
              <TableCell>Test Name</TableCell>
              <TableCell>Number of Questions</TableCell>
              <TableCell>Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderTableBody()}</TableBody>
        </Table>
      </TableContainer>
      <Line justify="between">
        <Pagination
          itemsPerPage={testsPerPage}
          totalItems={tests.length}
          currentPage={currentPage}
          paginate={paginate}
        />
        {!isAllShown ? (
          <button onClick={handleShowAll}>Show All</button>
        ) : (
          <button onClick={handleHide}>Hide</button>
        )}
      </Line>
    </div>
  );
};

export default TestGrid;
