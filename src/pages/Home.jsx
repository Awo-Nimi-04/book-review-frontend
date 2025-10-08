import React, { useState, useEffect } from "react";
import UserCard from "../components/UserCard";

import { PageContext } from "../context/Context";
import ErrorModal from "../components/ErrorModal";
import { useHttpClient } from "../utilities/customHooks/httpHook";
import LoadingSpinner from "../components/LoadingSpinner";
import FeedPost from "../components/FeedPost";

const Home = () => {
  const [posts, setPosts] = useState();
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
  }, [sendRequest]);

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
          <div className="min-h-screen flex justify-center md:justify-center">
            <ul className="my-auto w-[70%]">
              {posts.map((post, index) => {
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
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
