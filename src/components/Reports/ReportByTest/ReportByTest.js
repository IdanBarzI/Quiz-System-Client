import classes from './ReportByTest.module.css'
import React, { useContext, useEffect, useState } from 'react'
import serverAccess from '../../../api/serverAccess'
import sendAuthTokenHeader from '../../../api/tokenConfig'
import AppContext from '../../../context/AppContext'
import TestReportResults from './TestReportResults/TestReportResults'

const ReportByTest = () => {
    const appCtx = useContext(AppContext)
    const [tests,setTests] = useState([])
    const [selectedTest,setSelectedTest] = useState()
    const [fromDate,setFromDate]=useState()
    const [toDate,setToDate]=useState()

    const [resultStudentTests,setResultStudentTests] = useState([])

    useEffect(()=>{
        //api call to get all tests of the current organization and field of study
        serverAccess.get('/tests',sendAuthTokenHeader(appCtx.token))
            .then((res)=>setTests(res.data))
            .catch((err)=>console.log(err))
    },[])

    const onFormSubmit=(e)=>{
        e.preventDefault()
        
        const fullFromDate = new Date(fromDate)
        const fullToDate = new Date(toDate)
        serverAccess.post("/report/test",{
            fromDate: fullFromDate,
            toDate:fullToDate,
            testId: selectedTest._id
        },{
            headers:{
                    Authorization: `Bearer ${appCtx.token}`
            }
        })
            .then((res)=>{
                setResultStudentTests(res.data)
                console.log(res.data)
                console.log(selectedTest)
            })
            .catch((err)=>{
                console.log(err)
            })
    }

    const renderSelectItems=()=>{
        return tests.map((test)=>{
            return(
                <option key={test._id} value={JSON.stringify(test)}>
                    {test.title}
                </option>
            )
        })
    }

   if(!resultStudentTests || resultStudentTests.length===0){
        return (
            <div>
                <form onSubmit={onFormSubmit}>
                    <select onChange={(e)=>setSelectedTest(JSON.parse(e.target.value))}>
                        <option disabled selected value> -- select an option -- </option>
                        {renderSelectItems()}
                    </select>
                    <div>
                        <input type='date' onChange={(e)=>setFromDate(e.target.value)}/>
                        <input type='date' onChange={(e)=>setToDate(e.target.value)}/>
                    </div>
                    <input type='submit' value="Get Reports"/>
                </form>
            </div>
        )
   }
   else{
       return(
           <TestReportResults 
                studentTests={resultStudentTests} 
                test={selectedTest}
                fromDate={fromDate ? fromDate : 0}
                toDate={toDate ? toDate : new Date(Date.now())}
            />
       )
   }
}

export default ReportByTest