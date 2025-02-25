// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { NavLink } from 'react-router-dom';
// import { setLogOut, setIsStudent, setCreatorMode } from '../auth/userFormDataSlice';
// import ToggleOffIcon from '@mui/icons-material/ToggleOff';
// import ToggleOnIcon from '@mui/icons-material/ToggleOn';

// const Profile = () => {
//   const [isActive, setIsActive] = useState(true);
//   const dispatch = useDispatch();
//   const isLoggedIn = useSelector(state => state.userFormData.isLoggedIn);
//   const isCreator = useSelector(state => state.userFormData.isCreator);
//   const isStudent = useSelector(state => state.userFormData.isStudent);
//   const creatorMode = useSelector(state => state.userFormData.creatorMode);

//   // Ensure correct state when component mounts
//   useEffect(() => {
//     if (isCreator && isLoggedIn) {
//       setIsActive(true);
//       dispatch(setCreatorMode(true));
//       dispatch(setIsStudent(false));
//     }
//   }, [isCreator, isLoggedIn, dispatch]);

//   const handleCreatorMode = () => {
//     const newActiveState = !isActive;
//     setIsActive(newActiveState);
//     dispatch(setCreatorMode(newActiveState));
//     dispatch(setIsStudent(!newActiveState)); // If active, student = false; if inactive, student = true
//   };

//   return (
//     <div className='flex justify-center items-center w-max absolute bg-gray-800 right-2 top-17 rounded z-50'>
//       <div className='flex flex-col justify-center items-center gap-2 h-auto w-auto p-2'>
//         <button 
//           className='p-1 px-2 rounded cursor-pointer w-full transition-all duration-300 text-gray-300 hover:bg-gray-200 hover:text-gray-900'
//         >Change Profile</button>

//         {(!isCreator && isLoggedIn) && (
//           <button 
//             className='p-1 px-2 rounded cursor-pointer w-full transition-all duration-300 text-gray-300 hover:bg-gray-200 hover:text-gray-900'
//           >Become Creator</button>
//         )}

//         {(isLoggedIn && isCreator) && (
//           <button 
//             onClick={handleCreatorMode}
//             className='p-1 px-2 rounded cursor-pointer w-full transition-all duration-300 text-gray-300 hover:bg-gray-200 hover:text-gray-900'
//           >
//             Creator Mode {isActive ? <ToggleOnIcon fontSize='medium' sx={{ color: 'blue' }} /> : <ToggleOffIcon fontSize='medium' />}
//           </button>
//         )}

//         <div className='p-1 px-4 rounded cursor-pointer w-full transition-all duration-300 text-gray-300 hover:bg-gray-200 hover:text-gray-900'>
//           {isLoggedIn ? (
//             <button 
//               onClick={() => dispatch(setLogOut())}
//               className='flex justify-center items-center'
//             >Sign Out</button>
//           ) : (
//             <NavLink to={'/auth/signin'} className='flex justify-center items-center'>Sign In</NavLink>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
