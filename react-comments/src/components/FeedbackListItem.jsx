import React, { useState, useContext } from "react";
import Context from "./Context";
import RatingContainer from "./RatingContainer";
import FeedbackContainer from "./FeedbackContainer";
import Button from "./Button";

const FeedbackListItem = ({ idHandle, ratingHandle, feedbackHandle }) => {
  const {
    maxRating,
    feedbackFormSubmitted,
    ratingSubmittedContainer,
    feedbackSubmittedArea,
    updateFeedback,
    removeFeedback,
  } = useContext(Context);
  const [isDisabled, setIsDisabled] = useState(() => true);

  const handleClick = (event) => {
    const target = event.target.closest("button");
    if (!target) return;

    if (target.id === "btn--edit") {
      const targetContainer = target.parentElement;
      const formElement = targetContainer.previousElementSibling;

      const id = +formElement.id[formElement.id.length - 1];
      const rating = +[
        ...formElement[`${ratingSubmittedContainer}-${id}`],
      ].find(({ checked }) => checked).value;
      const feedback = formElement[`${feedbackSubmittedArea}-${id}`].value;

      target.textContent = isDisabled ? "Save" : "Edit";
      setIsDisabled(!isDisabled);
      !isDisabled && updateFeedback({ id, rating, feedback });
    } else if (target.id === "btn--remove") {
      removeFeedback();
    }
  };

  return (
    <li {...(isDisabled && { "data-disabled": "" })}>
      <form id={`${feedbackFormSubmitted}-${idHandle}`}>
        <RatingContainer
          classHandle="rating-container size--xs"
          ratingHandle={ratingHandle}
          maxRatingHandle={maxRating}
          itemIDHandle={`${ratingSubmittedContainer}-${idHandle}_`}
          itemNameHandle={`${ratingSubmittedContainer}-${idHandle}`}
          disabledHandle={isDisabled}
        />
        <FeedbackContainer
          feedbackHandle={feedbackHandle}
          itemIDHandle={`${feedbackSubmittedArea}-${idHandle}`}
          itemNameHandle={`${feedbackSubmittedArea}-${idHandle}`}
          disabledHandle={isDisabled}
        />
      </form>
      <div onClick={(event) => handleClick(event)}>
        <Button idHandle="btn--edit" children="Edit" />
        <Button idHandle="btn--remove" children="Remove" />
      </div>
    </li>
  );
};

export default FeedbackListItem;
