import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  password: "",
  isStudent: true,
  isCreator: false,
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
    setPublishedCourses: (state, action) => {
      state.publishedCourses.push(action.payload);
    }
  }
});

export const { setUserFormData, setLogIn, setLogOut, setPublishedCourses } = userFormDataSlice.actions;
export default userFormDataSlice.reducer;