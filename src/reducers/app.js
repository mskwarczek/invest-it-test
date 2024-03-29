import { createSlice } from "@reduxjs/toolkit";

export const loadStoredState = () => {
  try {
    const isDarkMode = localStorage.getItem("isDarkMode");
    if (!isDarkMode) return false;
    return JSON.parse(isDarkMode);
  } catch (e) {
    console.log("Something went wrong in loadStoredState: ", e);
    return false;
  };
};

const initialState = {
  isDarkMode: loadStoredState(),
  list: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setDarkMode(state, action) {
      state.isDarkMode = action.payload;
    },
    addImages(state, action) {
      state.list = state.list.concat(action.payload);
    }
  },
});

export const { setDarkMode, addImages } = appSlice.actions;

export default appSlice.reducer;
