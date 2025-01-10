import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput,
  FlatList,
} from 'react-native';
import {
  Feather,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useOne } from '@refinedev/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const ProfileMobile = () => {
  const navigation = useNavigation();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('Personal Info');
  const [userid, setUserid] = useState(null);
  const [personalInfo, setPersonalInfo] = useState({
    name: 'Manish',
    age: '24',
    bio: 'I love coding and outdoor activities!',
  });
  const [education, setEducation] = useState({
    degree: 'Bachelor of Science',
    school: 'Tech University',
    graduationYear: '2022',
  });

  useEffect(() => {
    const getUserId = async () => {
      const storedUserId = await AsyncStorage.getItem('userid');
      setUserid(storedUserId);
    };

    getUserId();
  }, []);

  const { data, isLoading, error } = useOne({
    resource: "users",
    id: String(userid),
    meta: {
      populate: ["photo", "jobs"],
    },
  });

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const user = data?.data;

  const sections = [
    { key: "overview", label: "BasicInfo", features: ['Personal', 'Job', 'Contact', 'Family', 'Educational', 'LifeStyle'] },
    { key: "professional", label: "Professional", features: [''] },
    { key: "address", label: "Address", features: ['See Who Likes You', 'Top Picks'] },
    { key: "project", label: "Project", features: ['See Who Likes You', 'Top Picks'] },
    { key: "activities", label: "Activities", features: ['See Who Likes You', 'Top Picks'] },
    { key: "subscriptions", label: "Subscription", features: ['See Who Likes You', 'Top Picks'] },
  ];

  const renderGoldCard = ({ item }) => (
    <View style={styles.goldCard}>
      <View style={styles.goldHeader}>
        <View style={styles.goldTitleContainer}>
          <FontAwesome name="fire" size={20} color="#FFB800" />
          <Text style={styles.goldTitle}>{item.label}</Text>
        </View>
        <TouchableOpacity style={styles.upgradeButton} onPress={() => navigation.navigate('ProfileTabs', { userData: user, userid: userid,itemKey: item })}>
        <Text style={styles.upgradeButtonText}>See</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.featuresTitle}>What's Included</Text>
      <View style={styles.featureTable}>
        {item.features.map((feature, index) => (
          <View key={index} style={styles.featureRow}>
            <Text style={styles.featureText}>{feature}</Text>
            <FontAwesome name="check" size={16} color="#000" />
            {/* <TouchableOpacity onPress={() => navigation.navigate('UserProfileOverview', { userData: user, itemKey: item })}>
              <Text style={styles.seeAllText}>See</Text>
            </TouchableOpacity> */}
          </View>
        ))}
      </View>
    </View>
  );

  const renderEditFields = () => {
    switch (activeTab) {
      case 'Personal Info':
        return (
          <View>
            <TextInput
              style={styles.input}
              value={personalInfo.name}
              onChangeText={(text) => setPersonalInfo({ ...personalInfo, name: text })}
              placeholder="Name"
              placeholderTextColor="#999"
            />
            <TextInput
              style={styles.input}
              value={personalInfo.age}
              onChangeText={(text) => setPersonalInfo({ ...personalInfo, age: text })}
              placeholder="Age"
              placeholderTextColor="#999"
              keyboardType="numeric"
            />
            <TextInput
              style={[styles.input, styles.multilineInput]}
              value={personalInfo.bio}
              onChangeText={(text) => setPersonalInfo({ ...personalInfo, bio: text })}
              placeholder="Bio"
              placeholderTextColor="#999"
              multiline
            />
          </View>
        );
      case 'Education':
        return (
          <View>
            <TextInput
              style={styles.input}
              value={education.degree}
              onChangeText={(text) => setEducation({ ...education, degree: text })}
              placeholder="Degree"
              placeholderTextColor="#999"
            />
            <TextInput
              style={styles.input}
              value={education.school}
              onChangeText={(text) => setEducation({ ...education, school: text })}
              placeholder="School"
              placeholderTextColor="#999"
            />
            <TextInput
              style={styles.input}
              value={education.graduationYear}
              onChangeText={(text) => setEducation({ ...education, graduationYear: text })}
              placeholder="Graduation Year"
              placeholderTextColor="#999"
              keyboardType="numeric"
            />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Image style={styles.logo} resizeMode="contain" />
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.iconButton}>
              <Feather name="shield" size={20} color="#86878B" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Feather name="settings" size={20} color="#86878B" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image style={styles.profileImage} />
            <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(!isEditing)}>
              <Feather name={isEditing ? "check" : "edit-2"} size={16} color="#fff" />
            </TouchableOpacity>
            <View style={styles.completionBadge}>
              <Text style={styles.completionText}>55% COMPLETE</Text>
            </View>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameText}>{personalInfo.name}, {personalInfo.age}</Text>
            <MaterialCommunityIcons name="check-decagram" size={20} color="#86878B" />
          </View>
        </View>

        {isEditing && (
          <View style={styles.editTabs}>
            <TouchableOpacity
              style={[styles.tabButton, activeTab === 'Personal Info' && styles.activeTabButton]}
              onPress={() => setActiveTab('Personal Info')}
            >
              <Text style={styles.tabButtonText}>Personal Info</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tabButton, activeTab === 'Education' && styles.activeTabButton]}
              onPress={() => setActiveTab('Education')}
            >
              <Text style={styles.tabButtonText}>Education</Text>
            </TouchableOpacity>
          </View>
        )}

        {isEditing && renderEditFields()}

        <View style={styles.featureCards}>
          <TouchableOpacity style={styles.featureCard} onPress={() => navigation.navigate('AddJob', { userid: userid })}>
            <View style={styles.featureIconContainer}>
              <Ionicons name="briefcase-outline" size={20} color="#00B4FF" />
              <View style={styles.plusIcon}>
                <Feather name="plus" size={12} color="#fff" />
              </View>
            </View>
            <Text style={styles.featureCount}>Add Job</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.featureCard}>
            <View style={styles.featureIconContainer}>
              <MaterialCommunityIcons name="map-marker" size={20} color="#A020F0" />
              <View style={styles.plusIcon}>
                <Feather name="plus" size={12} color="#fff" />
              </View>
            </View>
            <Text style={styles.featureCount}>Add Address</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.featureCard}>
            <View style={styles.featureIconContainer}>
              <FontAwesome name="fire" size={20} color="#FF406C" />
              <View style={styles.plusIcon}>
                <Feather name="plus" size={12} color="#fff" />
              </View>
            </View>
            <Text style={styles.featureCount}>Subscriptions</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={sections}
          renderItem={renderGoldCard}
          keyExtractor={(item) => item.key}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.goldCardsContainer}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  logo: {
    width: 80,
    height: 32,
  },
  headerRight: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    padding: 4,
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 16,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 2,
    borderColor: '#FF406C',
  },
  editButton: {
    position: 'absolute',
    right: 0,
    top: 15,
    backgroundColor: '#000',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FF406C',
  },
  completionBadge: {
    position: 'absolute',
    bottom: -8,
    backgroundColor: '#FF406C',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  completionText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  editTabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    marginBottom: 8,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  activeTabButton: {
    backgroundColor: '#FF406C',
  },
  tabButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#f0f0f0',
    color: '#000',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    marginHorizontal: 16,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  featureCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    gap: 6,
  },
  featureCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  featureIconContainer: {
    position: 'relative',
    marginBottom: 6,
  },
  plusIcon: {
    position: 'absolute',
    right: -6,
    top: -6,
    backgroundColor: '#86878B',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureCount: {
    color: '#000',
    fontSize: 12,
    marginBottom: 2,
  },
  goldCardsContainer: {
    paddingHorizontal: 12,
  },
  goldCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 12,
    marginRight: 12,
    width: width - 48,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  goldHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  goldTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  goldTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  upgradeButton: {
    backgroundColor: '#FFB800',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  upgradeButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  featureTable: {
    marginBottom: 16,
  },
  featureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    fontSize: 14,
  },
  seeAllText: {
    color: '#FFB800',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ProfileMobile;
