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

  // here we can create one more function "takeFormData(form, ratingContainerName, feedbackContainerNAme)"
  const processClickBtnEditSave = (target, formElement, id) => {
    const ratingContainerArr = [
      ...formElement[`${ratingSubmittedContainer}-${id}`],
    ];
    const checkedObj = ratingContainerArr.find(({ checked }) => checked);
    const textarea = formElement[`${feedbackSubmittedArea}-${id}`];
    const rating = checkedObj ? +checkedObj.value : 0;
    const feedback = textarea.value;

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

    // this will not work after ID becomes 10..
    const id = +formElement.id[formElement.id.length - 1];

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
