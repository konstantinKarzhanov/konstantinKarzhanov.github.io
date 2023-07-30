import React, { useState, useEffect, useContext } from "react";
import Context from "./Context";
import RatingContainer from "./RatingContainer";
import FeedbackContainer from "./FeedbackContainer";
import Button from "./Button";

const FeedbackListItem = ({ idHandle, ratingHandle, feedbackHandle }) => {
  const {
    maxRating,
    minFeedbackLength,
    feedbackFormSubmitted,
    ratingSubmittedContainer,
    feedbackSubmittedArea,
    getFeedbackData,
    validateFeedback,
    updateFeedback,
    removeFeedback,
  } = useContext(Context);

  const [isDisabled, setIsDisabled] = useState(() => true);
  const [isBtnDisabled, setIsBtnDisabled] = useState(() => false);
  const [ratingBool, setRatingBool] = useState(() => true);
  const [feedbackBool, setFeedbackBool] = useState(() => true);

  useEffect(() => {
    if (ratingBool && feedbackBool) {
      setIsBtnDisabled(false);
    } else {
      setIsBtnDisabled(true);
    }
  }, [ratingBool, feedbackBool]);

  const processClickBtnEditSave = (target, formElement, id) => {
    const { rating, feedback } = getFeedbackData(
      formElement,
      `${ratingSubmittedContainer}-${id}`,
      `${feedbackSubmittedArea}-${id}`
    );

    if (target.textContent === "Edit") {
      setIsDisabled(!isDisabled);
      target.textContent = "Save";
    } else if (target.textContent === "Save") {
      const flag = validateFeedback(rating, feedback, minFeedbackLength);

      if (flag) {
        updateFeedback({ id, rating, feedback });
        setIsDisabled(!isDisabled);
        target.textContent = "Edit";
      }
    }
  };

  const processClickBtnRemove = (id) => {
    removeFeedback(id);
  };

  const handleClick = (event) => {
    const target = event.target.closest("button");
    if (!target) return;

    const targetContainer = target.parentElement;
    const formElement = targetContainer.previousElementSibling;
    const id = +formElement.id.split("-").slice(-1)[0];

    if (target.id === "btn--edit") {
      processClickBtnEditSave(target, formElement, id);
    } else if (target.id === "btn--remove") {
      processClickBtnRemove(id);
    }
  };

  return (
    <li {...(isDisabled && { "data-disabled": "" })}>
      <form id={`${feedbackFormSubmitted}-${idHandle}`}>
        <RatingContainer
          classHandle="rating-container size--xs"
          ratingHandle={ratingHandle}
          maxRatingHandle={maxRating}
          setRatingBoolHandle={setRatingBool}
          itemIDHandle={`${ratingSubmittedContainer}-${idHandle}_`}
          itemNameHandle={`${ratingSubmittedContainer}-${idHandle}`}
          disabledHandle={isDisabled}
        />
        <FeedbackContainer
          setFeedbackBoolHandle={setFeedbackBool}
          itemIDHandle={`${feedbackSubmittedArea}-${idHandle}`}
          itemNameHandle={`${feedbackSubmittedArea}-${idHandle}`}
          feedbackHandle={feedbackHandle}
          disabledHandle={isDisabled}
        />
      </form>
      <div onClick={(event) => handleClick(event)}>
        <Button
          idHandle="btn--edit"
          disabledHandle={isBtnDisabled}
          children="Edit"
        />
        <Button idHandle="btn--remove" children="Remove" />
      </div>
    </li>
  );
};

export default FeedbackListItem;
