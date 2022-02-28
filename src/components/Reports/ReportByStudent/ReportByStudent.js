import classes from './ReportByStudent.module.css'
import React, { useContext, useEffect, useState } from 'react'
import serverAccess from '../../../api/serverAccess'
import AppContext from '../../../context/AppContext'
import { Input } from '../../Ui'
import StudentReportResults from './StudentReportResults/StudentReportResults'

const ReportByStudent = () => {

  const appCtx = useContext(AppContext)
  const [allTests,setAllTests] = useState([])
  const [filteredStudents,setFilteredStudents] = useState([])
  const [searchTerm,setSearchTerm]=useState("")

  useEffect(()=>{
    serverAccess.get('/student-test',{
      headers:{
        Authorization: `Bearer ${appCtx.token}`
      }
    }).then((res)=>{
      setAllTests(res.data)
      console.log(res.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  },[])

  useEffect(()=>{
    const filteredTests = allTests.filter((test)=>{
      const fullName = `${test.studenFirstName} ${test.studenLastName}`.toLowerCase();
      return fullName.includes(searchTerm.toLowerCase())
    })

    setFilteredStudents(filteredTests)
    console.log(filteredTests)
  },[searchTerm])

  const handleInputChange =(e)=>{
    setSearchTerm(e.target.value)
  }

  return (
    <div>
      <Input onChange={handleInputChange} name="Respondent's Name :"/>
      {filteredStudents.length > 0 &&
        <StudentReportResults studentTests={filteredStudents}/>
      }
    </div>
  )
}

export default ReportByStudent