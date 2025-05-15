import React, { useEffect, useState } from "react";

const Curriculum = ({ setCurriculumData, curriculumData }) => {
  const [lectures, setLectures] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);

  // console.log(curriculumData.length > 0)
//to fill landing fields with saved data when move back and forth btw diff pages like settings, curriculum
useEffect(()=>{
  if(curriculumData.length > 0){
    setLectures(curriculumData)
  }
},[])

  // Add a new lecture
  const handleAddLectureBtn = () => {
    setLectures((prev) => [
      ...prev,
      { id: Date.now(), name: "", videoFile: null, videoPreview: null }
    ]);
  };

  // Delete a lecture
  const handleDeleteLecture = (idToDelete) => {
    setLectures((prev) =>
      prev.filter((lecture) => lecture.id !== idToDelete)
    );
  };

  // Update lecture name
  const handleLectureNameChange = (id, newName) => {
    setLectures((prev) =>
      prev.map((lecture) =>
        lecture.id === id ? { ...lecture, name: newName } : lecture
      )
    );
  };

  // Handle video change per lecture
  const handleVideoChange = (id, file) => {

    // to restirct videofile size MB
    if (file) {
      const sizeInBytes = file.size;
      const sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);
      // console.log(`Video size: ${sizeInMB} MB`);
      if (sizeInMB > 15) {
        alert(`This application is for Demo purpose. Video size is: ${sizeInMB} MB. Max allowed size is 15 MB.`);
        return
      }
    }

    if (file && file.type.startsWith("video/")) {
      const videoPreview = URL.createObjectURL(file);
      setLectures((prev) =>
        prev.map((lecture) =>
          lecture.id === id ? { ...lecture, videoFile: file, videoPreview } : lecture
        )
      );
    }
  };

  // Disable Save button if any field is empty
  useEffect(() => {
    const allLecturesValid =
      lectures.length > 0 &&
      lectures.every((lecture) => lecture.name.trim() !== "" && lecture.videoFile);
    setIsDisabled(!allLecturesValid);
  }, [lectures]);

  const handleSaveFormaData = () => {
    setCurriculumData(lectures);
    // console.log("lectures:", lectures)
  };

  return (
    <>
      <div className="flex justify-center items-center bg-gray-100 w-max rounded gap-2 p-2">
        <span className="font-bold text-gray-700">Create Curriculum</span>
        <div className="flex gap-4 font-medium">
          <button
            className="bg-gray-800 p-1 px-2 rounded w-max h-max cursor-pointer text-gray-100"
            onClick={handleAddLectureBtn}
          >Add Lecture</button>
          {lectures.length > 0 && (
            <button
              onClick={handleSaveFormaData}
              disabled={isDisabled}
              type="submit"
              className={`w-max rounded p-1 px-4 text-gray-50 font-bold ${
                isDisabled
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-gray-800 hover:bg-gray-700 cursor-pointer"
              }`}
            >Save</button>
          )}
        </div>
      </div>
      {/* lecture cards */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap sm:container justify-center items-center gap-4 mt-1 p-2 rounded">
        {lectures.map((lecture, index) => (
          <div
            key={lecture.id}
            className="flex flex-col justify-center items-center border h-max w-max mb-4 p-4 gap-4 rounded font-medium shadow-lg bg-gray-100"
          >
            <label>
              Lecture {index + 1}:
              <input
                type="text"
                value={lecture.name}
                placeholder="Name of the lecture"
                className="p-1 border rounded ml-2"
                onChange={(e) =>
                  handleLectureNameChange(lecture.id, e.target.value)
                }
              />
            </label>

            {/* Video preview and buttons */}
            <div className="flex flex-col gap-4">
              <div className="h-[200px] w-60 border rounded bg-gray-100 flex items-center justify-center overflow-hidden relative">
                {lecture.videoPreview ? (
                  <video
                    src={lecture.videoPreview}
                    controls
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <label className="text-sm text-gray-600 cursor-pointer flex flex-col items-center justify-center w-full h-full">
                    <span className="mb-1">Click to upload video</span>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={
                        (e) => handleVideoChange(lecture.id, e.target.files[0])
                      }
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              {/* buttons */}
              <div className="font-medium flex gap-2 flex-wrap justify-start items-center">
                <label className="bg-gray-900 p-1 px-2 rounded text-gray-50 cursor-pointer"
                >Change video
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) =>
                      handleVideoChange(lecture.id, e.target.files[0])
                    }
                    className="hidden"
                  />
                </label>

                <button
                  className="bg-red-800 p-1 px-2 rounded text-gray-50 cursor-pointer"
                  onClick={() => handleDeleteLecture(lecture.id)}
                >Delete lecture</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Curriculum;
