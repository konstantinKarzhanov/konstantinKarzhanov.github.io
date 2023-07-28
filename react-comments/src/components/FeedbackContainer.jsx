import React, { useContext, useState, useEffect } from "react";
// import Context from "./Context";
import FeedbackItem from "./FeedbackItem";

// const debounceDecorator = (func, ms) => {
//   let id;

//   return function (...args) {
//     if (id) {
//       clearTimeout(id);
//     }

//     id = setTimeout(func.bind(this, ...args), ms);
//   };
// };

const FeedbackContainer = ({ feedbackValue, itemID, itemName }) => {
  // const { text, setText } = useContext(Context);

  // let saveText = (text) => setText(text);
  // saveText = debounceDecorator(saveText, 1000);

  // useEffect(() => {
  //   console.log(text);
  // }, [text]);

  const resizeArea = (target) => {
    target.style.height = "auto";

    if (target.clientHeight !== target.scrollHeight) {
      target.style.height = target.scrollHeight + "px";
    }
  };

  const handleOnChange = (event) => {
    const target = event.currentTarget;

    // saveText(target.value);
    resizeArea(target);
  };

  return (
    <div>
      <FeedbackItem
        onChange={handleOnChange}
        id={itemID}
        name={itemName}
        value={feedbackValue}
      />
    </div>
  );
};

FeedbackContainer.defaultProps = {
  feedbackValue: "",
};

export default FeedbackContainer;
