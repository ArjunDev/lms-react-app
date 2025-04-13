import React, { useEffect, useState } from 'react';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { useSelector } from 'react-redux';
import allCourses from '../../store/global-courses-list';

const Home = () => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const globalCourses = allCourses;
  const currentUser = useSelector(state=> state.userFormData.currentUser)

  //console.log(globalCourses);
  const images = globalCourses?.map((item) => item.settingsData.imageURL);

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

  // useEffect(()=>{
  //   console.log("currentUser:", currentUser);
  // })

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
            <img key={index} src={image} alt={`slide-${index}`} className="w-full rounded-lg flex-shrink-0 object-center" />))
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
      <div 
        className='flex flex-col justify-center items-center gap-4 w-full bg-gray-300 flex-1 rounded-2xl p-4 sm:p-8'>
        <div className='flex items-start justify-center'>
          <span className='flex font-bold text-left text-lg'>Course Categories</span>
        </div>
        <div className='flex flex-1 justify-center items-center gap-2 flex-wrap'>
          <button 
            className='bg-gray-50 hover:bg-gray-100 rounded text-black text-sm p-1 px-4 cursor-pointer transition-all'>Web Development</button>
          <button 
            className='bg-gray-50 hover:bg-gray-100 rounded text-black text-sm p-1 px-4 cursor-pointer transition-all'>Backend Development</button>
          <button 
            className='bg-gray-50 hover:bg-gray-100 rounded text-black text-sm p-1 px-4 cursor-pointer transition-all'>Machine Learning</button>
          <button 
            className='bg-gray-50 hover:bg-gray-100 rounded text-black text-sm p-1 px-4 cursor-pointer transition-all'>Cyber Security</button>
        </div>
      </div>
    </div>
  )
}

export default Home