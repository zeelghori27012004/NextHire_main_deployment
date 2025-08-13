import React, { useEffect } from 'react';
import { Button } from './ui/button';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { toggleBookmarkJob } from '@/redux/jobThunks';

const Job = ({ job }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const isBookmarked = user?.bookmarks?.includes(job._id);

  const handleBookmark = async () => {
    if (!user) {
      toast.error('Please login to bookmark jobs');
      return;
    }

    try {
      await dispatch(toggleBookmarkJob(job._id)).unwrap();
      toast.success(
        isBookmarked 
          ? 'Job removed from bookmarks' 
          : 'Job added to bookmarks'
      );
    } catch (error) {
      toast.error(error.message || 'Failed to update bookmark');
    }
  };

  const daysAgoFunction = (mongodbTime) => {
    if (!mongodbTime) return '?';
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  const daysAgo = daysAgoFunction(job?.createdAt);

  return (
    <div className="p-5 rounded-md shadow-xl bg-indigo-50 border border-purple-500">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {daysAgo === 0 ? 'Today' : `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`}
        </p>
        <Button
          variant="outline"
          className="rounded-full"
          size="icon"
          onClick={handleBookmark}
          aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
        >
          {isBookmarked ? (
            <BookmarkCheck className="text-purple-600" />
          ) : (
            <Bookmark />
          )}
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo || '/default-logo.png'} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">{job?.company?.name || 'Unknown Company'}</h1>
          <p className="text-sm text-gray-500">{job?.location || 'India'}</p>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-lg my-2">{job?.title || 'No Title'}</h1>
        <p className="text-sm text-gray-600 line-clamp-3">
          {job?.description || 'No description available.'}
        </p>
      </div>

      <div className="flex items-center gap-2 mt-4 flex-wrap">
        {job?.position && (
          <Badge className="text-blue-700 font-bold" variant="ghost">
            {job.position} Positions
          </Badge>
        )}
        {job?.jobType && (
          <Badge className="text-[#F83002] font-bold" variant="ghost">
            {job.jobType}
          </Badge>
        )}
        {job?.salary && (
          <Badge className="text-[#7209b7] font-bold" variant="ghost">
            {job.salary}
          </Badge>
        )}
      </div>

      <div className="flex items-center gap-4 mt-4">
        <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline">
          Details
        </Button>
      </div>
    </div>
  );
};

export default Job;