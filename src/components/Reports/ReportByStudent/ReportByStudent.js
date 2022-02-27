import classes from './ReportByStudent.module.css'
import React, { useContext, useEffect, useState } from 'react'
import serverAccess from '../../../api/serverAccess'
import AppContext from '../../../context/AppContext'

const ReportByStudent = () => {

  const appCtx = useContext(AppContext)
  const [allTests,setAllTests] = useState([])

  useEffect(()=>{
    serverAccess.get('/student-test',{
      headers:{
        Authorization: `Bearer ${appCtx.token}`
      }
    }).then((res)=>{
      setAllTests(res.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  },[])

  return (
    <div>

    </div>
  )
}

export default ReportByStudent