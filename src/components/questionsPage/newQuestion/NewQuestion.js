import React, { useContext, useEffect, useMemo, useState } from "react";
import AppContext from "../../../context/AppContext";
import { Modal, Typography, TextEditor, Button } from "../../Ui";
import AnswersManager from "./AnswersManager";
import sendAuthTokenHeader from "../../../api/tokenConfig";
import AnswersContext from "../../../context/AnswersContext";
import serverAccess from "../../../api/serverAccess";
import classes from "./NewQuestion.module.css";

const NewQuestion = ({ setClose, question, isEdit }) => {
  const appCtx = useContext(AppContext);

  const [questionType, setQuestionType] = useState(
    question ? question.isMultipleAnswers : false
  );
  const [questionText, setQuestionText] = useState(
    question ? question.title : ""
  );
  const [tags, setTags] = useState(question ? question.tags : []);
  const [tagText, setTagText] = useState("");
  const [answers, setAnswers] = useState(question ? question.answers : []);

  const answersValue = useMemo(
    () => ({ answers, setAnswers }),
    [answers, setAnswers]
  );

  useEffect(() => {
    if (tags.length > 0) {
      let tagString;
      tags.map((tag) => {
        tagString += tag.title + " , ";
      });
      setTagText(tagString);
    }
  }, []);
  const handleSelectionChanged = () => {
    setQuestionType(!questionType);
  };

  const handleSubmitChanges = async (e) => {
    e.preventDefault();
    const tagTitles = tagText.split(",");
    const newTags = [];
    for (let i = 0; i < tagTitles.length; i++) {
      newTags.push({
        title: tagTitles[i].title,
      });
    }
    setTags(newTags);

    if (isEdit) {
      try {
        const questionToUpdate = {};
        const res = await serverAccess.patch(
          "/qusetions",
          sendAuthTokenHeader(appCtx.token)
        );
      } catch (err) {}
    } else {
      const newQuestion = {};
      try {
        const res = await serverAccess.post(
          "/qusetions",
          newQuestion,
          sendAuthTokenHeader(appCtx.token)
        );
        alert(JSON.stringify(res));
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <AnswersContext.Provider value={answersValue}>
      <Modal onCancle={setClose} title={appCtx.fieldOfStudy}>
        <form onSubmit={(e) => handleSubmitChanges(e)}>
          <div className={classes.question}>
            <div className={classes.questionText}>
              <TextEditor
                text={questionText}
                content={questionText}
                setContent={setQuestionText}
              />
            </div>
            <div className={classes.questionType}>
              <select
                onChange={handleSelectionChanged}
                defaultValue={questionType ? 1 : 2}
              >
                <option value={1}>Multiple answer</option>
                <option value={2}>Single answer</option>
              </select>
            </div>
            <div className={classes.answers}>
              <AnswersManager isMultiple={questionType} />
            </div>
            <div className={classes.tags}>
              <Typography>Enter tags here:</Typography>
              <br />
              <input type="text" onChange={(e) => setTags(e.target.value)} />
            </div>
            <div className={classes.actions}>
              <Button type="submit">Submit Changes</Button>
            </div>
          </div>
        </form>
      </Modal>
    </AnswersContext.Provider>
  );
};

export default NewQuestion;
