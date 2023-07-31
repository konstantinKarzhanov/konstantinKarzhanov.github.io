import React, { useContext } from "react";
import Context from "./Context";

const FeedbackStatisticSection = () => {
  const { feedbackArr } = useContext(Context);
  const averageRating = feedbackArr.reduce((acc, { rating }, index) => {
    acc += rating;

    if (index === feedbackArr.length - 1)
      return +(acc / feedbackArr.length).toFixed(1);
    return acc;
  }, 0);

  return (
    <section>
      <div className="flex flex--jc-sb">
        <p>
          Feedbacks: <span>{feedbackArr.length}</span>
        </p>
        <p>
          Average Rating: <span>{averageRating}</span>
        </p>
      </div>
    </section>
  );
};

export default FeedbackStatisticSection;
