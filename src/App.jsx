import React from "react"
import MenuBar from "./components/menu-bar"
import { Route, Routes, useLocation } from "react-router-dom"
import Home from "./components/Home"
import ExploreCourses from "./components/pages/explore-courses"
import MyCourses from "./components/pages/my-courses"
import Profile from "./components/pages/profile/profile"
import CreateNewCourse from "./components/instructor/create-new-course"

function App() {
  
  const location = useLocation();
  const hideMenuBar = location.pathname === "/create-new-course";

  return (
    <div className="bg-gray-300 min-h-screen">
      {!hideMenuBar && <MenuBar />}
      <Routes>
        <Route path="*" element={<Home/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/explore-courses" element={<ExploreCourses/>}/>
        <Route path="/my-courses" element={<MyCourses/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/create-new-course" element={<CreateNewCourse/>}/>
      </Routes>
    </div>
  )
}

export default App
