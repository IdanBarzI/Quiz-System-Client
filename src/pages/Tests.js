import React, { useState } from "react";
import classes from './Tests.module.css'
import TestGrid from '../components/testPage/tests-grid/TestGrid'
import NewTest from '../components/testPage/new-test/NewTest'

const Tests = () => {
  const [newTestWindowOpened,setNewTestWindowOpened] = useState(false)
  const handleSetNewTestOpen=()=>{
    setNewTestWindowOpened(!newTestWindowOpened)
  }


  return (
    <div className={classes.tests}>
      <TestGrid/>
      <div className={classes.buttons}>
          <a className={classes.backButton} href="/admin/main-menu">back</a>
          <button onClick={handleSetNewTestOpen}>Create New Test</button>
      </div>
      {newTestWindowOpened &&
        <NewTest/>
      }
    </div>
  )
};

export default Tests;
