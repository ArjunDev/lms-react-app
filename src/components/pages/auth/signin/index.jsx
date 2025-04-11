import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLogIn } from '../userFormDataSlice';
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth, firebaseDb } from '../../../../firebase';
import { doc, setDoc } from "firebase/firestore";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [isDisabled, setIsDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const usersDataFromStore = useSelector((state) => state.userFormData.users);

  useEffect(() => {
    setIsDisabled(!(formData.email && formData.password));
  }, [formData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    const auth = firebaseAuth;
    const { email, password } = formData;

    try{
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // console.log("auth success:", userCredential.user)
      //
      try{
        const upload = await setDoc(doc(firebaseDb, "cities", "LA"), {
          name: "Los Angeles",
          state: "CA",
          country: "USA"
        });
        console.log("upload success:")
      }catch(error){
        console.log("upload failed:", error.message)
      }
    
      //
      dispatch(setLogIn(formData));
      navigate('/home');
      setFormData({ email: '', password: '' });
    }catch(error){
      // console.log("auth failed:", error.message )
      if(error.message === "Firebase: Error (auth/invalid-credential).")
      setErrorMessage("Invalid credential");
    }

  }

  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   const email = formData.email.toLowerCase(); // Normalize for comparison
  //   const password = formData.password;
  //   const storeUser = usersDataFromStore[email];

  //   // console.log('Trying to log in with email:', email);
  //   // console.log('User found in store:', storeUser);
  //   if (!storeUser) {
  //     alert('User not found. Please check your email.');
  //     return;
  //   }
  //   const { email: storeEmail, password: storePassword } = storeUser;

  //   if (storeEmail === email && storePassword === password) {
  //     dispatch(setLogIn({ email }));
  //     // dispatch(setCurrentUser(storeUser))
  //     navigate('/home');
  //     setFormData({ email: '', password: '' });
  //   } else {
  //     alert('Authentication failed! Please enter the correct Password');
  //   }
  // };

  const gotoSignUpPage = (event) => {
    event.preventDefault();
    navigate('/auth/signup');
  };

  return (
    <div className='flex flex-col justify-center items-center min-h-[87vh] bg-gray-900'>
      <div className='flex flex-col justify-center items-center flex-1 bg-gray-900 p-2'>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col justify-center items-center bg-gray-300 p-4 rounded-2xl gap-4 h-max'
        >
          <div className='flex justify-center items-center font-bold mb-4 text-2xl'>
            <span>Sign In</span>
          </div>

          <div>
            <label>
              Email:
              <input
                name='email'
                value={formData.email}
                onChange={handleChange}
                className='bg-gray-100 rounded p-1 ml-2'
                type='email'
                placeholder='Enter your email'
              />
            </label>
          </div>

          <div>
            <label>
              Password:
              <input
                name='password'
                value={formData.password}
                onChange={handleChange}
                className='bg-gray-100 rounded p-1 ml-2'
                type='password'
                placeholder='Enter your password'
              />
            </label>
          </div>

          <button
            className={`w-full flex justify-center items-center p-2 rounded-2xl font-bold text-white transition-all ${
              isDisabled
                ? 'bg-gray-900 cursor-not-allowed opacity-50'
                : 'bg-gray-900 cursor-pointer'
            }`}
            type='submit'
            disabled={isDisabled}
          >Submit</button>

          <span className='text-red-600 px-1 font-medium'>{errorMessage}</span>

          <div className='flex justify-center items-center mb-2'>
            <span>Don't have an account?</span>
            <button
              onClick={gotoSignUpPage}
              className='font-bold text-blue-600 cursor-pointer ml-2'
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
