import React, { useState, useContext } from "react";
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
    validateFeedback,
    updateFeedback,
    removeFeedback,
  } = useContext(Context);
  const [isDisabled, setIsDisabled] = useState(() => true);

  const handleClick = (event) => {
    const target = event.target.closest("button");
    if (!target) return;

    const targetContainer = target.parentElement;
    const formElement = targetContainer.previousElementSibling;
    const id = +formElement.id[formElement.id.length - 1];

    if (target.id === "btn--edit") {
      // check for undefined

      const rating = +[
        ...formElement[`${ratingSubmittedContainer}-${id}`],
      ].find(({ checked }) => checked).value;
      const feedback = formElement[`${feedbackSubmittedArea}-${id}`].value;

      console.log(feedback);

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
    } else if (target.id === "btn--remove") {
      removeFeedback(id);
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
