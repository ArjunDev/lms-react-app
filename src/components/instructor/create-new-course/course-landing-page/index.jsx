import React, { useState } from 'react';

const CourseLandingPage = ({setLandingPageData}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    primaryLanguage: 'english',
    level: '1'
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLandingPageFormData = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    setLandingPageData(formData);
  };

  return (
    <div 
      className="p-4 flex flex-col gap-4 font-small border rounded mt-4 w-max sm:w-[60%] sm:px-8 sm:ml-8">
        <span className='font-medium'>Course Landing Page Details:</span>
      <form 
        onSubmit={handleLandingPageFormData}
        className="flex flex-col gap-3 mt-1"
      >
        <label>Title:
          <input 
            name="title"
            className="border rounded px-2 ml-2 bg-gray-50 sm:w-[60%]"
            placeholder="Enter the title"
            type="text"
            value={formData.title}
            onChange={handleInputChange}
          />
        </label>
        <label>Description:
          <input 
            name="description"
            className="border rounded px-2 ml-2 bg-gray-50 sm:w-[60%]"
            placeholder="Enter the description"
            type="text"
            value={formData.description}
            onChange={handleInputChange}
          />
        </label>
        <label>Price: $
          <input 
            name="price"
            className="border rounded px-2 ml-2 bg-gray-50"
            placeholder="Enter the price"
            type="number"
            value={formData.price}
            onChange={handleInputChange}
          />
        </label>
        <label>Primary Language:
          <select 
            name="primaryLanguage"
            className="bg-gray-50 border rounded px-1 ml-2"
            value={formData.primaryLanguage}
            onChange={handleInputChange}
          >
            <option value="english" defaultValue>English</option>
            <option value="french">French</option> 
            <option value="chinese">Chinese</option>
          </select>
        </label>
        <label>Level:
          <select 
            name="level"
            className="bg-gray-50 border rounded px-1 ml-2"
            value={formData.level}
            onChange={handleInputChange}
          >
            <option value="1" defaultValue>Beginner</option>
            <option value="2">Intermediate</option> 
            <option value="3">Advanced</option>
          </select>
        </label>
        <button 
          type="submit"
          className="w-max bg-gray-800 rounded p-1 px-4 mt-2 text-gray-50 hover:bg-gray-700 font-bold cursor-pointer"
        >Save</button>
      </form>
    </div>
  );
};

export default CourseLandingPage;
