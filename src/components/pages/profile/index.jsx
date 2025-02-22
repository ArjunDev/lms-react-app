import React from 'react'
import { NavLink } from 'react-router-dom';

const Profile = () => {
 
  return (
      <div className='flex justify-center items-center w-max absolute bg-gray-800 right-2 top-17 rounded z-50'>
        <div className='flex flex-col justify-center items-center gap-2 h-auto w-auto p-2'>
          <button 
            className='p-1 px-2 rounded cursor-pointer w-full transition-all duration-300 text-gray-300 hover:bg-gray-200 hover:text-gray-900'
          >Become Creator</button>
          <button 
            className='p-1 px-2 rounded cursor-pointer w-full transition-all duration-300 text-gray-300 hover:bg-gray-200 hover:text-gray-900'
          >Change Profile </button>
          <div 
            className='p-1 px-4 rounded cursor-pointer w-full transition-all duration-300 text-gray-300 hover:bg-gray-200 hover:text-gray-900'>
            <NavLink to={'/auth/signin'} className=' flex justify-center items-center'>Sign In</NavLink>
          </div>
        </div>
      </div>
  )
}

export default Profile;