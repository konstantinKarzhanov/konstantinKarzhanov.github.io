import React, { useState, useContext } from "react";
import Context from "./Context";
import RatingContainer from "./RatingContainer";
import FeedbackContainer from "./FeedbackContainer";

const FeedbackListItem = ({ idHandle, ratingHandle, feedbackHandle }) => {
  const { maxRating } = useContext(Context);
  const [isDisabled, setIsDisabled] = useState(() => true);

  return (
    <li {...(isDisabled && { "data-disabled": "" })}>
      <form>
        <RatingContainer
          classHandle="rating-container size--xs"
          ratingHandle={ratingHandle}
          maxRatingHandle={maxRating}
          itemIDHandle={`feedback-rating-${idHandle}_`}
          itemNameHandle={`feedback-rating-${idHandle}`}
          disabledHandle={isDisabled}
        />
        <FeedbackContainer
          feedbackHandle={feedbackHandle}
          itemIDHandle={`feedback-text-${idHandle}`}
          itemNameHandle={`feedback-text-${idHandle}`}
          disabledHandle={isDisabled}
        />
      </form>
      {/* <div></div> */}
    </li>
  );
};

export default FeedbackListItem;
