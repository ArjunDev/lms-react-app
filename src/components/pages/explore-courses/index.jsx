import React from 'react'
import CoursesList from '../../courses-list'

const ExploreCourses = () => {

  return (
    <div className='flex flex-col justify-start items-center h-full bg-gray-900 gap-4'>
      {/* <div className='flex justify-around items-center p-2 gap-2 bg-gray-600 h-10 min-w-full'>
        <span className='font-medium mb-3 text-sm text-gray-50 text-center'>Course Categories</span>
        <button 
            className='bg-gray-200 hover:bg-gray-100 rounded text-black text-xs p-1 cursor-pointer transition-all'
        >Web Development</button>
      </div> */}
      <div className='flex sm:flex-row flex-wrap justify-center items-center gap-3 sm:gap-4 mt-8'>
      { CoursesList?.map( (item) => 
      <div 
        key={item.id}
        className='flex flex-col justify-center items-center bg-gray-50 p-2 rounded-2xl gap-1.5'>
        <div className='bg-gray-200 rounded-2xl h-30 w-35 sm:h-50 sm:w-50 flex justify-center items-center'>{item.image}</div>
        <span className='font-medium'>{item.title}</span>
        <span>Author: {item.author}</span>
        <button className='px-4 py-1 bg-gray-900 rounded-2xl text-white w-max sm:w-full hover:bg-gray-800 cursor-pointer'>See details</button>
      </div> 
      )}
      </div>
    </div>
  )
}

export default ExploreCourses