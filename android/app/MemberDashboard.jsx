import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useInfiniteList } from '@refinedev/core';

// Icons - you would typically use a library like react-native-vector-icons
// but I'm using simple components for demonstration
const MenuIcon = () => (
  <View style={styles.menuIcon}>
    <View style={styles.menuLine} />
    <View style={styles.menuLine} />
    <View style={styles.menuLine} />
  </View>
);

const NotificationIcon = ({ count }) => (
  <View style={styles.notificationContainer}>
    <View style={styles.notificationIcon} />
    {count > 0 && (
      <View style={styles.notificationBadge}>
        <Text style={styles.notificationCount}>{count}</Text>
      </View>
    )}
  </View>
);

const GridIcon = () => (
  <View style={styles.viewIcon}>
    <View style={styles.gridContainer}>
      <View style={styles.gridItem} />
      <View style={styles.gridItem} />
      <View style={styles.gridItem} />
      <View style={styles.gridItem} />
    </View>
  </View>
);

const ListIcon = () => (
  <View style={styles.viewIcon}>
    <View style={styles.listContainer}>
      <View style={styles.listItem} />
      <View style={styles.listItem} />
      <View style={styles.listItem} />
    </View>
  </View>
);

const FilterIcon = () => (
  <View style={styles.viewIcon}>
    <View style={styles.filterContainer}>
      <View style={styles.filterTop} />
      <View style={styles.filterMiddle} />
      <View style={styles.filterBottom} />
    </View>
  </View>
);

const SortIcon = () => (
  <View style={styles.viewIcon}>
    <View style={styles.sortContainer}>
      <View style={styles.sortLine1} />
      <View style={styles.sortLine2} />
      <View style={styles.sortLine3} />
    </View>
  </View>
);

const MemberDashboard = () => {
  const [activeView, setActiveView] = useState('list');
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
      const [organizationFilterActive, setOrganizationFilterActive] = useState(false);
    //   const [organization, setOrganization] = useState(city);
      const pageSize = 10;
  
    //   const FilterArray = [
    //     {
    //       field: "addresses.state",
    //       operator: "eq",
    //       value: organization,
    //     },
    //   ];
   

      

    //    const filtersForAPI = searchQuery.length === 0 && flag ? FilterArray : false;
      
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
            populate: ["photo", "jobs", "addresses"],
          },
        //   filters: filtersForAPI,
        });
      
        // Local filtering (search) on the fetched users with deduplication
        const getAllUsers = () => {
          if (!data?.pages) return [];
          
          // Combine all pages into a single list
          const allUsers = data.pages.reduce((acc, page) => {
            const pageData = page?.data || [];
            const transformedUsers = pageData.map((user) => ({
              id: user.id,
              profilePicture: user.profilePicture,
              FirstName: user.firstname,
              LastName: user.lastname,
              FatherName: user.father,
              VyaaparType: user?.vyaapars?.[0]?.type,
              State: user.State,
              Country: user.Country,
              City: user.City,
              WorkingCity: user.WorkingCity,
            }));
            return [...acc, ...transformedUsers];
          }, []);
        
      
          // Remove duplicate users based on user id using a Map
          const uniqueUsersMap = new Map();
          allUsers.forEach(user => {
            if (!uniqueUsersMap.has(user.id)) {
              uniqueUsersMap.set(user.id, user);
            }
          });
          return Array.from(uniqueUsersMap.values());
        };
      
        const users = getAllUsers();
      
        const displayedUsers = () => {
          if (organizationFilterActive) {
            return users;
          }
          if (searchQuery.length > 0) {
            const lowerSearch = searchQuery.toLowerCase();
            return users.filter(user => {
              // Concatenate first and last names for full name search
              const fullName = `${user.FirstName || ''} ${user.LastName || ''}`.toLowerCase();
              return (
                fullName.includes(lowerSearch) ||
                user.FirstName?.toLowerCase().includes(lowerSearch) ||
                user.LastName?.toLowerCase().includes(lowerSearch) ||
                user.FatherName?.toLowerCase().includes(lowerSearch) ||
                user.WorkingCity?.toLowerCase().includes(lowerSearch)
              );
            });
          }
          return users;
        };
      
        const handleSearch = (text) => {
          setSearchQuery(text);
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

  const members = [
    {
      id: '1',
      name: 'Nipendra vikram singh',
      position: 'Retired from U P Irrigation department',
      years: '1967-1973, Civil',
      location: 'Lucknow',
      avatar: null, // Will use placeholder
    },
    {
      id: '2',
      name: 'Virendra Kumar Sharma',
      position: 'Self employed',
      years: '1969-1974, Electrical',
      location: 'Bhopal',
      avatar: null, // Will use placeholder
    },
    {
      id: '3',
      name: 'Arvind Bhagwat',
      position: 'Retired',
      years: '1972-1977, Civil',
      location: 'Vadodara',
      avatar: require('./images/geculogo.png'), // You would need this image
    },
    {
      id: '4',
      name: 'Kishore kale',
      position: 'Superannuated',
      years: '1973-1977, Electrical',
      location: 'Indore',
      avatar: null, // Will use placeholder
    },
    {
      id: '5',
      name: 'Pankaj jain',
      position: 'OWNTERP',
      years: '1975-1980, Mechanical',
      location: 'Indore',
      avatar: require('./images/geculogo.png'), // You would need this image
    },
    {
      id: '6',
      name: 'Mukul Majumdar',
      position: 'Fawaz Trading & Engineering Services Co. W.L.L.',
      years: '1979-1984, Mechanical',
      location: 'Kuwait city',
      avatar: null, // Will use placeholder
    },
    {
      id: '7',
      name: 'PANKAJ JAIN',
      position: 'Reliance Industries Ltd, India',
      years: '',
      location: '',
      avatar: null, // Will use placeholder
    },
  ];

  const renderMemberItem = ({ item }) => (
    <View style={styles.memberItem}>
      <View style={styles.avatarContainer}>
        {item.avatar ? (
          <Image source={item.avatar} style={styles.avatar} />
        ) : (
          <View style={styles.placeholderAvatar}>
            <View style={styles.placeholderIcon} />
          </View>
        )}
      </View>
      <View style={styles.memberDetails}>
        <Text style={styles.memberName}>{item.name}</Text>
        <Text style={styles.memberPosition}>{item.position}</Text>
        <Text style={styles.memberYears}>{item.years}</Text>
        <Text style={styles.memberLocation}>{item.location}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FF7043" barStyle="light-content" />
      
      {/* Header with gradient */}
      <LinearGradient
        colors={['#FF7043', '#FF5252']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <MenuIcon />
        <View style={styles.logoContainer}>
          <Image 
            source={require('./images/geculogo.png')} // You would need this image
            style={styles.logo}
          />
        </View>
        <View style={styles.headerRight}>
          <NotificationIcon count={1} />
          <Image 
            source={require('./images/geculogo.png')} // You would need this image
            style={styles.profilePic}
          />
        </View>
      </LinearGradient>
      
      {/* View options */}
      <View style={styles.viewOptions}>
        <TouchableOpacity 
          style={[styles.viewOption, activeView === 'grid' && styles.activeViewOption]}
          onPress={() => setActiveView('grid')}
        >
          <GridIcon />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.viewOption, activeView === 'list' && styles.activeViewOption]}
          onPress={() => setActiveView('list')}
        >
          <ListIcon />
        </TouchableOpacity>
        <TouchableOpacity style={styles.viewOption}>
          <FilterIcon />
        </TouchableOpacity>
        <TouchableOpacity style={styles.viewOption}>
          <SortIcon />
        </TouchableOpacity>
      </View>
      
      {/* Stats bar */}
      <View style={styles.statsBar}>
        <Text style={styles.statsText}>
          Registered Members : 382 | Total Users Logged In : 1
        </Text>
      </View>
      
      {/* Members list */}
      <FlatList
        data={members}
        renderItem={renderMemberItem}
        keyExtractor={item => item.id}
        style={styles.membersList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    height: 60,
  },
  menuIcon: {
    width: 24,
    height: 24,
    justifyContent: 'space-around',
  },
  menuLine: {
    width: 24,
    height: 2,
    backgroundColor: '#FFFFFF',
  },
  logoContainer: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationContainer: {
    marginRight: 15,
  },
  notificationIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  notificationBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FFEB3B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationCount: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#000000',
  },
  profilePic: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  viewOptions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  viewOption: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  activeViewOption: {
    backgroundColor: '#F5F5F5',
    borderRadius: 4,
  },
  viewIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridContainer: {
    width: 20,
    height: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: 8,
    height: 8,
    backgroundColor: '#757575',
    margin: 1,
  },
  listContainer: {
    width: 20,
    height: 20,
    justifyContent: 'space-around',
  },
  listItem: {
    width: 20,
    height: 4,
    backgroundColor: '#757575',
  },
  filterContainer: {
    width: 20,
    height: 20,
    alignItems: 'center',
  },
  filterTop: {
    width: 16,
    height: 2,
    backgroundColor: '#757575',
    marginBottom: 3,
  },
  filterMiddle: {
    width: 12,
    height: 2,
    backgroundColor: '#757575',
    marginBottom: 3,
  },
  filterBottom: {
    width: 8,
    height: 2,
    backgroundColor: '#757575',
  },
  sortContainer: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sortLine1: {
    width: 16,
    height: 2,
    backgroundColor: '#757575',
    marginBottom: 3,
  },
  sortLine2: {
    width: 12,
    height: 2,
    backgroundColor: '#757575',
    marginBottom: 3,
  },
  sortLine3: {
    width: 8,
    height: 2,
    backgroundColor: '#757575',
  },
  statsBar: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  statsText: {
    fontSize: 14,
    color: '#616161',
  },
  membersList: {
    flex: 1,
  },
  memberItem: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  avatarContainer: {
    marginRight: 15,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  placeholderAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#BDBDBD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#BDBDBD',
  },
  memberDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  memberName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#424242',
    marginBottom: 2,
  },
  memberPosition: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 2,
  },
  memberYears: {
    fontSize: 14,
    color: '#9E9E9E',
    marginBottom: 2,
  },
  memberLocation: {
    fontSize: 14,
    color: '#9E9E9E',
  },
});

export default MemberDashboard;