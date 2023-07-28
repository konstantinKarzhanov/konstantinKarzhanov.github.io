import React from "react";
import { FaStar } from "react-icons/fa";

const RatingItem = ({ onChange, dataAttr, id, name, value, checked }) => {
  return (
    <label htmlFor={id} {...(dataAttr && { "data-selected": "" })}>
      <input
        // onChange={onChange}
        id={id}
        // className="sr-only"
        name={name}
        value={value}
        type="radio"
        // checked={checked}
        defaultChecked={checked}
      />
      <FaStar />
    </label>
  );
};

export default RatingItem;
