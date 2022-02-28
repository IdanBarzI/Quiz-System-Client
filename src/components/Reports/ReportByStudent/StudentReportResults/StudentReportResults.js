import classes from './StudentReportResults.module.css'
import React, { useState } from 'react'
import StudentsTable from './students-table/StudentsTable'
import TestsTable from './tests-table/TestsTable'

const StudentReportResults = ({studentTests}) => {

  const [isStudentSelected,setIsStudentSelected] = useState(false)
  const [tests,setTests] = useState([])

  const handleOnStudentClick =(student)=>{
    const relevantTests  = studentTests.filter((test)=>{
      const fullName = `${test.studenFirstName} ${test.studenLastName}`.toLowerCase()
      if(student.fullName.toLowerCase() === fullName && test.studentEmail===student.email){
        return true
      }else return false
    })
    if(relevantTests.length > 0){
      setIsStudentSelected(true)
      setTests(relevantTests)
    }
  }

  return (
    <div className={classes.resultContainer}>
      <StudentsTable studentTests={studentTests} onStudentClick={handleOnStudentClick}/>
      {isStudentSelected &&
        <TestsTable tests={tests}/>
      }
    </div>
  )
}

export default StudentReportResults