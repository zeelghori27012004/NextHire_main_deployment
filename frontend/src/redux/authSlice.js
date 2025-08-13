import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"auth",
    initialState:{
        loading:false,
        user:null
    },
    reducers:{
   
        setLoading:(state, action) => {
            state.loading = action.payload;
        },
        setUser:(state, action) => {
            state.user = action.payload;
        },
        toggleBookmark: (state, action) => {
      const jobId = action.payload;
      if (!state.user) return;
      
      const index = state.user.bookmarks.indexOf(jobId);
      if (index === -1) {
        state.user.bookmarks.push(jobId);
      } else {
        state.user.bookmarks.splice(index, 1);
      }
    }
    }
});
export const {setLoading, setUser, toggleBookmark } = authSlice.actions;
export default authSlice.reducer;