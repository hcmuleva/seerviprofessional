import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { ArrowLeft } from 'react-native-feather';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function EditJob({ route, navigation }) {
  const { user, userid, jobid } = route.params;
  
  // Find the specific job from user data
  const currentJob = user.jobs.find(job => job.id === jobid) || {};

  const [formData, setFormData] = useState({
    post: currentJob.post || '',
    organization: currentJob.organization || '',
    experience: currentJob.experience || '',
    from: currentJob.from ? new Date(currentJob.from) : new Date(),
    to: currentJob.to ? new Date(currentJob.to) : new Date(),
  });

  const [showFromDate, setShowFromDate] = useState(false);
  const [showToDate, setShowToDate] = useState(false);

  const updateField = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[d.getMonth()]} ${d.getFullYear()}`;
  };

  const onFromDateChange = (event, selectedDate) => {
    setShowFromDate(false);
    if (selectedDate) {
      updateField('from', selectedDate);
    }
  };

  const onToDateChange = (event, selectedDate) => {
    setShowToDate(false);
    if (selectedDate) {
      updateField('to', selectedDate);
    }
  };

  const handleSubmit = async () => {
    try {
      // Here you would typically make an API call to update the job
      console.log('Updating job with data:', {
        userid,
        jobid,
        ...formData
      });
      
      // After successful update
      navigation.goBack();
    } catch (error) {
      console.error('Error updating job:', error);
      // Handle error appropriately
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft stroke="#000" width={24} height={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Job</Text>
      </View>

      {/* Form */}
      <ScrollView style={styles.formContainer}>
        <View style={styles.formSection}>
          <TextInput
            label="Job Title"
            value={formData.post}
            onChangeText={(text) => updateField('post', text)}
            style={styles.input}
            mode="outlined"
          />

          <TextInput
            label="Company/Organization"
            value={formData.organization}
            onChangeText={(text) => updateField('organization', text)}
            style={styles.input}
            mode="outlined"
          />

          <TextInput
            label="Experience"
            value={formData.experience}
            onChangeText={(text) => updateField('experience', text)}
            style={styles.input}
            mode="outlined"
            keyboardType="numeric"
          />

          {/* Date Pickers */}
          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => setShowFromDate(true)}
          >
            <Text style={styles.dateLabel}>From Date</Text>
            <Text style={styles.dateValue}>{formatDate(formData.from)}</Text>
          </TouchableOpacity>

          {showFromDate && (
            <DateTimePicker
              value={formData.from}
              mode="date"
              display="default"
              onChange={onFromDateChange}
            />
          )}

          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => setShowToDate(true)}
          >
            <Text style={styles.dateLabel}>To Date</Text>
            <Text style={styles.dateValue}>{formatDate(formData.to)}</Text>
          </TouchableOpacity>

          {showToDate && (
            <DateTimePicker
              value={formData.to}
              mode="date"
              display="default"
              onChange={onToDateChange}
            />
          )}
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>Update Job</Text>
        </TouchableOpacity>
      </ScrollView>
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
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  formContainer: {
    flex: 1,
    padding: 16,
  },
  formSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 4,
    padding: 12,
    marginBottom: 16,
  },
  dateLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  dateValue: {
    fontSize: 16,
    color: '#000',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 32,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});