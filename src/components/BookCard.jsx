import React, { useState, useContext, useEffect } from "react";
import Button from "./Button";
import Modal from "./Modal";
import Backdrop from "./Backdrop";
import { Link } from "react-router-dom";
import { PageContext } from "../context/Context";
import { useHttpClient } from "../utilities/customHooks/httpHook";
import ErrorModal from "./ErrorModal";
import LoadingSpinner from "./LoadingSpinner";

const BookCard = ({ id, title, author, ISBN, onDelete, creator, likes, isLikedByCurrentUser }) => {
  const { userId, token } = useContext(PageContext);
  const [likeCount, setLikeCount] = useState(likes);
  const [isLiked, setIsLiked] = useState(isLikedByCurrentUser);
  const [image, setImage] = useState();
  const { sendRequest, clearError, error, isLoading } = useHttpClient();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getImage = async (ISBN) => {
      try {
        const response =
          await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${ISBN}
  `);
        const data = await response.json();
        setImage(data.items[0].volumeInfo.imageLinks.thumbnail);
      } catch (err) {
        console.log(err);
      }
    };
    getImage(ISBN);
  }, []);

  function handleDelete() {
    setShowModal(true);
  }

  function handleCancel() {
    setShowModal(false);
  }

  const handleConfirmDelete = async () => {
    setShowModal(false);
    try {
      await sendRequest(
        `http://localhost:8000/api/books/${id}`,
        "DELETE",
        null,
        { Authorization: `Bearer ${token}` }
      );
      onDelete();
    } catch (err) {}
  };

  const handleClickLike = async () => {
    try {
      const data = await sendRequest(
        `http://localhost:8000/api/books/like/${id}`,
        "PATCH",
        null,
        { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
      );
      setLikeCount(data.totalLikes);
      setIsLiked(data.likedByUser);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {showModal && <Backdrop onClose={handleCancel} />}
      <Modal
        show={showModal}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancel}
        header={"Are you sure?"}
        message={"Are you sure you want to delete this?"}
        footer={"CancelConfirm"}
      />
      <div className="bg-white flex flex-col items-center rounded-lg shadow-2xl w-[50%] mr-auto ml-auto pt-4 mb-8">
        {isLoading && <LoadingSpinner asOverlay />}
        <header className="font-sparky text-center text-xl p-1 mt-2">
          {title}
        </header>
        <p className="text-[11px] font-paris font-bold mb-2">by {author}</p>
        <div className="shadow-sm">
          {/* <img src={BookImg} alt="Picture of a place" /> */}
          {image && <img src={image} />}
          {/* <img
            src={
              "https://books.google.com/books/content?id=ayJpGQeyxgkC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
            }
          /> */}
        </div>
        <div className="w-full flex items-center p-5 border-t-2  border-blue-500 mt-3">
          <Link
            to={`/book/${id}`}
            className={
              "p-1 text-center rounded-lg mx-auto font-sunshine bg-fuchsia-500 shadow-xl hover:bg-fuchsia-800 text-md md:w-20 md:text-2xl text-white"
            }
          >
            VIEW
          </Link>
          {userId === creator && (
            <>
              <Link
                to={`/edit-book/${id}`}
                className={
                  "p-1 text-center rounded-lg mx-auto font-sunshine bg-orange-300 shadow-xl hover:bg-amber-500 text-md md:w-20 md:text-2xl text-white"
                }
              >
                EDIT
              </Link>
              <Button
                styles={
                  "bg-red-500 shadow-xl hover:bg-red-900 text-md md:w-20 md:text-2xl text-white mx-auto"
                }
                onClick={handleDelete}
              >
                DELETE
              </Button>
            </>
          )}
          <div className="mx-auto flex items-center">
            <button
              className={`${
                isLiked ? "text-red-400" : "text-white"
              } hover:text-red-500`}
              onClick={handleClickLike}
            >
              <svg
                className="w-10"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.886 5.115c3.521 0 6.376 2.855 6.376 6.376 0 1.809-0.754 3.439-1.964 4.6l-10.297 10.349-10.484-10.536c-1.1-1.146-1.778-2.699-1.778-4.413 0-3.522 2.855-6.376 6.376-6.376 2.652 0 4.925 1.62 5.886 3.924 0.961-2.304 3.234-3.924 5.886-3.924z"
                  fill="currentColor"
                  stroke="black"
                  strokeWidth="1.5"
                />
              </svg>
            </button>
            <p>{likeCount}</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default BookCard;
