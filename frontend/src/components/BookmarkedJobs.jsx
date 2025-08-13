import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBookmarkedJobs } from '@/redux/jobThunks';
import { Button } from './ui/button';
import { Bookmark, BookmarkCheck, Briefcase, MapPin, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const BookmarkedJobs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const { 
    bookmarkedJobs = [], 
    bookmarksLoading, 
    bookmarksError 
  } = useSelector((store) => store.job);

  useEffect(() => {
    dispatch(fetchBookmarkedJobs());
  }, [dispatch, user?.bookmarks]);

  if (bookmarksLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (bookmarksError) {
    toast.error(bookmarksError);
    return (
      <div className="text-center py-20 text-red-500">
        Error loading bookmarks. Please try again later.
      </div>
    );
  }

  const hasBookmarks = user?.bookmarks?.length > 0;
  const showEmptyState = !hasBookmarks || bookmarkedJobs.length === 0;

  if (showEmptyState) {
    return (
      <div className="text-center py-20">
        <Bookmark className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-4 text-lg font-medium text-gray-900">
          {hasBookmarks ? 'No matching bookmarked jobs' : 'No bookmarked jobs'}
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          {hasBookmarks 
            ? 'Your bookmarked jobs might have expired or been removed' 
            : 'Save jobs you\'re interested in by clicking the bookmark icon'}
        </p>
        <div className="mt-6">
          <Button
            onClick={() => navigate('/jobs')}
            className="bg-[#6A38C2] hover:bg-[#5b30a6]"
          >
            Browse Jobs
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Bookmarked Jobs</h1>
          <p className="mt-2 text-sm text-gray-600">
            {bookmarkedJobs.length} saved {bookmarkedJobs.length === 1 ? 'job' : 'jobs'}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bookmarkedJobs.map((job) => (
            <div 
              key={job._id} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{job.title}</h3>
                    <p className="text-sm font-medium text-[#6A38C2] mt-1">
                      {job.company?.name || 'Unknown Company'}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigate(`/description/${job._id}`)}
                  >
                    <BookmarkCheck className="h-5 w-5 text-[#6A38C2]" />
                  </Button>
                </div>

                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <MapPin className="flex-shrink-0 mr-1.5 h-5 w-5" />
                  {job.location || 'Location not specified'}
                </div>

                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <DollarSign className="flex-shrink-0 mr-1.5 h-5 w-5" />
                  {job.salary ? `${job.salary} LPA` : 'Salary not specified'}
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    {job.jobType || 'Full-time'}
                  </span>
                  <Button
                    onClick={() => navigate(`/description/${job._id}`)}
                    variant="outline"
                    className="text-[#6A38C2] border-[#6A38C2] hover:bg-[#6A38C2] hover:text-white"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookmarkedJobs;