import React from 'react'

const MyCourses = () => {
  return (
    <div className='flex justify-center items-center h-[87vh] bg-gray-500 gap-4'>
      <div className='flex flex-col justify-center items-center bg-gray-50 p-2 rounded-2xl gap-1'>
        <div className='bg-gray-200 rounded-2xl h-50 w-50 flex justify-center items-center'>Course Image</div>
        <span>Title</span>
        <span>Author: ABC</span>
        <button className='px-4 py-1 bg-gray-900 rounded-2xl text-white w-full hover:bg-gray-800 cursor-pointer'>Start Watching</button>
      </div>
      <div className='flex flex-col justify-center items-center bg-gray-50 p-2 rounded-2xl gap-1'>
        <div className='bg-gray-200 rounded-2xl h-50 w-50 flex justify-center items-center'>Course Image</div>
        <span>Title</span>
        <span>Author: ABC</span>
        <button 
          className='px-4 py-1 bg-gray-900 rounded-2xl text-white w-full hover:bg-gray-800 cursor-pointer'>Start Watching</button>
      </div>
    </div>
  )
}

export default MyCourses;