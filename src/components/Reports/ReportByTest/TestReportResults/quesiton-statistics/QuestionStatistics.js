import classes from './QuestionStatistics.module.css'
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

const QuestionStatistics = ({studentTests , test}) => {

    const getNumberOfSubmitted=(question)=>{
        let counter = 0;
        for(let i = 0; i<studentTests.length;i++){
            if(studentTests[i].studentAnswers.some((ans)=>question.answers.some(answer=>answer._id===ans.answer._id))){
                counter ++;
            }
        }
        return counter;
    }

    const getCorrectPrecentage = (question)=>{
        let counter = 0;
        for(let i =0;i<studentTests.length;i++){
            if(studentTests[i].studentAnswers.some((ans)=>question.answers.some(answer=>answer._id===ans.answer._id))){
                const testAnswers = question.answers.filter((ans)=>ans.isCorrect===true)
                const studentAnswers = studentTests[i].studentAnswers.filter((ans)=>ans.question===question._id)
                if(studentAnswers[0].question===question._id && testAnswers[0]._id === studentAnswers[0].answer._id){
                    counter +=1
                }
            }
        }
        return Math.ceil((counter*100)/studentTests.length)
    }

    const renderTableBody=()=>{
        return test.questions.map((question,indx)=>{
            return(
                <TableRow className={classes.row} key={question._id}>
                <TableCell>
                  <Typography className={classes.cell}>{question._id}</Typography>
                </TableCell>
                <TableCell>
                  <Typography className={classes.cell}>{question.title}</Typography>
                </TableCell>
                <TableCell>
                  <Typography className={classes.cell}>{getNumberOfSubmitted(question)}</Typography>
                </TableCell>
                <TableCell>
                  <Typography className={classes.cell}>{getCorrectPrecentage(question)}%</Typography>
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
                        Question
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography className={classes.cell}>Submited</Typography>
                    </TableCell>
                    <TableCell>
                        <Typography className={classes.cell}>Correct Precentage</Typography>
                    </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>{renderTableBody()}</TableBody>
            </Table>
        </TableContainer>
        </div>
    )
}

export default QuestionStatistics