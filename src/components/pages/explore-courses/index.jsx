import React from 'react'

const ExploreCourses = () => {
  return (
    <div className='flex justify-start items-center min-h-[87vh] bg-gray-500 gap-4'>
      <div className='flex flex-col justify-start items-center p-2 gap-4 bg-gray-50 h-screen min-w-max'>
        <span className='font-bold'>Course Categories</span>
        <button 
            className='bg-gray-200 hover:bg-gray-100 rounded text-black text-sm p-1 px-4 cursor-pointer transition-all'
        >Web Development</button>
                <button 
            className='bg-gray-200 hover:bg-gray-100 rounded text-black text-sm p-1 px-4 cursor-pointer transition-all'
        >Cyber Security</button>
                <button 
            className='bg-gray-200 hover:bg-gray-100 rounded text-black text-sm p-1 px-4 cursor-pointer transition-all'
        >Cyber Security</button>
                <button 
            className='bg-gray-200 hover:bg-gray-100 rounded text-black text-sm p-1 px-4 cursor-pointer transition-all'
        >Cyber Security</button>
      </div>
      <div className='flex sm:flex-row flex-wrap justify-center items-center gap-2 sm:gap-4 mt-4 overflow-clip'>
        <div className='flex flex-col justify-center items-center bg-gray-50 p-2 rounded-2xl gap-1'>
          <div className='bg-gray-200 rounded-2xl h-40 w-40 sm:h-50 sm:w-50 flex justify-center items-center'>Course Image</div>
          <span>Title</span>
          <span>Author: ABC</span>
          <button className='px-4 py-1 bg-gray-900 rounded-2xl text-white w-full hover:bg-gray-800 cursor-pointer'>Start Watching</button>
        </div>
        <div className='flex flex-col justify-center items-center bg-gray-50 p-2 rounded-2xl gap-1'>
          <div className='bg-gray-200 rounded-2xl h-40 w-40 sm:h-50 sm:w-50 flex justify-center items-center'>Course Image</div>
          <span>Title</span>
          <span>Author: ABC</span>
          <button 
            className='px-4 py-1 bg-gray-900 rounded-2xl text-white w-full hover:bg-gray-800 cursor-pointer'>Start Watching</button>
        </div>
        <div className='flex flex-col justify-center items-center bg-gray-50 p-2 rounded-2xl gap-1'>
          <div className='bg-gray-200 rounded-2xl h-40 w-40 sm:h-50 sm:w-50 flex justify-center items-center'>Course Image</div>
          <span>Title</span>
          <span>Author: ABC</span>
          <button 
            className='px-4 py-1 bg-gray-900 rounded-2xl text-white w-full hover:bg-gray-800 cursor-pointer'>Start Watching</button>
        </div>
      </div>
    </div>
  )
}

export default ExploreCourses