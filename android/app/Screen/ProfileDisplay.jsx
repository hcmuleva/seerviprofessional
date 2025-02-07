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
  FlatList,
} from 'react-native';
import {
  Feather,
  FontAwesome,
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useOne } from '@refinedev/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const ProfileMobile = ({route}) => {
  
  const navigation = useNavigation();
  const [userid, setUserid] = useState(null);
  const { PofileShown = "LOGINUSER", CurrentUserId = null } = route?.params || {};
  
  useEffect(() => {
    const getUserId = async () => {
      if(PofileShown === "NORMALUSER" && CurrentUserId != userid){
        setUserid(CurrentUserId);
      }
      else{
        const storedUserId = await AsyncStorage.getItem('userid');
        setUserid(storedUserId);
      }
    };

    getUserId();
  }, []);


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

  const sections = [
    { key: "overview", label: "BasicInfo", features: ['Personal', 'Job', 'Contact', 'Family', 'Educational', 'LifeStyle'] },
    { key: "professional", label: "Professional", features: ['Experience', 'Skills', 'Certifications'] },
    { key: "address", label: "Address", features: ['Current Address', 'Permanent Address'] },
    { key: "project", label: "Project", features: ['Current Projects', 'Completed Projects'] },
    { key: "activities", label: "Activities", features: ['Recent Activities', 'Achievements'] },
    { key: "subscriptions", label: "Subscription", features: ['Current Plan', 'Benefits'] },
  ];

  const renderGoldCard = ({ item }) => (
    <View style={styles.goldCard}>
      <View style={styles.goldHeader}>
        <View style={styles.goldTitleContainer}>
          <FontAwesome name="fire" size={20} color="#FFB800" />
          <Text style={styles.goldTitle}>{item.label}</Text>
        </View>
        <TouchableOpacity 
          style={styles.upgradeButton} 
          onPress={() => navigation.navigate('ProfileTabs', { 
            userData: user, 
            userid: userid, 
            itemKey: item,
            PofileShown,
          })}
        >
          <Text style={styles.upgradeButtonText}>See</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.featuresTitle}>What's Included</Text>
      <View style={styles.featureTable}>
        {item.features.map((feature, index) => (
          <View key={index} style={styles.featureRow}>
            <Text style={styles.featureText}>{feature}</Text>
            <FontAwesome name="check" size={16} color="#000" />
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {user?.myrole && (
        <View style={[styles.roleBadge, { backgroundColor: '#86878B' }]}>
          <Text style={styles.roleBadgeText}>{user.myrole}</Text>
        </View>
      )}
      <ScrollView>
        <View style={styles.header}>
          <Image style={styles.logo} resizeMode="contain" />
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.iconButton}>
            <Image
                          source={require('../images/logo.png')}
                          style={styles.logo}
                        />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={() => (navigation.navigate('Settings'))}>
              <Feather name="settings" size={20} color="#86878B" />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image 
              style={styles.profileImage} 
              source={{ uri: user?.photo?.url }} 
            />
            {/* w style={styles.completionBadge}>
              <Text style={styles.completionText}>55% COMPLETE</Text>
            </View><View style={styles.completionBadge}>
              <Text style={styles.completionText}>55% COMPLETE</Text>
            </View> */}
          </View>
          <Text style={styles.nameText}>
            {`${user?.firstname || ''} ${user?.lastname || ''}`}
          </Text>
          <Text style={styles.usernameText}>{user?.username || ''}</Text>
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
    width: 24,
    height: 24,
  },
  logoText: {
    fontSize: 7,
    fontWeight: 'bold',
    color: '#000',
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
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  usernameText: {
    fontSize: 14,
    color: '#86878B',
    marginVertical: 4,
  },
  roleText: {
    fontSize: 16,
    marginTop: 4,
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
  featureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    fontSize: 14,
  },
  roleBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    zIndex: 1,
  },
  roleBadgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default ProfileMobile;