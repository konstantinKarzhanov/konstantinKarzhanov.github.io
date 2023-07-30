import React, { useState, useEffect, useContext } from "react";
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
    isSubmitted,
    setIsSubmitted,
    getFeedbackData,
    validateFeedback,
    createFeedback,
    resetFeedbackSection,
  } = useContext(Context);

  const [isBtnDisabled, setIsBtnDisabled] = useState(() => true);
  const [ratingBool, setRatingBool] = useState(() => false);
  const [feedbackBool, setFeedbackBool] = useState(() => false);

  useEffect(() => {
    if (ratingBool && feedbackBool) {
      setIsBtnDisabled(false);
    } else {
      setIsBtnDisabled(true);
    }
  }, [ratingBool, feedbackBool]);

  useEffect(() => {
    setRatingBool(false);
    setFeedbackBool(false);
  }, [isSubmitted]);

  const processSubmit = (target) => {
    const { rating, feedback } = getFeedbackData(
      target,
      ratingMainContainer,
      feedbackMainArea
    );
    const id = feedbackArr.length + 1;

    const flag = validateFeedback(rating, feedback, minFeedbackLength);
    if (flag) {
      console.log("passed validation, ready to submit");
      createFeedback({ id, rating, feedback });
      resetFeedbackSection(target, ratingMainContainer, feedbackMainArea);
      setIsSubmitted((prev) => !prev);
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
          setRatingBoolHandle={setRatingBool}
          itemIDHandle={`${ratingMainContainer}_`}
          itemNameHandle={ratingMainContainer}
        />
        <FeedbackContainer
          setFeedbackBoolHandle={setFeedbackBool}
          itemIDHandle={feedbackMainArea}
          itemNameHandle={feedbackMainArea}
          autoFocusHandle={isAutoFocus}
        />
        <Button
          idHandle="btn--submit"
          typeHandle="submit"
          disabledHandle={isBtnDisabled}
          children="Add Feedback"
        />
      </form>
    </section>
  );
};

export default FeedbackSection;
