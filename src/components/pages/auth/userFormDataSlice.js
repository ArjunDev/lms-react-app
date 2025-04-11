import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: {},
  currentUser: {  
    name: "",
    email: "",
    // password: "",
    isStudent: true,
    studentMode: true,
    isCreator: false,
    creatorMode: false,
    isLoggedIn: false,
    myCourses: [],
    publishedCourses: [],
  },
};

const defaultUserData = {
  name: "",
  email: "",
  // password: "",
  isStudent: true,
  studentMode: true,
  isCreator: false,
  creatorMode: false,
  isLoggedIn: false,
  myCourses: [],
  publishedCourses: [],
  // publishedCourses: [
  //   {
  //     curriculumData: [{ id: '1', name: 'lecture-1' }, { id: '2', name: 'lecture-2' }],
  //     landingPageData: {
  //       courseId: '1234',
  //       description: 'Tailwind CSS is a utility-first CSS framework...',
  //       level: '1',
  //       price: '20',
  //       primaryLanguage: 'English',
  //       title: 'Fundamentals of Tailwincss'
  //     },
  //     settingsData: { imageURL: '/lms-react-app/images/tailwindcss.webp' }
  //   },
  //   {
  //     curriculumData: [{ id: '2', name: 'lecture-1' }],
  //     landingPageData: {
  //       courseId: '12345',
  //       description: 'React.js is a JavaScript library...',
  //       level: '1',
  //       price: '30',
  //       primaryLanguage: 'English',
  //       title: 'Basics of React JS'
  //     },
  //     settingsData: { imageURL: '/lms-react-app/images/reactjs.webp' }
  //   },
  //   {
  //     curriculumData: [{ id: '3', name: 'lecture-1' }, { id: '3', name: 'lecture-2' }],
  //     landingPageData: {
  //       courseId: '123456',
  //       description: 'JavaScript (JS) is a versatile...',
  //       level: '1',
  //       price: '10',
  //       primaryLanguage: 'English',
  //       title: 'Fundamentals of JavaScript'
  //     },
  //     settingsData: { imageURL: '/lms-react-app/images/javascript.webp' }
  //   }
  // ],
  myCourses: [],
};

const userFormDataSlice = createSlice({
  name: 'userFormData',
  initialState,
  reducers: {
    setSignUp: (state, action) => {
      state.currentUser = { ...defaultUserData, isLoggedIn: true, ...action.payload };
    },
    // setUserFormData: (state, action) => {
    //   const { email } = action.payload;
    //   if (!state.users[email]) {
    //     state.users[email] = { ...defaultUserData, ...action.payload };
    //   } else {
    //     state.users[email] = { ...state.users[email], ...action.payload };
    //   }
    // },
    setLogIn: (state, action) => {
        state.currentUser = { ...defaultUserData, isLoggedIn: true, ...action.payload }
    },
    // setCurrentUser: (state, action) =>{
    //   state.currentUser = {...action.payload };
    // },
    setLogOut: (state, action) => {
      // // const { email } = action.payload;
      // // if (state.users[email]) {
      //   state.currentUser = {...state.defaultUserData, isLoggedIn: false, studentMode: true, creatorMode: false }
      // // }
      state.currentUser = {...defaultUserData}

    },
    setIsStudent: (state, action) => {
      const { email, value } = action.payload;
      if (state.users[email]) {
        state.users[email].isStudent = value;
      }
    },
    setIsCreator: (state, action) => {
      // const { email, value } = action.payload;
      // if (state.users[email]) {
      //   state.users[email].isCreator = value;
      // }

      state.currentUser.isCreator = action.payload;
    },
    setCreatorMode: (state, action) => {
      state.currentUser.creatorMode = action.payload;
    },
    setStudentMode: (state, action) => {
      // const { email, value } = action.payload;
      // if (state.users[email]) {
      //   state.users[email].studentMode = value;
      // }
      state.currentUser.studentMode = action.payload;
    },
    setPublishedCourses: (state, action) => {
      const courseData  = action.payload;
      state.currentUser.publishedCourses.push(courseData);
    },
    setMyCourses: (state, action) => {
      const course = action.payload
      state.currentUser.myCourses.push(course);
    },
  },
});

export const {
  setSignUp,
  setLogIn,
  // setCurrentUser,
  setLogOut,
  setPublishedCourses,
  setIsStudent,
  setIsCreator,
  setCreatorMode,
  setStudentMode,
  setMyCourses,
} = userFormDataSlice.actions;

export default userFormDataSlice.reducer;
