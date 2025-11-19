import { Link } from "react-router-dom";
import Button from "./Button";
import { useContext } from "react";
import { PageContext } from "../context/Context";
import unitedImg from "../assets/images/united.png";

const FeedPost = ({ id, creatorID, bookTitle, review, likes }) => {
  const { isAuthUser } = useContext(PageContext);
  return (
    <li className="m-4 ml-auto mr-auto">
      <div className="bg-white shadow-xl rounded-full w-full p-4 flex space-x-4 items-center">
        <img
          className="rounded-full object-cover border-2 border-purple-500 bg-white w-20 h-20"
          src={creatorID.image || unitedImg}
          alt="profile picture"
        />
        <div className="w-full flex justify-between items-center">
          <div className="w-full">
            <Link to={isAuthUser ? `/${creatorID.id}/books` : "/auth"}>
              <h1 className="text-xl text-purple-500 font-bold">
                {creatorID.firstName} {creatorID.lastName.slice(0, 1)}
              </h1>
            </Link>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 340 340"
                className="w-5"
              >
                <path
                  fill="#eaf5ff"
                  d="M261.789 262.975v30.858H74.736l-8.195-17.115 23.608-21.2h171.64v7.457z"
                />
                <path
                  d="M90.568 246.837 59.2 276.718V46.483C59.305 28.439 71.44 12.073 90.568 10z"
                  fill="#4e73a8"
                />
                <path
                  d="M89.929 308.327A30.746 30.746 0 0 1 59.2 276.718c.46-16.747 13.379-29.881 31.373-29.881h190.244v8.494a7.644 7.644 0 0 1-7.645 7.644H90.364c-20.68.573-21.166 29.977-.435 30.858h183.243a7.644 7.644 0 0 1 7.645 7.644v6.85z"
                  fill="#4e73a8"
                />
                <path
                  d="M90.568 246.837V10H259.72a21.1 21.1 0 0 1 21.1 21.1v215.74z"
                  fill="#88b0ea"
                />
                <path
                  d="M261.46 274.337H94.74a3.25 3.25 0 0 0 0 6.49h166.72z"
                  fill="#c9d4ff"
                />
                <path
                  fill="#c9d4ff"
                  d="M99.877 274.337h31.033v19.496H99.877z"
                />
                <path
                  fill="#f47676"
                  d="M109.312 274.337v52.418l21.598-10.012 21.599 10.012v-52.418h-43.197z"
                />
                <path
                  d="M265.264 297.833a4 4 0 0 1-3.449-1.968c-9.569-16.222-.491-33.994-.1-34.742 2.509-4.607 9.437-1.012 7.1 3.7-.1.186-7.375 14.656-.105 26.981a4.025 4.025 0 0 1-3.446 6.029zM59.2 280.718a4 4 0 0 1-4-4V46.483a41.37 41.37 0 0 1 14.06-31.422 36.949 36.949 0 0 1 20.917-9.042A4 4 0 0 1 94.568 10v217.659c-.072 5.177-7.9 5.324-8 0V14.742c-13.942 3.5-23.516 17.2-23.373 31.741v230.235a4 4 0 0 1-3.995 4z"
                  fill="#383a49"
                />
                <path
                  d="M109.311 312.327c-16.186-.277-31.791 2.716-44.287-10.518a34.49 34.49 0 0 1-9.827-25.2c.51-18.622 16.378-33.771 35.371-33.771h190.249a4 4 0 0 1 4 4v8.494a11.657 11.657 0 0 1-11.645 11.644H90.364c-10.127-.087-15.774 12.075-8.706 19.317a11.333 11.333 0 0 0 8.271 3.541h19.383c5.273.088 5.242 7.917 0 8H89.929a19.261 19.261 0 0 1-14.059-6.019c-11.87-12.195-2.686-33.087 14.495-32.84h182.807a3.649 3.649 0 0 0 3.645-3.644v-4.494H90.568c-23.744-.1-36.45 28.51-19.81 45.394a26.535 26.535 0 0 0 19.171 8.1h19.382c5.251.076 5.261 7.912 0 7.996z"
                  fill="#383a49"
                />
                <path
                  d="M280.817 312.327H168.642a4 4 0 0 1 0-8h108.175v-2.85a3.648 3.648 0 0 0-3.645-3.644h-104.53c-5.206-.072-5.3-7.908 0-8h104.53a11.657 11.657 0 0 1 11.645 11.644v6.85a4 4 0 0 1-4 4zM152.508 334c-.184.781-20.942-9.49-21.6-9.6l-19.916 9.233a4 4 0 0 1-5.681-3.633v-52.418a4 4 0 0 1 4-4h43.2a4 4 0 0 1 4 4V330a4.026 4.026 0 0 1-4.003 4zm-21.6-18.013c.565-.552 16.751 7.51 17.6 7.749v-42.154h-35.2v42.154c.914-.263 16.978-8.28 17.602-7.749zM280.817 250.837a4 4 0 0 1-4-4V31.1A17.116 17.116 0 0 0 259.72 14H90.568a4 4 0 0 1 0-8H259.72a25.125 25.125 0 0 1 25.1 25.1v215.737a4 4 0 0 1-4.003 4z"
                  fill="#383a49"
                />
              </svg>
              <h2 className="text-md">{bookTitle}</h2>
            </div>

            <p className="text-sm font-medium text-stone-400">{review}</p>
            <div className="w-full flex justify-around items-center">
              <div className="flex items-end space-x-3">
                <svg
                  fill="#2d5ed2"
                  className="w-6"
                  version="1.1"
                  id="Icons"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 32 32"
                  xml:space="preserve"
                  stroke="#2d5ed2"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path d="M29.7,14.3c-0.3-0.4-0.9-0.6-1.5-0.6h-6.8c-0.7,0-1.3-0.6-1.3-1.3V3.9C20.1,2.8,19,2,18,2c-1,0-1.8,0.8-1.8,1.9 c0,2.3-0.7,4.6-2.1,6.5L11,13.9v11.7c1.7,1.5,4.3,2.4,6.8,2.4h8.5c0.9,0,1.6-0.6,1.8-1.5l2-11.1C30,14.9,30,14.5,29.7,14.3z"></path>{" "}
                    <path d="M6.8,15H4.2c-0.7,0-1.3,0.6-1.3,1.3v10.4c0,0.7,0.6,1.3,1.3,1.3h2.6c0.7,0,1.3-0.6,1.3-1.3V16.3C8.1,15.6,7.5,15,6.8,15z"></path>{" "}
                  </g>
                </svg>
                <p>{likes}</p>
              </div>
              <Link
                to={isAuthUser ? `/book/${id}` : "/auth"}
                className={
                  "p-1 text-center rounded-lg font-sunshine bg-fuchsia-500 shadow-xl hover:bg-fuchsia-800 text-md text-white w-16"
                }
              >
                View
              </Link>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default FeedPost;
