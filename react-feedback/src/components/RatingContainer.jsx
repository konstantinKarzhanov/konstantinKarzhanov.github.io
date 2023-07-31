// Import React library and its hooks for managing state and side effects
import React, { useContext, useState, useEffect } from "react";
import Context from "./Context";
import RatingItem from "./RatingItem";

// Import the CSS styles for the rating container component
import "./css/rating.css";

// Define the functional component "RatingContainer" for displaying the rating container
const RatingContainer = ({
  classHandle,
  ratingHandle,
  maxRatingHandle,
  setRatingBoolHandle,
  itemIDHandle,
  itemNameHandle,
  disabledHandle,
}) => {
  // Use the "useContext" hook to access the shared context data
  const { isSubmitted } = useContext(Context);
  const [rating, setRating] = useState(() => ratingHandle);

  // Update the rating state when the "isSubmitted" state changes
  useEffect(() => {
    if (isSubmitted) {
      setRating(ratingHandle);
    }
  }, [isSubmitted]);

  // Update the "ratingBool" state in the parent component based on the current rating
  useEffect(() => {
    setRatingBoolHandle(!!rating);
  }, [rating]);

  // Handle click event when a rating item is clicked
  const handleClick = (event) => {
    const target = event.target.closest("input");
    if (!target) return;

    const targetValue = +target.value;

    setRating(targetValue);
  };

  // Handle double-click event to clear the rating
  const handleDoubleClick = (event) => {
    const target = event.currentTarget;
    const checkedObj = [...target.children].find(
      ({ children: [{ checked }] }) => checked
    );

    if (!checkedObj) return;
    checkedObj.children[0].checked = false;

    setRating(0);
  };

  // Render the "RatingContainer" component with the rating items
  return (
    <>
      <div
        onClick={(event) => handleClick(event)}
        onDoubleClick={(event) => !disabledHandle && handleDoubleClick(event)}
        className={classHandle}
      >
        {Array.from({ length: maxRatingHandle }, (_, index) => (
          <RatingItem
            key={index}
            dataAttrHandle={index + 1 <= rating}
            itemIDHandle={`${itemIDHandle}${index + 1}`}
            itemNameHandle={itemNameHandle}
            valueHandle={index + 1}
            checkedHandle={index + 1 === rating}
            disabledHandle={disabledHandle}
          />
        ))}
      </div>
    </>
  );
};

// Set default props for "RatingContainer" component
RatingContainer.defaultProps = {
  ratingHandle: 0,
  disabledHandle: false,
};

// Export the RatingContainer component
export default RatingContainer;
