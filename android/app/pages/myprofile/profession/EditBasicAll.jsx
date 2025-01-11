import React, { useState } from 'react';
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
} from 'react-native';
import { useUpdate } from "@refinedev/core";
import DateTimePicker from '@react-native-community/datetimepicker';

const EditBasicAll = ({route}) => {
  const { userid, currentData , activeTab} = route.params;
  console.log("ACTIVE TAB",activeTab);
  
  const { mutate: updateBasicInfo } = useUpdate();

  // Single state object for all form fields
  const [formData, setFormData] = useState({
    ...currentData,
    dob: currentData?.dob ? new Date(currentData.dob) : new Date(),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

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
      'Personal information has been successfully updated.',
      [{ text: 'OK' }]
    );
  };

  const showErrorMessage = (message) => {
    Alert.alert(
      'Error',
      message || 'Failed to update personal information.',
      [{ text: 'OK' }]
    );
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      handleChange('dob', selectedDate);
    }
  };

  const validateForm = () => {
    const requiredFields = ['name', 'gender', 'height', 'weight'];
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
      const updateData = {
        resource: "users",
        id: userid,
        values: {
          ...formData,
          dob: formatDate(formData.dob),
        },
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

  // Define form fields configuration
  const fields = [
    { name: 'username', label: 'Full Name' },
    { name: 'sex', label: 'Gender' },
    { name: 'height', label: 'Height' },
    { name: 'weight', label: 'Weight' },
    { name: 'bodyType', label: 'Body Type' },
    { name: 'ethnicity', label: 'Ethnicity' },
    { name: 'religion', label: 'Religion' },
    { name: 'zodiacSign', label: 'Zodiac Sign' },
  ];

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
            {fields.map(field => (
              <View key={field.name} style={styles.formGroup}>
                <Text style={styles.label}>{field.label}</Text>
                <TextInput
                  style={styles.input}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  value={formData[field.name]}
                  onChangeText={(value) => handleChange(field.name, value)}
                />
              </View>
            ))}

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

            {/* Add extra padding at bottom for scroll space */}
            <View style={styles.bottomPadding} />
          </View>
        </ScrollView>

        {/* Fixed position button container */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleSubmit}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Updating...' : 'Update Personal Info'}
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
        paddingBottom: 90, // Extra padding for button
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
      input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#fff',
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