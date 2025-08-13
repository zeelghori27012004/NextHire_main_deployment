import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Jobs = () => {
  const { allJobs = [], searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState([]);

  useEffect(() => {
    if (searchedQuery && allJobs.length > 0) {
      const lowerCaseQuery = searchedQuery.toLowerCase().trim();

      let filtered = [];

      // Check if the query is a salary range
      const salaryMatch = lowerCaseQuery.match(/(\d+)[^\d]+(\d+)/);
      if (salaryMatch) {
        const min = parseInt(salaryMatch[1]);
        const max = parseInt(salaryMatch[2]);

        filtered = allJobs.filter((job) => {
          const jobSalary = parseInt(job.salary); // assuming job.salary is numeric or string of digits
          return jobSalary >= min && jobSalary <= max;
        });
      } else {
        filtered = allJobs.filter((job) => {
          return (
            job.title?.toLowerCase().includes(lowerCaseQuery) ||
            job.description?.toLowerCase().includes(lowerCaseQuery) ||
            job.location?.toLowerCase().includes(lowerCaseQuery)
          );
        });
      }

      setFilterJobs(filtered);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />
      <div className="bg-slate-100">
        <div className="bg-slate-100 max-w-7xl mx-auto my-2">
          <div className="flex gap-5">
            <div className="w-1/5">
              <FilterCard />
            </div>
            {filterJobs.length === 0 ? (
              <span className="text-gray-500">Job not found</span>
            ) : (
              <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {filterJobs.map((job) => (
                    <motion.div
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.3 }}
                      key={job?._id}
                    >
                      <Job job={job} />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
