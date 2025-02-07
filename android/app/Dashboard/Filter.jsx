import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { Checkbox } from '../components/checkbox';

export default function FilterScreen({ navigation }) {

  const [showFiltered, setShowFiltered] = useState(false);

  const [cities, setCities] = useState([
    { id: '1', name: 'Mumbai', checked: false },
    { id: '2', name: 'Delhi', checked: false },
    { id: '3', name: 'Bangalore', checked: false },
    { id: '4', name: 'Hyderabad', checked: false },
    { id: '5', name: 'Chennai', checked: false },
    { id: '6', name: 'Kolkata', checked: false },
    { id: '7', name: 'Pune', checked: false },
    { id: '8', name: 'Ahmedabad', checked: false },
  ]);

  const filterCategories = [
    'State',
    'City',
    'Companies',
  ];

  const toggleCitySelection = (name) => {
    setCities((currentCities) =>
      currentCities.map((city) =>
        city.name === name ? { ...city, checked: !city.checked } : city
      )
    );
  };

 

  // Get the last selected city name (or implement any other logic)
  const getLastSelectedCity = () => {
    const selectedCity = cities.filter(city => city.checked).pop();  // Get the last selected city
    return selectedCity ? selectedCity.name : null; // Return the name or null if no city is selected
  };

  const handleApply = () => {
    const lastSelectedCity = getLastSelectedCity(); // Get the last selected city name
    if (lastSelectedCity) {
      // Toggle the filter state and navigate with the correct value
      const updatedShowFiltered = !showFiltered;
      setShowFiltered(updatedShowFiltered); // Update the state
      navigation.navigate("Dashboard", {
        city: lastSelectedCity,
        flag: updatedShowFiltered, // Pass the updated value
      });
    } else {
      alert('Please select a city'); // Alert if no city is selected
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => { navigation.goBack(); }}>
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Filters</Text>
        <TouchableOpacity onPress={() => {
          const updatedShowFiltered = !showFiltered;
          setShowFiltered(updatedShowFiltered); // Update the state
          navigation.navigate("Dashboard", {
            flag: false, // Pass the updated value
          });
        }}>
          <Text style={styles.clearText} >Clear Filters</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <ScrollView style={styles.sidebar}>
          {filterCategories.map((category, index) => (
            <View
              key={index}
              style={[
                styles.sidebarItem,
                category === 'City' && styles.activeSidebarItem,
              ]}
            >
              <Text
                style={[
                  styles.sidebarText,
                  category === 'City' && styles.activeSidebarText,
                ]}
              >
                {category}
              </Text>
            </View>
          ))}
        </ScrollView>

        {/* Right Content - City List */}
        <ScrollView style={styles.rightContent}>
          {cities.map((city) => (
            <TouchableOpacity
              key={city.id}
              style={styles.checkboxContainer}
              onPress={() => toggleCitySelection(city.name)}
            >
              <Checkbox
                checked={city.checked}
                onCheckedChange={() => toggleCitySelection(city.name)}
              />
              <Text style={styles.checkboxLabel}>{city.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.applyButton}
          onPress={handleApply}
          
        >
          <Text style={styles.applyButtonText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '500',
    flex: 1,
    marginLeft: 16,
  },
  clearText: {
    color: '#2196F3',
    fontSize: 14,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 40,
    backgroundColor: '#f5f5f5',
  },
  sidebarItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeSidebarItem: {
    backgroundColor: '#fff',
  },
  sidebarText: {
    fontSize: 14,
    color: '#212121',
    flex: 1,
  },
  activeSidebarText: {
    color: '#2196F3',
  },
  checkIcon: {
    marginLeft: 4,
  },
  rightContent: {
    flex: 1,
    padding: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkboxLabel: {
    marginLeft: 12,
    fontSize: 14,
    color: '#212121',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  productsFound: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 8,
  },
  applyButton: {
    backgroundColor: '#ff3d00',
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});
