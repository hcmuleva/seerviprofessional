import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const MatrimonialCardGrid = () => {
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filters, setFilters] = useState({ age: '', job: '', name: '' });

  useEffect(() => {
    // Fetch profiles from Strapi
    axios.get('https://your-strapi-url.com/profiles')
      .then(response => {
        setProfiles(response.data);
        setFilteredProfiles(response.data);
      })
      .catch(error => console.error('Error fetching profiles:', error));
  }, []);

  // Handle filter change
  const applyFilters = () => {
    const filtered = profiles.filter(profile => {
      const matchesName = profile.name.toLowerCase().includes(filters.name.toLowerCase());
      const matchesAge = filters.age ? profile.age <= filters.age : true;
      const matchesJob = profile.occupation.toLowerCase().includes(filters.job.toLowerCase());
      return matchesName && matchesAge && matchesJob;
    });
    setFilteredProfiles(filtered);
  };

  return (
    <View style={styles.container}>
      {/* Filters */}
      <View style={styles.filterContainer}>
        <TextInput
          style={styles.filterInput}
          placeholder="Search by Name"
          value={filters.name}
          onChangeText={(text) => setFilters({ ...filters, name: text })}
        />
        <TextInput
          style={styles.filterInput}
          placeholder="Search by Age"
          value={filters.age}
          onChangeText={(text) => setFilters({ ...filters, age: text })}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.filterInput}
          placeholder="Search by Job"
          value={filters.job}
          onChangeText={(text) => setFilters({ ...filters, job: text })}
        />
        <Button title="Apply Filters" onPress={applyFilters} />
      </View>

      {/* Profiles List */}
      <ScrollView style={styles.scrollView}>
        <View style={styles.grid}>
          {filteredProfiles.map((profile, index) => (
            <View key={profile.id} style={styles.card}>
              <Text style={styles.cardTitle}>{profile.name}</Text>
              <Text>{profile.age} years old</Text>
              <Text>{profile.occupation}</Text>
              <Text>{profile.location}</Text>
              {/* Add more profile details as needed */}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  filterContainer: {
    marginBottom: 16,
  },
  filterInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MatrimonialCardGrid;
