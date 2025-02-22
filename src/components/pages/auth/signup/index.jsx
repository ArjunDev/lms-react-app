import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLogIn, setUserFormData } from '../userFormDataSlice';

const SignUp = () => {

  //local formdata to display UI
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [isDisabled, setIsDisabled ] = useState(true);
  const navigate = useNavigate(); 
  const dispatch = useDispatch();
  const displayUserFormData = useSelector(state => state.userFormData)
  
   // Update isDisabled based on form data
   useEffect(() => {
    const { name, email, password } = formData;
    setIsDisabled(!(name && email && password)); 
    // Disable if any field is empty
  }, [formData]);
  
  const handleChange = (event) =>{
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value //dynamically updating value bassed on name, require 'name' attribute in html tag
    }));
  }
   
  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    //console.log("Form Data Submitted:", formData);

    //dispatching the data to global store
    dispatch(setUserFormData(formData));
    dispatch(setLogIn());

    // Clear form
    setFormData({
      name: '',
      email: '',
      password: ''
    });

    navigate('/home');
  };

  const gotoSignInPage = (event) => {
    event.preventDefault();
    navigate('/auth/signin'); // Navigate to SignIn page
  }

  //console.log("Global Form Data:", displayUserFormData)

  return (
    <div 
      className='flex flex-col justify-center items-center min-h-[87vh] bg-gray-900'>
      <div 
      className='flex flex-col justify-center items-center flex-1 bg-gray-900 p-2'>
      <form 
        onSubmit={handleSubmit}
        className='flex flex-col justify-center items-center bg-gray-300 p-4 py-6 rounded-2xl gap-4 h-max'>
        <div className='flex justify-center items-center font-bold mb-3 text-2xl'>
          <span>Sign Up</span>
        </div>
        <div>
          <label>Name: 
            <input 
            name='name'
            className='bg-gray-100 rounded p-1 ml-1'
            type="text"
            placeholder='Enter your name'
            value={formData.name}
            onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>Email: 
            <input 
            name='email'
            className='bg-gray-100 rounded p-1 ml-1'
            type="email"
            placeholder='Enter an email'
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        </div>
        <div>
          <label>Password: 
            <input 
            name='password'
            className='bg-gray-100 rounded p-1 ml-1'
            type="password"
            placeholder='Enter a password' 
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        </div>
        <button 
          className={`w-full flex justify-center items-center p-2 rounded-2xl font-bold text-white transition-all ${
          isDisabled
            ? 'bg-gray-900 cursor-not-allowed opacity-50' // Disabled state: Lower opacity & no pointer
            : 'bg-gray-900 cursor-pointer' // Normal state
          }`}
          type='submit'
          disabled={isDisabled}
        >Submit</button>
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