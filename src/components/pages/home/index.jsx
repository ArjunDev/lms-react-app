import React, { useEffect, useState } from 'react';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { useSelector, useDispatch } from 'react-redux';
import {doc, getDoc } from "firebase/firestore";
import { firebaseFirestoreDb } from '../../../firebase';
import { setGlobalCourses } from '../../store/globalCoursesSlice';

const Home = () => {
  const globalCoursesFromRedux = useSelector(state => state.globalCourses.courses);
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = useSelector(state=> state.globalCourses.courses);

  // console.log(images);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // console.log("GlobalCourses from redux:", globalCoursesFromRedux);
  // console.log(Array.isArray(globalCoursesFromRedux));

  const [ loading, setLoading ] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // to fetch from firebase only when component mounted for the first time
    if (globalCoursesFromRedux.length === 0) {

      const fetchGlobalCourses = async () => {

        setLoading(true);
        try {
          const db = firebaseFirestoreDb;
          // const globalCoursesDocRef = doc(db, "globalCourses", "courses");
          // const docSnap = await getDoc(db);
          const globalCoursesFromDb = await getDoc(doc(db, "globalCourses", "courses"));
  
          if (globalCoursesFromDb.exists()) {
            const docData = globalCoursesFromDb.data(); //get actual data
            const globalCoursesArray = docData.globalCourses || []; // fallback in case it’s undefined

            dispatch(setGlobalCourses(globalCoursesArray));
          } else {
            console.log("No such documents!");
          }
        } catch (err) {
          console.error("Error fetching global courses:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchGlobalCourses();
      // console.log("fetching fetchGlobalCourses from db");
    }
  }, []);
  
  if(loading){
    return (
      <div class="fixed inset-0 flex flex-col items-center justify-center z-50">
        <div class="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p class="text-gray-100 text-lg font-bold mt-4">Loading...</p>
      </div>
    )
  }

  return (
    <div className='flex flex-col justify-center items-center p-4 py-8 gap-6 h-full w-full sm:p-16'>
      <div 
        className='flex flex-1 justify-center items-center rounded-2xl overflow-hidden relative max-w-3xl max-h-96'>
        {/* Images Wrapper */}
        <div
          className={`flex transition-transform duration-500 ease-in-out h-64 sm:h-96`}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
          {images.map((image, index) => (
            <img key={index} src={image.settingsData} alt={`slide-${index}`} className="w-full rounded-lg flex-shrink-0 object-center" />))
          }
        </div>
        {/* Left Button */}
        <button
          className="absolute top-1/2 left-2 transform -translate-y-1/2 p-2 rounded-full text-blue-600 cursor-pointer"
          onClick={prevSlide}
        ><ArrowCircleLeftIcon fontSize='large'/></button>
        {/* Right Button */}
        <button
          className="absolute top-1/2 right-2 transform -translate-y-1/2 text-blue-600 p-2 rounded-full cursor-pointer"
          onClick={nextSlide}
        ><ArrowCircleRightIcon fontSize='large'/></button>
      </div>
      {/* course categories */}
      <div 
        className='flex flex-col justify-center items-center gap-4 w-fit bg-gray-100 flex-1 rounded-2xl p-4 sm:p-8'>
        <div className='flex items-start justify-center'>
          <span className='flex font-bold text-left text-lg'>Course Categories</span>
        </div>
        <div className='flex flex-1 justify-center items-center gap-2 flex-wrap'>
          <button 
            className='bg-gray-300 hover:bg-gray-400 rounded text-black text-sm p-1 px-4 cursor-pointer transition-all'>Web Development</button>
          <button 
            className='bg-gray-300 hover:bg-gray-400 rounded text-black text-sm p-1 px-4 cursor-pointer transition-all'>Backend Development</button>
          <button 
            className='bg-gray-300 hover:bg-gray-400 rounded text-black text-sm p-1 px-4 cursor-pointer transition-all'>Machine Learning</button>
          <button 
            className='bg-gray-300 hover:bg-gray-400 rounded text-black text-sm p-1 px-4 cursor-pointer transition-all'>Cyber Security</button>
        </div>
      </div>
    </div>
  )
}

export default Home