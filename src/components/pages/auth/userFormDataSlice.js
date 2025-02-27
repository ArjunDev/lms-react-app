import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  password: "",
  isStudent: true,
  studentMode: true,
  isCreator: false,
  creatorMode: false,
  isLoggedIn: false,
  publishedCourses: [
    {
      curriculumData: [{id: '1', name: 'lecture-1'}],
      landingPageData: {courseId: '1234', description: 'Tailwicss desc', level: '1', price: '20',  primaryLanguage:'English', title:'Fundamentals of Tailwincss' },
      settingsData: {imageURL:'/lms-react-app/images/tailwindcss.webp'}
    },
    {
      curriculumData: [{id: '2', name: 'lecture-1'}],
      landingPageData: {courseId: '12345', description: 'react js desc', level: '1', price: '30',  primaryLanguage:'English', title:'Basics of React JS' },
      settingsData: {imageURL:'/lms-react-app/images/reactjs.webp'}
    },
    {
      curriculumData: [{id: '3', name: 'lecture-1'}, {id: '3', name: 'lecture-2'}],
      landingPageData: {courseId: '123456', description: 'js desc', level: '1', price: '10',  primaryLanguage:'English', title:'Fundamentals of JavaScript' },
      settingsData: {imageURL:'/lms-react-app/images/javascript.webp'}
    }
  ],
  myCourses: [
    {
      id: '1',  
      title: 'test data',
      author: 'test data',
      image: 'test-image',
    },
  ],
}

const userFormDataSlice = createSlice({
  name: 'userFormData',
  initialState,
  reducers: {
    setUserFormData: (state, action) => {
      return { ...state, ...action.payload };
    },
    setLogIn: (state) => {
      state.isLoggedIn = true;
    },
    setLogOut: (state) => {
      state.isLoggedIn = false;
    },
    setIsStudent: (state, action) => {
      state.isStudent = action.payload;
    },
    setIsCreator: (state, action) => {
      state.isCreator = action.payload;
    },
    setCreatorMode: (state, action) => {
      state.creatorMode = action.payload;
    },
    setPublishedCourses: (state, action) => {
      state.publishedCourses.push(action.payload);
    },
    setStudentMode: (state, action) => {
      state.studentMode = action.payload;
    },
}});

export const { setUserFormData, setLogIn, setLogOut, setPublishedCourses, setIsStudent, setIsCreator, setCreatorMode, setStudentMode } = userFormDataSlice.actions;
export default userFormDataSlice.reducer;