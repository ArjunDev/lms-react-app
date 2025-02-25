import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  password: "",
  isStudent: true,
  studentMode: true,
  isCreator: true,
  creatorMode: false,
  isLoggedIn: false,
  publishedCourses: [],
  myCourses: [
    {
      id: '1',  
      title: 'test data',
      author: 'test data',
      image: 'test-image',
    }
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
      state.isStudent = action.payload;
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