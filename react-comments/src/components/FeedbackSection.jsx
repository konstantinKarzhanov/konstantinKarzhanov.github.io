import React, { useContext } from "react";
import Context from "./Context";
import RatingContainer from "./RatingContainer";
import FeedbackContainer from "./FeedbackContainer";
import Button from "./Button";

const FeedbackSection = () => {
  const {
    maxRating,
    ratingMainContainer,
    feedbackMainArea,
    feedbackArr,
    setFeedbackObj,
    setIsSubmitted,
  } = useContext(Context);

  const validateFeedback = (rating, text) => {
    const minTextLength = 10;
    text = text.trim();
    // add editional messages for better UX
    if (rating && text.length > minTextLength) return true;
  };

  const createFeedback = (id, rating, feedback) => {
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
    const rating = checkedObj ? +checkedObj.value : 0;
    const text = textObj.value;

    const flag = validateFeedback(rating, text);
    if (flag) {
      console.log("passed validation, ready to submit");
      createFeedback(feedbackArr.length + 1, rating, text);
      resetFeedbackSection(ratingObjArr, textObj);
    } else {
      console.log("didn't pass validation");
    }
  };

  return (
    <section>
      <form onSubmit={(event) => handleOnSubmit(event)}>
        <RatingContainer
          classValue="rating-container"
          maxRating={maxRating}
          itemID={`${ratingMainContainer}-`}
          itemName={ratingMainContainer}
        />
        <FeedbackContainer
          itemID={feedbackMainArea}
          itemName={feedbackMainArea}
        />
        <Button type="submit" children="Add Feedback" />
      </form>
    </section>
  );
};

export default FeedbackSection;
