import React from 'react'

const Home = () => {

  
  return (
    <div className='flex flex-col justify-center items-center p-4 py-8 gap-6 h-full w-full sm:p-16'>
      <div className='flex justify-center items-center w-full min-h-90 bg-gray-300 rounded-2xl'>
        <div className='flex flex-1 justify-center items-center'>
          <p className='text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis vitae eaque nobis</p>
        </div>
        <div className='flex flex-1 justify-center items-center rounded-2xl overflow-hidden'>
          <div className='h-90 bg-gray-500 w-full flex
          justify-center items-center font-bold text-white p-2'>Image</div>
        </div>
      </div>
      <div 
        className='flex flex-col justify-center items-center gap-4 w-full bg-gray-300 flex-1 rounded-2xl p-4 sm:p-8'>
        <div className='flex items-start justify-center'>
          <span className='flex font-bold text-left text-lg'>Course Categories</span>
        </div>
        <div className='flex flex-1 justify-center items-center gap-2 flex-wrap'>
          <button 
            className='bg-gray-200 hover:bg-gray-100 rounded text-black text-sm p-1 px-4 cursor-pointer transition-all'>Web Development</button>
          <button 
            className='bg-gray-200 hover:bg-gray-100 rounded text-black text-sm p-1 px-4 cursor-pointer transition-all'>Backend Development</button>
          <button 
            className='bg-gray-200 hover:bg-gray-100 rounded text-black text-sm p-1 px-4 cursor-pointer transition-all'>Machine Learning</button>
          <button 
            className='bg-gray-200 hover:bg-gray-100 rounded text-black text-sm p-1 px-4 cursor-pointer transition-all'>Cyber Security</button>
        </div>
      </div>
    </div>
  )
}

export default Home