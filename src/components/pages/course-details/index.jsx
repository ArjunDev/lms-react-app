import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setMyCourses } from '../auth/userFormDataSlice';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import { doc, getDoc, arrayUnion, updateDoc } from "firebase/firestore";
import { firebaseFirestoreDb } from '../../../firebase';

const CourseDetails = () => {

  const { id } = useParams(); // Extract 'id' from URL
  const [showBuyCourseModal, setShowBuyCourseModal] = useState(false);
  const [processing, setProcessing] = useState(false);
  const globalCourses = useSelector(state => state.globalCourses.courses)
  const MyCoursesFromCurrentUser = useSelector(state=> state.userFormData.currentUser.myCourses);
  const currentUser = useSelector(state => state.userFormData.currentUser)
  const email = useSelector(state => state.userFormData.currentUser.email)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Find the selected course based on 'id'
  const course = globalCourses?.find(item => item.landingPageData.courseId === id);

  // console.log("Course:", course);
  
  //check whether course is already exist in user My Courses
  const isCourseExists = MyCoursesFromCurrentUser.some(course => course.landingPageData.courseId === id)

  // console.log(isCourseExists)

  if (!course) {
    return <div className="text-center text-red-500 font-bold mt-28">Course Not Found!</div>;
  }

  const handleBuyNowBtn = () =>{

    if(!currentUser.isLoggedIn){
      navigate('/auth/signin');
    }

    setShowBuyCourseModal(true);
    //console.log(course);
  }

  const handleStartWatchingBtn = () =>{
    navigate(`/my-courses/watch/${id}`)
  }

  const handleCancel = () => {
    setShowBuyCourseModal(false);
  };

  const handleProceed = async() => {

    setProcessing(true);

    if(!currentUser.isLoggedIn){
      navigate('/auth/signin');
    }else{

    const db = firebaseFirestoreDb;
    try{
      const docRef = doc(db, "users", email);
      const updateUserDbData = await updateDoc(docRef, {
        myCourses: arrayUnion(course)});

      const docSnap = await getDoc(docRef);   // Fetch the document
      if (docSnap.exists()) {
        let userDbData = docSnap.data();   // Extract data

        dispatch(setMyCourses(userDbData.myCourses));
        // console.log("userDbData:", userDbData.myCourses );
        navigate('/my-courses')
      } 
      setProcessing(false);
      setShowBuyCourseModal(false);
    }catch(error){
      // setErrorMsg(true)
      setProcessing(false);
      console.log(error.code, error.message);
    }}
  };
  
  return (
    <div className="flex justify-center items-center flex-col h-full p-4 sm:flex-row sm:p-8 gap-4">
      <div className=' flex flex-col gap-2 sm:gap-4'>
        {/* Course Header */}
        <div className='bg-gray-100 h-auto rounded flex flex-col items-start justify-center p-2 gap-2'>
          <span className='font-bold text-lg place-self-center ml-2'>{course.landingPageData.title}</span>
          <div 
            className="bg-gray-100 h-auto rounded flex flex-wrap items-start justify-center p-2 gap-2">
            <span className='text-sm ml-4 bg-gray-200 px-2 py-1 rounded shadow-md'>Created By: <span className='font-medium'>{course.landingPageData.authorName}</span></span>

            <span className='text-sm ml-4 bg-gray-200 px-2 py-1 rounded shadow-md'>Language: <span className='font-medium'>{course.landingPageData.primaryLanguage}</span></span>

            <span className='text-sm ml-4 bg-gray-200 px-2 py-1 rounded shadow-md'>Level: <span className='font-medium'>{course.landingPageData.level}</span></span>

            <span className='text-sm ml-4 bg-gray-200 px-2 py-1 rounded shadow-md'>Published: <span className='font-medium'>{course.landingPageData.publishedDate}</span></span>
          </div>
        </div>
        {/* Course description and Curriculum */}
        <div className="flex flex-col w-full justify-center items-start gap-2 sm:gap-4">
          <div className="bg-gray-100 h-auto w-full rounded p-4 gap-2 flex flex-col items-start justify-center">
          <span className='font-medium'>Description:</span>
          <span className='text-sm ml-4'>{course.landingPageData.description}</span>
          </div>
          <div className="bg-gray-100 h-auto w-full rounded p-4 gap-2 flex flex-col items-start justify-center">
          <span className='font-medium'>Curriculum:</span>
          {course.curriculumData?.map((item, index)=>
            <>
            <span key={item.name} className='text-sm ml-4 bg-gray-200 pr-4 pl-2 py-1 rounded shadow-md font-medium border-blue-500 border'><PlayCircleFilledIcon fontSize='medium'/> {item.name}</span>
            </>
          )}
          </div>
        </div>
      </div>
      {/* Course Image Card */}
      <div className="flex flex-col items-center justify-center gap-2 p-2 shadow-md rounded bg-gray-100">
        <img 
          src={course.settingsData} 
          alt={course.landingPageData.title} 
          className="min-h-24 min-w-36 max-h-56 object-center rounded"
        />
        { !isCourseExists ? <span className='font-medium'>Price: ${course.landingPageData.price}</span> : ''}
        { isCourseExists ? 
          <button 
            className="bg-gray-900 text-gray-100 font-medium p-1 rounded w-[80%] cursor-pointer"
            onClick={handleStartWatchingBtn}
          >Start Watching</button> : 
          <button 
            onClick={handleBuyNowBtn}
            className="bg-gray-900 hover:bg-blue-700 text-gray-100 font-medium p-1 rounded w-[80%] cursor-pointer"
          >Buy Now</button>
        }
      </div>
      {/* Modal */}
      {showBuyCourseModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm p-4">
        {processing ? <div className="bg-white p-6 rounded-2xl shadow-lg text-center sm:p-6">
          <p className="text-lg text-green-500 font-semibold p-2">Processing...</p>
        </div> : 
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center sm:p-6">
            <p className="text-lg font-semibold">Make a dummy payment!</p>
            <div className="mt-4 flex justify-center gap-4">
              <button 
                onClick={handleProceed} 
                className="px-4 py-2 bg-green-500 text-white rounded cursor-pointer shadow-md">Proceed</button>
              <button 
                onClick={handleCancel} 
                className="px-4 py-2 bg-red-500 text-white rounded cursor-pointer shadow-md">Cancel</button>
            </div>
          </div>
          }
        </div>
      )}
    </div>
  );
};

export default CourseDetails;
