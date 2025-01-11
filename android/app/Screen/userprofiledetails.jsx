import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const overviewsect = [
  { key: "personalInfo", label: "Personal", icon: "person-outline" },
  { key: "jobs", label: "Job", icon: "briefcase-outline" },
  { key: "contactInfo", label: "Contact", icon: "call-outline" },
  { key: "familyDetails", label: "Family", icon: "people-outline" },
  { key: "educationInfo", label: "Educational", icon: "school-outline" },
  { key: "lifestyle", label: "Lifestyle", icon: "heart-outline" },
  { key: "preferences", label: "Preferences", icon: "options-outline" },
];

const UserProfileOverview = ({ route }) => {
  const { userData, itemKey } = route.params;

  console.log("I AM IN USERPROFIEL", itemKey)
  console.log("USERPROFILEOVERVIEW", userData);

  const [selectedSection, setSelectedSection] = useState(null);

  const renderContent = (activeSection) => {
    switch (activeSection) {
      case "personalInfo":
        return {
          name: `${userData?.firstname} ${userData?.lastname}`,
          dob: userData?.dob || "Not Provided",
          age: 28, // You could calculate age based on dob if it's available
          gender: userData?.sex || "Not Provided",
          height: "5'11\"",
          weight: "75 kg",
          bodyType: "Athletic",
          ethnicity: userData?.jati || "Not Provided",
          religion: "Agnostic", // Could add more fields if available
          zodiacSign: "Leo", // Hardcoded for now, can be updated based on dob
        };
      case "jobs":
        return userData?.jobs?.map(job => ({
          jobTitle: job.post || "Not Provided",
          company: job.organization || "Not Provided",
          experience: job.experience || "Not Provided",
        }));
      case "contactInfo":
        return {
          phone: userData?.mobile || "Not Provided",
          email: userData?.email || "Not Provided",
          address: "Not Available", // If the address is available, you can add it here
        };
      case "familyDetails":
        return {
          mother: userData?.mother || "Not Provided",
          father: userData?.father || "Not Provided",
          siblings: "2 brothers, 1 sister", // Example, add as needed
        };
      case "educationInfo":
        return {
          degree: userData?.education_level || "Not Provided",
          university: "XYZ University", // Placeholder, if available add real data
          graduationYear: "2019", // Placeholder
        };
      case "lifestyle":
        return {
          hobbies: "Reading, Hiking, Swimming", // Placeholder
          diet: "Vegetarian", // Placeholder
          exercise: "Gym 3 times a week", // Placeholder
        };
      case "preferences":
        return {
          preferredLanguage: "English", // Placeholder
          preferredMusic: "Pop, Jazz", // Placeholder
          travelDestinations: "Japan, Australia, Italy", // Placeholder
        };
      default:
        return {};
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.item, selectedSection === item.key && styles.selectedItem]}
      onPress={() => setSelectedSection(item.key)}
    >
      <View style={styles.iconContainer}>
        <Ionicons name={item.icon} size={24} color="#FF406C" />
      </View>
      <Text style={styles.label}>{item.label}</Text>
    </TouchableOpacity>
  );

  const renderSectionContent = (sectionKey) => {
    const sectionData = renderContent(sectionKey);

    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>
          {overviewsect.find((section) => section.key === sectionKey)?.label}
        </Text>
        {Array.isArray(sectionData)
          ? sectionData.map((job, index) => (
              <View key={index} style={styles.infoRow}>
                <Text style={styles.infoLabel}>Job {index + 1}:</Text>
                <Text style={styles.infoValue}>
                  {job.jobTitle} at {job.company} - {job.experience} years of experience
                </Text>
              </View>
            ))
          : Object.entries(sectionData).map(([key, value]) => (
              <View key={key} style={styles.infoRow}>
                <Text style={styles.infoLabel}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}:
                </Text>
                <Text style={styles.infoValue}>{value}</Text>
              </View>
            ))}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Profile Overview</Text>
      <FlatList
        data={overviewsect}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        numColumns={3}
        contentContainerStyle={styles.listContainer}
        scrollEnabled={false}
      />
      {selectedSection && renderSectionContent(selectedSection)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 16,
    marginLeft: 16,
  },
  listContainer: {
    alignItems: 'flex-start',
    paddingHorizontal: 8,
  },
  item: {
    width: '33.33%',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  selectedItem: {
    backgroundColor: 'rgba(255, 64, 108, 0.1)',
    borderRadius: 8,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 64, 108, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
  },
  sectionContainer: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#86878B',
  },
  infoValue: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
});

export default UserProfileOverview;
