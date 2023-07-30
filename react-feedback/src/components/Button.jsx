import React from "react";

const Button = ({ idHandle, typeHandle, disabledHandle, children }) => {
  return (
    <button id={idHandle} type={typeHandle} disabled={disabledHandle}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  typeHandle: "button",
  disabledHandle: false,
};

export default Button;
