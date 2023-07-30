import React, { useContext, useState, useEffect } from "react";
import Context from "./Context";
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

const FeedbackContainer = ({
  setFeedbackBoolHandle,
  itemIDHandle,
  itemNameHandle,
  feedbackHandle,
  autoFocusHandle,
  disabledHandle,
}) => {
  const { minFeedbackLength } = useContext(Context);
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

    setFeedbackBoolHandle(target.value.length > minFeedbackLength);
    // saveText(target.value);
    resizeArea(target);
  };

  return (
    <div>
      <FeedbackItem
        handleOnChange={handleOnChange}
        itemIDHandle={itemIDHandle}
        itemNameHandle={itemNameHandle}
        feedbackHandle={feedbackHandle}
        autoFocusHandle={autoFocusHandle}
        disabledHandle={disabledHandle}
      />
    </div>
  );
};

FeedbackContainer.defaultProps = {
  feedbackHandle: "",
  disabledHandle: false,
  autoFocusHandle: false,
};

export default FeedbackContainer;
