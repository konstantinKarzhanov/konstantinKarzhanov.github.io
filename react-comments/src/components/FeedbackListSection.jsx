import React, { Fragment, useContext } from "react";
import Context from "./Context";
import RatingContainer from "./RatingContainer";
import FeedbackContainer from "./FeedbackContainer";

const FeedbackListSection = () => {
  const { maxRating, feedbackArr } = useContext(Context);

  return (
    <section>
      {feedbackArr.map(({ id, rating, feedback }, index) => (
        <form key={index}>
          <RatingContainer
            classValue="rating-container size--xs"
            ratingValue={rating}
            maxRating={maxRating}
            itemID={`feedback-rating-${id}_`}
            itemName={`feedback-rating-${id}`}
          />
          <FeedbackContainer
            feedbackValue={feedback}
            itemID={`feedback-text-${id}`}
            itemName={`feedback-text-${id}`}
          />
        </form>
      ))}
    </section>
  );
};

export default FeedbackListSection;
