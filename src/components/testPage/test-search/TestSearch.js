import classes from './TestSearch.module.css'
import React from 'react'

const TestSearch = () => {
  return (
    <div className={classes.container}>
    <>Search For Tests : </>
    <input className={classes.input} type='text'/>
</div>
  )
}

export default TestSearch