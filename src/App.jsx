import React from "react"
import MenuBar from "./components/menu-bar"
import { Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import ExploreCourses from "./components/pages/explore-courses"
import MyCourses from "./components/pages/my-courses"
import Profile from "./components/pages/profile/profile"

function App() {
  
  return (
    <div className="bg-gray-300 min-h-screen">
      <MenuBar/>
      <Routes>
        <Route path="*" element={<Home/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/explore-courses" element={<ExploreCourses/>}/>
        <Route path="/my-courses" element={<MyCourses/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </div>
  )
}

export default App
