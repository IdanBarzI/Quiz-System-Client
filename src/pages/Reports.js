import React, { useState } from "react";
import ReportByTest from "../components/Reports/ReportByTest/ReportByTest";
import ReportByStudent from '../components/Reports/ReportByStudent/ReportByStudent'

const Reports = () => {
  const [openReportByTest,setOpenReportByTest] = useState(false)
  const [openReportByStudent,setOpenReportByStudent] = useState(false)

  const handleStudentClick =()=>{
    setOpenReportByStudent(true)
    setOpenReportByTest(false)
  }
  const handleTestClick=()=>{
    setOpenReportByStudent(false)
    setOpenReportByTest(true)
  }
  
  return (
    <div>
      {(!openReportByStudent&&!openReportByTest) &&
          <div>
            <button onClick={handleStudentClick}>Reports By Student Name</button>
            <button onClick={handleTestClick}>Report By Test</button>
          </div>
      }
      {openReportByStudent &&
          <ReportByStudent/>
      }
      {openReportByTest &&
        <ReportByTest/>
      }
    </div>
  );
};

export default Reports;
