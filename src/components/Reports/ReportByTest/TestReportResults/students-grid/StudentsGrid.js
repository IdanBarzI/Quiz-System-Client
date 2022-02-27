import classes from './StudentsGrid.module.css'
import React from 'react'
import { Typography, Line, Button } from "../../../../Ui";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
  } from "@material-ui/core";

const StudentsGrid = ({studentTests}) => {

    const renderTableBody=()=>{
        return studentTests.map((studTest,indx)=>{
            return(
                <TableRow className={classes.row} key={studTest._id}>
                <TableCell>
                  <Typography className={classes.cell}>{studTest._id}</Typography>
                </TableCell>
                <TableCell>
                  <Typography className={classes.cell}>{`${studTest.studenFirstName} ${studTest.studenLastName}`}</Typography>
                </TableCell>
                <TableCell>
                  <Typography className={classes.cell}>{studTest.createdAt.toString().slice(0,10)}</Typography>
                </TableCell>
                <TableCell>
                  <Typography className={classes.cell}>{studTest.studentAnswers.length}</Typography>
                </TableCell>
                <TableCell>
                  <Typography className={classes.cell}>{studTest.finalGrade}</Typography>
                </TableCell>
              </TableRow>
            )
        })
    }


  return (
    <div>
        <TableContainer>
        <Table className={classes.table} aria-label="simple-table">
          <TableHead className={classes.head}>
            <TableRow className={classes.row}>
              <TableCell>
                <Typography className={classes.cell}>Id</Typography>
              </TableCell>
              <TableCell>
                <Typography className={classes.cell}>
                  Respondent
                </Typography>
              </TableCell>
              <TableCell>
                <Typography className={classes.cell}>Submited</Typography>
              </TableCell>
              <TableCell>
                <Typography className={classes.cell}>Number of questions answered</Typography>
              </TableCell>
              <TableCell>
                <Typography className={classes.cell}>Grade</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderTableBody()}</TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default StudentsGrid