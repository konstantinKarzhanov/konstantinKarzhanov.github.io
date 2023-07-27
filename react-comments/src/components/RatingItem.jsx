import React from "react";
import { FaStar } from "react-icons/fa";

const RatingItem = ({ id, name, value }) => {
  return (
    <label htmlFor={id}>
      <input
        id={id}
        // className="sr-only"
        name={name}
        value={value}
        type="radio"
      />
      <FaStar />
    </label>
  );
};

export default RatingItem;
