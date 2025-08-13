import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { 
  setBookmarkedJobs, 
  setBookmarksLoading, 
  setBookmarksError,
  toggleBookmarkLocally
} from "./jobSlice";
import { toggleBookmark } from "./authSlice";

export const fetchBookmarkedJobs = () => async (dispatch, getState) => {
  try {
    dispatch(setBookmarksLoading(true));
    const { user } = getState().auth;
    
    if (user?.bookmarks?.length > 0) {
      const res = await axios.get(`${JOB_API_END_POINT}/bookmarked`, {
        params: { jobIds: user.bookmarks.join(',') },
        withCredentials: true,
      });
      
      if (res.data.success) {
        dispatch(setBookmarkedJobs(res.data.jobs));
      }
    } else {
      dispatch(setBookmarkedJobs([]));
    }
  } catch (error) {
    dispatch(setBookmarksError(error.message));
  } finally {
    dispatch(setBookmarksLoading(false));
  }
};

export const toggleBookmarkJob = (jobId) => async (dispatch) => {
  try {
    // Optimistic update
    dispatch(toggleBookmark(jobId));
    dispatch(toggleBookmarkLocally(jobId));
    
    const res = await axios.patch(
      `${USER_API_END_POINT}/bookmark/${jobId}`,
      {},
      { withCredentials: true }
    );
    
    if (!res.data.success) {
      // Revert if API call fails
      dispatch(toggleBookmark(jobId));
      dispatch(toggleBookmarkLocally(jobId));
    }
  } catch (error) {
    // Revert if API call fails
    dispatch(toggleBookmark(jobId));
    dispatch(toggleBookmarkLocally(jobId));
    throw error;
  }
};