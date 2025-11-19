import React, { useContext, useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import useForm from "../utilities/customHooks/formHook";
import { PageContext } from "../context/Context";
import { useHttpClient } from "../utilities/customHooks/httpHook";
import ErrorModal from "../components/ErrorModal";
import LoadingSpinner from "../components/LoadingSpinner";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { login } = useContext(PageContext);
  const navigate = useNavigate();
  const { clearError, sendRequest, error, isLoading } = useHttpClient();
  const [profilePic, setProfilePic] = useState();
  const [formState, handleInputChange] = useForm(
    {
      firstName: {
        value: "",
        isValid: false,
      },
      lastName: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      username: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const handleSubmitSignup = async (event) => {
    event.preventDefault();
    const user = {
      firstName: formState.inputs.firstName.value,
      lastName: formState.inputs.lastName.value,
      password: formState.inputs.password.value,
      email: formState.inputs.email.value,
      username: formState.inputs.username.value,
    };

    try {
      const data = await sendRequest(
        "http://localhost:8000/api/users/signup",
        "POST",
        JSON.stringify(user),
        {
          "Content-Type": "application/json",
        }
      );
      login(data.userId, data.token);
      navigate("/");
    } catch (err) {}
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <div className="flex justify-center mt-5 p-4 ">
        <div className="p-4 bg-white flex flex-col lg:flex-row items-center rounded-lg shadow-2xl justify-start lg:justify-around lg:w- border-2 border-blue-700">
          <div className="flex flex-col justify-center  items-center lg:h-[100%]">
            <div className="mt-5">
              <h1 className="text-center text-4xl font-sparky text-blue-700 p-2">
                Welcome to AppName!
              </h1>
              <p className="text-center font-bold text-2xl italic font-portal text-indigo-300">
                Get started with an account
              </p>
            </div>
            <div className="block w-[80%] lg:hidden h-1 bg-gradient-to-r from-cyan-300 to-blue-500 mt-3 mb-6"></div>
          </div>
          <div className="hidden lg:block w-1 h-[80%] bg-gradient-to-b from-cyan-300 to-blue-500"></div>

          <form className="bg-white rounded-lg lg:p-6 flex flex-col justify-center space-y-3">
            <span className="my-3" />
            <Input
              id={"firstName"}
              type={"text"}
              label={"First Name"}
              validation={"require"}
              errorText={"This field is required"}
              onInputChange={handleInputChange}
            />
            <span className="my-3" />
            <Input
              id={"lastName"}
              type={"text"}
              label={"Last Name"}
              validation={"require"}
              errorText={"This field is required"}
              onInputChange={handleInputChange}
            />
            <span className="my-3" />
            <Input
              id={"email"}
              type={"email"}
              label={"E-mail"}
              validation={"email"}
              errorText={"Please enter a valid email"}
              onInputChange={handleInputChange}
            />
            <span className="my-3" />
            <Input
              id={"username"}
              type={"text"}
              label={"Username"}
              validation={"require"}
              errorText={"This field is required"}
              onInputChange={handleInputChange}
            />
            <span className="my-3" />
            <Input
              icon={true}
              id={"password"}
              type={"password"}
              label={"Password"}
              validation={"min_length"}
              errorText={"Please enter a password (At least 6 characters)"}
              minLength={6}
              onInputChange={handleInputChange}
            />
            <Button
              onClick={handleSubmitSignup}
              disabled={!formState.formIsValid}
              styles={
                "mx-auto bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:bg-gradient-to-r hover:from-indigo-800 hover:via-purple-800 hover:to-pink-700 disabled:bg-gradient-to-r w-40 text-white  disabled:from-stone-500 disabled:bg-stone-500 md:text-2xl"
              }
            >
              SIGN UP
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};
export default Signup;
