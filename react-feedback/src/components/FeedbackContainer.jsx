import React, { useContext } from "react";
import Context from "./Context";
import FeedbackItem from "./FeedbackItem";

const FeedbackContainer = ({
  setFeedbackBoolHandle,
  itemIDHandle,
  itemNameHandle,
  feedbackHandle,
  autoFocusHandle,
  disabledHandle,
}) => {
  const { minFeedbackLength } = useContext(Context);

  const resizeArea = (target) => {
    target.style.height = "auto";

    if (target.clientHeight !== target.scrollHeight) {
      target.style.height = target.scrollHeight + "px";
    }
  };

  const handleOnChange = (event) => {
    const target = event.currentTarget;

    setFeedbackBoolHandle(target.value.trim().length > minFeedbackLength);
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
