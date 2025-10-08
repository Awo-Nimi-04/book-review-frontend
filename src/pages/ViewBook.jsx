import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import redPinImg from "../assets/images/redPinImg.png";
import Backdrop from "../components/Backdrop";
import Modal from "../components/Modal";
import { useHttpClient } from "../utilities/customHooks/httpHook";
import ErrorModal from "../components/ErrorModal";
import LoadingSpinner from "../components/LoadingSpinner";
import { PageContext } from "../context/Context";

const ViewBook = () => {
  const [image, setImage] = useState();
  const [showMore, setShowMore] = useState(false);
  const [book, setBook] = useState();
  const { bookId } = useParams();
  const { sendRequest, clearError, isLoading, error } = useHttpClient();
  const { token } = useContext(PageContext);

  useEffect(() => {
    if (!token) return;
    let img;
    const getBook = async () => {
      try {
        const data = await sendRequest(
          `http://localhost:8000/api/books/${bookId}`,
          "GET",
          null,
          { Authorization: `Bearer ${token}` }
        );
        const ISBN = data.book.ISBN;
        try {
          const response =
            await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${ISBN}
    `);
          const data = await response.json();
          img = data.items[0].volumeInfo.imageLinks.thumbnail;
        } catch (err) {
          console.log(err);
        }

        setImage(img);
        setBook(data.book);
      } catch (err) {}
    };
    getBook();
  }, [bookId, sendRequest, token]);

  const handleReadMore = () => {
    setShowMore(true);
  };
  const handleReadLess = () => {
    setShowMore(false);
  };
  return (
    <>
      <ErrorModal error={error} onCancel={clearError} />
      {showMore && <Backdrop onClose={handleReadLess} />}
      {book && (
        <Modal
          header={"Review/Comments"}
          message={book.review}
          footer={"Done"}
          show={showMore}
          onCancel={handleReadLess}
        />
      )}
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && book && (
        <div className="w-full flex flex-col justify-center items-center space-y-5">
          <div className="bg-white p-5 rounded-xl shadow-2xl mt-7  w-[70%] lg:w-[50%]">
            <header className="text-center text-2xl mb-2 font-sparky">
              {book.title}
            </header>
            <div className="flex flex-col lg:flex-row justify-evenly items-center">
              <div className="w-[50%] p-3 flex flex-col justify-center mb-2 items-center">
                <div className="p-2 rounded-lg  bg-purple-400 shadow-xl">
                  <img src={image} />
                </div>
              </div>
              <div className="relative z-10 container flex flex-col lg:w-[60%] mt-2 justify-start lg:border-hidden border-t p-3 bg-amber-200 rounded-lg shadow-xl">
                <img
                  className="absolute -top-12 -right-8 md:-right-[3rem] md:-top-[3rem] origin-center rotate-[60deg] w-[40%] md:w-[30%] lg:w-[40%]"
                  src={redPinImg}
                />
                <p className="font-bold font-portal">Author</p>
                <p className="text-sm mb-2"> {book.author}</p>
                <p className="font-bold font-portal">Genre</p>
                <p className="text-sm mb-2"> {book.genre}</p>
                <p className="font-bold font-portal">Review/Comments</p>
                <p className="text-sm line-clamp-2 lg:line-clamp-3">
                  {book.review}
                </p>
                {book.review.length > 50 && (
                  <p
                    onClick={handleReadMore}
                    className="text-sm text-blue-500 underline cursor-pointer"
                  >
                    Read More
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewBook;
