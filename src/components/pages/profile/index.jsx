import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setLogOut } from '../auth/userFormDataSlice';

const Profile = () => {
 
  const dispatch = useDispatch();
  const isLoggedInFromStore = useSelector(state => state.userFormData.isLoggedIn);
  const isCreatorFromStore = useSelector(state => state.userFormData.isCreator);


  return (
      <div className='flex justify-center items-center w-max absolute bg-gray-800 right-2 top-17 rounded z-50'>
        <div className='flex flex-col justify-center items-center gap-2 h-auto w-auto p-2'>
          <button 
            className='p-1 px-2 rounded cursor-pointer w-full transition-all duration-300 text-gray-300 hover:bg-gray-200 hover:text-gray-900'
          >Change Profile</button>
          {(!isCreatorFromStore && isLoggedInFromStore) ? 
          <button 
            className='p-1 px-2 rounded cursor-pointer w-full transition-all duration-300 text-gray-300 hover:bg-gray-200 hover:text-gray-900'
          >Become Creator</button> : ''}
          {(isLoggedInFromStore && isCreatorFromStore) ?
          <button 
            className='p-1 px-2 rounded cursor-pointer w-full transition-all duration-300 text-gray-300 hover:bg-gray-200 hover:text-gray-900'
          >Creator Mode</button> : ''}
          <div 
            className='p-1 px-4 rounded cursor-pointer w-full transition-all duration-300 text-gray-300 hover:bg-gray-200 hover:text-gray-900'>
            {isLoggedInFromStore ? 
              <button 
                onClick={()=> dispatch(setLogOut())}
                className='flex justify-center items-center'
                >Sign Out</button> : 
              <NavLink to={'/auth/signin'} className='flex justify-center items-center'>Sign In</NavLink> }
          </div>
        </div>
      </div>
  )
}

export default Profile;