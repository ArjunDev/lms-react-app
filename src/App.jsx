import React, { useEffect } from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import MenuBar from "./components/menu-bar"
import Home from "./components/pages/home"
import ExploreCourses from "./components/pages/explore-courses"
import MyCourses from "./components/pages/my-courses"
import PublishedCourses from "./components/instructor/published-courses"
import CreateNewCourse from "./components/instructor/create-new-course"
import SignIn from "./components/pages/auth/signin"
import SignUp from "./components/pages/auth/signup";
import ProtectedRoute from "./components/protected-routes"
import { useSelector } from "react-redux"
import CourseDetails from "./components/pages/course-details"

function App() {
  
  const location = useLocation();
  const hideMenuBar = location.pathname === "/create-new-course";
  const userFormDataFromStore = useSelector(state => state.userFormData);

  const isCreator = userFormDataFromStore.isCreator;
  const creatorMode = userFormDataFromStore.creatorMode;
  const isLoggedIn = userFormDataFromStore.isLoggedIn;

  useEffect(()=>{
    // console.log("isCreator:",isCreator,"creatorMode:",creatorMode,"isLoggedIn:",isLoggedIn)
  },[isCreator,creatorMode,isLoggedIn])
  
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col ">
      {!hideMenuBar && <MenuBar />}
      <Routes>
        <Route path="*" element={<Home/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/my-courses" element={<MyCourses/>}/>
        <Route path="/explore-courses" element={<ExploreCourses/>}/>
        <Route path="/explore-courses/course/:id" element={<CourseDetails />} />

        {/* Protected Routes */}
        <Route 
          path="/create-new-course" 
          element={<ProtectedRoute isCreator={isCreator} creatorMode={creatorMode} isLoggedIn={isLoggedIn}><CreateNewCourse />
          </ProtectedRoute>} 
        />
        <Route 
          path="/published-courses" 
          element={<ProtectedRoute isCreator={isCreator} creatorMode={creatorMode} isLoggedIn={isLoggedIn}><PublishedCourses />
          </ProtectedRoute>}
        /> 
        {/* <Route path="/create-new-course" element={<CreateNewCourse/>}/> */}
        {/* <Route path="/published-courses" element={<PublishedCourses/>}/> */}
      </Routes>
    </div>
  )
}

export default App
