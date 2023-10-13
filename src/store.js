import { configureStore } from "@reduxjs/toolkit";
import app, { setDarkMode } from "./reducers/app";

const localStorageMiddleware = (store) => (next) => (action) => {
  if (setDarkMode.match(action)) {
    try {
      localStorage.setItem("isDarkMode", action.payload.toString());
    } catch (e) {
      console.log("Something went wrong in localStorageMiddleware: ", e);
    };
  };
  return next(action);
};

export const store = configureStore({
  reducer: {
    app,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
});
