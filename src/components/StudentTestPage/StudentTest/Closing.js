import React, { useContext, useEffect, useState } from "react";
import StudentTestContext from "../../../context/StudentTestContext";

const Closing = () => {
  //need axios call to examCheckService
  const {test,studentAnswers,setStudentAnswers,student} = useContext(StudentTestContext)
  const [studentTest,setStudentTest] = useState({})


  useEffect(()=>{
    console.log(studentAnswers)
  },[])

  const combineNewStudentTest=()=>{
      // setStudentTest({
      //   studentFirstName:student.firstName,
      //   studentLastName: student.lastName,
      //   studentPhone:student.phone,
      //   studentEmail:student.email,
      //   test:test,
      //   studentAnswers:studentAnswers
      // })
  }
  
  return <div>Closing</div>;
};

export default Closing;
