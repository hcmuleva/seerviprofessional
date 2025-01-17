import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  Switch,
} from 'react-native';
import { useUpdate } from "@refinedev/core";
import DateTimePicker from '@react-native-community/datetimepicker';

const EditBasicAll = ({route}) => {
  const { userid, currentData: userData, activeTab } = route.params;
  const { mutate: updateBasicInfo } = useUpdate();

  // Get initial form data based on active tab
  const getInitialFormData = () => {
    switch (activeTab) {
      case "personalInfo":
        return {
          firstname: userData?.firstname || '',
          lastname: userData?.lastname || '',
          username: userData?.username || '',
          dob: userData?.dob ? new Date(userData.dob) : new Date(),
          sex: userData?.sex || '',
          gotra: userData?.gotra || '',
          cast: userData?.cast || '',
          jati: userData?.jati || '',
          bio: userData?.bio || '',
          marital: userData?.marital || '',
          isdivyang: userData?.isdivyang || false,
          divyangdescription: userData?.divyangdescription || '',
        };
      case "contactInfo":
        return {
          mobile: userData?.mobile || '',
          email: userData?.email || '',
          dial_code: userData?.dial_code || '',
          privacy: userData?.privacy || '',
        };
      case "familyDetails":
        return {
          father: userData?.father || '',
          father_gotra: userData?.father_gotra || '',
          mother: userData?.mother || '',
          husband: userData?.husband || '',
          relationship: userData?.relationship || '',
        };
      case "educationInfo":
        return {
          education_level: userData?.education_level || '',
          profession: userData?.profession || '',
          occupation: userData?.occupation || '',
        };
      case "lifestyle":
        return {
          language: userData?.language || '',
        };
      case "preferences":
        return {
          ISActiveProfile: userData?.ISActiveProfile || false,
          provider: userData?.provider || '',
        };
      default:
        return {};
    }
  };

  const [formData, setFormData] = useState(getInitialFormData());
  const [isLoading, setIsLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Update form data when tab changes
  useEffect(() => {
    setFormData(getInitialFormData());
  }, [activeTab]);

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const showSuccessMessage = () => {
    Alert.alert(
      'Success',
      'Information has been successfully updated.',
      [{ text: 'OK' }]
    );
  };

  const showErrorMessage = (message) => {
    Alert.alert(
      'Error',
      message || 'Failed to update information.',
      [{ text: 'OK' }]
    );
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      handleChange('dob', selectedDate);
    }
  };

  // Get form fields configuration based on active tab
  const getFormFields = () => {
    switch (activeTab) {
      case "personalInfo":
        return [
          { name: 'firstname', label: 'First Name', required: true },
          { name: 'lastname', label: 'Last Name', required: true },
          { name: 'username', label: 'Username' },
          { name: 'sex', label: 'Gender', required: true },
          { name: 'gotra', label: 'Gotra' },
          { name: 'cast', label: 'Cast' },
          { name: 'jati', label: 'Ethnicity' },
          { name: 'bio', label: 'Bio', multiline: true },
          { name: 'marital', label: 'Marital Status' },
        ];
      case "contactInfo":
        return [
          { name: 'mobile', label: 'Phone Number', required: true },
          { name: 'email', label: 'Email', required: true },
          { name: 'dial_code', label: 'Dial Code' },
          { name: 'privacy', label: 'Privacy Settings' },
        ];
      case "familyDetails":
        return [
          { name: 'father', label: 'Father Name' },
          { name: 'father_gotra', label: 'Father Gotra' },
          { name: 'mother', label: 'Mother Name' },
          { name: 'husband', label: 'Husband Name' },
          { name: 'relationship', label: 'Relationship' },
        ];
      case "educationInfo":
        return [
          { name: 'education_level', label: 'Education Level' },
          { name: 'profession', label: 'Profession' },
          { name: 'occupation', label: 'Occupation' },
        ];
      case "lifestyle":
        return [
          { name: 'language', label: 'Language' },
          { name: 'userstatus', label: 'User Status' },
          { name: 'commityroles', label: 'Community Roles' },
          { name: 'myrole', label: 'My Role' },
        ];
      case "preferences":
        return [
          { name: 'user_title', label: 'User Title' },
          { name: 'userrole', label: 'User Role' },
          { name: 'provider', label: 'Provider' },
        ];
      default:
        return [];
    }
  };

  const validateForm = () => {
    const fields = getFormFields();
    const requiredFields = fields.filter(field => field.required).map(field => field.name);
    const missingFields = requiredFields.filter(field => !formData[field]?.trim());
    
    if (missingFields.length > 0) {
      showErrorMessage(`Please fill in: ${missingFields.join(', ')}`);
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      let values = { ...formData };
      
      // Handle special cases
      if (activeTab === 'personalInfo') {
        values.dob = formatDate(formData.dob);
      }
      
      const updateData = {
        resource: "users",
        id: userid,
        values,
      };

      await updateBasicInfo(updateData, {
        onSuccess: () => showSuccessMessage(),
        onError: (error) => showErrorMessage(error?.message),
      });
    } catch (error) {
      showErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}
        >
          <View style={styles.card}>
            {/* Render form fields based on active tab */}
            {getFormFields().map(field => (
              <View key={field.name} style={styles.formGroup}>
                <Text style={styles.label}>
                  {field.label}
                  {field.required && <Text style={styles.required}> *</Text>}
                </Text>
                <TextInput
                  style={[styles.input, field.multiline && styles.multilineInput]}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  value={formData[field.name]}
                  onChangeText={(value) => handleChange(field.name, value)}
                  multiline={field.multiline}
                  numberOfLines={field.multiline ? 4 : 1}
                />
              </View>
            ))}

            {/* Date picker for personal info */}
            {activeTab === 'personalInfo' && (
              <>
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Date of Birth</Text>
                  <TouchableOpacity 
                    style={styles.dateButton}
                    onPress={() => setShowDatePicker(true)}
                  >
                    <Text>{formatDate(formData.dob)}</Text>
                  </TouchableOpacity>
                </View>

                {showDatePicker && (
                  <DateTimePicker
                    value={formData.dob}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={onDateChange}
                  />
                )}

                <View style={styles.formGroup}>
                  <Text style={styles.label}>Is Divyang</Text>
                  <Switch
                    value={formData.isdivyang}
                    onValueChange={(value) => handleChange('isdivyang', value)}
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={formData.isdivyang ? '#1890ff' : '#f4f3f4'}
                  />
                </View>

                {formData.isdivyang && (
                  <View style={styles.formGroup}>
                    <Text style={styles.label}>Divyang Description</Text>
                    <TextInput
                      style={[styles.input, styles.multilineInput]}
                      placeholder="Enter divyang description"
                      value={formData.divyangdescription}
                      onChangeText={(value) => handleChange('divyangdescription', value)}
                      multiline
                      numberOfLines={4}
                    />
                  </View>
                )}
              </>
            )}

            {/* Active Profile switch for preferences */}
            {activeTab === 'preferences' && (
              <View style={styles.formGroup}>
                <Text style={styles.label}>Active Profile</Text>
                <Switch
                  value={formData.ISActiveProfile}
                  onValueChange={(value) => handleChange('ISActiveProfile', value)}
                  trackColor={{ false: '#767577', true: '#81b0ff' }}
                  thumbColor={formData.ISActiveProfile ? '#1890ff' : '#f4f3f4'}
                />
              </View>
            )}

            <View style={styles.bottomPadding} />
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleSubmit}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Updating...' : `Update ${activeTab.replace(/([A-Z])/g, ' $1').trim()}`}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 90,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  required: {
    color: 'red',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  dateButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 12,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  button: {
    backgroundColor: '#1890ff',
    padding: 14,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomPadding: {
    height: 20,
  },
});

export default EditBasicAll;