// screens/MemberDashboard.js
import React, { useState, useCallback, useEffect, Suspense, lazy } from 'react';
import { View, TextInput, SafeAreaView, StyleSheet, StatusBar, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useInfiniteList } from '@refinedev/core';
import Header from './Memberdahbaord/header';
import ViewOptions from './Memberdahbaord/viewoptions';
import MemberList from './Memberdahbaord/memberlist';
// import Header from '../components/Header';
// import ViewOptions from '../components/ViewOptions';
// import MemberList from '../components/MemberList';

// Lazy load FilterForm to keep the initial bundle lean.
const FilterForm = lazy(() => import('./GecuList/filterform'));

const MemberDashboard = () => {
  const [activeView, setActiveView] = useState('list');
  const [userid, setUserid] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filterObj, setFilterObj] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  const pageSize = 10;

  useEffect(() => {
    const getUserId = async () => {
      const storedUserId = await AsyncStorage.getItem('userid');
      setUserid(storedUserId);
    };
    getUserId();
  }, []);

  // Build API filters based on filterObj
  const buildFiltersArray = useCallback(() => {
    if (!filterObj.flag) return false;
    const filters = [];
    if (filterObj.name) {
      filters.push({ field: "firstname", operator: "contains", value: filterObj.name });
    }
    if (filterObj.name) {
      filters.push({ field: "lastname", operator: "contains", value: filterObj.name });
    }
    if (filterObj.city) {
      filters.push({ field: "addresses.city", operator: "contains", value: filterObj.city });
    }
    if (filterObj.bloodGroup) {
      filters.push({ field: "bloodgroup", operator: "eq", value: filterObj.bloodGroup });
    }
    // if (filterObj.branch) {
    //   filters.push({ field: "branch", operator: "eq", value: filterObj.branch });
    // }
    // if (filterObj.batchYear) {
    //   filters.push({ field: "batchYear", operator: "eq", value: filterObj.batchYear });
    // }
    return filters.length > 0 ? filters : false;
  }, [filterObj]);

  const [filtersForAPI, setFiltersForAPI] = useState([]);

useEffect(() => {
  setFiltersForAPI(buildFiltersArray());
}, [filterObj]);


  // Data fetching with infinite scrolling
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteList({
    resource: "users",
    pagination: { pageSize },
    meta: { populate: ["photo", "jobs", "addresses"] },
    filters: filtersForAPI,
  });

  // Combine and deduplicate pages
  const getAllUsers = useCallback(() => {
    if (!data?.pages) return [];
    const allUsers = data.pages.reduce((acc, page) => {
      const pageData = page?.data || [];
      return [
        ...acc,
        ...pageData.map((user) => ({
          id: user.id,
          avatar: user.profilePicture,
          FirstName: user.firstname,
          LastName: user.lastname,
          position: user.position,
          years: user.years,
          location: user.location,
        })),
      ];
    }, []);
    const uniqueUsersMap = new Map();
    allUsers.forEach(user => {
      if (!uniqueUsersMap.has(user.id)) uniqueUsersMap.set(user.id, user);
    });
    return Array.from(uniqueUsersMap.values());
  }, [data]);

  const users = getAllUsers();

  // Client-side search filtering
  const displayedUsers = useCallback(() => {
    if (searchQuery.length > 0) {
      const lowerSearch = searchQuery.toLowerCase();
      return users.filter(user => {
        const fullName = `${user.FirstName || ''} ${user.LastName || ''}`.toLowerCase();
        return (
          fullName.includes(lowerSearch) ||
          user.FirstName?.toLowerCase().includes(lowerSearch) ||
          user.LastName?.toLowerCase().includes(lowerSearch) || user.addresses?.LastName?.toLowerCase().includes(lowerSearch)
        );
      });
    }
    return users;
  }, [users, searchQuery]);

  const handleSearch = (text) => setSearchQuery(text);

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FF7043" barStyle="light-content" />
      <Header />
      <ViewOptions activeView={activeView} setActiveView={setActiveView} onShowFilters={() => setShowFilters(true)} />
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
      <MemberList
        data={displayedUsers()}
        activeView={activeView}
        isFetchingNextPage={isFetchingNextPage}
        handleLoadMore={handleLoadMore}
      />
      <Suspense fallback={null}>
      <FilterForm
  visible={showFilters}
  onClose={() => setShowFilters(false)}
  onApplyFilters={(filters) => {
    setFilterObj((prev) => ({ ...filters, flag: true }));
  }}
/>
      </Suspense>
    </SafeAreaView>
  );
};

export default MemberDashboard;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  statsBar: { paddingHorizontal: 15, paddingVertical: 1, borderBottomWidth: 1, borderBottomColor: '#EEEEEE' },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f2f2f2', borderRadius: 20, paddingHorizontal: 10, marginHorizontal: 15, marginVertical: 10 },
  searchEmoji: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 16, color: '#333' },
});
