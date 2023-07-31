import React from "react";
import "./css/button.css";

const Button = ({
  idHandle,
  classHandle,
  typeHandle,
  disabledHandle,
  children,
}) => {
  return (
    <button
      id={idHandle}
      className={"d-block b-radius" + (classHandle ? ` ${classHandle}` : "")}
      type={typeHandle}
      disabled={disabledHandle}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  typeHandle: "button",
  disabledHandle: false,
};

export default Button;
