import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Platform,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
// Add this import at the top of your Register.js file
// Add this import at the top of your Register.js file


const API_URL = process.env.VITE_SERVER_URL;
const TOKEN_KEY = process.env.VITE_TOKEN_KEY;

export default function Register() {
  const gotra = {
    "Gotra": [
      {
        "HName": "choyal"
      },
      {
        "HName": "kag"
      },
      {  "EName" : "Kartik",
        "HName": "septa"
      },
    ]
  };

  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
    dob: new Date(),
    sex: '',
    gotra: '',
    mobile: '',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleInputChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      handleInputChange('dob', selectedDate);
    }
  };

  const handleRegister = async () => {
    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      const values = {
        ...formData,
        username: formData.email,
        userstatus: 'PENDING'
      };

      const res = await fetch(`${API_URL}/api/auth/local/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        const data = await res.json();
        await AsyncStorage.setItem(TOKEN_KEY, data.jwt);
        await AsyncStorage.setItem('userid', String(data?.user?.id));
        await AsyncStorage.setItem('userstatus', String(data?.user?.userstatus));
        navigation.navigate('HomeScreen');
      } else {
        const errorData = await res.json();
        Alert.alert('Registration Failed', errorData?.message || 'Registration failed');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>EMEELAN</Text>
          <Text style={styles.headerSubtitle}>We bring Professionals Together</Text>
        </View>

        <View style={styles.formContainer}>
          {/* First Name Input */}
          <View style={styles.inputContainer}>
            {/* <Feather name="user" size={20} color="#666" style={styles.inputIcon} /> */}
            <TextInput
              style={styles.input}
              placeholder="First Name"
              value={formData.firstname}
              onChangeText={(text) => handleInputChange('firstname', text)}
              placeholderTextColor="#999"
            />
          </View>

          {/* Last Name Input */}
          <View style={styles.inputContainer}>
            {/* <Feather name="users" size={20} color="#666" style={styles.inputIcon} /> */}
            <TextInput
              style={styles.input}
              placeholder="Father/Husband Name"
              value={formData.lastname}
              onChangeText={(text) => handleInputChange('lastname', text)}
              placeholderTextColor="#999"
            />
          </View>

          {/* Email Input */}
          <View style={styles.inputContainer}>
            {/* <Feather name="mail" size={20} color="#666" style={styles.inputIcon} /> */}
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              value={formData.email}
              onChangeText={(text) => handleInputChange('email', text)}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#999"
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            {/* <Feather name="lock" size={20} color="#666" style={styles.inputIcon} /> */}
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={formData.password}
              onChangeText={(text) => handleInputChange('password', text)}
              secureTextEntry={!showPassword}
              placeholderTextColor="#999"
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              {/* <Feather name={showPassword ? "eye" : "eye-off"} size={20} color="#666" /> */}
            </TouchableOpacity>
          </View>

          {/* Confirm Password Input */}
          <View style={styles.inputContainer}>
            {/* <Feather name="lock" size={20} color="#666" style={styles.inputIcon} /> */}
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChangeText={(text) => handleInputChange('confirmPassword', text)}
              secureTextEntry={!showConfirmPassword}
              placeholderTextColor="#999"
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {/* <Feather name={showConfirmPassword ? "eye" : "eye-off"} size={20} color="#666" /> */}
            </TouchableOpacity>
          </View>

          {/* Date of Birth */}
          <TouchableOpacity
            style={styles.inputContainer}
            onPress={() => setShowDatePicker(true)}
          >
            {/* <Feather name="calendar" size={20} color="#666" style={styles.inputIcon} /> */}
            <Text style={styles.dateText}>
              {formData.dob.toLocaleDateString()}
            </Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={formData.dob}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}

          {/* Gender Selection */}
          <View style={styles.pickerContainer}>
            {/* <Feather name="user" size={20} color="#666" style={styles.inputIcon} /> */}
            <Picker
              selectedValue={formData.sex}
              style={styles.picker}
              onValueChange={(value) => handleInputChange('sex', value)}
            >
              <Picker.Item label="Select Gender" value="" />
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
            </Picker>
          </View>

          {/* Gotra Selection */}
          <View style={styles.pickerContainer}>
            {/* <Feather name="users" size={20} color="#666" style={styles.inputIcon} /> */}
            <Picker
              selectedValue={formData.gotra}
              style={styles.picker}
              onValueChange={(value) => handleInputChange('gotra', value)}
            >
              <Picker.Item label="Select Gotra" value="" />
              {gotra.Gotra.map((g) => (
                <Picker.Item key={g.EName} label={`${g.EName} (${g.HName})`} value={g.EName} />
              ))}
            </Picker>
          </View>

          {/* Mobile Input */}
          <View style={styles.inputContainer}>
            {/* <Feather name="phone" size={20} color="#666" style={styles.inputIcon} /> */}
            <TextInput
              style={styles.input}
              placeholder="Mobile Number"
              value={formData.mobile}
              onChangeText={(text) => handleInputChange('mobile', text)}
              keyboardType="phone-pad"
              placeholderTextColor="#999"
            />
          </View>

          {/* Buttons */}
          <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.loginButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.loginButtonText}>Back to Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  scrollView: {
    flexGrow: 1,
    padding: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: '#333',
    fontSize: 16,
  },
  eyeIcon: {
    padding: 10,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  picker: {
    flex: 1,
    height: 50,
  },
  dateText: {
    flex: 1,
    height: 50,
    textAlignVertical: 'center',
    fontSize: 16,
    color: '#333',
  },
  registerButton: {
    backgroundColor: '#3498db',
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginButton: {
    marginTop: 15,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3498db',
    borderRadius: 8,
  },
  loginButtonText: {
    color: '#3498db',
    fontSize: 16,
    fontWeight: '600',
  },
});