import React, { useEffect } from "react"
import MenuBar from "./components/menu-bar"
import { Route, Routes, useLocation } from "react-router-dom"
import Home from "./components/pages/home"
import ExploreCourses from "./components/pages/explore-courses"
import MyCourses from "./components/pages/my-courses"
import PublishedCourses from "./components/instructor/published-courses"
import CreateNewCourse from "./components/instructor/create-new-course"
import SignIn from "./components/pages/auth/signin"
import SignUp from "./components/pages/auth/signup"
import { useSelector } from "react-redux"

function App() {
  
  const location = useLocation();
  const hideMenuBar = location.pathname === "/create-new-course";

  const userFormDataFromStore = useSelector(state => state.userFormData);
  useEffect(()=>{
    console.log("Store Data:", userFormDataFromStore)
  },[userFormDataFromStore])
  
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col ">
      {!hideMenuBar && <MenuBar />}
      <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/explore-courses" element={<ExploreCourses/>}/>
        <Route path="/my-courses" element={<MyCourses/>}/>
        <Route path="/create-new-course" element={<CreateNewCourse/>}/>
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/published-courses" element={<PublishedCourses />} />

        <Route path="*" element={<Home/>}/>
      </Routes>
    </div>
  )
}

export default App
