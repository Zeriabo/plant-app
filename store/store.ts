import { configureStore } from "@reduxjs/toolkit";
import photoReducer from "./slices/photoSlice";
import themeReducer from "./slices/themeSlice";

export const store = configureStore({
  reducer: {
    photos: photoReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
