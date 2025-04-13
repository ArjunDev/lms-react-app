import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  courses: [],
};

const globalCoursesSlice = createSlice({
  name: 'globalCourses',
  initialState,
  reducers: {
    // setGlobalCourses: (state, action) => {
    //   state.courses = Object.values(action.payload); // Convert object to array
    // },// this will replcace everything in globalCourses

    setGlobalCourses: (state, action) => {
      state.courses = action.payload; 
    },// this will replcace everything in globalCourses

    addGlobalCourse: (state, action) => {
      state.courses.push(action.payload);
    },// this will add course to globalCourses
  },
});

export const { setGlobalCourses, addGlobalCourse } = globalCoursesSlice.actions;
export default globalCoursesSlice.reducer;
