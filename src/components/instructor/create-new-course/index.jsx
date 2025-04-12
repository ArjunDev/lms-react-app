import React, { useEffect, useState } from 'react'
import Curriculum from './curriculum';
import { useNavigate } from 'react-router-dom';
import CourseLandingPage from './course-landing-page';
import CourseSettings from './settings';
import { useDispatch } from 'react-redux';
import { setPublishedCourses } from '../../pages/auth/userFormDataSlice'

const CreateNewCourse = () => {

  const [isDisabled, setIsDisabled] = useState(true)
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

  useEffect(() => {
    const isFormComplete = 
      curriculumData.length > 0 && // Ensure there's at least one lecture
      Object.keys(landingPageData).length > 0 && // Ensure landing page data isn't empty
      Object.keys(settingsData).length > 0; // Ensure settings data isn't empty
  
    setIsDisabled(!isFormComplete);
  }, [curriculumData, landingPageData, settingsData]);

  //console.log(curriculumData, landingPageData, settingsData)

  return (
    <div className="flex flex-col justify-start items-start min-h-full bg-gray-900 gap-2">
      <div className="flex justify-between items-center bg-gray-900 p-4 sm:p-6 w-full h-max text-gray-50 shadow-lg">
        <div className="flex justify-center items-center font-bold">
          <span>Course Creation</span>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={handleCancelBtn}
            className="bg-gray-700 text-gray-50 px-3 font-medium py-1 cursor-pointer rounded hover:bg-gray-800 transition"
          >Cancel</button>
          <button 
            disabled={isDisabled}
            onClick={handlePublishBtn}
            className={`text-gray-50 font-medium px-3 py-1 rounded transition ${isDisabled ? 'bg-gray-400 cursor-not-allowed' :'bg-gray-700 cursor-pointer hover:bg-gray-800' }`}
          >Publish</button>
        </div>
      </div>
      <div className='flex flex-col justify-start items-center p-4 w-full h-max'>
        {/* Dynamically generating tabs */}
        <div className='flex gap-2 justify-center items-center p-2 rounded bg-gray-900 px-4 shadow-md w-max font-bold'>
          {["Curriculum", "Landing Page", "Settings"].map((tab) => (
            <button
              key={tab}
              className={`p-1 px-2 rounded cursor-pointer ${
                activeTab === tab
                  ? "bg-gray-50 text-blue-600 font-bold"
                  : "bg-gray-100"
              }`}
              onClick={() => handleActiveTab(tab)}
            >{tab}</button>))
          }
        </div>
        {activeTab === 'Curriculum' && <div className='flex flex-col justify-center sm:flex-row sm:flex-wrap container items-start w-max h-full mt-2 p-2'>
        <Curriculum 
          setCurriculumData={setCurriculumData}/>
        </div>}
        {activeTab === 'Landing Page' && <div className='flex flex-col justify-center sm:flex-row sm:flex-wrap items-center w-full h-full mt-2 p-2'>
          <CourseLandingPage 
           setLandingPageData={setLandingPageData} />
        </div>}
        {activeTab === 'Settings' && <div className='flex flex-col justify-center sm:flex-row sm:flex-wrap items-center w-max h-full mt-2 p-2'>
          <CourseSettings
           setSettingsData={setSettingsData} />
        </div>}
      </div>
    </div>
  )
}

export default CreateNewCourse;