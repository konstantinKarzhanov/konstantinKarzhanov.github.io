import React, { useContext } from "react";
import Context from "./Context";
import RatingContainer from "./RatingContainer";

const FeedbackListSection = () => {
  const { maxRating, feedbackArr } = useContext(Context);

  return (
    <>
      {feedbackArr.map(({ id, rating, feedback }, index) => (
        <RatingContainer
          key={index}
          classValue="rating-container size--xs"
          ratingValue={rating}
          maxRating={maxRating}
          itemID={`submitted-rating-${id}_`}
          itemName={`submitted-rating-${id}`}
        />
      ))}
    </>
  );
};

export default FeedbackListSection;
