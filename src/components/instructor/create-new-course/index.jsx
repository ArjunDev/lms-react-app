import React, { useState } from 'react'
import Curriculum from './curriculum';
import { useNavigate } from 'react-router-dom';
import CourseLandingPage from './course-landing-page';
import CourseSettings from './settings';
import { useDispatch } from 'react-redux';
import { setPublishedCourses } from '../../pages/auth/userFormDataSlice'

const CreateNewCourse = () => {

  const [activeTab, setActiveTab] = useState("Curriculum");
  const [ curriculumData, setCurriculumData ] = useState([]);
  const [ landingPageData, setLandingPageData ] = useState({});
  const [ settingsData, setSettingsData ] = useState({});
  const navigate = useNavigate(); 
  const dispatch = useDispatch();

  function handleCancelBtn() {
    navigate('/home');
  }

  const handleActiveTab = (tabName) => {
    setActiveTab(tabName);
  };

  const handlePublishBtn = () => {
    const courseData = {curriculumData, landingPageData, settingsData}
    dispatch(setPublishedCourses(courseData));
    navigate('/published-courses')
  }


  return (
    <div className="flex flex-col justify-start items-start h-screen bg-gray-100 gap-2">
      <div className="flex justify-between items-center bg-gray-800 p-4 sm:p-6 w-full shadow-lg text-gray-50">
        <div className="flex justify-center items-center font-bold">
          <span>Course Creation</span>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={handleCancelBtn}
            className="bg-gray-600 text-gray-50 px-3 font-medium py-1 cursor-pointer rounded hover:bg-gray-700 transition">
            Cancel
          </button>
          <button 
            onClick={handlePublishBtn}
            className="bg-gray-600 text-gray-50 font-medium px-3 py-1 cursor-pointer rounded hover:bg-gray-700 transition">
            Publish
          </button>
        </div>
      </div>
      <div className='flex flex-col justify-start items-start p-4 w-full h-full rounded'>
        {/* Dynamically generating tabs */}
        <div className='flex gap-2 justify-center items-center p-2 rounded bg-gray-400 shadow-md'>
          {["Curriculum", "Landing Page", "Settings"].map((tab) => (
            <button
              key={tab}
              className={`p-1 px-2 rounded cursor-pointer ${
                activeTab === tab
                  ? "bg-gray-50 text-blue-600 font-bold"
                  : "bg-gray-100 font-small"
              }`}
              onClick={() => handleActiveTab(tab)}
            >{tab}</button>))
          }
        </div>
        {activeTab === 'Curriculum' && <div className='w-full h-full shadow-md m-auto mt-2'>
        <Curriculum 
          setCurriculumData={setCurriculumData}/>
        </div>}
        {activeTab === 'Landing Page' && <div className='w-full h-full shadow-md m-auto mt-2'>
          <CourseLandingPage 
           setLandingPageData={setLandingPageData} />
        </div>}
        {activeTab === 'Settings' && <div className='w-full h-full shadow-md m-auto mt-2'>
          <CourseSettings
           setSettingsData={setSettingsData} />
        </div>}
      </div>
    </div>
  )
}

export default CreateNewCourse;