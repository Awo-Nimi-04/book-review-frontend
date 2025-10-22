import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import BookCard from "../components/BookCard";
import { useHttpClient } from "../utilities/customHooks/httpHook";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorModal from "../components/ErrorModal";
import { PageContext } from "../context/Context";
import ProfilePictureUpload from "../components/ProfilePictureUpload";
import unitedImg from "../assets/images/united.png";

const UserBooks = () => {
  const { userId, isAuthUser, token } = useContext(PageContext);
  const [userBooks, setUserBooks] = useState();
  const [fullname, setFullname] = useState();
  const [username, setUsername] = useState();
  const [userProfilePic, setUserProfilePic] = useState();
  const [flag, setFlag] = useState(true);
  const { sendRequest, clearError, error, isLoading } = useHttpClient();
  const { uid } = useParams();

  useEffect(() => {
    if (!token) return;

    const getUserBooks = async () => {
      try {
        const data = await sendRequest(
          `http://localhost:8000/api/books/user/${uid}`,
          "GET",
          null,
          { Authorization: `Bearer ${token}` }
        );
        setUserBooks(data.books);
        setUserProfilePic(data.user.image);
        setFullname(`${data.user.firstName} ${data.user.lastName}`);
        setUsername(data.user.username);
      } catch (err) {
        console.error(err.message);
      }
    };
    getUserBooks();
  }, [sendRequest, uid, flag, token]);

  const handleDeleteBook = () => {
    setFlag((prevState) => !prevState);
  };

  return (
    <div className="flex">
      <div className="w-[35%] p-4">
        <div className="m-8 rounded-lg p-4 bg-white">
          <ProfilePictureUpload
            fullname={fullname}
            username={username}
            initialPhotoUrl={userProfilePic || unitedImg}
            isProfileOwner={uid === userId}
          />
        </div>
      </div>
      {isAuthUser && userBooks && userBooks.length > 0 && (
        <div className="w-[65%]">
          <ErrorModal error={error} onClear={clearError} />
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="w-[80%] ml-auto mr-auto mt-8 p-4">
            {userBooks.map((book) => {
              return (
                <BookCard
                  key={book.id}
                  id={book.id}
                  author={book.author}
                  title={book.title}
                  ISBN={book.ISBN}
                  onDelete={handleDeleteBook}
                  creator={book.creatorID}
                  likes={book.likes.length}
                  isLikedByCurrentUser={book.likedByUser}
                />
              );
            })}
          </div>
        </div>
      )}
      {isAuthUser && userBooks && userBooks.length === 0 && (
        <>
          {uid === userId && (
            <div className="flex flex-col items-center justify-center mt-4 bg-white p-4 shadow-lg w-[50%] mx-auto rounded-lg">
              <p className="text-center mb-3 font-sak text-lg text-blue-800">
                You have no books yet. Why don't you add one?
              </p>
              <Link
                to={"/new-book"}
                className={
                  "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:bg-gradient-to-r hover:from-indigo-800 hover:via-purple-800 hover:to-pink-700 w-40 text-white text-center rounded-lg shadow-lg  disabled:bg-gradient-to-r disabled:from-stone-500 disabled:bg-stone-500 md:text-2xl font-sunshine"
                }
              >
                Add a Book
              </Link>
            </div>
          )}
          {uid !== userId && (
            <div className="flex flex-col items-center justify-center mt-4 bg-white p-4 shadow-lg w-[50%] mx-auto rounded-lg">
              <p className="text-center font-sak text-lg text-blue-800">
                This user has no books.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserBooks;
