import React, { useEffect, useState } from "react";

const Curriculum = ({setCurriculumData}) => {
  const [lectures, setLectures] = useState([]);
  const [isDisabled, setIsDisabled ] = useState(true);

  // Function to add a lecture
  const handleAddLectureBtn = () => {
    setLectures((prev) => [...prev, { id: Date.now(), name: "" }]); // Adding a unique ID
  };

  // Function to delete a lecture
  const handleDeleteLecture = (idToDelete) => {
    setLectures((prev) => prev.filter((lecture) => lecture.id !== idToDelete));
  };

  // Function to update lecture name
  const handleLectureNameChange = (id, newName) => {
    setLectures((prev) =>
      prev.map((lecture) =>
        lecture.id === id ? { ...lecture, name: newName } : lecture
      )
    );
  };

  // Disable Save button if any field is empty
  useEffect(() => {
    const allLecturesHaveNames = lectures.length > 0 && lectures.every(lecture => lecture.name.trim() !== "");
    setIsDisabled(!allLecturesHaveNames);
  }, [lectures]);
  

  const handleSaveFormaData = () =>{
    //console.log('lectures: ', lectures);
    setCurriculumData(lectures);
  }

  //console.log(lectures)
  return (
    <>
      <div className="flex-col flex p-4">
        <span className="font-bold">Create Curriculum</span>
        <div className="flex gap-4 font-medium">
          <button
            className="bg-gray-900 p-1 px-2 rounded text-gray-50 w-max mt-6 cursor-pointer"
            onClick={handleAddLectureBtn}
          >Add Lecture</button>
          {(lectures.length > 0) ? 
            <button 
              onClick={handleSaveFormaData}
              disabled={isDisabled}
              type="submit"
              className={`w-max rounded p-1 px-4 mt-6 text-gray-50 font-bold ${
                isDisabled ? 'bg-gray-500 cursor-not-allowed' : 'bg-gray-800 hover:bg-gray-700 cursor-pointer'
              }`}
            >Save</button> : '' }
        </div>
      </div>
      {lectures.map((lecture, index) => (
      <div
        key={lecture.id} // Unique key
        className="flex flex-col justify-start items-start border h-max w-max mb-4 ml-4 p-4 gap-4 rounded font-medium"
      >
        <label>
          Lecture {index + 1}:
          <input
            type="text"
            value={lecture.name}
            placeholder="Name of the lecture"
            className="p-1 border rounded ml-2"
            onChange={(e) => handleLectureNameChange(lecture.id, e.target.value)}
          />
        </label>
        <div className="flex flex-col gap-4">
          <div className="h-30 w-60 border rounded bg-gray-400 items-center justify-center flex">Lecture Video</div>
          <div className="font-medium flex gap-2 flex-wrap justify-start items-center">
            <button className="bg-gray-900 p-1 px-2 rounded text-gray-50 h-max w-max cursor-pointer">
              Change video
            </button>
            <button
              className="bg-red-800 p-1 px-2 rounded text-gray-50 h-max w-max cursor-pointer"
              onClick={() => handleDeleteLecture(lecture.id)}
            >
              Delete lecture
            </button>
          </div>
        </div>
      </div>
      ))}
    </>
  );
};

export default Curriculum;
