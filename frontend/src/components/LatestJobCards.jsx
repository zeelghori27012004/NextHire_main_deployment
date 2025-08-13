import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  const {
    _id,
    title = "No Title",
    description = "No description provided.",
    salary = "N/A",
    jobType = "Unknown",
    position = "N/A",
    company = {},
    location = "Not provided",
  } = job || {};

  const companyName = company?.name || "Unknown Company";

  return (
    <div
      onClick={() => navigate(`/description/${_id}`)}
      className="p-5 rounded-md shadow-xl bg-indigo-50 border border-purple-500 cursor-pointer hover:shadow-2xl transition"
    >
      <div>
        <h1 className="font-medium text-lg">{companyName}</h1>
        <p className="text-sm text-gray-500">{location}</p>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{title}</h1>
        <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4 flex-wrap">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          {position} Positions
        </Badge>
        <Badge className="text-[#F83002] font-bold" variant="ghost">
          {jobType}
        </Badge>
        <Badge className="text-[#7209b7] font-bold" variant="ghost">
          {salary}
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
