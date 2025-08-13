import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    allAdminJobs: [],
    singleJob: null,
    searchJobByText: "",
    allAppliedJobs: [],
    searchedQuery: "",
    bookmarkedJobs: [], // Add this
    bookmarksLoading: false, // Add this
    bookmarksError: null, // Add this
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },
    setSearchJobByText: (state, action) => {
      state.searchJobByText = action.payload;
    },
    setAllAppliedJobs: (state, action) => {
      state.allAppliedJobs = action.payload;
    },
    setSearchedQuery: (state, action) => {
      state.searchedQuery = action.payload;
    },
    setBookmarkedJobs: (state, action) => {
      state.bookmarkedJobs = action.payload;
    },
    setBookmarksLoading: (state, action) => {
      state.bookmarksLoading = action.payload;
    },
    setBookmarksError: (state, action) => {
      state.bookmarksError = action.payload;
    },
    toggleBookmarkLocally: (state, action) => {
      const jobId = action.payload;
      const index = state.bookmarkedJobs.findIndex(job => job._id === jobId);
      if (index !== -1) {
        state.bookmarkedJobs.splice(index, 1);
      }
    }
  },
});
export const {
  setAllJobs,
  setSingleJob,
  setAllAdminJobs,
  setSearchJobByText,
  setAllAppliedJobs,
  setSearchedQuery,
  setBookmarkedJobs, 
  setBookmarksLoading, 
  setBookmarksError, 
  toggleBookmarkLocally
} = jobSlice.actions;
export default jobSlice.reducer;
  