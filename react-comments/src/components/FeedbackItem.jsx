import React from "react";
import "./css/feedback.css";

const FeedbackItem = ({ onChange, id, name, value, autoFocus }) => {
  return (
    <textarea
      onChange={onChange}
      id={id}
      className="feedback"
      name={name}
      defaultValue={value}
      placeholder="Add your feedback here"
      autoFocus={autoFocus}
    ></textarea>
  );
};

export default FeedbackItem;
