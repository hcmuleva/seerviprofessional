import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, PermissionsAndroid, Platform } from 'react-native';
import Location from 'react-native-location'; // Import react-native-location
import fetchGeoData from '../../utils/geoLocation';
import ProfileTabs from '../../(tabs)/profiletabs';

const AddressComponent = ({ setValue }) => {
  const [locationError, setLocationError] = useState(null);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  // Request location permission for Android
  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      return true; // iOS permission is handled automatically
    }
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      return false;
    }
  };

  const handlePinCode = async (value) => {
    if (value.toString().length < 6) return;
    try {
      const response = await fetchGeoData(value.toString());
      const data = response.data[0]?.attributes;
      
      setValue('village', data?.localityname ?? "");
      setValue('tehsil', data?.officeName ?? "");
      setValue('district', data?.districtName ?? "");
      setValue('state', data?.stateName ?? "");
    } catch (error) {
      console.error("Error fetching address details:", error);
    }
  };

  const getCurrentLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      setLocationError('Location permission denied');
      return;
    }

    // Use react-native-location to get the current location
    Location.getLatestLocation()
      .then((location) => {
        const lat = location.latitude.toString();
        const lng = location.longitude.toString();
        setLatitude(lat);
        setLongitude(lng);
        setValue('lat', lat);
        setValue('lng', lng);
        setLocationError(null);
      })
      .catch((error) => {
        setLocationError('Error getting location');
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Address Form</Text>

      <TextInput
        style={styles.input}
        placeholder="Pin Code"
        keyboardType="numeric"
        onChangeText={(text) => handlePinCode(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="House Name"
        maxLength={50}
        onChangeText={(text) => setValue('housename', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Landmark"
        maxLength={50}
        onChangeText={(text) => setValue('landmark', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Village"
        maxLength={30}
        onChangeText={(text) => setValue('village', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Tehsil"
        maxLength={30}
        onChangeText={(text) => setValue('tehsil', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="District"
        maxLength={30}
        onChangeText={(text) => setValue('district', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="State"
        maxLength={30}
        onChangeText={(text) => setValue('state', text)}
      />

      <Button title="Use Current Location" onPress={getCurrentLocation} />
      {locationError && <Text style={styles.error}>{locationError}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Latitude"
        maxLength={30}
        value={latitude}
        onChangeText={(text) => {
          setLatitude(text);
          setValue('lat', text);
        }}
      />

      <TextInput
        style={styles.input}
        placeholder="Longitude"
        maxLength={30}
        value={longitude}
        onChangeText={(text) => {
          setLongitude(text);
          setValue('lng', text);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
  },
  error: {
    color: 'red',
    marginBottom: 15,
  },
});

export default AddressComponent;
