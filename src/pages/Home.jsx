import React, { useState, useEffect } from "react";
import UserCard from "../components/UserCard";

import { PageContext } from "../context/Context";
import ErrorModal from "../components/ErrorModal";
import { useHttpClient } from "../utilities/customHooks/httpHook";
import LoadingSpinner from "../components/LoadingSpinner";
import FeedPost from "../components/FeedPost";
import PostSearchBar from "../components/PostSearchBar";
import UserSearchBar from "../components/UserSearchBar";

const Home = () => {
  const [posts, setPosts] = useState();
  const [users, setUsers] = useState();
  const [tabSelected, setTabSelected] = useState("posts");
  const [searchName, setSearchName] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [searchAuthor, setSearchAuthor] = useState("");
  const [searchGenre, setSearchGenre] = useState("");

  const { clearError, sendRequest, error, isLoading } = useHttpClient();

  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const data = await sendRequest("http://localhost:8000/api/books");
        setPosts(data.posts);
      } catch (err) {
        console.error(err.message);
      }
    };
    getAllPosts();

    const getAllUsers = async () => {
      try {
        const data = await sendRequest("http://localhost:8000/api/users");
        setUsers(data.users);
      } catch (error) {
        console.error(error);
      }
    };
    getAllUsers();
  }, [sendRequest]);

  const handlePostSearch = async () => {
    const queryParams = new URLSearchParams();

    if (searchTitle) queryParams.append("q", searchTitle);
    if (searchAuthor) queryParams.append("author", searchAuthor);
    if (searchGenre) queryParams.append("genre", searchGenre);
    try {
      const data = await sendRequest(
        `http://localhost:8000/api/books/search?${queryParams.toString()}`
      );
      setPosts(data.books);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUserSearch = async () => {
    const queryParams = new URLSearchParams();

    if (searchName) queryParams.append("q", searchName);

    try {
      const data = await sendRequest(
        `http://localhost:8000/api/users/search?${queryParams.toString()}`
      );
      setUsers(data.users);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      {posts && posts.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-4 bg-white p-4 shadow-lg w-[50%] mx-auto rounded-lg">
          <h1 className="text-center font-sak text-xl text-blue-800">
            Welcome to AppName.
          </h1>
          <p className="text-center font-sak text-md text-blue-800">
            Feel free to create an account and start posting and reading book
            reviews!
          </p>
        </div>
      )}
      {!isLoading && posts && (
        <div className="">
          <div className="min-h-screen flex flex-col">
            <div className="w-36 flex items-center justify-evenly mt-5 ml-auto mr-auto py-1 bg-white rounded-lg">
              <button
                onClick={() => {
                  setTabSelected("posts");
                }}
                className={`${
                  tabSelected === "posts"
                    ? "bg-blue-500 shadow-md text-white font-bold"
                    : "bg-white"
                } p-3 rounded-lg hover:bg-blue-500 hover:text-white hover:font-bold transition`}
              >
                Posts
              </button>
              <button
                onClick={() => {
                  setTabSelected("users");
                }}
                className={`${
                  tabSelected === "users"
                    ? "bg-purple-500 shadow-md text-white font-bold"
                    : "bg-white"
                } p-3 rounded-lg hover:bg-purple-500 hover:text-white hover:font-bold transition`}
              >
                Users
              </button>
            </div>
            <div className="mt-12 ml-auto mr-auto">
              {tabSelected === "posts" && (
                <PostSearchBar
                  searchTitle={searchTitle}
                  setSearchTitle={setSearchTitle}
                  searchAuthor={searchAuthor}
                  setSearchAuthor={setSearchAuthor}
                  searchGenre={searchGenre}
                  setSearchGenre={setSearchGenre}
                  onSearch={handlePostSearch}
                />
              )}
              {tabSelected === "users" && (
                <UserSearchBar
                  searchName={searchName}
                  setSearchName={setSearchName}
                  onSearch={handleUserSearch}
                />
              )}
            </div>
            <ul className="mt-5 ml-auto mr-auto">
              {tabSelected === "posts" &&
                posts.map((post) => {
                  return (
                    <FeedPost
                      key={post.id}
                      id={post.id}
                      creatorID={post.creatorID}
                      bookTitle={post.title}
                      review={post.review}
                      likes={post.likes.length}
                    />
                  );
                })}
              {tabSelected === "users" &&
                users.map((user) => {
                  return (
                    <UserCard
                      books={user.books}
                      username={user.username}
                      uid={user._id}
                      img={user.image}
                    />
                  );
                })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
