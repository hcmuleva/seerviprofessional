import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DashboardNav = ({navigation}) => {
  const [sortBy, setSortBy] = useState('featured');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [compareCount, setCompareCount] = useState(0);

  const handleSortChange = (value) => {
    setSortBy(value);
    setIsDropdownVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => {navigation.goBack()}}>
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor="#999"
          />
          <TouchableOpacity style={styles.micButton}>
            <Icon name="mic" size={24} color="#666" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.cartButton}>
          <Icon name="shopping-cart" size={24} color="#333" />
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>25</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Filter Options */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
      >
        {/* Sort By Button */}
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setIsDropdownVisible(!isDropdownVisible)}
        >
          <Text style={styles.filterButtonText}>Sort By</Text>
          <Icon name="arrow-drop-down" size={24} color="#333" />
        </TouchableOpacity>

        {/* Filter Button */}
        <TouchableOpacity style={styles.filterButton} onPress={() => {navigation.navigate('FilterScreen',{navigation})}}>
          <Icon name="filter-list" size={20} color="#333" />
          <Text style={styles.filterButtonText}>Filter</Text>
        </TouchableOpacity>

        {/* Compare Button */}
        <TouchableOpacity style={styles.filterButton}>
          <Icon name="compare-arrows" size={20} color="#333" />
          <Text style={styles.filterButtonText}>Compare</Text>
        </TouchableOpacity>

        {/* Brand Button */}
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterButtonText}>Brand</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Sort Dropdown */}
      {isDropdownVisible && (
        <View style={styles.dropdown}>
          <TouchableOpacity 
            style={styles.dropdownItem}
            onPress={() => handleSortChange('featured')}
          >
            <Text>Featured</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.dropdownItem}
            onPress={() => handleSortChange('newest')}
          >
            <Text>Newest</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.dropdownItem}
            onPress={() => handleSortChange('price-low')}
          >
            <Text>Price: Low to High</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.dropdownItem}
            onPress={() => handleSortChange('price-high')}
          >
            <Text>Price: High to Low</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  backButton: {
    padding: 5,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    paddingHorizontal: 15,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  micButton: {
    padding: 5,
  },
  cartButton: {
    padding: 5,
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 12,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  filterButtonText: {
    marginHorizontal: 5,
    fontSize: 14,
  },
  dropdown: {
    position: 'absolute',
    top: 110,
    left: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 5,
    elevation: 4,
    zIndex: 1000,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
});

export default DashboardNav;

