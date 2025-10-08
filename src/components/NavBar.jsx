import React, { useState } from "react";
import SideDrawer from "./SideDrawer";
import Backdrop from "./Backdrop";
import { Outlet, Link } from "react-router-dom";
import NavLinks from "./NavLinks";
const NavBar = () => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);
  const openSideDrawer = () => {
    setShowSideDrawer(true);
  };
  const closeSideDrawer = () => {
    setShowSideDrawer(false);
  };
  return (
    <>
      {showSideDrawer && <Backdrop onClose={closeSideDrawer} />}
      <SideDrawer show={showSideDrawer} onClick={closeSideDrawer} />
      <header className="static w-full bg-blue-800 z-40 p-4 flex space-x-4 md:justify-between items-center">
        <button
          onClick={openSideDrawer}
          className="md:hidden flex flex-col h-6 justify-between"
        >
          <span className="block bg-white w-8 h-1" />
          <span className="block bg-white w-8 h-1" />
          <span className="block bg-white w-8 h-1" />
        </button>
        <Link to="/">
          <p className="text-4xl text-white font-sparky">AppName</p>
        </Link>
        <div className="hidden md:block">
          <NavLinks />
        </div>
      </header>
      <Outlet />
    </>
  );
};

export default NavBar;
