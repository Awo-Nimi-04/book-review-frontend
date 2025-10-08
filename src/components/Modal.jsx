import React from "react";
import ReactDOM from "react-dom";
import Backdrop from "./Backdrop";
import { CSSTransition } from "react-transition-group";

import "./Modal.css";

const Modal = ({ header, footer, message, show, onCancel, onConfirm }) => {
  return ReactDOM.createPortal(
    <CSSTransition
      in={show}
      timeout={200}
      classNames="modal"
      mountOnEnter
      unmountOnExit
    >
      <div className="fixed left-[25%] top-[40%] bg-white rounded-lg shadow-2xl w-[50%] z-50">
        <header className="bg-blue-800 p-2 rounded-t-lg text-white font-sunshine text-center">
          {header}
        </header>
        <div className="bg-white p-1 flex flex-col justify-center items-center rounded-b-lg">
          <p className="text-wrap text-center text-[11px] md:text-sm font-paris font-bold p-4">
            {message}
          </p>
          <div className="flex w-full justify-evenly p-1">
            {footer === "CancelConfirm" && (
              <>
                <button
                  onClick={onCancel}
                  className="text-sm text-pink-500 border border-pink-500 p-1 rounded-lg w-20 hover:bg-pink-600 hover:text-white shadow-sm"
                >
                  CANCEL
                </button>
                <button
                  onClick={onConfirm}
                  className="text-sm text-white bg-red-800 hover:bg-red-600 shadow-md p-1 rounded-lg w-20"
                >
                  CONFIRM
                </button>
              </>
            )}
            {footer === "Done" && (
              <button
                onClick={onCancel}
                className="text-sm text-pink-500 font-bold border border-pink-500 p-1 rounded-lg w-20 hover:bg-pink-600 hover:text-white shadow-sm"
              >
                DONE
              </button>
            )}
            {footer === "Okay" && (
              <button
                onClick={onCancel}
                className="text-sm text-pink-500 font-bold border border-pink-500 p-1 rounded-lg w-20 hover:bg-pink-600 hover:text-white shadow-sm"
              >
                OKAY
              </button>
            )}
          </div>
        </div>
      </div>
    </CSSTransition>,
    document.getElementById("modal")
  );
};

export default Modal;
