import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
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

  const toggleCitySelection = (name) => {
    setCities((currentCities) =>
      currentCities.map((city) =>
        city.name === name ? { ...city, checked: !city.checked } : city
      )
    );
  };

  const getSelectedCity = () => {
    const selectedCity = cities.filter(city => city.checked).pop();
    return selectedCity ? selectedCity.name : null;
  };

  const handleApply = () => {
    const selectedCity = getSelectedCity();
    if (selectedCity) {
      const updatedShowFiltered = !showFiltered;
      setShowFiltered(updatedShowFiltered);
      navigation.navigate("Dashboard", {
        city: selectedCity,
        flag: updatedShowFiltered,
      });
    } else {
      alert('Please select a city');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Location Filter</Text>
        <TouchableOpacity 
          onPress={() => {
            navigation.navigate("Dashboard", { flag: false });
          }}
        >
          <Text style={styles.clearText}>Clear</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.cityList}>
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

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.applyButton}
          onPress={handleApply}
        >
          <Text style={styles.applyButtonText}>Apply Filter</Text>
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
  cityList: {
    flex: 1,
    padding: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  checkboxLabel: {
    marginLeft: 12,
    fontSize: 16,
    color: '#212121',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  applyButton: {
    backgroundColor: '#2196F3',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});