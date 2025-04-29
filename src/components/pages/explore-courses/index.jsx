import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import {doc, getDoc } from "firebase/firestore";
import { firebaseFirestoreDb } from '../../../firebase';
import { setGlobalCourses } from '../../store/globalCoursesSlice';

const ExploreCourses = () => {

  const globalCoursesFromRedux = useSelector(state => state.globalCourses.courses);
  // console.log("GlobalCourses from redux:", globalCoursesFromRedux);
  // console.log(Array.isArray(globalCoursesFromRedux));

  const [ loading, setLoading ] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    //to fetch from firebase only when component mounted for the first time
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
    <div className='flex flex-col justify-start items-center h-full bg-gray-900 gap-4'>
      <div className='flex sm:flex-row flex-wrap justify-center items-center gap-4 sm:gap-4 mt-8'>
      { globalCoursesFromRedux?.map( (item, index) => 
      <div 
        key={index}
        className='flex flex-col justify-center items-center bg-gray-100 p-2 rounded-2xl gap-1.5'>
        <img 
          className='rounded-2xl h-36 w-72 sm:h-50 sm:w-96 flex justify-center items-center object-center shadow-md'
          src={item.settingsData}
        />
        <span 
          className='font-medium'
        >{item.landingPageData.title}</span>
        {/* <span className='text-sm'>Author: ArjunDev</span> */}
        <Link 
          className='px-4 py-1.5 bg-gray-900 rounded-2xl text-white w-[90%] sm:w-full hover:bg-gray-800 cursor-pointer text-center'
          to={`course/${item.landingPageData.courseId}`}
        >See details</Link>
      </div> 
      )}
      </div>
    </div>
  )
}

export default ExploreCourses