import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import fetchGeoData from '../../utils/geoLocation';

const AddressComponent = ({ form, setForm }) => {
  
  const [pinCode, setPinCode] = useState('');
  const [houseName, setHouseName] = useState('');
  const [landmark, setLandmark] = useState('');
  const [village, setVillage] = useState('');
  const [tehsil, setTehsil] = useState('');
  const [district, setDistrict] = useState('');
  const [state, setState] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');

  const handlePinCode = async (value) => {
    if (value.length < 6) {
      return;
    }
    try {
      const response = await fetchGeoData(value);
      const data = response.data[0]?.attributes;

      setVillage(data?.localityname ?? '');
      setTehsil(data?.officeName ?? '');
      setDistrict(data?.districtName ?? '');
      setState(data?.stateName ?? '');
    } catch (error) {
      console.error('Error fetching address details:', error);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
        setForm((prev) => ({
          ...prev,
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }));
      });
    }
  };

  const handleSave = () => {
    // You can handle the save logic here
    console.log('Save button clicked');
    setForm((prev) => ({
      ...prev,
      address: {
        pinCode,
        houseName,
        landmark,
        village,
        tehsil,
        district,
        state,
        lat,
        lng,
      },
    }));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Job Address</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Pin Code</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={pinCode}
          onChangeText={(text) => {
            setPinCode(text);
            handlePinCode(text);
          }}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>House Name</Text>
        <TextInput
          style={styles.input}
          value={houseName}
          onChangeText={(text) => setHouseName(text)}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Landmark</Text>
        <TextInput
          style={styles.input}
          value={landmark}
          onChangeText={(text) => setLandmark(text)}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Village</Text>
        <TextInput
          style={styles.input}
          value={village}
          onChangeText={(text) => setVillage(text)}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Tehsil</Text>
        <TextInput
          style={styles.input}
          value={tehsil}
          onChangeText={(text) => setTehsil(text)}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>District</Text>
        <TextInput
          style={styles.input}
          value={district}
          onChangeText={(text) => setDistrict(text)}
        />
      </View>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>State</Text>
        <TextInput
          style={styles.input}
          value={state}
          onChangeText={(text) => setState(text)}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={getCurrentLocation}>
        <Text style={styles.buttonText}>Use Current Location</Text>
      </TouchableOpacity>

      <View style={styles.locationContainer}>
        <View style={styles.locationGroup}>
          <Text style={styles.label}>Latitude</Text>
          <TextInput
            style={styles.input}
            value={lat.toString()}
            editable={false}
          />
        </View>

        <View style={styles.locationGroup}>
          <Text style={styles.label}>Longitude</Text>
          <TextInput
            style={styles.input}
            value={lng.toString()}
            editable={false}
          />
        </View>
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Address</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  locationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  locationGroup: {
    width: '48%',
  },
  saveButton: {
    backgroundColor: '#28a745',  // Green color for save button
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 16,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AddressComponent;