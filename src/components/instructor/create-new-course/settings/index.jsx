import React, { useEffect, useState } from 'react'

const CourseSettings = ({setSettingsData}) => {

  const [preview, setPreview] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);


  function saveThumbnail(){
    setSettingsData({ imageURL: preview });
  }

  const handleImageUploader = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file)
      setPreview(imageURL); // Create a temporary URL for preview
    }
  };

  useEffect(()=>{
    setIsDisabled(false)
  },[preview])

  return (
    <div className="flex-col flex p-4 items-start justify-center">
      <span className="font-bold mb-4 w-max">Course Thumbnail:</span>
      {preview && <img 
        src={preview} 
        alt="Preview"
        className='flex justify-center items-center h-30 w-60 border rounded overflow-hidden' />
      }
      <div 
        className="font-medium flex gap-2 flex-wrap justify-start items-center p-4">
        <input 
          className='border cursor-pointer rounded px-1 w-[70%]'
          type="file" 
          accept='image/*' 
          onChange={handleImageUploader} 
        />
        <button
          className={` p-1 px-2 rounded text-gray-50 h-max w-max ${isDisabled ? 'bg-gray-600 cursor-not-allowed' : 'bg-gray-900 cursor-pointer' }`}
          onClick={() => saveThumbnail()}
          disabled={isDisabled}
        >Save</button>
      </div> 
    </div>
  )
}

export default CourseSettings;