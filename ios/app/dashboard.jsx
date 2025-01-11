import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import UserItem from './UserItem';
import FilterModal from './FilterModal';

const initialUsers = [
  { id: '1', name: 'John Doe', role: 'Admin', department: 'IT' },
  { id: '2', name: 'Jane Smith', role: 'User', department: 'HR' },
  { id: '3', name: 'Mike Johnson', role: 'Manager', department: 'Sales' },
  { id: '4', name: 'Emily Brown', role: 'User', department: 'Marketing' },
  { id: '5', name: 'David Lee', role: 'Manager', department: 'Finance' },
];

export default function Dashboard() {
  const navigation = useNavigation();
  const [users, setUsers] = useState(initialUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [filters, setFilters] = useState({ role: '', department: '' });

  useFocusEffect(
    useCallback(() => {
      // Fetch users from API or local storage here
      // For now, we'll use the initialUsers
      setUsers(initialUsers);
    }, [])
  );

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (filters.role ? user.role === filters.role : true) &&
    (filters.department ? user.department === filters.department : true)
  );

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
    setFilterModalVisible(false);
  };

  const renderItem = ({ item }) => (
    <UserItem user={item} onPress={() => navigation.navigate('ProfileView', { userId: item.id })} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <Icon name="person" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Dashboard</Text>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => {
            // Add logout logic here
            console.log('Logout pressed');
          }}
        >
          <Icon name="logout" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Icon name="search" size={24} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search users..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setFilterModalVisible(true)}
        >
          <Icon name="filter-list" size={24} color="#3498db" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredUsers}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.userList}
        contentContainerStyle={styles.userListContent}
      />

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddProfile')}
        >
          <Icon name="add" size={24} color="#fff" />
          <Text style={styles.addButtonText}>Add Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.roleButton}
          onPress={() => navigation.navigate('RoleManagement')}
        >
          <Icon name="people" size={24} color="#fff" />
          <Text style={styles.roleButtonText}>Manage Roles</Text>
        </TouchableOpacity>
      </View>

      <FilterModal
        visible={isFilterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        onApply={handleFilter}
        initialFilters={filters}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#3498db',
    padding: 16,
    elevation: 4,
  },
  profileButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  logoutButton: {
    padding: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 16,
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
    padding: 10,
  },
  userList: {
    flex: 1,
  },
  userListContent: {
    paddingHorizontal: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#fff',
    elevation: 8,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2ecc71',
    padding: 12,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  roleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e74c3c',
    padding: 12,
    borderRadius: 8,
  },
  roleButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

