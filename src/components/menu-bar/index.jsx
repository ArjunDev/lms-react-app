import React, { useEffect, useState } from 'react';
import ChangeProfilePicture from './ChangeProfilePicture';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLogOut, setCreatorMode, setStudentMode, setIsCreator, setProfilePicture } from '../pages/auth/userFormDataSlice';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firebaseFirestoreDb } from '../../firebase';

const MenuBar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [profileActive, setProfileActive] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [showUploader, setShowUploader] = useState(false);
  const [showBecomCreatorModal, setShowBecomCreatorModal] = useState(false);
  const [isCreatorModeToggled, setIsCreatorModeToggled] = useState(false);
  const formDataFromStore = useSelector(state => state.userFormData.currentUser);
  const { isLoggedIn, isCreator, creatorMode, studentMode, email, profilePicture } = formDataFromStore;
  const navigate = useNavigate();

  // console.log(profilePicture);
  const handleSignOut = () => {

    setIsCreatorModeToggled(false);//local state
    dispatch(setLogOut());
    navigate("/home");
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

  const handleYes = async() => {

    setProcessing(true);
    const db = firebaseFirestoreDb;

    try{
      const updateUserDbData = await updateDoc(doc(db, "users", email), {isCreator: true})//update only iscreater.

      const docRef = doc(db, "users", email); //Create ref to the document
      const docSnap = await getDoc(docRef);   // Fetch the document

      if(docSnap.exists()){
        const userDbData = docSnap.data();   // Extract data
        // console.log("userDbData:", userDbData);
      }
      setProcessing(false);
      setShowBecomCreatorModal(false);
      dispatch(setIsCreator(true))// redux store action
    }catch(error){
      setProcessing(false);
      setErrorMsg(true)
      // console.log(error.code, error.message);
    }
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
        {/* Profile change logic */}
        <span 
          onClick={handleProfileButton}
          className={
            profileActive 
              ? "text-blue-600 font-medium cursor-pointer" 
              : "text-gray-300 cursor-pointer font-medium"
          }
        >
        {profilePicture ? (
          <img 
            src={profilePicture} 
            alt="Profile" 
            className={`w-8 h-8 rounded-full object-cover border-2 ${
              profileActive ? 'border-blue-600' : 'border-green-300'
            }`}
          />) : (
            <AccountCircleIcon fontSize="medium" />)}
        </span>
      </div>
    </div>
    {profileActive ? <div className='flex justify-center items-center w-max absolute bg-gray-800 right-2 top-17 rounded z-50 shadow-lg'>
      <div className='flex flex-col justify-center items-center gap-2 h-auto w-auto p-2'>
        {isLoggedIn && (
          <div>
            <button
              onClick={() => setShowUploader((prev) => !prev)}
              className='flex p-1 px-2 rounded cursor-pointer w-full transition-all duration-300 text-gray-300 hover:bg-gray-200 hover:text-gray-900'
            >Change Profile</button>
            {showUploader && (
              <ChangeProfilePicture
                onUpload={(url) => {
                  dispatch(setProfilePicture(url))
                // console.log("Received URL:", url);
                  setShowUploader(false);
                }}
                close={() => setShowUploader(false)}
              />)}
          </div>)
        }
        {(!isCreator && isLoggedIn) && (
          <button 
            onClick={handleBecomeCreatorBtn}
            className='p-1 px-2 rounded cursor-pointer w-full transition-all duration-300 text-gray-300 hover:bg-gray-200 hover:text-gray-900'
          >Become Creator</button> 
        )}
        {/* Modal */}
        {showBecomCreatorModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-lg p-4">
          { processing ? <div className="bg-white px-4 py-6 rounded-2xl shadow-2xl text-center sm:p-6">
            <p className="text-lg font-semibold">Are you sure you want to become a creator?</p>
            <p className="text-lg text-green-500 font-bold py-4">Peocessing...</p></div> : 
            <div className="bg-white px-4 py-6 rounded-2xl shadow-2xl text-center sm:p-6">
            <p className="text-lg font-semibold">Are you sure you want to become a creator?</p>
            <div className="mt-4 flex justify-center gap-4">
              <button onClick={handleYes} className="px-4 py-2 bg-green-500 text-white rounded cursor-pointer">Yes</button>
              <button onClick={handleClose} className="px-4 py-2 bg-red-500 text-white rounded cursor-pointer">No</button>
            </div>
            {errorMsg ? <span className='text-red-500 p-1 font-medium'>oops! something went wrong. try again</span> : "" }
            </div>
          }
        </div>)}
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
              className='flex justify-center items-center cursor-pointer'
            >Sign Out</button>
          ) : (
            <NavLink to={'/auth/signin'} className='flex justify-center items-center cursor-pointer'>Sign In</NavLink>
          )}
        </div>
      </div>
    </div> : null}
    </>
  )
}

export default MenuBar