import classes from './TestReportResults.module.css'
import React from 'react'
import StudentsGrid from './students-grid/StudentsGrid';
import QuestionStatistics from './quesiton-statistics/QuestionStatistics';

const TestReportResults = ({studentTests,test,fromDate,toDate}) => {


  const getNumOfPassedTests =()=>{
      let counter = 0;
      for(let i = 0 ; i<studentTests.length;i++){
        if(studentTests[i].finalGrade > test.passGrade){
          counter+=1
        }
      }
      return counter
  }
  const getPassingPrecentage =()=>{
    const passed = getNumOfPassedTests();
    const total = studentTests.length
    return Math.ceil((passed*100)/total);
  }
  const getAverageGrade=()=>{
    var counter = 0;
    var sum = 0;
    studentTests.forEach((studTest)=>{
      sum+=studTest.finalGrade;
      counter += 1;
    })
    return Math.ceil(sum/counter)
  }




  return (
    <div>
      <h2>Summury</h2>
      <div className={classes.detailsContainer}>
        <div>Test Name: {test.title}</div>
        <div>Test ID: {test._id}</div>
        <div>Number Of Questions: {test.questions.length}</div>
        <div>Passing grade: {test.passGrade}</div>
        <div>Date Range: {`From :${fromDate}  To :${toDate}`}</div>
        <div>Number of Submissions: {studentTests.length}</div>
        <div>Number of respondents passed: {getNumOfPassedTests()}</div>
        <div>Passing precentage: {getPassingPrecentage()}%</div>
        <div>Average Grade: {getAverageGrade()}</div>
      </div>
     <div className={classes.tablesContainer}>
        <StudentsGrid studentTests={studentTests}/>
        <QuestionStatistics studentTests={studentTests} test={test}/>
     </div>
    </div>
  )
}

export default TestReportResults