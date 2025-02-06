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
import ImageUpload from './ImageUpload';
import ProfileImageDisplay from './ProfileDisplay';

const EditBasicAll = ({ route }) => {
  const { userid, currentData: userData, activeTab } = route.params;
  const { mutate: updateBasicInfo } = useUpdate();

  const getInitialFormData = () => {
    const baseData = {
      personalInfo: {
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
        photo: null,
        photoId: null,
      },
      contactInfo: {
        mobile: userData?.mobile || '',
        email: userData?.email || '',
        dial_code: userData?.dial_code || '',
        privacy: userData?.privacy || '',
      },
      familyDetails: {
        father: userData?.father || '',
        father_gotra: userData?.father_gotra || '',
        mother: userData?.mother || '',
        husband: userData?.husband || '',
        relationship: userData?.relationship || '',
      },
      educationInfo: {
        education_level: userData?.education_level || '',
        profession: userData?.profession || '',
        occupation: userData?.occupation || '',
      },
      lifestyle: {
        language: userData?.language || '',
      },
      preferences: {
        ISActiveProfile: userData?.ISActiveProfile || false,
        provider: userData?.provider || '',
      },
    };

    return baseData[activeTab] || {};
  };

  const [formData, setFormData] = useState(getInitialFormData());
  const [isLoading, setIsLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    setFormData(getInitialFormData());
    initializeProfileImage();
  }, [activeTab, userData]);

  const initializeProfileImage = () => {
    const photoUrl = userData?.photo || userData?.photos?.[0]?.url;
    const photoId = userData?.photos?.[0]?.id || userData?.photoId;

    if (photoUrl) {
      setProfileImage(photoUrl);
      setFormData(prev => ({
        ...prev,
        photo: photoUrl,
        photoId: photoId
      }));
    }
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUploaded = (imageUrl, id) => {
    if (imageUrl && id) {
      setProfileImage(imageUrl);
      setFormData(prev => ({
        ...prev,
        photo: imageUrl,
        photoId: id
      }));
    }
  };

  const showSuccessMessage = () => {
    Alert.alert('Success', 'Information has been successfully updated.', [{ text: 'OK' }]);
  };

  const showErrorMessage = (message) => {
    Alert.alert('Error', message || 'Failed to update information.', [{ text: 'OK' }]);
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      handleChange('dob', selectedDate);
    }
  };

  const getFormFields = () => {
    const fields = {
      personalInfo: [
        { name: 'firstname', label: 'First Name', required: true },
        { name: 'lastname', label: 'Last Name', required: true },
        { name: 'username', label: 'Username' },
        { name: 'sex', label: 'Gender', required: true },
        { name: 'gotra', label: 'Gotra' },
        { name: 'cast', label: 'Cast' },
        { name: 'jati', label: 'Ethnicity' },
        { name: 'bio', label: 'Bio', multiline: true },
        { name: 'marital', label: 'Marital Status' },
      ],
      contactInfo: [
        { name: 'mobile', label: 'Phone Number', required: true },
        { name: 'email', label: 'Email', required: true },
        { name: 'dial_code', label: 'Dial Code' },
        { name: 'privacy', label: 'Privacy Settings' },
      ],
      familyDetails: [
        { name: 'father', label: 'Father Name' },
        { name: 'father_gotra', label: 'Father Gotra' },
        { name: 'mother', label: 'Mother Name' },
        { name: 'husband', label: 'Husband Name' },
        { name: 'relationship', label: 'Relationship' },
      ],
      educationInfo: [
        { name: 'education_level', label: 'Education Level' },
        { name: 'profession', label: 'Profession' },
        { name: 'occupation', label: 'Occupation' },
      ],
      lifestyle: [
        { name: 'language', label: 'Language' },
      ],
      preferences: [
        { name: 'provider', label: 'Provider' },
      ],
    };

    return fields[activeTab] || [];
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
      const values = { ...formData };
      
      if (activeTab === 'personalInfo' && values.dob) {
        values.dob = formatDate(values.dob);
      }
      
      await updateBasicInfo(
        {
          resource: "users",
          id: userid,
          values,
        },
        {
          onSuccess: showSuccessMessage,
          onError: (error) => showErrorMessage(error?.message),
        }
      );
    } catch (error) {
      showErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const renderPersonalInfoFields = () => (
    <>
      <ProfileImageDisplay
        imageUrl={profileImage}
        size={150}
        loading={isLoading}
      />
      <ImageUpload onImageUploaded={handleImageUploaded} userId={userid}/>
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
    </>
  );

  const renderFormFields = () => (
    getFormFields().map(field => (
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
    ))
  );

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
            {activeTab === "personalInfo" ? renderPersonalInfoFields() : renderFormFields()}

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
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  required: {
    color: '#ff4d4f',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d9d9d9',
    borderRadius: 8,
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
    borderColor: '#d9d9d9',
    borderRadius: 8,
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
    borderTopColor: '#f0f0f0',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  button: {
    backgroundColor: '#1890ff',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#bae7ff',
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