import React, { useState, useEffect } from "react";
import RatingItem from "./RatingItem";
import "./css/rating.css";

const RatingContainer = ({
  classValue,
  ratingValue,
  maxRating,
  itemID,
  itemName,
}) => {
  // we can check if ratingValue > 0 and stick with itemName -> apply selectedArr, checked etc.

  const [rating, setRating] = useState(() => ratingValue);
  const [selectedArr, setSelectedArr] = useState(() => []);

  // ---------------------
  // for testing purposes
  // ---------------------
  // useEffect(() => {
  //   console.log(rating);
  //   console.log(selectedArr);
  // }, [selectedArr]);

  useEffect(() => {
    selectedArr.forEach((item) => (item.dataset.selected = ""));
    return () => selectedArr.forEach((item) => delete item.dataset.selected);
  }, [selectedArr]);

  const handleClick = (event) => {
    const target = event.target.closest("input");
    if (!target) return;

    const targetValue = +target.value;
    const labelParent = target.parentNode;
    const parentContainer = labelParent.parentNode;
    setRating(targetValue);
    setSelectedArr(() =>
      Array.from(parentContainer.children).slice(0, targetValue)
    );
  };

  const handleDoubleClick = () => {
    if (!selectedArr.length) return;

    selectedArr[selectedArr.length - 1].children[0].checked = false;
    setSelectedArr([]);
    setRating(0);
  };

  return (
    <>
      <div
        onClick={(event) => handleClick(event)}
        onDoubleClick={handleDoubleClick}
        className={classValue}
      >
        {Array.from({ length: maxRating }, (_, index) => (
          <RatingItem
            key={index}
            id={`${itemID}${index + 1}`}
            name={itemName}
            value={index + 1}
          />
        ))}
      </div>
    </>
  );
};

RatingContainer.defaultProps = {
  ratingValue: 0,
};

export default RatingContainer;
