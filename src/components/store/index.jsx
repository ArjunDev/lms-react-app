import { configureStore } from "@reduxjs/toolkit";
import userFormDataSlice from "../pages/auth/userFormDataSlice";
import globalCoursesSlice from "./globalCoursesSlice";

  const store = configureStore({

    reducer: {
      userFormData: userFormDataSlice,
      globalCourses: globalCoursesSlice,
    }
  });


export default store;