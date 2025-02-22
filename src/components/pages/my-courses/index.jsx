import React from 'react';
import CoursesList from '../../courses-list';
import { useSelector } from 'react-redux';

const MyCourses = () => {

  //getting  myCourse data from global store
  const myMcoursesDataFromStore = useSelector(state=> state.userFormData.myCourses);
  const isLoggedInFromStore = useSelector(state=> state.userFormData.isLoggedIn);

  //console.log(myMcoursesDataFromStore)

  return (
    <div className='flex sm:flex-row justify-center items-start h-full bg-gray-900 sm:gap-4 gap-x-4 gap-y-0 overflow-y-scroll p-4 py-6'>
      <div className='flex sm:flex-row flex-wrap justify-center items-center gap-4 sm:gap-4 mt-4'>
      { (isLoggedInFromStore && myMcoursesDataFromStore) ? myMcoursesDataFromStore.map( (item) => 
      <div 
        key={item.id}
        className='flex flex-col justify-center items-center bg-gray-50 p-2 rounded-2xl gap-2'>
        <div className='bg-gray-200 rounded-2xl h-30 w-full sm:h-50 sm:w-50 flex justify-center items-center'>{item.image}</div>
        <span className='font-medium'>{item.title}</span>
        <span>Author: {item.author}</span>
        <button className='px-4 py-1 bg-gray-900 rounded-2xl text-white w-max sm:w-full hover:bg-gray-800 cursor-pointer'>Start Watching</button>
      </div>) : 
      <div className='flex justify-center items-start mt-10 font-bold text-gray-50'>Please Sign In to access your courses!</div>}
      </div>
    </div>
  )
}

export default MyCourses;