import React, { useEffect, useState } from 'react'
import Curriculum from './curriculum';
import { useNavigate } from 'react-router-dom';
import CourseLandingPage from './course-landing-page';
import CourseSettings from './settings';
import { useDispatch, useSelector } from 'react-redux';
import { setPublishedCourses } from '../../pages/auth/userFormDataSlice';
import { addGlobalCourse } from '../../store/globalCoursesSlice';
import {doc, updateDoc, arrayUnion} from "firebase/firestore";
import { firebaseFirestoreDb } from '../../../firebase';

const CreateNewCourse = () => {

  const [isDisabled, setIsDisabled] = useState(true);
  const [publishing, setPublishing] = useState(false);
  const [activeTab, setActiveTab] = useState("Curriculum");
  const [ curriculumData, setCurriculumData ] = useState([]);
  const [ landingPageData, setLandingPageData ] = useState({});
  const [ thumbnailData, setThumbnailData ] = useState({});
  const email = useSelector(state=> state.userFormData.currentUser.email);
  const currentUser = useSelector(state=> state.userFormData.currentUser);

  // console.log(landingPageData)
  const navigate = useNavigate(); 
  const dispatch = useDispatch();

  // console.log(curriculumData);
  // note: below is the curriculumData type before sending it to the firstore/ redux store 
  {/* [{
        id: 1744744580097
        name: "testing-demo video"
        videoFile: File
        videoPreview: "blob:http://localhost:5173/b5ff88ac-f84d-4012-8ca3-3a514ad0731b"
      }]
  */}
  function handleCancelBtn() {
    navigate('/home');
  }

  const handleActiveTab = (tabName) => {
    setActiveTab(tabName);
  };

  const handlePublishBtn = async () => {

    setPublishing(true);
    thumbnailData.append("upload_preset", "unsigned_upload");
  
    try {
      // Upload Thumbnail
      const thumbRes = await fetch("https://api.cloudinary.com/v1_1/dtpaoymjq/upload", {
        method: "POST",
        body: thumbnailData,
      });

      const thumbData = await thumbRes.json();
      const settingsData = thumbData.secure_url;
  
      // Upload Curriculum Videos
      const uploadedCurriculum = [];
      //to upload a multiple videos if there
      for (const lecture of curriculumData) {
        const formData = new FormData();
        formData.append("file", lecture.videoFile);
        formData.append("upload_preset", "unsigned_upload");
  
        const videoRes = await fetch("https://api.cloudinary.com/v1_1/dtpaoymjq/video/upload", {
          method: "POST",
          body: formData,
        });
  
        const videoData = await videoRes.json();
  
        uploadedCurriculum.push({
          id: lecture.id,
          name: lecture.name,
          videoURL: videoData.secure_url,
        });
      }
  
      const courseData = {
        curriculumData: uploadedCurriculum,
        landingPageData,
        settingsData,
      };
  
      // Save to Firestore: "users" DB
      const docRef = doc(firebaseFirestoreDb, "users", email);
      await updateDoc(docRef, {
        publishedCourses: arrayUnion(courseData),
      });
  
      // Save to Firestore: "globalCourses" DB
      const globalCoursesDocRef = doc(firebaseFirestoreDb, "globalCourses", "courses");
      await updateDoc(globalCoursesDocRef, {
        globalCourses: arrayUnion(courseData),
      });
      // finally sending to redux store
      dispatch(addGlobalCourse(courseData));
      dispatch(setPublishedCourses({ ...currentUser, ...courseData }));
      navigate("/published-courses");
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setPublishing(false);
    }
  };
  
  useEffect(() => {
    const hasThumbnail = thumbnailData instanceof FormData && thumbnailData.has("file");
  
    const isFormComplete = curriculumData.length > 0 && Object.keys(landingPageData).length > 0 && hasThumbnail;
  
    setIsDisabled(!isFormComplete);
  }, [curriculumData, landingPageData, thumbnailData]);
  
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
          setCurriculumData={setCurriculumData} />
        </div>}
        {activeTab === 'Landing Page' && <div className='flex flex-col justify-center sm:flex-row sm:flex-wrap items-center w-full h-full mt-2 p-2'>
          <CourseLandingPage 
           setLandingPageData={setLandingPageData} 
           landingPageData={landingPageData}/>
        </div>}
        {activeTab === 'Settings' && <div className='flex flex-col justify-center sm:flex-row sm:flex-wrap items-center w-max h-full mt-2 p-2'>
          <CourseSettings
           setSettingsData={setThumbnailData} />
        </div>}
      </div>
      {/*Publishing  Modal */}
      {publishing && (
        <div className="fixed inset-0 flex items-center justify-center bg-green/50 backdrop-blur-sm p-4">
          <div className="bg-gray-50 px-4 py-8 rounded-2xl shadow-2xl text-center sm:p-6 justify-center items-center flex flex-col">
              <p className="text-lg font-semibold">Course is being published. Sit back and Relax!</p>
              <p className="text-lg mt-4 text-black px-4 py-2 bg-green-500 rounded-2xl w-max">Publishing...</p>
          </div>
        </div>)}
    </div>
  )
}

export default CreateNewCourse;