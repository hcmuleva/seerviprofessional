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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useInfiniteList } from '@refinedev/core';
import { TextInput } from 'react-native';
import FilterForm from './GecuList/filterform';
import { useNavigation } from '@react-navigation/native';

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
    <View style={styles.gridContainerIcon}>
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
  const [showFilters, setShowFilters] = useState(false);
  const [FilterObj, SetFilterObj] = useState({});
   useEffect(() => {
      const getUserId = async () => {
        const storedUserId = await AsyncStorage.getItem('userid');
        setUserid(storedUserId);
      };
      getUserId();
    }, []);

    const [searchQuery, setSearchQuery] = useState('');
      const [organizationFilterActive, setOrganizationFilterActive] = useState(false);
      const [organization, setOrganization] = useState(FilterObj);
      const pageSize = 10;
  
      const FilterArray = [
        // Filter by name
  {
    field: "firstname",
    operator: "contains",
    value: FilterObj.name,
  },
  {
    field: "bloodgroup",
    operator: "contains",
    value: FilterObj.bloodGroup,
  },
  {
    field: "addresses.state",
    operator: "contains",
    value: FilterObj.city,
  },

      ];
   

      

       const filtersForAPI = searchQuery.length === 0 && FilterObj.flag ? FilterArray : false;
       
       console.log("FLAGGGGG", FilterObj.flag );
       

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
          filters: filtersForAPI,
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


  const renderItem = ({ item }) => (
    activeView === 'grid' ? (
      <TouchableOpacity style={styles.gridItemContainer} onPress={() => navigation.navigate('ProfileScreenGecu')}>
        <View style={styles.gridCard}>
          <View style={styles.gridAvatarContainer}>
            {item.avatar ? (
              <Image source={item.avatar} style={styles.gridAvatar} />
            ) : (
              <View style={styles.gridPlaceholderAvatar}>
                <View style={styles.placeholderIcon} />
              </View>
            )}
          </View>
          <Text style={styles.gridMemberName} numberOfLines={1}>
            {item.FirstName + ' ' + item.LastName}
          </Text>
          <Text style={styles.gridMemberPosition} numberOfLines={1}>
            {item.position || "Software"}
          </Text>
          <Text style={styles.gridMemberYears} numberOfLines={1}>
            {item.years || "5"} years
          </Text>
        </View>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity style={styles.gridItemContainer} onPress={() => navigation.navigate('ProfileScreenGecu')}>
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
          <Text style={styles.memberName}>{item.FirstName + ' ' + item.LastName}</Text>
          <Text style={styles.memberPosition}>{item.position || "Software"}</Text>
          <Text style={styles.memberYears}>{item.years || "5"}</Text>
          <Text style={styles.memberLocation}>{item.location || "Bangalore"}</Text>
        </View>
      </View>
      </TouchableOpacity>
    )
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
        <TouchableOpacity style={styles.viewOption} onPress={() => setShowFilters(true)}>
          <FilterIcon />
        </TouchableOpacity>

        <TouchableOpacity style={styles.viewOption}>
          <SortIcon />
        </TouchableOpacity>
      </View>
      
      {/* Stats bar */}
      <View style={styles.statsBar}>

      <View style={styles.searchContainer}>
      <Text style={styles.searchEmoji}>🔍</Text>
  <TextInput
    style={styles.searchInput}
    placeholder="Search users..."
    placeholderTextColor="#999"
    value={searchQuery}
    onChangeText={handleSearch}
  />

</View>

  

      </View>
      
      {/* Members list */}
      <FlatList
        data={displayedUsers()}
        renderItem={renderItem}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        style={styles.membersList}
      />

    <FilterForm
      visible={showFilters}
      onClose={() => setShowFilters(false)}
      onApplyFilters={(filters) => {
        // Implement actual filtering logic here
        SetFilterObj(filters);
        console.log("Applied filters:", filters);
      }}
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
  gridContainerIcon: {
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
    paddingVertical: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 0,
    marginHorizontal: 15,
    marginVertical: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
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
  gridContainer: {
    paddingHorizontal: 8,
  },
  gridItemContainer: {
    flex: 1,
    margin: 8,
  },
  gridCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  gridAvatarContainer: {
    marginBottom: 12,
  },
  gridAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  gridPlaceholderAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#BDBDBD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridMemberName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#424242',
    marginBottom: 4,
    textAlign: 'center',
  },
  gridMemberPosition: {
    fontSize: 12,
    color: '#757575',
    marginBottom: 4,
    textAlign: 'center',
  },
  gridMemberYears: {
    fontSize: 12,
    color: '#9E9E9E',
    textAlign: 'center',
  },
});

export default MemberDashboard;