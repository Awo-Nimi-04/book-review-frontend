import React, { useContext, useEffect, useState } from "react";
import { PageContext } from "../context/Context";
import { useHttpClient } from "../utilities/customHooks/httpHook";
import { Link } from "react-router-dom";
import unitedImg from "../assets/images/united.png";

const ProfilePictureUpload = ({
  fullname,
  username,
  initialPhotoUrl,
  isProfileOwner,
}) => {
  const { token } = useContext(PageContext);
  const { sendRequest, isLoading } = useHttpClient();
  const [photoUrl, setPhotoUrl] = useState(initialPhotoUrl);
  const [isEditing, setIsEditing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    setPhotoUrl(initialPhotoUrl);
  }, [initialPhotoUrl]);

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
      const data = await sendRequest(
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

  return (
    <div className="flex flex-col gap-3 items-center">
      <h1 className="font-bold text-xl">{fullname}</h1>
      <p className="font-semibold text-gray-400">{username}</p>

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
          to={"/chat"}
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
