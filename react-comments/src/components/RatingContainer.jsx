import React, { useState, useEffect, useContext } from "react";
import Context from "./Context";
import RatingItem from "./RatingItem";
import "./css/rating.css";

const RatingContainer = ({
  classValue,
  ratingValue,
  maxRating,
  itemID,
  itemName,
}) => {
  const { isSubmitted, setIsSubmitted } = useContext(Context);
  const [rating, setRating] = useState(() => ratingValue);

  useEffect(() => {
    if (isSubmitted) {
      setRating(ratingValue);
      setIsSubmitted(!isSubmitted);
    }
  }, [isSubmitted]);

  // // first variant (checked)
  // const handleOnChange = (event) => {
  //   setRating(+event.target.value);
  // };
  // const handleDoubleClick = () => {
  //   setRating(0);
  // };

  // second variant (defaultChecked)
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
        // // first variant (checked)
        // onDoubleClick={handleDoubleClick}

        // second variant (checked)
        onClick={(event) => handleClick(event)}
        onDoubleClick={(event) => handleDoubleClick(event)}
        className={classValue}
      >
        {Array.from({ length: maxRating }, (_, index) => (
          <RatingItem
            key={index}
            // onChange={handleOnChange}
            dataAttr={index + 1 <= rating}
            id={`${itemID}${index + 1}`}
            name={itemName}
            value={index + 1}
            checked={index + 1 === rating}
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

// difference between first and second variants:
//    1. After first click (checked):
//        - checked: true
//        - defaultChecked: false
//        - attr checked: false
//
//    2. After first click (defaultChecked):
//        - checked: true
//        - defaultChecked: true
//        - attr checked: true
//
//    1. After Changes (checked):
//        default item:
//          - checked: false - true
//          - defaultChecked: false - false
//          - attr checked: false - false
//
//        changed item:
//          - checked: true
//          - defaultChecked: false
//          - attr checked: false
//
//    2. After Changes (defaultChecked):
//        default item:
//          - checked: false - true
//          - defaultChecked: false - true
//          - attr checked: false - true
//
//        changed item:
//          - checked: true
//          - defaultChecked: true
//          - attr checked: true
//
//    1. After Submit (checked):
//        - checked: true
//        - defaultChecked: true
//        - attr checked: true
//
//    2. After Submit (defaultChecked):
//        - checked: true
//        - defaultChecked: true
//        - attr checked: true
//
//    1. After Changes Submit (checked):
//        default item:
//          - checked: true -> false
//          - defaultChecked: true -> true
//          - attr checked: true -> true
//
//        changed item:
//          - checked: true
//          - defaultChecked: false
//          - attr checked: false
//
//    2. After Changes Submit (defaultChecked):
//        default item:
//          - checked: true -> false
//          - defaultChecked: true -> false
//          - attr checked: true -> false
//
//        changed item:
//          - checked: true
//          - defaultChecked: true
//          - attr checked: true
//
