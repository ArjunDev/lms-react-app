import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLogIn } from '../userFormDataSlice';

const SignIn = () => {

  //local form data
  const [formData, setFormData] = useState({
    email: "", 
    password: ""
  });
  const [isDisabled, setIsDisabled ] = useState(true);
  const navigate = useNavigate(); 
  const formDataFromStore = useSelector(state => state.userFormData);
  const dispatch = useDispatch()

   // Update isDisabled based on form data
   useEffect(() => {
    setIsDisabled(!(formData.email && formData.password));
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
    //data from global store
    //console.log("Form Data from store:", formDataFromStore);
    //console.log("Form Data from local:", formData);

    const storeEmail = formDataFromStore.email;
    const storePassword = formDataFromStore.password;

    const {email, password} = formData;

    if(storeEmail === email && storePassword === password){
      //console.log("log in success");
      dispatch(setLogIn());
      navigate('/home');
      setFormData({email: '',password: ''})// Clear local form data
    }else{
      //console.log("log in failed");
      alert('Authentication failed! Please enter a correct Email & Password')
    }
    //setFormData({email: '',password: ''})// Clear local form data
  };

  const gotoSignUpPage = (event) => {
    event.preventDefault();
    navigate('/auth/signup'); 
  }

  return (
    <div className='flex flex-col justify-center items-center min-h-[87vh] bg-gray-900'>
      <div 
        className='flex flex-col justify-center items-center flex-1 bg-gray-900 p-2'>
        <form 
          onSubmit={handleSubmit}
          className='flex flex-col justify-center items-center bg-gray-300 p-4 rounded-2xl gap-4 h-max'>
          <div className='flex justify-center items-center font-bold mb-4 text-2xl'>
            <span>Sign In</span>
          </div>
          <div>
            <label>Email: 
              <input 
                name='email'
                value={formData.email}
                onChange={handleChange}
                className='bg-gray-100 rounded p-1 ml-2'
                type="email"
                placeholder='Enter an email'
              />
            </label>
          </div>
          <div>
            <label>Password: 
              <input 
                name='password'
                value={formData.password}
                onChange={handleChange}
                className='bg-gray-100 rounded p-1 ml-2'
                type="password"
                placeholder='Enter a password' 
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
          <div className='flex justify-center items-center mt-2 mb-2'>
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

export default SignIn;