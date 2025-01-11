import React, { useState } from 'react';
import JobList from './JobList';

const JobManager= () => {
  const [jobs, setJobs] = useState([]);
  const handleAddJob = (job) => {
    setJobs([...jobs, job]);
  };

  const handleEditJob = (editedJob) => {
    setJobs(jobs.map(job => job.id === editedJob.id ? editedJob:job ));
  };

  const handleDeleteJob = (id) => {
    setJobs(jobs.filter(job => job.id !== id));
  };

  return (
    <div>
      <h1>Job Management</h1>
      <JobList
        jobs={jobs}
        onAddJob={handleAddJob}
        onEditJob={handleEditJob}
        onDeleteJob={handleDeleteJob}
      />
    </div>
  );
};

export default JobManager;

