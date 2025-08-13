import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const Browse = () => {
  useGetAllJobs();
  const { allJobs = [], searchedQuery } = useSelector((store) => store.job);
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    if (searchedQuery && allJobs.length > 0) {
      const filtered = allJobs.filter((job) => {
        return (
          job.title?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location?.toLowerCase().includes(searchedQuery.toLowerCase())
        );
      });
      setFilteredJobs(filtered);
    } else {
      setFilteredJobs(allJobs);
    }
  }, [searchedQuery, allJobs]);

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />
      <div className="bg-slate-100">
        <div className="bg-slate-100 max-w-7xl mx-auto my-2">
          <h1 className="font-bold text-xl my-2">
            Search Results for "{searchedQuery}" ({filteredJobs.length})
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredJobs.length === 0 ? (
              <p className="text-gray-500 col-span-full">No jobs found.</p>
            ) : (
              filteredJobs.map((job) => <Job key={job._id} job={job} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Browse;
