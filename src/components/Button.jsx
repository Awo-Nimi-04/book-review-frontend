import React from "react";

const Button = ({ type, disabled, children, styles, onClick }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={`${styles} p-1 rounded-lg font-sunshine`}
    >
      {children}
    </button>
  );
};

export default Button;
