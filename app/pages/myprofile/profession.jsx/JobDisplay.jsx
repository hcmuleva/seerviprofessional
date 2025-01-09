import React, { useState } from 'react';
import { View, Text, Button, Picker, FlatList, StyleSheet, Alert } from 'react-native';

const jobTypes = ["All", "Permanent", "Parttime", "Contract", "Other"];

export default function JobDisplay({ users }) {
  const [selectedType, setSelectedType] = useState("All");

  const filteredJobs = selectedType === "All" ? users : users.filter((job) => job.type === selectedType);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Job Listings</Text>

      {/* Job Type Filter */}
      <View style={styles.filterContainer}>
        <Picker
          selectedValue={selectedType}
          onValueChange={(itemValue) => setSelectedType(itemValue)}
          style={styles.picker}
        >
          {jobTypes.map((type) => (
            <Picker.Item key={type} label={type} value={type} />
          ))}
        </Picker>
      </View>

      {/* Job Cards */}
      {filteredJobs.length > 0 ? (
        <FlatList
          data={filteredJobs}
          keyExtractor={(job) => job.id.toString()}
          renderItem={({ item: job }) => (
            <View style={styles.card} key={job.id}>
              <Text style={styles.cardTitle}>{job.title}</Text>
              <Text style={styles.cardText}>
                <Text style={styles.bold}>Company:</Text> {job.organization}
              </Text>
              <Text style={styles.cardText}>
                <Text style={styles.bold}>Job Type:</Text> {job.job_type}
              </Text>
              <Text style={styles.location}>{job.location}</Text>
              <Text style={styles.badge}>{job.type}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noJobsText}>No jobs available for the selected type.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  filterContainer: {
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  picker: {
    width: 200,
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardText: {
    marginVertical: 5,
  },
  bold: {
    fontWeight: 'bold',
  },
  location: {
    marginTop: 10,
    color: '#888',
  },
  badge: {
    marginTop: 5,
    padding: 5,
    backgroundColor: '#108ee9',
    color: '#fff',
    textAlign: 'center',
    borderRadius: 5,
  },
  noJobsText: {
    fontSize: 16,
    color: '#888',
  },
});
