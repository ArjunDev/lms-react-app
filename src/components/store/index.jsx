import { configureStore } from "@reduxjs/toolkit";
import userFormDataSlice from "../pages/auth/userFormDataSlice";

  const store = configureStore({

    reducer: {
      userFormData: userFormDataSlice,

    }
  });


export default store;