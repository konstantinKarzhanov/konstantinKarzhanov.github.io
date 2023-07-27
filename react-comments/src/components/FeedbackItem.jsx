import React from "react";

const FeedbackItem = ({ onChange, id, name }) => {
  return (
    <textarea
      onChange={(event) => onChange(event)}
      id={id}
      name={name}
      placeholder="Add your feedback here"
    ></textarea>
  );
};

export default FeedbackItem;
