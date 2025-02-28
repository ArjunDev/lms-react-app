import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const ExploreCourses = () => {
  
  const PublishedCoursesFromStore = useSelector(state=> state.userFormData.publishedCourses);

  //console.log(PublishedCoursesFromStore)
  return (
    <div className='flex flex-col justify-start items-center h-full bg-gray-900 gap-4'>
      <div className='flex sm:flex-row flex-wrap justify-center items-center gap-4 sm:gap-4 mt-8'>
      { PublishedCoursesFromStore?.map( (item, index) => 
      <div 
        key={index}
        className='flex flex-col justify-center items-center bg-gray-100 p-2 rounded-2xl gap-1.5'>
        <img 
          className='rounded-2xl h-36 w-72 sm:h-50 sm:w-96 flex justify-center items-center object-center shadow-md'
          src={item.settingsData.imageURL}
        />
        <span 
          className='font-medium'
        >{item.landingPageData.title}</span>
        <span className='text-sm'>Author: ArjunDev</span>
        <Link 
          className='px-4 py-1.5 bg-gray-900 rounded-2xl text-white w-[90%] sm:w-full hover:bg-gray-800 cursor-pointer text-center'
          to={`course/${item.landingPageData.courseId}`}
        >See details</Link>
      </div> 
      )}
      </div>
    </div>
  )
}

export default ExploreCourses