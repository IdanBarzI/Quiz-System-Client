import React from "react";
import classes from "./QuestionAndTags.module.css";

const QuestionAndTags = ({ question, tags, isRemoveable, removeTag }) => {
  const renderTags = () => {
    if (tags.length > 0) {
      return tags.map((tag, indx) => {
        return (
          <div key={indx} className={classes.tag}>
            <span>{tag.title}</span>
            {isRemoveable && (
              <span className={classes.remove} onClick={() => removeTag(tag)}>
                X
              </span>
            )}
          </div>
        );
      });
    }
  };

  return (
    <div>
      <div className={classes.question}>{question}</div>
      <div className={classes.tags}>{renderTags()}</div>
    </div>
  );
};

export default QuestionAndTags;
