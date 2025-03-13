import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useOne } from '@refinedev/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EmployeeProfile = ({ route }) => {
    const { PofileShown = "NORMALUSER", CurrentUserId = null } = route?.params || {};
    const [userid, setUserid] = useState(null);


  useEffect(() => {
    const getUserId = async () => {
      // If the profile to be shown is a normal user's profile and a CurrentUserId is provided, use it.
      // Otherwise, retrieve the userid from AsyncStorage.
      if (PofileShown === "NORMALUSER" && CurrentUserId) {
        setUserid(CurrentUserId);
      } else {
        const storedUserId = await AsyncStorage.getItem('userid');
        setUserid(storedUserId);
      }
    };
    
    getUserId();
  }, [PofileShown, CurrentUserId]);

  const { data, isLoading, error } = useOne({
    resource: "users",
    id: String(userid),
    meta: {
      populate: ["photo", "jobs"],
    },
    enabled: !!userid,
  });

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const user = data?.data;

  // Employee data (this can be replaced by dynamic data as needed)
  const employeeData = {
    name: "Manish Malviya",
    yearOfPassout: "2011",
    branch: "Civil Engineering",
    currentCity: "Noida",
    company: "Pidilite Industries",
    department: "Technical Services",
    role: "RBDM - TS",
    business: "Technical Services of Waterproofing",
    from: "Khandwa",
    currentlyLiving: "Noida",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg", // Placeholder image
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: employeeData.avatar }} style={styles.avatar} />
          </View>
          <Text style={styles.name}>
            {user?.firstname + " " + user?.lastname}
          </Text>
          <View style={styles.roleContainer}>
            <Text style={styles.role}>{employeeData.role}</Text>
          </View>
        </View>

        {/* Work Information */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Work Information</Text>
          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <Ionicons name="business-outline" size={20} color="#0077B6" />
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoLabel}>Company</Text>
              <Text style={styles.infoValue}>{user?.jobs?.organization}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <Ionicons name="people-outline" size={20} color="#0077B6" />
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoLabel}>Department</Text>
              <Text style={styles.infoValue}>{employeeData.department}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <Ionicons name="briefcase-outline" size={20} color="#0077B6" />
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoLabel}>Business</Text>
              <Text style={styles.infoValue}>{employeeData.business}</Text>
            </View>
          </View>
        </View>

        {/* Education Information */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Education</Text>
          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <Ionicons name="school-outline" size={20} color="#0077B6" />
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoLabel}>Branch</Text>
              <Text style={styles.infoValue}>{employeeData.branch}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <Ionicons name="calendar-outline" size={20} color="#0077B6" />
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoLabel}>Year of Passout</Text>
              <Text style={styles.infoValue}>{employeeData.yearOfPassout}</Text>
            </View>
          </View>
        </View>

        {/* Location Information */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Location</Text>
          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <Ionicons name="home-outline" size={20} color="#0077B6" />
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoLabel}>Originally From</Text>
              <Text style={styles.infoValue}>{employeeData.from}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <Ionicons name="location-outline" size={20} color="#0077B6" />
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoLabel}>Currently Living In</Text>
              <Text style={styles.infoValue}>{employeeData.currentlyLiving}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 15,
  },
  avatarContainer: {
    padding: 3,
    borderRadius: 75,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 15,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  roleContainer: {
    backgroundColor: '#0077B6',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
  },
  role: {
    color: '#ffffff',
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
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
});

export default EmployeeProfile;
