import React from "react";
import ReactDOM from "react-dom";
import NavLinks from "./NavLinks";
import { CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";

const SideDrawer = ({ show, onClick }) => {
  const content = (
    <CSSTransition
      in={show}
      timeout={200}
      classNames={"slide-in-left"}
      mountOnEnter
      unmountOnExit
    >
      <aside className="min-h-screen left-0 top-0 flex flex-col space-y-10 justify-center items-center fixed shadow-lg md:hidden z-50 bg-white w-[70%]">
        <Link to={"/"} onClick={onClick}>
          <p className="font-sparky text-blue-800 text-[50px]">AppName</p>
        </Link>
        <nav className="h-40 flex flex-col justify-between">
          <NavLinks onClick={onClick} />
        </nav>
      </aside>
    </CSSTransition>
  );

  return ReactDOM.createPortal(content, document.getElementById("drawer-hook"));
};

export default SideDrawer;
