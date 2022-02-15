import React, { useContext, useState } from "react";
import StudentTestContext from '../../../context/StudentTestContext'
import classes from './Register.module.css'

const Register = () => {
  const context = useContext(StudentTestContext)
  const [studentCredentials,setStudentCredentials] = useState({})

  const handleTextChange =(e)=>{
      setStudentCredentials(prevState => ({...prevState ,user:{...prevState.user,[e.target.name]:e.target.value}}))
  }

  const handleSubmit =(e)=>{
    e.preventDefault()
    context.setStudent(studentCredentials.user)
    localStorage.setItem('student',JSON.stringify(studentCredentials.user))
  }


  return (
    <div className={classes.register}>
      <form onSubmit={handleSubmit} className={classes.form}>
          <input type='text' placeholder="First Name" name="firstName" onChange={handleTextChange}/>
          <input type='text' placeholder="Last Name" name="lastName" onChange={handleTextChange}/>
          <input type='text' placeholder="Email" name="email" onChange={handleTextChange}/>
          <input type='text' placeholder="Phone" name="phone" onChange={handleTextChange}/>
          <input type='submit'/>
      </form>
    </div>
  );
};

export default Register;
