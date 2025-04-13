import React, { useState, useEffect } from 'react';

const CourseLandingPage = ({setLandingPageData}) => {

  const [isDisabled, setIsDisabled ] = useState(true);
  const [formData, setFormData] = useState({
    courseId: Date.now() + Math.random().toString(36).substring(2,9),//to create uniq id
    title: '',
    description: '',
    price: '',
    primaryLanguage: 'English',
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
    //console.log('Form Data Submitted:', formData);
    setLandingPageData(formData);
  };

    // Update isDisabled based on form data
    useEffect(() => {
      const { title, description, price, primaryLanguage, level } = formData;
      setIsDisabled(!(title && description && price && primaryLanguage && level));// Disable Save button if any field is empty
  }, [formData]);

  return (
    <div 
      className="p-4 flex flex-col justify-center items-center gap-4 border rounded w-max sm:flex-col sm:w-max bg-gray-100 font-medium">
        <span className='font-bold'>Course Landing Page Details:</span>
      <div className='w-full'>
      <form 
        onSubmit={handleLandingPageFormData}
        className="flex flex-col justify-center items-start gap-3 mt-1 sm:px-12"
      >
        <label>Title:
          <input 
            name="title"
            className="border rounded px-2 ml-2 bg-gray-50 sm:w-max"
            placeholder="Enter the title"
            type="text"
            value={formData.title}
            onChange={handleInputChange}
          />
        </label>
        <label>Description:
          <input 
            name="description"
            className="border rounded px-2 ml-2 bg-gray-50 sm:w-max"
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
            <option value="English" defaultValue>English</option>
            <option value="French">French</option> 
            <option value="Chinese">Chinese</option>
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
        <div className='flex justify-center items-center w-full'>
        <button 
          disabled={isDisabled}
          type="submit"
          className={`w-max rounded p-1 px-4 mt-2 text-gray-50 font-bold ${
            isDisabled ? 'bg-gray-500 cursor-not-allowed' : 'bg-gray-800 hover:bg-gray-700 cursor-pointer'
          }`}
        >Save</button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default CourseLandingPage;
