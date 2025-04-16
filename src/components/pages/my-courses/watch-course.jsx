import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';

const WatchCourses = () => {

  const { id } = useParams(); // Extract 'id' from URL
  const MyCoursesFromCurrentUser = useSelector(state=> state.userFormData.currentUser.myCourses);
  // Find the selected course based on 'id'
  const course = MyCoursesFromCurrentUser?.find(item => item.landingPageData.courseId === id);
  const currentUser = useSelector(state => state.userFormData.currentUser);
  const [ URLToPlay, setURLToPlay ] = useState("#");

  // console.log(URLToPlay);
  // console.log(currentUser.myCourses);

  //check whether course is already exist in user My Courses
  // const isCourseExists = MyCoursesFromCurrentUser.some(item => item.landingPageData.courseId === id)

  if (!course) {
    return <div className="text-center text-red-500 font-bold mt-28">Course Not Found!</div>;
  }
  //show warning if user is not loggedIn and course not exist in user mycourse
  if(!currentUser.isLoggedIn){
    return (
      <div 
       className='text-red-500 text-lg font-bold text-center mt-60'
      >UnAuthorized access!</div>
    )
  }

  const handlePlayBtn = (currentURL) =>{
    setURLToPlay(currentURL);
  }

  return (
    <div className="flex justify-center items-center flex-col h-full p-4 sm:flex-row sm:p-8 gap-4">
      {/* course details */}
      <div className=' flex flex-col gap-2 sm:gap-4'>
        {/* Course Header */}
        <div className='bg-gray-100 h-auto rounded flex flex-col items-start justify-center p-2 gap-2'>
          <span className='font-bold text-lg place-self-center ml-2'>{course.landingPageData.title}</span>
          <div 
            className="bg-gray-100 h-auto rounded flex flex-wrap items-start justify-center p-2 gap-2">
            <span className='text-sm ml-4 bg-gray-200 px-2 py-1 rounded shadow-md'>Created By: <span className='font-medium'>ABC</span></span>

            <span className='text-sm ml-4 bg-gray-200 px-2 py-1 rounded shadow-md'>Language: <span className='font-medium'>{course.landingPageData.primaryLanguage}</span></span>

            <span className='text-sm ml-4 bg-gray-200 px-2 py-1 rounded shadow-md'>Level: <span className='font-medium'>{course.landingPageData.level}</span></span>

            <span className='text-sm ml-4 bg-gray-200 px-2 py-1 rounded shadow-md'>Published: <span className='font-medium'>5 April 2025</span></span>
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
            <span key={item.name} className='text-sm ml-4 bg-gray-200 pr-4 pl-2 py-1 rounded shadow-md font-medium border-blue-500 border'><PlayCircleFilledIcon fontSize='medium' className='cursor-pointer mr-2' onClick={()=>handlePlayBtn(item.videoURL)}/>{item.name}</span>
            </>
          )}
          </div>
        </div>
      </div>
      {/* Course video Card */}
      <div className="flex flex-col items-center justify-center gap-2 overflow-hidden shadow-md rounded bg-blue-500 w-[90vw] sm:max-w-[35vw]">
        <video
          src={URLToPlay}
          controls
          className="w-full h-full object-cover p-0.5"
        />
      </div>
    </div>
  );
};

export default WatchCourses;
