import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setMyCourses } from '../auth/userFormDataSlice';
import allCourses from '../../store/global-courses-list';

const CourseDetails = () => {

  const { id } = useParams(); // Extract 'id' from URL
  const [showBuyCourseModal, setShowBuyCourseModal] = useState(false);
  // const PublishedCoursesFromStore = useSelector(state => state.userFormData.publishedCourses);
  const globalCourses = allCourses;
  const MyCoursesFromCurrentUser = useSelector(state=> state.userFormData.currentUser.myCourses);
  const cuurentUser = useSelector(state => state.userFormData.currentUser)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Find the selected course based on 'id'
  const course = globalCourses?.find(item => item.landingPageData.courseId === id);

  //check whether course is already exist in user My Courses
  const isCourseExists = MyCoursesFromCurrentUser.some(course => course.courseId === id)

  if (!course) {
    return <div className="text-center text-red-500 font-bold mt-28">Course Not Found</div>;
  }

  const handleBuyNowBtn = () =>{
    setShowBuyCourseModal(true);
    //console.log(course);
  }

  const handleCancle = () => {
    setShowBuyCourseModal(false);
  };

  const handleProceed = () => {

    const title = course.landingPageData.title;
    const courseId = course.landingPageData.courseId
    const description = course.landingPageData.description;
    const imageURl = course.settingsData.imageURL;

    setShowBuyCourseModal(false);

    if(cuurentUser.isLoggedIn){
      dispatch(setMyCourses({title, courseId, description, imageURl}));
      navigate('/my-courses')
    }else{
      navigate('/auth/signin');
    }
    // dispatch(setIsCreator(true))// redux store action
  };
  
  return (
    <div className="flex flex-col h-[96%] p-4 sm:p-8 gap-4">
      {/* Course Header */}
      <div className="bg-gray-200 h-auto rounded flex flex-col items-start justify-center p-4 gap-2">
        <span className='font-bold'>{course.landingPageData.title}</span>
        <span className='text-sm ml-4'>Created By: </span>
        <span className='text-sm ml-4'>Language: {course.landingPageData.primaryLanguage}</span>
      </div>
      {/* Course Details */}
      <div className="h-auto w-full flex flex-col justify-start items-start rounded overflow-hidden gap-4 sm:flex-row">
        {/* Course Content */}
        <div className="flex flex-col w-full sm:w-[60%] justify-center items-start gap-2">
          <div className="bg-gray-100 h-auto w-full rounded p-4 gap-2 flex flex-col items-start justify-center">
          <span className='font-medium'>Description:</span>
          <span className='text-sm ml-4'>{course.landingPageData.description}</span>
          </div>
          <div className="bg-gray-100 h-auto w-full rounded p-4 gap-2 flex flex-col items-start justify-center">
          <span className='font-medium'>Curriculum:</span>
          {course.curriculumData?.map(item=>
            <>
            <span key={item.name} className='text-sm ml-4'>{item.name}</span>
            </>
          )}
          </div>
        </div>

        {/* Course Sidebar */}
        <div className="flex flex-1 flex-col items-center justify-center gap-3 p-2 shadow-md rounded bg-gray-100">
          <img 
            src={course.settingsData.imageURL} 
            alt={course.landingPageData.title} 
            className="min-h-24 min-w-36 max-h-56 object-center rounded"
          />
          { !isCourseExists ? <span className='font-medium'>Price: ${course.landingPageData.price}</span> : ''}
          
          { isCourseExists ? 
            <button 
              className="bg-gray-900 text-gray-100 font-medium p-1 rounded w-[80%] cursor-pointer"
            >Start Watching</button>  : 
            <button 
              onClick={handleBuyNowBtn}
              className="bg-gray-900 text-gray-100 font-medium p-1 rounded w-[80%] cursor-pointer"
            >Buy Now</button>
          }
        </div>
      </div>
      {/* Modal */}
      {showBuyCourseModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm p-4">
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center sm:p-6">
            <p className="text-lg font-semibold">Make a dummy payment!</p>
            <div className="mt-4 flex justify-center gap-4">
              <button 
                onClick={handleProceed} 
                className="px-4 py-2 bg-green-500 text-white rounded cursor-pointer shadow-md">Proceed</button>
              <button 
                onClick={handleCancle} 
                className="px-4 py-2 bg-red-500 text-white rounded cursor-pointer shadow-md">Cancle</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetails;
