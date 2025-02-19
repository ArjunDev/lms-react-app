import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const MenuBar = () => {

  const [profileActive, setProfileActive] = useState(false);
  const location = useLocation();

  // Reset profile dropdown when navigating to auth pages
  useEffect(() => {
    if (location.pathname.startsWith('/auth')) {
      setProfileActive(false);
    }
  }, [location.pathname]);

  const handleProfileButton = () => {
    setProfileActive((prev) => !prev);
  };
    

  return (
    <div 
      className='flex justify-between items-center font-bold p-4 sm:px-10 text-gray-900 bg-gray-200 shadow-md'>
      <div className='flex justify-center items-center gap-3 sm:gap-6'>
        <NavLink 
          to={'home'}
          className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "text-gray-900"}
        >LMS</NavLink>
        <NavLink 
          to={'explore-courses'}
          className={({ isActive }) => isActive ? "text-blue-600 bg-gray-100 p-1 px-3 rounded-2xl hover:font-bold" : "text-gray-900 font-medium bg-gray-100 p-1 px-3 rounded-2xl transition-all"}
        >Explore Courses</NavLink>
        <NavLink 
          to={'create-new-course'}
          className={({ isActive }) => isActive ? "text-blue-600 bg-gray-100 p-1 px-3 rounded-2xl hover:font-bold" : "text-gray-900 font-medium bg-gray-100 p-1 px-3 rounded-2xl  transition-all"}
        >Create New Course</NavLink>
      </div>
      <div className='flex justify-center items-center gap-3 sm:gap-6'>
        <NavLink 
          to={'my-courses'}
          className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "text-gray-900"}
        >My Courses</NavLink>
        {/* <NavLink 
          to={'profile'}
          className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "text-gray-900"}
        >Profile</NavLink> */}
         <span 
         onClick={handleProfileButton}
          className={ profileActive ? "text-blue-600 font-bold cursor-pointer" : "text-gray-900 cursor-pointer" }
          >Profile</span>
      </div>
      { profileActive ? 
      <div className='flex justify-center items-center w-max absolute bg-gray-300 right-1 translate-y-full rounded z-50 mr-1'>
        <div className='flex flex-col justify-center items-start gap-2 h-auto w-auto p-2'>
          <button 
            className='p-1 px-2 rounded cursor-pointer w-full transition-all hover:bg-gray-200'
          >Become a instructor</button>
          <button 
            className='p-1 px-2 rounded cursor-pointer w-full transition-all hover:bg-gray-200'
          >Change profile </button>
          <div 
            className='flex justify-center p-1 px-2 rounded cursor-pointer w-full transition-all hover:bg-gray-200'>
            <NavLink to={'/auth/signin'}>Sign In</NavLink>
          </div>
        </div>
      </div> : null}
    </div>
  )
}

export default MenuBar