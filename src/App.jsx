import React from "react"
import MenuBar from "./components/menu-bar"
import { Route, Routes, useLocation } from "react-router-dom"
import Home from "./components/pages/home"
import ExploreCourses from "./components/pages/explore-courses"
import MyCourses from "./components/pages/my-courses"
// import Profile from "./components/pages/profile/"
import CreateNewCourse from "./components/instructor/create-new-course"
import SignIn from "./components/pages/auth/signin"
import SignUp from "./components/pages/auth/signup"

function App() {
  
  const location = useLocation();
  // const hideMenuBar = location.pathname === "/create-new-course" || location.pathname.startsWith('/auth');

  const hideMenuBar = location.pathname === "/create-new-course";

  return (
    <div className="bg-gray-400 min-h-screen">
      {!hideMenuBar && <MenuBar />}
      <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/explore-courses" element={<ExploreCourses/>}/>
        <Route path="/my-courses" element={<MyCourses/>}/>
        {/* <Route path="/profile" element={<Profile/>}/> */}
        <Route path="/create-new-course" element={<CreateNewCourse/>}/>
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="*" element={<Home/>}/>
      </Routes>
    </div>
  )
}

export default App
