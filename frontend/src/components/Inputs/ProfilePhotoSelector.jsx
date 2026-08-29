import React, { useRef, useState } from 'react';
import { UserIcon, UploadIcon, TrashIcon } from '../Icons';

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex justify-center mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!image ? (
        <div className="w-20 h-20 flex items-center justify-center bg-purple-100/70 text-primary rounded-full relative border-2 border-dashed border-purple-300 hover:border-primary transition group">
          <UserIcon className="w-9 h-9 text-primary" />

          <button
            type="button"
            className="w-7 h-7 flex items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-1 shadow-md hover:bg-purple-700 transition cursor-pointer"
            onClick={onChooseFile}
            title="Upload Photo"
          >
            <UploadIcon className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            src={previewUrl}
            alt="profile preview"
            className="w-20 h-20 rounded-full object-cover border-2 border-primary shadow-sm"
          />

          <button
            type="button"
            className="w-7 h-7 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 shadow-md hover:bg-red-600 transition cursor-pointer"
            onClick={handleRemoveImage}
            title="Remove Photo"
          >
            <TrashIcon className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
