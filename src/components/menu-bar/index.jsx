import React from 'react'
import { NavLink } from 'react-router-dom'

const MenuBar = () => {

  return (
    <div 
      className='flex justify-between items-center font-bold p-4 sm:px-10 text-gray-900 bg-gray-50 shadow-md'>
      <div className='flex justify-center items-center gap-3 sm:gap-6'>
        <NavLink 
          to={'home'}
          className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "text-gray-900"}
        >LMS</NavLink>
        <NavLink 
          to={'explore-courses'}
          className={({ isActive }) => isActive ? "text-blue-600 bg-gray-100 p-1 px-3 rounded-2xl" : "text-gray-900 font-medium bg-gray-100 p-1 px-3 rounded-2xl"}
        >Explore Courses</NavLink>
        <NavLink 
          to={'create-new-course'}
          className={({ isActive }) => isActive ? "text-blue-600 bg-gray-100 p-1 px-3 rounded-2xl" : "text-gray-900 font-medium bg-gray-100 p-1 px-3 rounded-2xl"}
        >Create New Course</NavLink>
      </div>
      <div className='flex justify-center items-center gap-3 sm:gap-6'>
        <NavLink 
          to={'my-courses'}
          className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "text-gray-900"}
        >My Courses</NavLink>
        <NavLink 
          to={'profile'}
          className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "text-gray-900"}
        >Profile</NavLink>
      </div>
    </div>
  )
}

export default MenuBar