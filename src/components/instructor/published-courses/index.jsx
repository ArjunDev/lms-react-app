import React from 'react'
import { useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const PublishedCourses = () => {
  const currentUserPublsihedCourses = useSelector(state => state.userFormData.currentUser.publishedCourses);
  const isLoggedIn = useSelector(state => state.userFormData.currentUser.isLoggedIn);
  const isCreator = useSelector(state => state.userFormData.currentUser.isCreator);
  
  return (
    <div className='flex flex-col justify-center items-center h-full bg-gray-900 gap-4'>
    <div className='flex sm:flex-row flex-wrap justify-center items-start gap-5 sm:gap-5 mt-4 h-full p-4'>
    {(isCreator && isLoggedIn && currentUserPublsihedCourses.length > 0) ?currentUserPublsihedCourses.map((item, index) => 
      <div 
        key={index}
        className='flex flex-col justify-center items-center bg-gray-50 p-3 rounded-2xl gap-1.5'
      >
        <img 
          src={item.settingsData}
          className='w-68 h-32 rounded-2xl object-cover border-1 shadow'
        />
        <span className='font-medium'>{item.landingPageData.title}</span>
        {/* <span>Author: </span> */}
        <div className='flex gap-4 mt-1'>
          <button className='px-8 py-1 text-blue-600 bg-gray-300 rounded-2xl w-[90%] sm:w-full hover:bg-gray-800 cursor-pointer'><EditIcon fontSize='medium'/></button>

          <button className='px-8 text-red-600 bg-gray-300 rounded-2xl w-[90%] sm:w-full hover:bg-gray-800 cursor-pointer'><DeleteIcon fontSize='medium'/></button>
        </div>
      </div> 
    ) : <div 
          className='flex justify-center items-center font-bold text-gray-50'>You haven't published any courses!</div>}
    </div>
  </div>
  )
}

export default PublishedCourses;

