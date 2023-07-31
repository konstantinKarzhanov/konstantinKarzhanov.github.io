import React, { useContext } from "react";
import Context from "./Context";
import FeedbackListItem from "./FeedbackListItem";

const FeedbackListSection = () => {
  const { feedbackArr } = useContext(Context);
  return (
    <section>
      <ul className="flow-spacing--m">
        {feedbackArr.map(({ id, rating, feedback }, index) => (
          <FeedbackListItem
            key={`${id}${index}`}
            idHandle={id}
            ratingHandle={rating}
            feedbackHandle={feedback}
          />
        ))}
      </ul>
    </section>
  );
};

export default FeedbackListSection;
