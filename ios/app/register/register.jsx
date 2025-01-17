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
      {
        "HName": "choyal"
      },
      {
        "HName": "kag"
      },
      {
        "EName": "Kartik",
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
        navigation.replace('MainApp');
      } else {
        const errorData = await res.json();
        Alert.alert('Registration Failed', errorData?.message || 'Registration failed');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  const PickerModal = ({ visible, onClose, selectedValue, onValueChange, title }) => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.pickerModalContent}>
          <View style={styles.pickerHeader}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.pickerTitle}>{title}</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.doneButton}>Done</Text>
            </TouchableOpacity>
          </View>
          <Picker
            selectedValue={selectedValue}
            onValueChange={(itemValue) => {
              onValueChange(itemValue);
              onClose();
            }}
            style={styles.iosPicker}
          >
            <Picker.Item key="default" label={title} value="" />
            {title === "Select Gender" ? (
              <>
                <Picker.Item key="male" label="Male" value="Male" />
                <Picker.Item key="female" label="Female" value="Female" />
              </>
            ) : (
              gotra.Gotra.map((g, index) => (
                <Picker.Item 
                  key={`gotra-${index}-${g.EName || g.HName}`}
                  label={`${g.EName || ''} ${g.HName}`.trim()}
                  value={g.EName || g.HName}
                />
              ))
            )}
          </Picker>
        </View>
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
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={formData.firstname}
            onChangeText={(text) => handleInputChange('firstname', text)}
            placeholderTextColor="#999"
          />

          <TextInput
            style={styles.input}
            placeholder="Father/Husband Name"
            value={formData.lastname}
            onChangeText={(text) => handleInputChange('lastname', text)}
            placeholderTextColor="#999"
          />

          <TextInput
            style={styles.input}
            placeholder="Email Address"
            value={formData.email}
            onChangeText={(text) => handleInputChange('email', text)}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#999"
          />

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              value={formData.password}
              onChangeText={(text) => handleInputChange('password', text)}
              secureTextEntry={!showPassword}
              placeholderTextColor="#999"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Text style={styles.showHideText}>{showPassword ? 'Hide' : 'Show'}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChangeText={(text) => handleInputChange('confirmPassword', text)}
              secureTextEntry={!showConfirmPassword}
              placeholderTextColor="#999"
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Text style={styles.showHideText}>{showConfirmPassword ? 'Hide' : 'Show'}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.selectButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.selectButtonText}>
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

          <TouchableOpacity
            style={styles.selectButton}
            onPress={() => setShowGenderPicker(true)}
          >
            <Text style={[
              styles.selectButtonText,
              !formData.sex && { color: '#999' }
            ]}>
              {formData.sex || 'Select Gender'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.selectButton}
            onPress={() => setShowGotraPicker(true)}
          >
            <Text style={[
              styles.selectButtonText,
              !formData.gotra && { color: '#999' }
            ]}>
              {formData.gotra || 'Select Gotra'}
            </Text>
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Mobile Number"
            value={formData.mobile}
            onChangeText={(text) => handleInputChange('mobile', text)}
            keyboardType="phone-pad"
            placeholderTextColor="#999"
          />

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

        <PickerModal
          visible={showGenderPicker}
          onClose={() => setShowGenderPicker(false)}
          selectedValue={formData.sex}
          onValueChange={(value) => {
            handleInputChange('sex', value);
          }}
          title="Select Gender"
        />

        <PickerModal
          visible={showGotraPicker}
          onClose={() => setShowGotraPicker(false)}
          selectedValue={formData.gotra}
          onValueChange={(value) => {
            handleInputChange('gotra', value);
          }}
          title="Select Gotra"
        />
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
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  passwordInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  showHideText: {
    color: '#3498db',
    fontSize: 16,
  },
  selectButton: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  selectButtonText: {
    fontSize: 16,
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  pickerModalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  pickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  pickerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  cancelButton: {
    color: '#666',
    fontSize: 16,
  },
  doneButton: {
    color: '#3498db',
    fontSize: 16,
    fontWeight: '600',
  },
  iosPicker: {
    height: 215,
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
    width: '100%',
    backgroundColor: 'white',
  }
});