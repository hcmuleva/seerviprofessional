import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProfilePage = () => {
  const user = {
    name: 'John Doe',
    photo: 'https://via.placeholder.com/150',
    personalInfo: {
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      dateOfBirth: 'January 15, 1985',
    },
    familyInfo: {
      maritalStatus: 'Married',
      spouse: 'Jane Doe',
      children: 2,
    },
    education: [
      {
        degree: 'Master of Science in Computer Science',
        institution: 'Stanford University',
        year: '2010',
      },
      {
        degree: 'Bachelor of Science in Software Engineering',
        institution: 'MIT',
        year: '2008',
      },
    ],
    profileCompletion: 85,
  };

  const renderSection = (title, content) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {content}
    </View>
  );

  const renderInfoItem = (icon, label, value) => (
    <View style={styles.infoItem}>
      <Icon name={icon} size={24} color="#4A90E2" style={styles.infoIcon} />
      <View>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: user.photo }} style={styles.profileImage} />
        <Text style={styles.name}>{user.name}</Text>
        <View style={styles.completionContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${user.profileCompletion}%` },
              ]}
            />
          </View>
          <Text style={styles.completionText}>
            {user.profileCompletion}% Complete
          </Text>
        </View>
      </View>

      {renderSection(
        'Personal Information',
        <View>
          {renderInfoItem('email', 'Email', user.personalInfo.email)}
          {renderInfoItem('phone', 'Phone', user.personalInfo.phone)}
          {renderInfoItem('location-on', 'Location', user.personalInfo.location)}
          {renderInfoItem('cake', 'Date of Birth', user.personalInfo.dateOfBirth)}
        </View>
      )}

      {renderSection(
        'Family Information',
        <View>
          {renderInfoItem('favorite', 'Marital Status', user.familyInfo.maritalStatus)}
          {renderInfoItem('person', 'Spouse', user.familyInfo.spouse)}
          {renderInfoItem('child-care', 'Children', user.familyInfo.children.toString())}
        </View>
      )}

      {renderSection(
        'Education',
        <View>
          {user.education.map((edu, index) => (
            <View key={index} style={styles.educationItem}>
              <Text style={styles.degree}>{edu.degree}</Text>
              <Text style={styles.institution}>{edu.institution}</Text>
              <Text style={styles.year}>{edu.year}</Text>
            </View>
          ))}
        </View>
      )}

      <TouchableOpacity style={styles.editButton} onPress={() => { /* Handle Edit Profile */ }}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#4A90E2',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 10,
  },
  completionContainer: {
    width: '100%',
    marginTop: 15,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2ECC71',
  },
  completionText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginTop: 5,
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#FFFFFF',
    margin: 10,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoIcon: {
    marginRight: 10,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666666',
  },
  infoValue: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '500',
  },
  educationItem: {
    marginBottom: 15,
  },
  degree: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
  },
  institution: {
    fontSize: 14,
    color: '#666666',
  },
  year: {
    fontSize: 14,
    color: '#666666',
  },
  editButton: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    margin: 20,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfilePage;
