import React, { useContext } from "react";
import Context from "./Context";
import RatingContainer from "./RatingContainer";
import FeedbackContainer from "./FeedbackContainer";
import Button from "./Button";

const FeedbackSection = () => {
  const {
    maxRating,
    feedbackFormMain,
    ratingMainContainer,
    feedbackMainArea,
    feedbackArr,
    setFeedbackObj,
    isAutoFocus,
    setIsSubmitted,
  } = useContext(Context);

  // put these functions in the Context Component
  const validateFeedback = (rating, feedback) => {
    const minTextLength = 10;
    feedback = feedback.trim();
    // add editional messages for better UX
    if (rating && feedback.length > minTextLength) return true;
  };

  const createFeedback = ({ id, rating, feedback }) => {
    setFeedbackObj((prev) => ({ ...prev, id, rating, feedback }));
  };

  const resetFeedbackSection = (ratingObjArr, textObj) => {
    ratingObjArr.find(({ checked }) => checked).checked = false;
    textObj.value = "";
    setIsSubmitted(true);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const target = event.target;
    const ratingObjArr = [...target[ratingMainContainer]];
    const checkedObj = ratingObjArr.find(({ checked }) => checked);
    const textObj = target[feedbackMainArea];
    const id = feedbackArr.length + 1;
    const rating = checkedObj ? +checkedObj.value : 0;
    const feedback = textObj.value;

    const flag = validateFeedback(rating, feedback);
    if (flag) {
      console.log("passed validation, ready to submit");
      createFeedback({ id, rating, feedback });
      resetFeedbackSection(ratingObjArr, textObj);
    } else {
      console.log("didn't pass validation");
    }
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
