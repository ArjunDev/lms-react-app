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
      curriculumData: [{id: '1', name: 'lecture-1'}, {id: '2', name: 'lecture-2'}],
      landingPageData: {courseId: '1234', description: 'Tailwind CSS is a utility-first CSS framework that helps build modern, responsive designs quickly. It provides pre-defined classes for styling, eliminating the need for writing custom CSS.', level: '1', price: '20',  primaryLanguage:'English', title:'Fundamentals of Tailwincss' },
      settingsData: {imageURL:'/lms-react-app/images/tailwindcss.webp'}
    },
    {
      curriculumData: [{id: '2', name: 'lecture-1'}],
      landingPageData: {courseId: '12345', description: 'React.js is a JavaScript library for building fast and interactive user interfaces using a component-based architecture. It efficiently updates and renders UI with a virtual DOM, making web apps more dynamic and scalable.', level: '1', price: '30',  primaryLanguage:'English', title:'Basics of React JS' },
      settingsData: {imageURL:'/lms-react-app/images/reactjs.webp'}
    },
    {
      curriculumData: [{id: '3', name: 'lecture-1'}, {id: '3', name: 'lecture-2'}],
      landingPageData: {courseId: '123456', description: 'JavaScript (JS) is a versatile, high-level language used for building interactive web applications. It runs on both the client (browser) and server (Node.js), enabling dynamic content and asynchronous operations', level: '1', price: '10',  primaryLanguage:'English', title:'Fundamentals of JavaScript' },
      settingsData: {imageURL:'/lms-react-app/images/javascript.webp'}
    }
  ],
  myCourses: [
    // {
    //   courseId: '',  
    //   title: '',
    //   description: '',
    //   imageURL: '',
    // },
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
    setMyCourses: (state, action)=>{
      state.myCourses.push(action.payload)
    }
}});

export const { setUserFormData, setLogIn, setLogOut, setPublishedCourses, setIsStudent, setIsCreator, setCreatorMode, setStudentMode, setMyCourses } = userFormDataSlice.actions;
export default userFormDataSlice.reducer;