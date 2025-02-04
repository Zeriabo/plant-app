import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import uuid from "react-native-uuid";

interface Photo {
  id: string;
  uri: string;
  name: string;
  notes: string;
  date: string;
}

interface PhotoState {
  photos: Photo[];
}

const initialState: PhotoState = {
  photos: [],
};

const photoSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {
    addPhoto: (state, action: PayloadAction<Photo>) => {
      const newPhoto = {
        ...action.payload,
        id: uuid.v4() as string,
      };

      state.photos.push(newPhoto);
    },
    updatePhoto: (state, action: PayloadAction<Photo>) => {
      const index = state.photos.findIndex((p) => p.id === action.payload.id);
      console.log("index is " + index);
      if (index !== -1) {
        state.photos[index] = action.payload;
      }
    },
  },
});

export const { addPhoto, updatePhoto } = photoSlice.actions;
export const selectPhotos = (state: any) => state.photos.photos;
export default photoSlice.reducer;
