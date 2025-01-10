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
  Alert,
  Modal
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

const API_URL = process.env.VITE_SERVER_URL;
const TOKEN_KEY = process.env.VITE_TOKEN_KEY;

export default function Register() {
  const gotra = {
    "Gotra": [
      { "HName": "choyal" },
      { "HName": "kag" },
      { "EName": "Kartik", "HName": "septa" },
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
  const [showGenderPicker, setShowGenderPicker] = useState(false);
  const [showGotraPicker, setShowGotraPicker] = useState(false);

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
        navigation.navigate('Dashboard');
      } else {
        const errorData = await res.json();
        Alert.alert('Registration Failed', errorData?.message || 'Registration failed');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  const renderPicker = (visible, setVisible, selectedValue, onValueChange, items, placeholder) => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      <View style={styles.modalView}>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedValue}
            onValueChange={onValueChange}
            style={styles.picker}
          >
            <Picker.Item label={placeholder} value="" />
            {items.map((item, index) => (
              <Picker.Item key={index} label={item.label} value={item.value} />
            ))}
          </Picker>
        </View>
        <TouchableOpacity style={styles.doneButton} onPress={() => setVisible(false)}>
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );

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
            <TextInput
              style={styles.input}
              placeholder="Father/Husband Name"
              value={formData.lastname}
              onChangeText={(text) => handleInputChange('lastname', text)}
              placeholderTextColor="#999"
            />
          </View>

          {/* Date of Birth */}
          <TouchableOpacity
            style={styles.inputContainer}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateText}>
              {formData.dob.toLocaleDateString()}
            </Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={formData.dob}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleDateChange}
              style={styles.datePicker}
            />
          )}

          {/* Gender Selection */}
          <TouchableOpacity
            style={styles.inputContainer}
            onPress={() => setShowGenderPicker(true)}
          >
            <Text style={styles.pickerText}>
              {formData.sex || 'Select Gender'}
            </Text>
          </TouchableOpacity>

          {renderPicker(
            showGenderPicker,
            setShowGenderPicker,
            formData.sex,
            (value) => handleInputChange('sex', value),
            [
              { label: 'Male', value: 'Male' },
              { label: 'Female', value: 'Female' },
            ],
            'Select Gender'
          )}

          {/* Gotra Selection */}
          <TouchableOpacity
            style={styles.inputContainer}
            onPress={() => setShowGotraPicker(true)}
          >
            <Text style={styles.pickerText}>
              {formData.gotra || 'Select Gotra'}
            </Text>
          </TouchableOpacity>

          {renderPicker(
            showGotraPicker,
            setShowGotraPicker,
            formData.gotra,
            (value) => handleInputChange('gotra', value),
            gotra.Gotra.map(g => ({ label: `${g.EName || ''} (${g.HName})`, value: g.EName || g.HName })),
            'Select Gotra'
          )}

          {/* Mobile Input */}
          <View style={styles.inputContainer}>
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
    height: 50,
  },
  input: {
    flex: 1,
    height: 50,
    color: '#333',
    fontSize: 16,
    textAlignVertical: 'center',
    paddingVertical: 0,
  },
  pickerText: {
    flex: 1,
    height: 50,
    textAlignVertical: 'center',
    fontSize: 16,
    color: '#333',
    paddingVertical: 0,
  },
  dateText: {
    flex: 1,
    height: 50,
    textAlignVertical: 'center',
    fontSize: 16,
    color: '#333',
    paddingVertical: 0,
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
  datePicker: {
    marginTop: 10,
    backgroundColor: 'white',
  },
  modalView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  pickerContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
  },
  picker: {
    height: 200,
  },
  doneButton: {
    backgroundColor: '#3498db',
    padding: 15,
    alignItems: 'center',
  },
  doneButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

