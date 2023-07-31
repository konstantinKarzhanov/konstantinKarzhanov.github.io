import React, { useContext, useState, useEffect } from "react";
import Context from "./Context";
import RatingItem from "./RatingItem";
import "./css/rating.css";

const RatingContainer = ({
  classHandle,
  ratingHandle,
  maxRatingHandle,
  setRatingBoolHandle,
  itemIDHandle,
  itemNameHandle,
  disabledHandle,
}) => {
  const { isSubmitted } = useContext(Context);
  const [rating, setRating] = useState(() => ratingHandle);

  useEffect(() => {
    if (isSubmitted) {
      setRating(ratingHandle);
    }
  }, [isSubmitted]);

  useEffect(() => {
    setRatingBoolHandle(!!rating);
  }, [rating]);

  const handleClick = (event) => {
    const target = event.target.closest("input");
    if (!target) return;

    const targetValue = +target.value;

    setRating(targetValue);
  };

  const handleDoubleClick = (event) => {
    const target = event.currentTarget;
    const checkedObj = [...target.children].find(
      ({ children: [{ checked }] }) => checked
    );

    if (!checkedObj) return;
    checkedObj.children[0].checked = false;

    setRating(0);
  };

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

RatingContainer.defaultProps = {
  ratingHandle: 0,
  disabledHandle: false,
};

export default RatingContainer;
