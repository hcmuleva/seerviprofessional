import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialTopTabNavigator();

const ProfileView = ({ userData }) => {
  const InfoItem = ({ icon, label, value }) => (
    <View style={styles.infoItem}>
      <Icon name={icon} size={24} color="#fff" style={styles.icon} />
      <View style={styles.infoContent}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );

  const EducationItem = ({ label, value }) => (
    <View style={styles.infoItem}>
      <View style={styles.infoContent}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: userData.profileImage }}
            style={styles.profileImage}
          />
          <View style={styles.imageGlow} />
        </View>
        <Text style={styles.name}>{userData.name}</Text>
        <Text style={styles.activeStatus}>Active since - {userData.activeSince}</Text>
      </View>

      <Tab.Navigator
        screenOptions={{
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabLabel,
          tabBarIndicatorStyle: styles.tabIndicator,
        }}
      >
        <Tab.Screen name="Personal">
          {() => (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Personal Information</Text>
              <InfoItem icon="email" label="Email" value={userData.email} />
              <InfoItem icon="phone" label="Phone" value={userData.phone} />
              <InfoItem icon="web" label="Website" value={userData.website} />
              <InfoItem icon="map-marker" label="Location" value={userData.location} />
            </View>
          )}
        </Tab.Screen>

        <Tab.Screen name="Education">
          {() => (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Education</Text>
              <EducationItem label="Degree" value="Bachelor's in Computer Science" />
              <EducationItem label="University" value="Random University" />
            </View>
          )}
        </Tab.Screen>

        <Tab.Screen name="Other">
          {() => (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Other Information</Text>
              <EducationItem label="Hobbies" value="Traveling, Coding, Reading" />
              <EducationItem label="Skills" value="React, Node.js, Python" />
            </View>
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </ScrollView>
  );
};

const ProfileEdit = ({ userData, onSave }) => {
  const [formData, setFormData] = useState(userData);

  const InputField = ({ label, value, onChangeText, icon }) => (
    <View style={styles.inputContainer}>
      <Icon name={icon} size={24} color="#fff" style={styles.icon} />
      <View style={styles.inputWrapper}>
        <Text style={styles.inputLabel}>{label}</Text>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor="#666"
          selectionColor="#fff"
        />
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.profileImageContainer}>
          <Image
            source={{ uri: formData.profileImage }}
            style={styles.profileImage}
          />
          <View style={styles.imageEditOverlay}>
            <Icon name="camera" size={24} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>

      <Tab.Navigator
        screenOptions={{
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabLabel,
          tabBarIndicatorStyle: styles.tabIndicator,
        }}
      >
        <Tab.Screen name="Personal">
          {() => (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Personal Information</Text>
              <InputField
                label="Name"
                value={formData.name}
                onChangeText={(text) => setFormData({ ...formData, name: text })}
                icon="account"
              />
              <InputField
                label="Email"
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
                icon="email"
              />
              <InputField
                label="Phone"
                value={formData.phone}
                onChangeText={(text) => setFormData({ ...formData, phone: text })}
                icon="phone"
              />
              <InputField
                label="Website"
                value={formData.website}
                onChangeText={(text) => setFormData({ ...formData, website: text })}
                icon="web"
              />
              <InputField
                label="Location"
                value={formData.location}
                onChangeText={(text) => setFormData({ ...formData, location: text })}
                icon="map-marker"
              />
            </View>
          )}
        </Tab.Screen>

        <Tab.Screen name="Education">
          {() => (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Education</Text>
              <InputField
                label="Degree"
                value="Bachelor's in Computer Science"
                onChangeText={(text) => setFormData({ ...formData, degree: text })}
                icon="school"
              />
              <InputField
                label="University"
                value="Random University"
                onChangeText={(text) => setFormData({ ...formData, university: text })}
                icon="university"
              />
            </View>
          )}
        </Tab.Screen>

        <Tab.Screen name="Other">
          {() => (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Other Information</Text>
              <InputField
                label="Hobbies"
                value="Traveling, Coding"
                onChangeText={(text) => setFormData({ ...formData, hobbies: text })}
                icon="pencil"
              />
            </View>
          )}
        </Tab.Screen>
      </Tab.Navigator>

      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => onSave(formData)}
      >
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default function Dashboard() {
  const [userData] = useState({
    name: 'Victoria Heard',
    activeSince: 'Jul, 2019',
    email: 'heard_j@gmail.com',
    phone: '9898712132',
    website: 'www.randomweb.com',
    location: 'Antigua',
    profileImage: 'https://your-profile-image-url.com',
  });

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
        tabBarIndicatorStyle: styles.tabIndicator,
      }}
    >
      <Tab.Screen name="View">
        {() => <ProfileView userData={userData} />}
      </Tab.Screen>
      <Tab.Screen name="Edit">
        {() => (
          <ProfileEdit
            userData={userData}
            onSave={(data) => console.log('Save:', data)}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  header: {
    alignItems: 'center',
    padding: 20,
  },
  profileImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    position: 'relative',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  imageGlow: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 60,
    backgroundColor: '#FF1493',
    opacity: 0.3,
    transform: [{ scale: 1.1 }],
  },
  imageEditOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  activeStatus: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  tabBar: {
    backgroundColor: '#0A0A0A',
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  tabLabel: {
    color: '#fff',
    fontSize: 14,
    textTransform: 'none',
  },
  tabIndicator: {
    backgroundColor: '#FF1493',
  },
  saveButton: {
    backgroundColor: '#FF1493',
    padding: 16,
    borderRadius: 8,
    margin: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  inputWrapper: {
    flex: 1,
    marginLeft: 12,
  },
  inputLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  input: {
    fontSize: 16,
    color: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingVertical: 8,
  },
});