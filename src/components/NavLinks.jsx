import React from "react";
import "./NavLinks.css";
import { NavLink, Link } from "react-router-dom";
import { PageContext } from "../context/Context";
import { useContext } from "react";

const NavLinks = ({ onClick }) => {
  const { isAuthUser, logout, userId } = useContext(PageContext);
  return (
    <nav
      className={`nav-links flex flex-col h-60 md:h-0 justify-evenly md:flex-row items-center w-${
        isAuthUser ? "80 space-x-2" : "60"
      } md:justify-evenly md:justify-center`}
    >
      {!isAuthUser && (
        <>
          <NavLink
            onClick={onClick}
            className={
              "p-1 rounded-lg hover:bg-blue-800 md:hover:bg-white font-[800] font-paris text-xl md:text-[#000000] text-blue-800"
            }
            to={"/auth"}
            exact={"true"}
          >
            Login
          </NavLink>
          <NavLink
            onClick={onClick}
            className={
              "p-1 rounded-lg hover:bg-blue-800 md:hover:bg-white font-[800] font-paris text-xl md:text-[#000000] text-blue-800"
            }
            to={"/new-user"}
            exact={"true"}
          >
            Sign Up
          </NavLink>
        </>
      )}
      {isAuthUser && (
        <>
          <NavLink
            onClick={onClick}
            className={
              "p-1 rounded-lg hover:bg-blue-800 md:hover:bg-white font-[800] font-paris text-xl md:text-[#000000] text-blue-800"
            }
            to={`/${userId}/books`}
            exact={"true"}
          >
            My Books
          </NavLink>
          <NavLink
            onClick={onClick}
            className={
              "p-1 rounded-lg hover:bg-blue-800 md:hover:bg-white font-[800] font-paris text-xl md:text-[#000000] text-blue-800"
            }
            to={"/new-book"}
            exact={"true"}
          >
            Add A Book
          </NavLink>
          <Link
            to="/"
            onClick={() => {
              logout();
            }}
            className="p-1 rounded-lg hover:text-white hover:bg-blue-800 md:hover:bg-white font-[800] font-paris text-xl md:text-[#000000] md:hover:text-blue-800 text-blue-800"
          >
            Log Out
          </Link>
        </>
      )}
    </nav>
  );
};

export default NavLinks;
