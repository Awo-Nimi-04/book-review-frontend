import React, { useState, useEffect, useContext } from "react";
import { BOOK_GENRE } from "../utilities/Data";
import useForm from "../utilities/customHooks/formHook";
import Input from "../components/Input";
import Button from "../components/Button";
import { useHttpClient } from "../utilities/customHooks/httpHook";
import ErrorModal from "../components/ErrorModal";
import LoadingSpinner from "../components/LoadingSpinner";
import { PageContext } from "../context/Context";
import { useNavigate } from "react-router-dom";

const NewBook = () => {
  const { userId, token } = useContext(PageContext);
  const navigate = useNavigate();
  const { sendRequest, clearError, error, isLoading } = useHttpClient();
  const [formState, handleInputChange] = useForm(
    {
      title: { value: "", isValid: false },
      author: { value: "", isValid: false },
      ISBN: { value: "", isValid: false },
      genre: { value: "Adventure", isValid: true },
      review: { value: "", isValid: false },
    },
    false
  );

  const submitHandler = async (event) => {
    event.preventDefault();
    const book = {
      title: formState.inputs.title.value,
      author: formState.inputs.author.value,
      ISBN: formState.inputs.ISBN.value,
      genre: formState.inputs.genre.value,
      review: formState.inputs.review.value,
    };

    // console.log(book);
    try {
      await sendRequest(
        "http://localhost:8000/api/books/",
        "POST",
        JSON.stringify(book),
        { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
      );
      navigate(`/${userId}/books`);
    } catch (err) {}
  };

  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
      <div className="w-full flex flex flex-col justify-center mt-6 p-2 items-center">
        <ErrorModal error={error} onClear={clearError} />
        <form
          className="bg-white border-2 border-blue-700 md:w-[40%] rounded-lg mx-auto p-6 flex flex-col space-y-3"
          onSubmit={submitHandler}
        >
          <span className="my-3" />
          <Input
            id={"title"}
            type={"text"}
            label={"Title"}
            validation={"require"}
            errorText={"This field is required"}
            onInputChange={handleInputChange}
            initialValue={formState.inputs.title.value}
            initialValidity={formState.inputs.title.isValid}
          />
          <span className="my-3" />
          <Input
            id={"author"}
            type={"text"}
            label={"Author"}
            validation={"require"}
            errorText={"This field is required"}
            onInputChange={handleInputChange}
            initialValue={formState.inputs.author.value}
            initialValidity={formState.inputs.author.isValid}
          />
          <span className="my-3" />
          <Input
            id={"ISBN"}
            type={"text"}
            label={"13-Digit ISBN"}
            validation={"require"}
            errorText={"This field is required"}
            onInputChange={handleInputChange}
            initialValue={formState.inputs.ISBN.value}
            initialValidity={formState.inputs.ISBN.isValid}
          />
          <span className="my-3" />
          <Input
            id={"genre"}
            type={"select"}
            label={"Genre"}
            validation={"require"}
            errorText={"Please pick a genre"}
            onInputChange={handleInputChange}
            initialValue={formState.inputs.genre.value}
            initialValidity={formState.inputs.genre.isValid}
          >
            {BOOK_GENRE.map((genre, key) => (
              <option key={key}>{genre}</option>
            ))}
          </Input>
          <span className="my-3" />
          <Input
            id={"review"}
            type={"textarea"}
            label={"Comments"}
            validation={"min_length"}
            errorText={"Please enter a comment (At least 6 characters)"}
            minLength={6}
            onInputChange={handleInputChange}
            initialValue={formState.inputs.review.value}
            initialValidity={formState.inputs.review.isValid}
          />
          <Button
            type={"submit"}
            disabled={!formState.formIsValid}
            styles={
              "mx-auto bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:bg-gradient-to-r hover:from-indigo-800 hover:via-purple-800 hover:to-pink-700 disabled:bg-gradient-to-r w-40 text-white  disabled:from-stone-500 disabled:bg-stone-500 md:text-2xl"
            }
          >
            ADD BOOK
          </Button>
        </form>
      </div>
    </>
  );
};

export default NewBook;
