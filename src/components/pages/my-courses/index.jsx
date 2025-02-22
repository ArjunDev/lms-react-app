import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const MyCourses = () => {

  //getting  myCourse data from global store
  const myMcoursesDataFromStore = useSelector(state=> state.userFormData.myCourses);
  const isLoggedInFromStore = useSelector(state=> state.userFormData.isLoggedIn);

  //console.log(myMcoursesDataFromStore)

  return (
    <div className='flex sm:flex-row justify-center items-start h-full bg-gray-900 sm:gap-4 gap-x-4 gap-y-0 overflow-y-scroll p-4 py-6'>
      <div className='flex sm:flex-row flex-wrap justify-center items-center gap-4 sm:gap-4 mt-4'>
      { (isLoggedInFromStore && myMcoursesDataFromStore.length > 0) ? myMcoursesDataFromStore?.map( (item) => 
      <div 
        key={item.id}
        className='flex flex-col justify-center items-center bg-gray-50 p-2 rounded-2xl gap-2'>
        <div className='bg-gray-200 rounded-2xl h-30 w-full sm:h-50 sm:w-50 flex justify-center items-center'>{item.image}</div>
        <span className='font-medium'>{item.title}</span>
        <span>Author: {item.author}</span>
        <button className='px-4 py-1 bg-gray-900 rounded-2xl text-white w-max sm:w-full hover:bg-gray-800 cursor-pointer'>Start Watching</button>
      </div>) : ''}
      {isLoggedInFromStore ? '' : <span className='flex justify-center items-start mt-10 font-bold text-gray-200'>Please<NavLink to={'/auth/signin'} className='ml-2 mr-2 text-blue-600 underline'>Sign In</NavLink> to access your courses!</span>}
      {(isLoggedInFromStore && myMcoursesDataFromStore.length === 0) ? <span className='flex justify-center items-start mt-30 font-bold text-gray-200 text-center'>You haven't purhased any courses!<NavLink to={'/explore-courses'} className='ml-2 mr-2 text-blue-600 underline'>Explore</NavLink></span> : ''}
      </div>
    </div>
  )
}

export default MyCourses;