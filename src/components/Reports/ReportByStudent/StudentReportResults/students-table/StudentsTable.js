import classes from './StudentsTable.module.css'
import React, { useEffect, useState } from 'react'
import { Typography, Line, Button } from "../../../../Ui";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
  } from "@material-ui/core";

const StudentsTable = ({onStudentClick,studentTests}) => {
    const [students,setStudents] = useState([])

    useEffect(()=>{
        const sameList = []
        studentTests.forEach((test,index)=>{
            const fullName = `${test.studenFirstName} ${test.studenLastName}`.toLowerCase()
            if(!sameList.some(stud=>stud.fullName===fullName)){
                sameList.push({fullName:fullName,email:test.studentEmail,id:index,lastActivity:test.updatedAt})
            }
        })
        setStudents(sameList)
    },[studentTests])

    const renderTableBody =()=>{
        return students.map((stud)=>{
            return(
                <TableRow className={classes.row} key={stud.id} onClick={()=>onStudentClick(stud)}>
                    <TableCell>
                    <Typography className={classes.cell}>{stud.id}</Typography>
                    </TableCell>
                    <TableCell>
                    <Typography className={classes.cell}>{stud.fullName}</Typography>
                    </TableCell>
                    <TableCell>
                    <Typography className={classes.cell}>{stud.email}</Typography>
                    </TableCell>
                    <TableCell>
                    <Typography className={classes.cell}>{stud.lastActivity.toString().slice(0,10)}</Typography>
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
                    <Typography className={classes.cell}>Respondent</Typography>
                </TableCell>
                <TableCell>
                    <Typography className={classes.cell}>Email</Typography>
                </TableCell>
                <TableCell>
                    <Typography className={classes.cell}>Last Activity</Typography>
                </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>{renderTableBody()}</TableBody>
            </Table>
        </TableContainer>
        </div>
    )
}

export default StudentsTable