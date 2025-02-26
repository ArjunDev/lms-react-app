import React from 'react'
import { useSelector } from 'react-redux';


const PublishedCourses = () => {
  const publsihedCourses = useSelector(state => state.userFormData.publishedCourses);
  const isLoggedIn = useSelector(state => state.userFormData.isLoggedIn);
  const isCreator = useSelector(state => state.userFormData.isCreator);
  
  return (
    <div className='flex flex-col justify-center items-center h-full bg-gray-900 gap-4'>
    <div className='flex sm:flex-row flex-wrap justify-center items-start gap-5 sm:gap-5 mt-4 h-full p-4'>
    {(isCreator && isLoggedIn && publsihedCourses.length > 0) ?publsihedCourses.map((item, index) => 
      <div 
        key={index}
        className='flex flex-col justify-center items-center bg-gray-50 p-2 rounded-2xl gap-1.5'>
        <img 
          src={item.settingsData.imageURL}
          className='bg-gray-200 rounded-2xl h-36 w-72 sm:h-50 sm:w-96 flex justify-center items-center object-center'
        />
        <span className='font-medium'>Title: {item.landingPageData.title}</span>
        <span>Author: </span>
        <button className='px-4 py-1.5 bg-gray-900 rounded-2xl text-white w-[90%] sm:w-full hover:bg-gray-800 cursor-pointer'>See details</button>
      </div> 
    ) : <div 
          className='flex justify-center items-center font-bold text-gray-50'>You haven't published any courses!</div>}
    </div>
  </div>
  )
}

export default PublishedCourses;

