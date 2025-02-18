import React from 'react'
import Curiculum from './curriculum';
import { useNavigate } from 'react-router-dom';

const CreateNewCourse = () => {
  const navigate = useNavigate(); 

  function handleCancelBtn() {
    navigate('/home');
  }
  return (
    <div className="flex flex-col justify-start items-start h-screen bg-gray-100 gap-4">
      <div className="flex justify-between items-center bg-gray-100 p-4 sm:p-6 w-full shadow-lg">
        <div className="flex justify-center items-center font-bold">
          <span>Create a new course</span>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={handleCancelBtn}
            className="bg-gray-800 text-amber-50 px-3 py-1 cursor-pointer rounded hover:bg-gray-700 transition">
            Cancel
          </button>
          <button className="bg-gray-800 text-amber-50 px-3 py-1 cursor-pointer rounded hover:bg-gray-700 transition">
            Publish
          </button>
        </div>
      </div>
      <div className='flex flex-col justify-start items-start border p-2 w-full h-full rounded m-1'>
        <div className='flex flex-col justify-start items-start p-2 px-6 m-2 rounded bg-gray-50 shadow-md'>
          <div className='flex gap-4'>
            <button className='bg-gray-200 p-1 px-2 rounded cursor-pointer'>Curriculum</button>
            <button className='bg-gray-200 p-1 px-2 rounded cursor-pointer'>Landing Page</button>
            <button className='bg-gray-200 p-1 px-2 rounded cursor-pointer'>Settings</button>
          </div>
        </div>
        <div className='w-full h-full shadow-md m-2'>
            <Curiculum/>
          </div>
        </div>
    </div>
  )
}

export default CreateNewCourse;