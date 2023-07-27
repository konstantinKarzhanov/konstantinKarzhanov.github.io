import React, { useContext } from "react";
import Context from "./Context";
import FeedbackItem from "./FeedbackItem";
import "./css/feedback.css";

const debounceDecorator = (func, ms) => {
  let id;

  return function (...args) {
    if (id) {
      clearTimeout(id);
    }

    id = setTimeout(func.bind(this, ...args), ms);
  };
};

const FeedbackContainer = ({ itemID, itemName }) => {
  const { setText } = useContext(Context);

  let saveText = (text) => setText(text);
  saveText = debounceDecorator(saveText, 1000);

  const resizeArea = (target) => {
    target.style.height = "auto";

    if (target.clientHeight !== target.scrollHeight) {
      target.style.height = target.scrollHeight + "px";
    }
  };

  const handleOnChange = (event) => {
    const target = event.currentTarget;

    saveText(target.value);
    resizeArea(target);
  };

  return (
    <div>
      <FeedbackItem onChange={handleOnChange} id={itemID} name={itemName} />
    </div>
  );
};

export default FeedbackContainer;
