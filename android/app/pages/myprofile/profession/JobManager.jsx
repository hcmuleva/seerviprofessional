import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import JobList from './JobList';

const JobManager = () => {
  const [jobs, setJobs] = useState([]);

  const handleAddJob = (job) => {
    setJobs([...jobs, job]);
  };

  const handleEditJob = (editedJob) => {
    setJobs(jobs.map((job) => (job.id === editedJob.id ? editedJob : job)));
  };

  const handleDeleteJob = (id) => {
    setJobs(jobs.filter((job) => job.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Job Management</Text>

      {/* JobList Component */}
      <JobList
        jobs={jobs}
        onAddJob={handleAddJob}
        onEditJob={handleEditJob}
        onDeleteJob={handleDeleteJob}
      />

      {/* Additional Add Job Button */}
      <Button
        title="Add Job"
        onPress={() => handleAddJob({ id: jobs.length + 1, post: 'New Job', organization: 'Company', experience: 2, type: 'Full-time', job_type: 'Permanent', from: '2025-01-01', to: '2025-12-31', address: { village: 'Village', tehsil: 'Tehsil', district: 'District', state: 'State' } })}
      />
       
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default JobManager;
