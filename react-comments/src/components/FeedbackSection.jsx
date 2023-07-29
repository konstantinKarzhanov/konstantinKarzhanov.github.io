import React, { useContext } from "react";
import Context from "./Context";
import RatingContainer from "./RatingContainer";
import FeedbackContainer from "./FeedbackContainer";
import Button from "./Button";

const FeedbackSection = () => {
  const {
    maxRating,
    minFeedbackLength,
    feedbackFormMain,
    ratingMainContainer,
    feedbackMainArea,
    feedbackArr,
    isAutoFocus,
    validateFeedback,
    createFeedback,
    resetFeedbackSection,
  } = useContext(Context);

  const processSubmit = (target) => {
    const ratingContainerArr = [...target[ratingMainContainer]];
    const checkedObj = ratingContainerArr.find(({ checked }) => checked);
    const textarea = target[feedbackMainArea];
    const id = feedbackArr.length + 1;
    const rating = checkedObj ? +checkedObj.value : 0;
    const feedback = textarea.value;

    const flag = validateFeedback(rating, feedback, minFeedbackLength);
    if (flag) {
      console.log("passed validation, ready to submit");
      createFeedback({ id, rating, feedback });
      resetFeedbackSection(ratingContainerArr, textarea);
    } else {
      console.log("didn't pass validation");
    }
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    processSubmit(event.target);
  };

  return (
    <section>
      <form id={feedbackFormMain} onSubmit={(event) => handleOnSubmit(event)}>
        <RatingContainer
          classHandle="rating-container"
          maxRatingHandle={maxRating}
          itemIDHandle={`${ratingMainContainer}_`}
          itemNameHandle={ratingMainContainer}
        />
        <FeedbackContainer
          itemIDHandle={feedbackMainArea}
          itemNameHandle={feedbackMainArea}
          autoFocusHandle={isAutoFocus}
        />
        <Button
          idHandle="btn--submit"
          typeHandle="submit"
          children="Add Feedback"
        />
      </form>
    </section>
  );
};

export default FeedbackSection;
