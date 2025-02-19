import React from 'react'
import { useNavigate } from 'react-router-dom';

const SignIn = () => {

  const navigate = useNavigate(); 

  const gotoSignUpPage = (event) => {
    event.preventDefault();
    navigate('/auth/signup'); 
  }

  return (
    <div className='flex flex-col justify-center items-center min-h-[87vh] bg-gray-900'>
      <div 
        className='flex flex-col justify-center items-center flex-1 bg-gray-900'>
        <form 
          className='flex flex-col justify-center items-center bg-gray-300 p-4 rounded gap-4 h-max'>
          <div className='flex justify-center items-center font-bold mb-4 text-2xl'>
            <span>Sign In</span>
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
          <div className='flex justify-center items-center mt-3'>
            <span>Don't have an account? </span>
            <button 
              onClick={gotoSignUpPage}
              className='font-bold text-blue-600 cursor-pointer ml-2'>Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignIn