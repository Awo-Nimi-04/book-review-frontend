import React from "react";
import ReactDOM from "react-dom";

const Backdrop = ({ onClose }) => {
  return ReactDOM.createPortal(
    <div
      onClick={onClose}
      className="fixed top-0 left-0 w-full bg-[#000000bf] z-50 min-h-screen"
    ></div>,
    document.getElementById("backdrop")
  );
};

export default Backdrop;
