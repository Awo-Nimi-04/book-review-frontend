import React, { useContext, useEffect, useState } from "react";
import { PageContext } from "../context/Context";
import { useHttpClient } from "../utilities/customHooks/httpHook";
import { Link } from "react-router-dom";
import unitedImg from "../assets/images/united.png";

const ProfilePictureUpload = ({
  uid,
  fullname,
  username,
  initialPhotoUrl,
  isProfileOwner,
}) => {
  const { token } = useContext(PageContext);
  const { sendRequest, isLoading } = useHttpClient();
  const [photoUrl, setPhotoUrl] = useState(initialPhotoUrl);
  const [usernameText, setUsernameText] = useState(username);
  const [isChangingUserName, setIsChangingUserName] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    setPhotoUrl(initialPhotoUrl);
  }, [initialPhotoUrl]);

  useEffect(() => {
    setUsernameText(username || "");
  }, [username]);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const localPreview = URL.createObjectURL(file);
    setPreviewUrl(localPreview);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const data = await sendRequest(
        "http://localhost:8000/api/users/profile-picture",
        "PATCH",
        formData,
        { Authorization: `Bearer ${token}` }
      );
      setPhotoUrl(data.imageUrl);
      setPreviewUrl(null);
      setIsEditing(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleRemovePhoto = async () => {
    try {
      const formData = new FormData();
      formData.append("image", "");
      await sendRequest(
        "http://localhost:8000/api/users/remove-picture",
        "PATCH",
        null,
        { Authorization: `Bearer ${token}` }
      );
      setPhotoUrl(null);
      setPreviewUrl(null);
      setIsEditing(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleUpdateUsername = async () => {
    try {
      await sendRequest(
        "http://localhost:8000/api/users/update-username",
        "PATCH",
        JSON.stringify({ newUsername: usernameText }),
        {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      );
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsChangingUserName(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 items-center">
      <h1 className="font-bold text-xl">{fullname}</h1>
      {!isChangingUserName && (
        <div className="flex space-x-1 items-center">
          <p className="font-semibold text-gray-400">{usernameText}</p>
          {isProfileOwner && <button
            onClick={() => {
              setIsChangingUserName(true);
            }}
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#000000"
              stroke-width="0.8399999999999999"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8.56078 20.2501L20.5608 8.25011L15.7501 3.43945L3.75012 15.4395V20.2501H8.56078ZM15.7501 5.56077L18.4395 8.25011L16.5001 10.1895L13.8108 7.50013L15.7501 5.56077ZM12.7501 8.56079L15.4395 11.2501L7.93946 18.7501H5.25012L5.25012 16.0608L12.7501 8.56079Z"
                  fill="#080341"
                ></path>
              </g>
            </svg>
          </button>}
        </div>
      )}
      {isChangingUserName && (
        <div className="flex space-x-1">
          <input
            className="w-20"
            defaultValue={username}
            value={usernameText}
            onChange={(event) => {
              setUsernameText(event.target.value);
            }}
          />
          <button onClick={handleUpdateUsername}>
            <svg
              className="w-4 h-4"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 506.4 506.4"
              xml:space="preserve"
              fill="#000000"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <circle fill="#54B265" cx="253.2" cy="253.2" r="249.2"></circle>
                <path
                  fill="#F4EFEF"
                  d="M372.8,200.4l-11.2-11.2c-4.4-4.4-12-4.4-16.4,0L232,302.4l-69.6-69.6c-4.4-4.4-12-4.4-16.4,0 L134.4,244c-4.4,4.4-4.4,12,0,16.4l89.2,89.2c4.4,4.4,12,4.4,16.4,0l0,0l0,0l10.4-10.4l0.8-0.8l121.6-121.6 C377.2,212.4,377.2,205.2,372.8,200.4z"
                ></path>
                <path d="M253.2,506.4C113.6,506.4,0,392.8,0,253.2S113.6,0,253.2,0s253.2,113.6,253.2,253.2S392.8,506.4,253.2,506.4z M253.2,8 C118,8,8,118,8,253.2s110,245.2,245.2,245.2s245.2-110,245.2-245.2S388.4,8,253.2,8z"></path>{" "}
                <path d="M231.6,357.2c-4,0-8-1.6-11.2-4.4l-89.2-89.2c-6-6-6-16,0-22l11.6-11.6c6-6,16.4-6,22,0l66.8,66.8L342,186.4 c2.8-2.8,6.8-4.4,11.2-4.4c4,0,8,1.6,11.2,4.4l11.2,11.2l0,0c6,6,6,16,0,22L242.8,352.4C239.6,355.6,235.6,357.2,231.6,357.2z M154,233.6c-2,0-4,0.8-5.6,2.4l-11.6,11.6c-2.8,2.8-2.8,8,0,10.8l89.2,89.2c2.8,2.8,8,2.8,10.8,0l132.8-132.8c2.8-2.8,2.8-8,0-10.8 l-11.2-11.2c-2.8-2.8-8-2.8-10.8,0L234.4,306c-1.6,1.6-4,1.6-5.6,0l-69.6-69.6C158,234.4,156,233.6,154,233.6z"></path>{" "}
              </g>
            </svg>
          </button>
          <button
            onClick={() => {
              setIsChangingUserName(false);
            }}
          >
            <svg
              className="w-4 h-4"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 506.4 506.4"
              xml:space="preserve"
              fill="#000000"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <circle fill="#DF5C4E" cx="253.2" cy="253.2" r="249.2"></circle>
                <path
                  fill="#F4EFEF"
                  d="M281.6,253.2l90.8-90.8c4.4-4.4,4.4-12,0-16.4l-11.2-11.2c-4.4-4.4-12-4.4-16.4,0L254,225.6 l-90.8-90.8c-4.4-4.4-12-4.4-16.4,0L135.6,146c-4.4,4.4-4.4,12,0,16.4l90.8,90.8L135.6,344c-4.4,4.4-4.4,12,0,16.4l11.2,11.6 c4.4,4.4,12,4.4,16.4,0l90.8-90.8l90.8,90.8c4.4,4.4,12,4.4,16.4,0l11.2-11.6c4.4-4.4,4.4-12,0-16.4L281.6,253.2z"
                ></path>
                <path d="M253.2,506.4C113.6,506.4,0,392.8,0,253.2S113.6,0,253.2,0s253.2,113.6,253.2,253.2S392.8,506.4,253.2,506.4z M253.2,8 C118,8,8,118,8,253.2s110,245.2,245.2,245.2s245.2-110,245.2-245.2S388.4,8,253.2,8z"></path>
                <path d="M352.8,379.6c-4,0-8-1.6-11.2-4.4l-88-88l-88,88c-2.8,2.8-6.8,4.4-11.2,4.4c-4,0-8-1.6-11.2-4.4L132,364 c-2.8-2.8-4.4-6.8-4.4-11.2c0-4,1.6-8,4.4-11.2l88-88l-88-88c-2.8-2.8-4.4-6.8-4.4-11.2c0-4,1.6-8,4.4-11.2l11.2-11.2 c6-6,16.4-6,22,0l88,88l88-88c2.8-2.8,6.8-4.4,11.2-4.4l0,0c4,0,8,1.6,11.2,4.4l11.2,11.2c6,6,6,16,0,22l-88,88l88,88 c2.8,2.8,4.4,6.8,4.4,11.2c0,4-1.6,8-4.4,11.2l-11.2,11.2C360.8,378,357.2,379.6,352.8,379.6L352.8,379.6z M253.6,277.2 c1.2,0,2,0.4,2.8,1.2l90.8,90.8c1.6,1.6,3.2,2.4,5.6,2.4l0,0c2,0,4-0.8,5.6-2.4l11.6-11.6c1.6-1.6,2.4-3.2,2.4-5.6 c0-2-0.8-4-2.4-5.6l-90.8-90.8c-0.8-0.8-1.2-1.6-1.2-2.8s0.4-2,1.2-2.8l90.8-90.8c2.8-2.8,2.8-8,0-10.8l-11.2-11.2 c-1.6-1.6-3.2-2.4-5.6-2.4l0,0c-2,0-4,0.8-5.6,2.4L256.8,228c-1.6,1.6-4,1.6-5.6,0l-90.8-90.8c-2.8-2.8-8-2.8-10.8,0L138,148.4 c-1.6,1.6-2.4,3.2-2.4,5.6s0.8,4,2.4,5.6l90.8,90.8c1.6,1.6,1.6,4,0,5.6L138,346.8c-1.6,1.6-2.4,3.2-2.4,5.6c0,2,0.8,4,2.4,5.6 l11.6,11.6c2.8,2.8,8,2.8,10.8,0l90.8-90.8C251.6,277.6,252.4,277.2,253.6,277.2z"></path>{" "}
              </g>
            </svg>
          </button>
        </div>
      )}

      <div className="relative">
        <img
          src={previewUrl || photoUrl || unitedImg}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border shadow-md"
        />
        {isLoading && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center text-sm font-medium">
            Uploading...
          </div>
        )}
      </div>

      {!isEditing && isProfileOwner && (
        <div className="flex space-x-2">
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Update Photo
          </button>
          <button
            onClick={() => handleRemovePhoto()}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
          >
            Remove Photo
          </button>
        </div>
      )}

      {!isProfileOwner && (
        <Link
          to={`/chat/${uid}`}
          className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition"
        >
          Message
        </Link>
      )}

      {isEditing && isProfileOwner && (
        <div className="flex flex-col items-center gap-2">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="text-sm"
          />
          <button
            onClick={() => {
              setIsEditing(false);
              setPreviewUrl(null);
            }}
            className="text-red-500 hover:underline"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePictureUpload;
