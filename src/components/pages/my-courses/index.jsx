import React from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

const MyCourses = () => {

  //getting  myCourse data from global store
  const myMcoursesDataFromStore = useSelector(state=> state.userFormData.currentUser.myCourses);
  const isLoggedInFromStore = useSelector(state=> state.userFormData.currentUser.isLoggedIn);

//console.log(myMcoursesDataFromStore)

  // Check if all objects have empty values
  const isEmpty = myMcoursesDataFromStore.every(item => 
    Object.values(item).every(value => value === '')
  );

  return (
    <div className='flex sm:flex-row justify-center items-start h-full bg-gray-900 sm:gap-4 gap-x-4 gap-y-0 overflow-y-scroll p-4 py-6'>
      <div className='flex sm:flex-row flex-wrap justify-center items-center gap-4 sm:gap-4 mt-4'>
      { (isLoggedInFromStore && !isEmpty) ? myMcoursesDataFromStore?.map( (item) => 
      <div 
        key={item.landingPageData.courseId}
        className='flex flex-col justify-center items-center bg-gray-50 p-2 rounded-2xl gap-3'>
        <img 
          className='rounded-2xl h-36 w-72 sm:h-50 sm:w-96 flex justify-center items-center object-center'
          src={item.settingsData}
        />
        <span className='font-medium'>{item.title}</span>
        <Link 
          className='px-4 py-1.5 bg-gray-900 rounded-2xl text-white w-[90%] sm:w-full hover:bg-gray-800 cursor-pointer text-center'
          to={`watch/${item.landingPageData.courseId}`}
        >start watching</Link>
      </div>) : ''}

      {isLoggedInFromStore ? '' : <span className='flex justify-center items-start mt-10 font-bold text-gray-200'>Please<NavLink to={'/auth/signin'} className='ml-2 mr-2 text-blue-600 underline'>Sign In</NavLink> to access your courses!</span>}

      {(isLoggedInFromStore && isEmpty) ? <span className='flex justify-center items-start mt-30 font-bold text-gray-200 text-center'>You haven't purhased any courses!<NavLink to={'/explore-courses'} className='ml-2 mr-2 text-blue-600 underline'>Explore</NavLink></span> : ''}
      </div>
    </div>
  )
}

export default MyCourses;