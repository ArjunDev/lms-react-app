import React from 'react'

const Home = () => {
  return (
    <div className='flex flex-col justify-center items-center p-4 gap-6 h-full w-full'>
      <div className='flex justify-center items-center w-full min-h-96'>
        <div className='flex flex-1 justify-center items-center'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis vitae eaque nobis</p>
        </div>
        <div className='flex flex-1 justify-center items-center rounded-2xl overflow-hidden'>
          <div className='h-96 bg-gray-100 w-full'>card</div>
        </div>
      </div>
      <div 
        className='flex flex-col justify-center items-center gap-4 fixed bottom-10 p-1'>
        <div className='flex items-center justify-start'>
          <span className='flex font-bold text-left text-lg'>Course Categories</span>
        </div>
        <div className='flex flex-1 justify-between items-center gap-4'>
          <button 
            className='flex flex-1 bg-amber-50 rounded text-black text-sm p-1 px-4 cursor-pointer'>Web Development</button>
          <button 
            className='bg-amber-50 rounded text-black text-sm p-1 px-4 cursor-pointer'>Backend Development</button>
          <button 
            className='bg-amber-50 rounded text-black text-sm p-1 px-4 cursor-pointer'>Machine Learning</button>
          <button 
            className='bg-amber-50 rounded text-black text-sm p-1 px-4 cursor-pointer'>Cyber Security</button>
        </div>
      </div>
    </div>
  )
}

export default Home