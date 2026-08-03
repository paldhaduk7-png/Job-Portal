import { createSlice } from "@reduxjs/toolkit";

const savedJobSlice = createSlice({
  name: "savedJobs",
  initialState: {
    savedJobs: [],
  },
  reducers: {
    setSavedJobs: (state, action) => {
      state.savedJobs = action.payload;
    },

    clearSavedJobs: (state) => {
      state.savedJobs = [];
    },

    addSavedJob: (state, action) => {
      state.savedJobs.push(action.payload);
    },

    removeSavedJob: (state, action) => {
      state.savedJobs = state.savedJobs.filter(
        (job) => job._id !== action.payload
      );
    },
  },
});

export const {
  setSavedJobs,
  clearSavedJobs,
  addSavedJob,
  removeSavedJob,
} = savedJobSlice.actions;

export default savedJobSlice.reducer;