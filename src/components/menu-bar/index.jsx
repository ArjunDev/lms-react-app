import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { setLogOut, setCreatorMode, setStudentMode, setIsCreator } from '../pages/auth/userFormDataSlice';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';

const MenuBar = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const [profileActive, setProfileActive] = useState(false);
  const [showBecomCreatorModal, setShowBecomCreatorModal] = useState(false);
  const [isCreatorModeToggled, setIsCreatorModeToggled] = useState(false);

  const formDataFromStore = useSelector(state => state.userFormData);
  const isLoggedIn = formDataFromStore.isLoggedIn;
  const isCreator = formDataFromStore.isCreator;
  const creatorMode = formDataFromStore.creatorMode;
  const studentMode = formDataFromStore.studentMode;

  useEffect(() => {
    //console.log(formDataFromStore);
  }, [formDataFromStore]);

  const handleSignOut = () => {
    setIsCreatorModeToggled(false);//local state

    dispatch(setLogOut());
    dispatch(setCreatorMode(false));
    dispatch(setStudentMode(true));
  }
  // Reset profile dropdown upon navigating to auth pages
  useEffect(() => {
    if (location.pathname.startsWith('/auth')) {
      setProfileActive(false);
    }
  }, [location.pathname]);

  const handleProfileButton = () => {
    setProfileActive((prev) => !prev);
  };

  const handleCreatorMode = () => {
    const newState = !isCreatorModeToggled; // Compute new state first
  
    setIsCreatorModeToggled(newState); // Update local state
  
    // Dispatch Redux actions AFTER state update
    dispatch(setStudentMode(!newState)); 
    dispatch(setCreatorMode(newState)); 
  
    //console.log("isCreatorModeToggled", newState);
  };
  
  const handleBecomeCreatorBtn = () => {
    setShowBecomCreatorModal(true);
  };

  const handleClose = () => {
    setShowBecomCreatorModal(false);
  };

  const handleYes = () => {
    setShowBecomCreatorModal(false);
    dispatch(setIsCreator(true))// redux store action
  };
  
  return (
    <>
    <div 
      className='flex justify-between items-center font-bold p-4 sm:px-10 text-gray-900 bg-gray-800 shadow-md'>
      <div className='flex justify-center items-center gap-3 sm:gap-6'>
        <NavLink 
          to={'home'}
          className={({ isActive }) => isActive ? "text-blue-600 bg-gray-50 p-1 px-3 rounded-2xl font-medium duration-300" : "text-gray-300 font-medium transition-all duration-300"}
        >LMS</NavLink>

        {/* render only if logged in user is a Student */}
        {(studentMode && !creatorMode) && <NavLink 
          to={'explore-courses'}
          className={({ isActive }) => isActive ? "text-blue-600 bg-gray-50 p-1 px-2 rounded-2xl font-medium duration-300" : "text-gray-300 font-medium transition-all duration-300"}
        >Explore Courses</NavLink> }
        
        {/* render only if logged in user in in creatorMode */}
        {creatorMode && <NavLink 
          to={'create-new-course'}
          className={({ isActive }) => isActive ? "text-blue-600 font-medium bg-gray-200 p-1 px-3 rounded-2xl" : "text-gray-300 font-medium p-1 px-3"}
        >Create New Course</NavLink> }
      </div>
      <div className='flex justify-center items-center gap-2 sm:gap-6'>
        {(studentMode && !creatorMode) && <NavLink 
          to={'my-courses'}
          className={({ isActive }) => isActive ? "text-blue-600 font-medium bg-gray-50 p-1 px-3 rounded-2xl transition-all duration-300" : "text-gray-300 font-medium p-1 px-3 transition-all duration-300"}
        >My Courses</NavLink>
        }

        {/* render only if logged in user in creatorMode */}
        {creatorMode && <NavLink 
          to={'/published-courses'}
          className={({ isActive }) => isActive ? "text-blue-600 font-medium bg-gray-50 p-1 px-3 rounded-2xl transition-all" : "text-gray-300 font-medium p-1 px-3"}
          >Publised Courses</NavLink> 
        }
         <span 
         onClick={handleProfileButton}
          className={ profileActive ? "text-blue-600 font-medium cursor-pointer" : "text-gray-300 cursor-pointer font-medium" }
          ><AccountCircleIcon fontSize="medium" /></span>
      </div>
    </div>
    {profileActive ? <div className='flex justify-center items-center w-max absolute bg-gray-800 right-2 top-17 rounded z-50'>
      <div className='flex flex-col justify-center items-center gap-2 h-auto w-auto p-2'>
        <button 
          className='p-1 px-2 rounded cursor-pointer w-full transition-all duration-300 text-gray-300 hover:bg-gray-200 hover:text-gray-900'
        >Change Profile</button>
        {(!isCreator && isLoggedIn) && (
          <button 
            onClick={handleBecomeCreatorBtn}
            className='p-1 px-2 rounded cursor-pointer w-full transition-all duration-300 text-gray-300 hover:bg-gray-200 hover:text-gray-900'
          >Become Creator</button> 
        )}
        {/* Modal */}
        {showBecomCreatorModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm p-4">
          <div className="bg-white p-2 py-6 rounded shadow-lg text-center sm:p-6">
            <p className="text-lg font-semibold">Are you sure you want to become a creator?</p>
            <div className="mt-4 flex justify-center gap-4">
              <button onClick={handleYes} className="px-4 py-2 bg-green-500 text-white rounded cursor-pointer">Yes</button>
              <button onClick={handleClose} className="px-4 py-2 bg-red-500 text-white rounded cursor-pointer">No</button>
            </div>
          </div>
        </div>
        )}
        {(isLoggedIn && isCreator) && (
          <button 
            onClick={handleCreatorMode}
            className='p-1 px-2 rounded cursor-pointer w-full transition-all duration-300 text-gray-300 hover:bg-gray-200 hover:text-gray-900'
          >Creator Mode {isCreatorModeToggled ? <ToggleOnIcon fontSize='medium' sx={{ color: 'blue' }} /> : <ToggleOffIcon fontSize='medium' />}
          </button>
        )}
        <div className='p-1 px-4 rounded cursor-pointer w-full transition-all duration-300 text-gray-300 hover:bg-gray-200 hover:text-gray-900'>
          {isLoggedIn ? (
            <button 
              onClick={handleSignOut}
              className='flex justify-center items-center'
            >Sign Out</button>
          ) : (
            <NavLink to={'/auth/signin'} className='flex justify-center items-center'>Sign In</NavLink>
          )}
        </div>
      </div>
    </div> : null}
    </>
  )
}

export default MenuBar