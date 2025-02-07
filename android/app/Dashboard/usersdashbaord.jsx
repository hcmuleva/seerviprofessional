import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useInfiniteList } from "@refinedev/core";
import UserItem from './UserItem';
import DashboardNav from './dashboardnav';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from 'expo-router';

export default function Dashboard({route}) {
  const {city, flag} = route?.params || {};
  
  const [userid, setUserid] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    const getUserId = async () => {
        const storedUserId = await AsyncStorage.getItem('userid');
        setUserid(storedUserId);
    };

    getUserId();
  }, []);


  const [searchQuery, setSearchQuery] = useState('');
  const [showFiltered, setShowFiltered] = useState(flag);
  const [organizationFilterActive, setOrganizationFilterActive] = useState(false);
  const [organization, setOrganization] = useState(city);
  const pageSize = 10;
  
  const FilterArray = [
    {
      field: "jobs.organization",
      operator: "eq",
      value: organization,
    },
  ];

  const {
    data,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteList({
    resource: "users",
    pagination: {
      pageSize,
    },
    meta: {
      populate: ["photo", "jobs"],
    },
    filters: showFiltered ? FilterArray : false,
  });

  const toggleFilter = () => {
    setShowFiltered(!showFiltered);
  };

  const getAllUsers = () => {
    if (!data?.pages) return [];
    
    return data.pages.reduce((allUsers, page) => {
      const pageData = page?.data || [];
      const transformedUsers = pageData.map((user) => ({
        id: user.id,
        profilePicture: user.profilePicture,
        FirstName: user.firstname,
        FatherName: user.father,
        VyaaparType: user?.vyaapars?.[0]?.type,
        State: user.State,
        Country: user.Country,
        City: user.City,
        WorkingCity: user.WorkingCity,
      }));
      return [...allUsers, ...transformedUsers];
    }, []);
  };

  const users = getAllUsers();

  // Adjusted displayed users logic
  const displayedUsers = () => {
    
    if (organizationFilterActive) {
      return users; // Show all users related to the organization
    }

    return showFiltered 
      ? users.filter(user => 
          user.FirstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.FatherName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.WorkingCity?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : users;
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    setShowFiltered(text.length > 0); // Show filtered results if there's text
  };

 

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const renderFooter = () => {
    if (!isFetchingNextPage) return null;
    return (
      <View style={styles.loadingFooter}>
        <ActivityIndicator size="small" color="#0000ff" />
      </View>
    );
  };



  const renderItem = ({ item }) => (
    <UserItem 
      user={item}
      onPress={() => { 
        if(item.id !=  userid){
          navigation.navigate('ProfileMobile', {
            PofileShown: "NORMALUSER",
            CurrentUserId: item.id,
          })
        }
        else{
          navigation.navigate('ProfileMobile', {
            PofileShown: "LOGINUSER",
            CurrentUserId: item.id,
          })
        }
      }} 
    />
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <>
      <DashboardNav navigation={navigation}/>
      <View style={styles.container}>
        <View style={styles.searchHeader}>
          <View style={styles.searchContainer}>
            <Icon name="search" size={24} color="#999" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search users..."
              value={searchQuery}
              onChangeText={handleSearch}
            />
          </View>
        </View>

        {showFiltered && searchQuery.length > 0 && (
          <View style={styles.filterInfo}>
            <Text style={styles.filterText}>
              Showing filtered results for "{searchQuery}"
            </Text>
            <TouchableOpacity onPress={() => { 
              setShowFiltered(false); 
              setSearchQuery(''); // Clear search query when showing all
              setOrganizationFilterActive(false); // Reset organization filter
            }}>
              <Text style={styles.showAllText}>Show all</Text>
            </TouchableOpacity>
          </View>
        )}
            
        <FlatList
          data={displayedUsers()}
          renderItem={renderItem}
          keyExtractor={(item) => item.id?.toString()}
          style={styles.userList}
          contentContainerStyle={styles.userListContent}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          removeClippedSubviews={true}
          maxToRenderPerBatch={5}
          updateCellsBatchingPeriod={50}
          initialNumToRender={10}
          windowSize={10}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingFooter: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    gap: 8,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  searchIcon: {
    padding: 10,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
  filterButton: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 2,
  },
  filterButtonActive: {
    backgroundColor: '#e74c3c',
  },
  filterInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 8,
   },
   filterText:{
     color:'#666',
   },
   showAllText:{
     color:'#e74c3c',
     fontWeight:'bold',
   },
   userList:{
     flex :1 ,
   },
   userListContent:{
     paddingHorizontal :16 ,
   },
   footer:{
     flexDirection:'row',
     justifyContent:'space-around',
     padding :16 ,
     backgroundColor:'#fff' ,
     elevation :8 ,
   },
   roleButton:{
     flexDirection:'row',
     alignItems:'center',
     backgroundColor:'#e74c3c' ,
     padding :12 ,
     borderRadius :8 ,
   },
   roleButtonText:{
     color:'#fff' ,
     fontWeight:'bold' ,
     marginLeft :8 ,
   },
});
