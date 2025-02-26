import React from 'react'

const CourseSettings = ({setSettingsData}) => {

  function saveThumbnail(){
    setSettingsData({imageSrc:'image'})
    //console.log('imageSrc: image')
  }

  return (
    <>
      <div className="flex-col flex p-4">
        <span className="font-bold mb-4">Course Thumbnail:</span>
        <div className='border p-4 rounded w-max'>
          <div 
            className="h-30 w-60 border rounded bg-gray-400 items-center justify-center flex"
          >Course thumbnail</div>
          <div 
            className="font-medium flex gap-2 flex-wrap justify-start items-center p-4">
            <button className="bg-gray-900 p-1 px-2 rounded text-gray-50 h-max w-max cursor-pointer"
            >Change</button>
            <button
              className="bg-green-800 p-1 px-2 rounded text-gray-50 h-max w-max cursor-pointer"
              onClick={() => saveThumbnail()}
            >Save</button>
          </div> 
        </div>
      </div>
    </>
  )
}

export default CourseSettings;