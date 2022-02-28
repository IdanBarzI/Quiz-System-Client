import classes from './TestReviewQuestionsTable.module.css'
import React, { Fragment, useState } from 'react'
import { Button, Typography} from "../../../../../Ui";
import {
    Collapse,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
  } from "@material-ui/core";

const TestReviewQuestionsTable = ({test}) => {

    const [open,setOpen]=useState({})

    const renderAnswers=(studentAnswer)=>{
        return studentAnswer.question.answers.map((ans)=>{
            if(ans.isCorrect){
                return <h4 style={{color:"green"}}>{ans.title}</h4>
            }
            else if(ans._id === studentAnswer.answer._id&&!studentAnswer.answer.isCorrect){
                return <h4 style={{color:"red"}}>{ans.title}</h4>
            }
            else{
                return <h4>{ans.title}</h4>
            }
        })
    }

    const renderTableBody =()=>{
        return test.studentAnswers.map((ans,index)=>{
            return(
            <Fragment>
                <TableRow className={classes.row} key={index+1} >
                    <TableCell>
                        <Button 
                            onClick={()=>setOpen((prev)=>({...prev,[ans._id]:!prev[ans._id]}))}
                                >
                                {open[ans._id] ? "<" : ">"}
                        </Button>
                    </TableCell>
                    <TableCell>
                        <Typography className={classes.cell}>{ans._id}</Typography>
                    </TableCell>
                    <TableCell>
                        <Typography className={classes.cell}>{ans.question.title}</Typography>
                    </TableCell>
                    <TableCell>
                        <Typography className={classes.cell}>{ans.answer.isCorrect ? "Correct" : "Incorrect"}</Typography>
                    </TableCell>
                    <TableCell>
                        <Typography className={classes.cell}>{test.createdAt.toString().slice(0,10)}</Typography>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colSpan={5} style={{ paddingBottom: 0, paddingTop: 0 }}>
                        <Collapse in={open[ans._id]} timeout="auto" unmountOnExit>
                            <h3>Answers:</h3>
                            <div>
                                {renderAnswers(ans)}
                            </div>
                        </Collapse>
                    </TableCell>
                </TableRow>
          </Fragment>
            )
        })
    }

  return (
    <div>
         <TableContainer>
                <Table className={classes.table} aria-label="simple-table">
                    <TableHead className={classes.head}>
                        <TableRow className={classes.row}>
                        <TableCell></TableCell>
                        <TableCell>
                            <Typography className={classes.cell}>ID</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography className={classes.cell}>Question</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography className={classes.cell}>Answered Correctly ?</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography className={classes.cell}>Date Answered</Typography>
                        </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{renderTableBody()}</TableBody>
                </Table>
        </TableContainer>
    </div>
  )
}

export default TestReviewQuestionsTable