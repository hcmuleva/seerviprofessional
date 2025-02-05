import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useInfiniteList } from "@refinedev/core";
import UserItem from './UserItem';
// import DashboardNav from './dashboardnav';/
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Dashboard({navigation}) {
  const [userid, setUserid] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const pageSize = 10;

  useEffect(() => {
    const getUserId = async () => {
        const storedUserId = await AsyncStorage.getItem('userid');
        setUserid(storedUserId);
    };
    getUserId();
  }, []);

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
      populate: ["photo"]
    }
  });

  const getAllUsers = () => {
    if (!data?.pages) return [];
    
    return data.pages.reduce((allUsers, page) => {
      const pageData = page?.data || [];
      const transformedUsers = pageData.map((user) => ({
        id: user.id,
        profilePicture: user.profilePicture,
        FirstName: user.firstname,
        FatherName: user.father,
        City: user.City,
      }));
      return [...allUsers, ...transformedUsers];
    }, []);
  };

  const users = getAllUsers();

  const displayedUsers = () => {
    return searchQuery ? 
      users.filter(user => 
        user.FirstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.FatherName?.toLowerCase().includes(searchQuery.toLowerCase())
      )
      : users;
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

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
        if(item.id !== userid){
          navigation.navigate('ProfileMobile', {
            PofileShown: "NORMALUSER",
            CurrentUserId: item.id,
          })
        } else {
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
      {/* <DashboardNav navigation={navigation}/> */}
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

        <FlatList
          data={displayedUsers()}
          renderItem={renderItem}
          keyExtractor={(item) => item.id?.toString()}
          style={styles.userList}
          contentContainerStyle={styles.userListContent}
          onEndReached={() => hasNextPage && !isFetchingNextPage && fetchNextPage()}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          removeClippedSubviews={true}
          initialNumToRender={10}
        />

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => navigation.navigate('ProfileMobile', {
              PofileShown: "LOGINUSER",
            })}
          >
            <Icon name="person" size={24} color="#fff" />
            <Text style={styles.profileButtonText}>My Profile</Text>
          </TouchableOpacity>
        </View>
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
    padding: 16,
  },
  searchContainer: {
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
  userList: {
    flex: 1,
  },
  userListContent: {
    padding: 16,
  },
  footer: {
    padding: 16,
    backgroundColor: '#fff',
    elevation: 8,
  },
  profileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
  },
  profileButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 16,
  },
});