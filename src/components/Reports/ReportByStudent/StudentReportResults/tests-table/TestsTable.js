import classes from './TestsTable.module.css'
import React, { useState } from 'react'
import { Typography} from "../../../../Ui";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
  } from "@material-ui/core";
import TestReview from '../test-review/TestReview';

const TestsTable = ({tests}) => {

    const [selectedTest,setSelectedTest] = useState()
    const [isModalOpened,setIsModalOpened] =useState(false)

    const handleRowClick=(test)=>{
        setSelectedTest(test)
        setIsModalOpened(true)
    }

    const onClose=()=>{
        setIsModalOpened(false)
    }

    const renderTableBody =()=>{
        return tests.map((test,index)=>{
            return(
            <TableRow className={classes.row} key={index+1} onClick={()=>handleRowClick(test)}>
                <TableCell>
                    <Typography className={classes.cell}>{index+1}</Typography>
                </TableCell>
                <TableCell>
                    <Typography className={classes.cell}>{test._id}</Typography>
                </TableCell>
                <TableCell>
                    <Typography className={classes.cell}>{test.test.title}</Typography>
                </TableCell>
                <TableCell>
                    <Typography className={classes.cell}>{test.finalGrade}</Typography>
                </TableCell>
                <TableCell>
                    <Typography className={classes.cell}>{test.updatedAt.toString().slice(0,10)}</Typography>
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
                            <Typography className={classes.cell}>Instance</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography className={classes.cell}>Test Id</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography className={classes.cell}>Test Name</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography className={classes.cell}>Grade</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography className={classes.cell}>Last Activity</Typography>
                        </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{renderTableBody()}</TableBody>
                </Table>
        </TableContainer>
        {(selectedTest && isModalOpened)&&
            <TestReview test={selectedTest} onClose={onClose}/>
        }
        </div>
    )
}

export default TestsTable