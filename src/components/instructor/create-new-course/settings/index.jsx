import React, { useEffect, useState } from 'react'

const CourseSettings = ({setSettingsData, settingsData}) => {

  const [image, setImage] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [uploading, setUploading] = useState(false);

  // function saveThumbnail(){
  //   setSettingsData({ imageURL: preview });
  //   console.log("Clicked")
  // }
  useEffect(() => {
    if (image) {
      setIsDisabled(false);
    }
  }, [image]);

// //to fill settings  page fields with saved data when move back and forth btw diff pages like ladingpage, curriculum
useEffect(()=>{
  // console.log(settingsData instanceof File)
  if (settingsData instanceof File) {
    setImage(settingsData);
  }
  
},[])
  

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSaveBtn = () => {
    if (!image) {
      alert("Please select an image.");
      return;
    }
    // console.log(image)
    // const formData = new FormData();
    // formData.append("file", image);
    // setSettingsData(formData); // Pass image to parent
    
    setSettingsData(image); // Pass image to parent
    setUploading(false)
  };

  return (
    <div className="flex-col flex p-4 items-center justify-center bg-gray-100 rounded w-max">
      <span className="font-bold mb-2 w-max">Course Thumbnail:</span>
      {image && <img 
        src={URL.createObjectURL(image)} 
        alt="Preview"
        className='flex justify-center items-center h-30 w-60 border rounded overflow-hidden'/>
      }
      <div 
        className="font-medium flex gap-2 flex-row justify-center items-center p-4">
          <label className="cursor-pointer border rounded px-2 py-2 text-gray-500 bg-gray-300 hover:bg-gray-100 inline-block">
          {image ? image.name : "Choose a thumbnail picture"}
          <input 
            className='hidden'
            type="file" 
            accept='image/*' 
            onChange={handleFileChange} 
          />
        </label>
        <div>
          <button
            className={`p-1 px-2 rounded text-gray-50 h-max w-max ${image ? 'bg-gray-900 cursor-pointer' : 'bg-gray-600 cursor-not-allowed'}`}
            onClick={handleSaveBtn}
            disabled={isDisabled}
          >{uploading ? "Saving..." : "Save"}</button>
        </div>
      </div> 
    </div>
  )
}

export default CourseSettings;