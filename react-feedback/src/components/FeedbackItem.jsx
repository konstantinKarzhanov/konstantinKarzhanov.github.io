import React from "react";
import "./css/feedback.css";

const FeedbackItem = ({
  handleOnChange,
  itemIDHandle,
  itemNameHandle,
  feedbackHandle,
  autoFocusHandle,
  disabledHandle,
}) => {
  return (
    <textarea
      onChange={handleOnChange}
      id={itemIDHandle}
      className="feedback b-radius"
      name={itemNameHandle}
      defaultValue={feedbackHandle}
      placeholder="Add your feedback here"
      autoFocus={autoFocusHandle}
      disabled={disabledHandle}
    ></textarea>
  );
};

export default FeedbackItem;
