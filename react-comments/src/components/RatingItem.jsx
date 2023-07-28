import React from "react";
import { FaStar } from "react-icons/fa";

const RatingItem = ({
  handleOnChange,
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
        // onChange={handleOnChange}
        id={itemIDHandle}
        // className="sr-only"
        name={itemNameHandle}
        value={valueHandle}
        type="radio"
        // checked={checkedHandle}
        defaultChecked={checkedHandle}
        disabled={disabledHandle}
      />
      <FaStar />
    </label>
  );
};

export default RatingItem;
