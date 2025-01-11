import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const Profession = ({ profession }) => {
  return (
    <View style={styles.card}>
      {/* Avatar section */}
      <View style={styles.avatarContainer}>
        <Avatar.Icon size={64} icon="account" />
      </View>

      <View style={styles.content}>
        {/* Title */}
        <Text style={styles.title}>{profession?.title}</Text>

        {/* Description */}
        {profession?.description && <Text style={styles.description}>{profession?.description}</Text>}

        {/* Skills */}
        {profession?.skills?.length > 0 && (
          <View style={styles.skillsContainer}>
            <Text style={styles.skillsTitle}>Skills:</Text>
            <View style={styles.skillsList}>
              {profession.skills.map((skill, index) => (
                <Text key={index} style={styles.skillTag}>{skill}</Text>
              ))}
            </View>
          </View>
        )}

        {/* Years of Experience */}
        {profession?.yearsOfExperience !== undefined && (
          <Text style={styles.experienceText}>Years of Experience: {profession?.yearsOfExperience}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 300,
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3, // adds shadow on Android
    shadowColor: '#000', // adds shadow on iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  avatarContainer: {
    backgroundColor: '#f0f2f5',
    padding: 20,
    alignItems: 'center',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  skillsContainer: {
    marginTop: 10,
  },
  skillsTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  skillsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillTag: {
    backgroundColor: '#007bff',
    color: '#fff',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 5,
    marginBottom: 5,
  },
  experienceText: {
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default Profession;
