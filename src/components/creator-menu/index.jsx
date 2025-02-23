import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import Profile from '../pages/profile';
import { useSelector } from 'react-redux';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const MenuBar = () => {
  const location = useLocation();
  const [profileActive, setProfileActive] = useState(false);

  const formDataFromStore = useSelector(state => state.userFormData);
  const creator = formDataFromStore.isCreator;
  const student = formDataFromStore.isStudent;
  
  //console.log(formDataFromStore)

  // Reset profile dropdown upon navigating to auth pages
  useEffect(() => {
    if (location.pathname.startsWith('/auth')) {
      setProfileActive(false);
    }
  }, [location.pathname]);

  const handleProfileButton = () => {
    setProfileActive((prev) => !prev);
  };
    
  return (
    <>
    <div 
      className='flex justify-between items-center font-bold p-4 sm:px-10 text-gray-900 bg-gray-800 shadow-md'>
      <div className='flex justify-center items-center gap-3 sm:gap-6'>
        <NavLink 
          to={'home'}
          className={({ isActive }) => isActive ? "text-blue-600 bg-gray-200 p-1 px-3 rounded-2xl font-medium duration-300" : "text-gray-300 font-medium transition-all duration-300"}
        >LMS</NavLink>
        {/* render only if logged in user is a Student */}
        {/* {student && <NavLink 
          to={'explore-courses'}
          className={({ isActive }) => isActive ? "text-blue-600 bg-gray-200 p-1 px-2 rounded-2xl font-medium duration-300" : "text-gray-300 font-medium transition-all duration-300"}
        >Explore Courses</NavLink> } */}
        {/* render only if logged in user is a Creator */}
        {creator && <NavLink 
          to={'create-new-course'}
          className={({ isActive }) => isActive ? "text-blue-600 font-medium bg-gray-200 p-1 px-3 rounded-2xl" : "text-gray-300 font-medium p-1 px-3"}
        >Create New Course</NavLink> }
      </div>
      <div className='flex justify-center items-center gap-2 sm:gap-6'>
        {/* <NavLink 
          to={'my-courses'}
          className={({ isActive }) => isActive ? "text-blue-600 font-medium bg-gray-200 p-1 px-3 rounded-2xl transition-all duration-300" : "text-gray-300 font-medium p-1 px-3 transition-all duration-300"}
        >My Courses</NavLink> */}
        {/* render only if logged in user is a Creator */}
        {creator && <NavLink 
          to={'/published-courses'}
          className={({ isActive }) => isActive ? "text-blue-600 font-medium bg-gray-200 p-1 px-3 rounded-2xl transition-all" : "text-gray-300 font-medium p-1 px-3"}
          >Publised Courses</NavLink> 
        }
         <span 
         onClick={handleProfileButton}
          className={ profileActive ? "text-blue-600 font-medium cursor-pointer" : "text-gray-300 cursor-pointer font-medium" }
          ><AccountCircleIcon fontSize="medium" /></span>
      </div>
    </div>
    {profileActive ? <Profile setProfileActive={setProfileActive}/> : null}
    </>
  )
}

export default MenuBar