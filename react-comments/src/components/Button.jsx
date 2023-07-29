import React from "react";

const Button = ({ idHandle, typeHandle, children }) => {
  return (
    <button id={idHandle} type={typeHandle}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  typeHandle: "button",
};

export default Button;
