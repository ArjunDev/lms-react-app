import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const CourseDetails = () => {
  const { id } = useParams(); // Extract 'id' from URL
  const PublishedCoursesFromStore = useSelector(state => state.userFormData.publishedCourses);

  // Find the selected course based on 'id'
  const course = PublishedCoursesFromStore?.find(item => item.landingPageData.courseId === id);

  if (!course) {
    return <div className="text-center text-red-500 font-bold mt-28">Course Not Found</div>;
  }

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
        <div className="flex flex-1 flex-col items-center justify-center gap-2 p-2 shadow-md rounded bg-gray-100">
          <img 
            src={course.settingsData.imageURL} 
            alt={course.landingPageData.title} 
            className="min-h-24 min-w-36 max-h-56 object-center rounded"
          />
          <span className='font-medium'>Price: ${course.landingPageData.price}</span>
          <button className="bg-gray-900 text-gray-100 font-medium p-1 rounded w-[80%] cursor-pointer">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
