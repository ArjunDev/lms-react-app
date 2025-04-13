import React, { useState } from "react";
import {doc, updateDoc} from "firebase/firestore";
import { firebaseFirestoreDb } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";

const ChangeProfilePicture = ({ onUpload, close }) => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const email = useSelector(state => state.userFormData.currentUser.email);
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const uploadToCloudinary = async () => {
    if (!image) {
      alert("Please select an image.");
      return;
    }
    setUploading(true);
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "unsigned_upload"); //your unsigned preset
    // console.log("formData:", formData)
    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dtpaoymjq/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      // console.log("Image uploaded:", data.secure_url);
      // console.log("email:", email);

      //uploading to firestore DB
      const docRef = doc(firebaseFirestoreDb, "users", email);
      const updateFirestoreDB = updateDoc(docRef, {profilePicture: data.secure_url});
      onUpload(data.secure_url); // Pass URL to parent
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  };
  const handleClose = () =>{
    close();
    // console.log("Clicked Cancel");
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-md p-4">
      <div className="bg-white px-4 py-6 rounded-2xl shadow-2xl text-center sm:p-6">
        <div className="flex flex-col gap-2 justify-center items-center">
          <label className="cursor-pointer border rounded px-4 py-2 text-gray-500 hover:bg-gray-100 inline-block">
            {image ? image.name : "Choose a profile picture"}
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange} 
              className="hidden"
            />
          </label>
          <div className="flex gap-4 mt-4">
            <button
              onClick={uploadToCloudinary}
              disabled={uploading}
              className="bg-blue-600 text-white px-2 py-1 font-bold rounded cursor-pointer"
            >{uploading ? "Uploading..." : "Upload"}</button>
            <button
              onClick={handleClose}
              disabled={uploading}
              className="bg-red-600 text-white px-2 py-1 font-bold rounded cursor-pointer"
            >Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeProfilePicture;
