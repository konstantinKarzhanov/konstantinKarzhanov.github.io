// Import React library, hooks and Context component to access shared context data and functions
import React, { useContext } from "react";
import Context from "./Context";

// Define the functional component "FeedbackStatisticSection" that displays feedback statistics
const FeedbackStatisticSection = () => {
  // Extract the "feedbackArr" from the Context using useContext
  const { feedbackArr } = useContext(Context);

  // Calculate the average rating from the "feedbackArr"
  const averageRating = feedbackArr.reduce((acc, { rating }, index) => {
    acc += rating;

    if (index === feedbackArr.length - 1)
      return +(acc / feedbackArr.length).toFixed(1);
    return acc;
  }, 0);

  // Render the "FeedbackStatisticSection" component with the feedback statistics
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

// Export the FeedbackStatisticSection component
export default FeedbackStatisticSection;
