import React from "react";
import { FaStar } from "react-icons/fa";

const RatingItem = ({
  dataAttrHandle,
  itemIDHandle,
  itemNameHandle,
  valueHandle,
  checkedHandle,
  disabledHandle,
}) => {
  return (
    <label
      htmlFor={itemIDHandle}
      {...(dataAttrHandle && { "data-selected": "" })}
    >
      <input
        id={itemIDHandle}
        className="sr-only"
        name={itemNameHandle}
        value={valueHandle}
        type="radio"
        defaultChecked={checkedHandle}
        disabled={disabledHandle}
      />
      <FaStar />
    </label>
  );
};

export default RatingItem;
