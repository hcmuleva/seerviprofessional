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
import { LinearGradient } from 'expo-linear-gradient';
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

const TinderProfileMobile = () => {
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
      setUserid(storedUserId);  // Set the user ID state after retrieving it
    };

    getUserId();
  }, []);  // Runs only once on mount

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
  // console.log("OBJJJJJJJJJJJJJJJJJJ",user);
  
 

  const goldCards = [
    {
      id: '1',
      title: 'Tinder Gold',
      features: ['See Who Likes You', 'Top Picks'],
    },
    {
      id: '2',
      title: 'Tinder Platinum',
      features: ['Priority Likes', 'Message Before Match'],
    },
    {
      id: '3',
      title: 'Tinder Plus',
      features: ['Unlimited Likes', 'Passport'],
    },
  ];
  
  const sections = [
    { key: "overview", label: "Overview",features: ['Personal', 'Job', 'Contact','Family','Educational', 'LifeStyle'] },
    { key: "professional", label: "Professional" ,features: ['']},
    { key: "address", label: "Address", features: ['See Who Likes You', 'Top Picks']},
    { key: "project", label: "Project" , features: ['See Who Likes You', 'Top Picks']},
    { key: "activities", label: "Activities" , features: ['See Who Likes You', 'Top Picks'] },
    { key: "subscriptions", label: "Subscription", features: ['See Who Likes You', 'Top Picks'] },
  ]

  const renderGoldCard = ({ item }) => (
    <View style={styles.goldCard}>
      <View style={styles.goldHeader}>
        <View style={styles.goldTitleContainer}>
          <FontAwesome name="fire" size={20} color="#FFB800" />
          <Text style={styles.goldTitle}>{item.label}</Text>
        </View>
        <TouchableOpacity style={styles.upgradeButton}>
          <Text style={styles.upgradeButtonText}>Upgrade</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.featuresTitle}>What's Included</Text>

      <View style={styles.featureTable}>
        {item.features.map((feature, index) => (
          <View key={index} style={styles.featureRow}>
            <Text style={styles.featureText}>{feature}</Text>
            <View style={styles.featureColumns}>
              <Text style={styles.dashText}>—</Text>
              <FontAwesome name="check" size={16} color="#000" />
            </View>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.seeAllButton}>
        <Text style={styles.seeAllText} onPress={() => {
          navigation.navigate('UserProfileOverview',{
            userData : user,
          });
        }}>See All Features</Text>
      </TouchableOpacity>
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
        {/* Header */}
        <View style={styles.header}>
          <Image
            // source={require('./assets/tinder-logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.iconButton}>
              <Feather name="shield" size={20} color="#86878B" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Feather name="settings" size={20} color="#86878B" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <LinearGradient
              colors={['#FF406C', '#FF406C', 'transparent', 'transparent']}
              style={styles.progressRing}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Image
                // source={require('./assets/profile-placeholder.jpg')}
                style={styles.profileImage}
              />
            </LinearGradient>
            <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(!isEditing)}>
              <Feather name={isEditing ? "check" : "edit-2"} size={16} color="#fff" />
            </TouchableOpacity>
            <View style={styles.completionBadge}>
              <Text style={styles.completionText}>55% COMPLETE</Text>
            </View>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameText}>{personalInfo.name}, {personalInfo.age}</Text>
            <MaterialCommunityIcons
              name="check-decagram"
              size={20}
              color="#86878B"
            />
          </View>
        </View>

        {/* Edit Tabs */}
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

        {/* Edit Fields */}
        {isEditing && renderEditFields()}

        {/* Feature Cards */}
        <View style={styles.featureCards}>
          <TouchableOpacity style={styles.featureCard}>
            <View style={styles.featureIconContainer}>
              <FontAwesome name="star" size={20} color="#00B4FF" />
              <View style={styles.plusIcon}>
                <Feather name="plus" size={12} color="#fff" />
              </View>
            </View>
            <Text style={styles.featureCount}>0 Super Likes</Text>
            <Text style={[styles.featureAction, { color: '#00B4FF' }]}>
              GET MORE
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.featureCard}>
            <View style={styles.featureIconContainer}>
              <MaterialCommunityIcons
                name="lightning-bolt"
                size={20}
                color="#A020F0"
              />
              <View style={styles.plusIcon}>
                <Feather name="plus" size={12} color="#fff" />
              </View>
            </View>
            <Text style={styles.featureCount}>My Boosts</Text>
            <Text style={[styles.featureAction, { color: '#A020F0' }]}>
              GET MORE
            </Text>
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

        {/* Tinder Gold Cards */}
        <FlatList
          data={sections}
          renderItem={renderGoldCard}
          keyExtractor={(item) => item.key}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.goldCardsContainer}
        />

      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <FontAwesome name="fire" size={24} color="#86878B" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="search" size={24} color="#86878B" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <View style={styles.starContainer}>
            <MaterialCommunityIcons
              name="star-four-points"
              size={24}
              color="#86878B"
            />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>1</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="chatbubble" size={24} color="#86878B" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <FontAwesome name="user" size={24} color="#FF406C" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
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
  progressRing: {
    width: 140,
    height: 140,
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
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
    color: '#fff',
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
    backgroundColor: '#1A1A1A',
  },
  activeTabButton: {
    backgroundColor: '#FF406C',
  },
  tabButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#1A1A1A',
    color: '#fff',
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
    backgroundColor: '#1A1A1A',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
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
    color: '#fff',
    fontSize: 12,
    marginBottom: 2,
  },
  featureAction: {
    fontSize: 10,
    fontWeight: 'bold',
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
  goldBadge: {
    backgroundColor: '#FFB800',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  goldBadgeText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 10,
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
  featureColumns: {
    flexDirection: 'row',
    width: 80,
    justifyContent: 'space-between',
  },
  dashText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  seeAllButton: {
    alignItems: 'center',
    marginBottom: 12,
  },
  seeAllText: {
    color: '#FFB800',
    fontSize: 14,
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#1A1A1A',
  },
  navItem: {
    padding: 6,
  },
  starContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#FF406C',
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default TinderProfileMobile;

