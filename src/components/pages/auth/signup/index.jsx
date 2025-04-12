import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSignUp } from '../userFormDataSlice';
import { createUserWithEmailAndPassword } from "firebase/auth"
import { setDoc, doc } from "firebase/firestore"
import { firebaseAuth, firebaseFirestoreDb } from '../../../../firebase';

const SignUp = () => {
  //local formdata to display UI
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isDisabled, setIsDisabled ] = useState(true);
  const [loading, setLoading ] = useState(false);
  const navigate = useNavigate(); 
  const dispatch = useDispatch();
  
   // Update isDisabled based on form data
  useEffect(() => {
    const { name, email, password } = formData;
    setIsDisabled(!(name && email && password));// Disable submit button if any field is empty
  }, [formData]);
  
  const handleChange = (event) =>{
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value //dynamically updating value bassed on name, require 'name' attribute in html tag
    }));
  }

  const defaultUserData = {
    name: "",
    email: "",
    // password: "",
    isStudent: true,
    studentMode: true,
    isCreator: false,
    creatorMode: false,
    isLoggedIn: true,
    myCourses: [],
    publishedCourses: [],
  };

  const handleSubmit = async(event) =>{
    event.preventDefault();
    //local formdata
    const { name, email, password } = formData;
    const auth = firebaseAuth;
    const db = firebaseFirestoreDb;
    const userData = { 
      name: name, 
      email: email 
    }
    const data = {...defaultUserData, ...userData}
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password, );
      const userEmail = userCredential.user.email;

      //to add new user data to db collection "users"  
      const userDataFromFirestore = await setDoc(doc(db, "users", userEmail), data); 

      dispatch(setSignUp(data));
      // Clear form
      setFormData({
        name: '',
        email: '',
        password: ''
      });
      setLoading(false);
      navigate('/home'); // Navigate to home page
    } catch (error) {
      // Show error message to user
        setLoading(false);
        console.log(error);
        if(error.message === "Firebase: Error (auth/email-already-in-use)."){
          setErrorMessage("Email id already exist! Please Sign In")
        }
    }
  }

  const gotoSignInPage = (event) => {
    event.preventDefault();
    navigate('/auth/signin'); // Navigate to SignIn page
  }

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
            minLength={8}
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
        >{loading ? "Submitting..." : "Submit"}</button>
        <span 
          className='text-red-600 p-1 font-medium'
        >{errorMessage}</span>

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