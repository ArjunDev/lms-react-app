import React from 'react'
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

  const navigate = useNavigate(); 

  const gotoSignInPage = (event) => {
    event.preventDefault();
    navigate('/auth/signin'); // Navigate to SignIn page
  }

  return (
    <div className='flex flex-col justify-center items-center min-h-[87vh] bg-gray-900'>
      <div 
      className='flex flex-col justify-center items-center flex-1 bg-gray-900'>
      <form 
        className='flex flex-col justify-center items-center bg-gray-300 p-4 py-6 rounded gap-4 h-max'>
        <div className='flex justify-center items-center font-bold mb-3 text-2xl'>
          <span>Sign Up</span>
        </div>
        <div>
          <label htmlFor="name">Name: </label>
          <input 
            className='bg-gray-100 rounded p-1'
            type="text"
            placeholder='Enter your name'
          />
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input 
            className='bg-gray-100 rounded p-1'
            type="email"
            placeholder='Enter an email'
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input 
            className='bg-gray-100 rounded p-1'
            type="password"
            placeholder='Enter a password' />
        </div>
        <div 
          className='w-full bg-gray-800 flex justify-center items-center p-2 rounded-2xl font-bold text-white cursor-pointer hover:bg-gray-600 transition-all'>
          <button>Submit</button>
        </div>
        <div className='flex justify-center items-center'>
          <span>Already have an account? </span>
          
          <button 
            onClick={gotoSignInPage}
            className='font-bold text-blue-600 cursor-pointer ml-2'>Sign In</button>
        </div>
      </form>
      </div>
    </div>
  )
}

export default SignUp