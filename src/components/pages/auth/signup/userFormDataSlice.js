import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  password: "",
  isStudent: true,
  isCreator: false,
}

const userFormDataSlice = createSlice({
  name: 'userFormData',
  initialState,
  reducers: {
    setUserFormData: (state, action) => {
      return { ...state, ...action.payload };
    }
  }
});

export const { setUserFormData } = userFormDataSlice.actions;
export default userFormDataSlice.reducer;