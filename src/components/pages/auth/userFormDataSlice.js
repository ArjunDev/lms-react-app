import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: {},
  currentUser: {  
    name: "",
    email: "",
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
  isStudent: true,
  studentMode: true,
  isCreator: false,
  creatorMode: false,
  isLoggedIn: false,
  myCourses: [],
  publishedCourses: [],
};

const userFormDataSlice = createSlice({
  name: 'userFormData',
  initialState,
  reducers: {
    setSignUp: (state, action) => {
      // state.currentUser = { ...defaultUserData, isLoggedIn: true, ...action.payload };
      state.currentUser = { ...action.payload };
    },
    setLogIn: (state, action) => {
        state.currentUser = { ...action.payload }
    },
    setLogOut: (state, action) => {
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
  setLogOut,
  setPublishedCourses,
  setIsStudent,
  setIsCreator,
  setCreatorMode,
  setStudentMode,
  setMyCourses,
} = userFormDataSlice.actions;

export default userFormDataSlice.reducer;
