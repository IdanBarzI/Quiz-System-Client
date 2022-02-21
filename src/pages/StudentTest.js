import React, { useEffect, useContext } from "react";
import { StudentTestContextProvider } from "../context/StudentTestContext";
import StudentTestManager from "../components/StudentTestPage/StudentTestManager";

const StudentTest = () => {
  return (
    <>
      <StudentTestContextProvider>
        <StudentTestManager />
      </StudentTestContextProvider>
    </>
  );
};

export default StudentTest;
