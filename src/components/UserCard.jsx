import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./UserCard.css";
import spidermanImg from "../assets/images/spiderman.png";
import burgerImg from "../assets/images/burger.png";
import sphereImg from "../assets/images/sphere.png";
import unitedImg from "../assets/images/united.png";
import { PageContext } from "../context/Context";

const options = {
  1: "https://e7.pngegg.com/pngimages/136/22/png-clipart-user-profile-computer-icons-girl-customer-avatar-angle-heroes-thumbnail.png",
  2: "https://img.freepik.com/premium-vector/female-user-profile-avatar-is-woman-character-screen-saver-with-emotions_505620-617.jpg",
  3: spidermanImg,
  4: burgerImg,
  5: sphereImg,
  6: unitedImg,
};

const UserCard = ({ uid, name, books, img, lastN }) => {
  const { isAuthUser } = useContext(PageContext);
  return (
    <li className="p-3 user-card">
      <Link
        to={isAuthUser ? `/${uid}/books` : "/auth"}
        className="flex bg-white p-2 rounded-lg w-60 items-center border-2 border-transparent justify-start space-x-7 shadow-xl transition ease-in-out delay-150 hover:bg-lime-200 hover:border-2 hover:-translate-y-1 hover:scale-110 hover:ring-4 hover:ring-purple-600"
      >
        <img
          className="rounded-full object-fill border-2 border-purple-500 bg-white w-20 h-20 p-1"
          src={
            img
              ? options[img]
              : "https://e7.pngegg.com/pngimages/136/22/png-clipart-user-profile-computer-icons-girl-customer-avatar-angle-heroes-thumbnail.png"
          }
          alt=""
        />

        <div>
          <p className="font-sparky text-lg text-purple-500">
            {name} {lastN.slice(0, 1)}
          </p>
          <p className="font-sak text-[11px] text-purple-700">
            {books.length === 1
              ? `${books.length} book`
              : `${books.length} books`}
          </p>
        </div>
      </Link>
    </li>
  );
};

export default UserCard;
