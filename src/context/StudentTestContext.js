import React from "react";
import useStickyState from "../hooks/use-sticky-state";

const StudentTestContext = React.createContext({
  test: null,
  setTest: () => {},
  student: null,
  setStudent: () => {},
  studentAnswers: [],
  setStudentAnswers: () => {},
  questionIndex: -1,
  setQuestionIndex: () => {},
  isFinished: false,
  setIsFinished: () => {},
});

export const StudentTestContextProvider = (props) => {
  const [test, setTest] = useStickyState(null, "test");
  const [student, setStudent] = useStickyState(null, "student");
  const [studentAnswers, setStudentAnswers] = useStickyState(
    [],
    "studentAnswers"
  );
  const [questionIndex, setQuestionIndex] = useStickyState(-1, "questionIndex");
  const [isFinished, setIsFinished] = useStickyState(false, "isFinished");
  return (
    <StudentTestContext.Provider
      value={{
        test,
        setTest: setTest,
        student,
        setStudent: setStudent,
        studentAnswers,
        setStudentAnswers: setStudentAnswers,
        questionIndex,
        setQuestionIndex: setQuestionIndex,
        isFinished,
        setIsFinished: setIsFinished,
      }}
    >
      {props.children}
    </StudentTestContext.Provider>
  );
};

export default StudentTestContext;
