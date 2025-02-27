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
      <div className='flex sm:flex-row flex-wrap justify-center items-center gap-4 sm:gap-4 mt-8'>
      { CoursesList?.map( (item, index) => 
      <div 
        key={index}
        className='flex flex-col justify-center items-center bg-gray-100 p-2 rounded-2xl gap-1.5'>
        <img 
          className='rounded-2xl h-36 w-72 sm:h-50 sm:w-96 flex justify-center items-center object-center'
          src={item.settingsData.imageURL}
        />
        <span 
          className='font-medium'
        >{item.landingPageData.title}</span>
        <span className='text-sm'>Author: ArjunDev</span>
        <button 
          className='px-4 py-1.5 bg-gray-900 rounded-2xl text-white w-[90%] sm:w-full hover:bg-gray-800 cursor-pointer'
        >See details</button>
      </div> 
      )}
      </div>
    </div>
  )
}

export default ExploreCourses