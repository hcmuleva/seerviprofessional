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
} from 'react-native';
import { useUpdate } from "@refinedev/core";
import DateTimePicker from '@react-native-community/datetimepicker';

const EditJob = ({route}) => {
  const { jobid, job } = route.params;
  const { mutate: updateJob } = useUpdate();

  // Initialize all state variables
  const [post, setPost] = useState(job?.post || '');
  const [organization, setOrganization] = useState(job?.organization || '');
  const [experience, setExperience] = useState(job?.experience || '');
  const [fromDate, setFromDate] = useState(job?.from ? new Date(job.from) : new Date());
  const [toDate, setToDate] = useState(job?.to ? new Date(job.to) : new Date());
  const [isLoading, setIsLoading] = useState(false);

  // Date picker states
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const showSuccessMessage = () => {
    Alert.alert(
      'Success',
      'Job post has been successfully updated.',
      [{ text: 'OK' }]
    );
  };

  const showErrorMessage = (message) => {
    Alert.alert(
      'Error',
      message || 'Failed to update job details.',
      [{ text: 'OK' }]
    );
  };

  const onFromDateChange = (event, selectedDate) => {
    setShowFromPicker(false);
    if (selectedDate) {
      setFromDate(selectedDate);
    }
  };

  const onToDateChange = (event, selectedDate) => {
    setShowToPicker(false);
    if (selectedDate) {
      setToDate(selectedDate);
    }
  };

  const validateForm = () => {
    if (!post.trim() || !organization.trim() || !experience.trim()) {
      showErrorMessage('Please fill in all required fields');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      console.log("Attempting to update job with ID:", jobid);
      
      const updateData = {
        resource: "jobs",
        id: jobid,
        values: {
          post,
          organization,
          experience,
          from: formatDate(fromDate),
          to: formatDate(toDate),
        },
      };

      console.log("Update data:", updateData);

      await updateJob(
        updateData,
        {
          onSuccess: (response) => {
            console.log("Update success:", response);
            showSuccessMessage();
          },
          onError: (error) => {
            console.error("Update error details:", error);
            showErrorMessage('Failed to update job details: ' + (error?.message || ''));
          },
        }
      );
    } catch (error) {
      console.error("Error occurred:", error);
      showErrorMessage('There was an issue updating the job details: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Organization</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter organization name"
            value={organization}
            onChangeText={setOrganization}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Post</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Enter job post"
            value={post}
            onChangeText={setPost}
            multiline={true}
            numberOfLines={3}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Experience</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter required experience"
            value={experience}
            onChangeText={setExperience}
          />
        </View>

        <View style={styles.dateContainer}>
          <View style={[styles.formGroup, styles.dateField]}>
            <Text style={styles.label}>From Date</Text>
            <TouchableOpacity 
              style={styles.dateButton}
              onPress={() => setShowFromPicker(true)}
            >
              <Text>{formatDate(fromDate)}</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.formGroup, styles.dateField]}>
            <Text style={styles.label}>To Date</Text>
            <TouchableOpacity 
              style={styles.dateButton}
              onPress={() => setShowToPicker(true)}
            >
              <Text>{formatDate(toDate)}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {showFromPicker && (
          <DateTimePicker
            value={fromDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onFromDateChange}
          />
        )}

        {showToPicker && (
          <DateTimePicker
            value={toDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onToDateChange}
          />
        )}

        <TouchableOpacity
          style={[
            styles.button,
            isLoading && styles.buttonDisabled
          ]}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'Updating...' : 'Update Job Post'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
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
    textAlignVertical: 'top',
  },
  textArea: {
    minHeight: 100,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateField: {
    flex: 0.48,
  },
  dateButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 12,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#1890ff',
    padding: 14,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EditJob;