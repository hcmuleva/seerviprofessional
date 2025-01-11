import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useUpdate } from "@refinedev/core";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const EditJob = ({ route }) => {
  const navigation = useNavigation();
  const { jobid, job } = route.params;
  const { mutate: updateJob } = useUpdate();
  const insets = useSafeAreaInsets();

  const [post, setPost] = useState(job?.post || '');
  const [organization, setOrganization] = useState(job?.organization || '');
  const [experience, setExperience] = useState(job?.experience || '');
  const [fromDate, setFromDate] = useState(job?.from ? new Date(job.from) : new Date());
  const [toDate, setToDate] = useState(job?.to ? new Date(job.to) : new Date());
  const [isLoading, setIsLoading] = useState(false);

  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);

  const formatDate = (date) => date.toISOString().split('T')[0];

  const showSuccessMessage = () => {
    Alert.alert('Success', 'Job post has been successfully updated.', [{ text: 'OK' }]);
  };

  const showErrorMessage = (message) => {
    Alert.alert('Error', message || 'Failed to update job details.', [{ text: 'OK' }]);
  };

  const onFromDateChange = (event, selectedDate) => {
    setShowFromPicker(false);
    if (selectedDate) setFromDate(selectedDate);
  };

  const onToDateChange = (event, selectedDate) => {
    setShowToPicker(false);
    if (selectedDate) setToDate(selectedDate);
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

      await updateJob(updateData, {
        onSuccess: () => {
          showSuccessMessage();
          navigation.goBack();
        },
        onError: (error) => {
          showErrorMessage('Failed to update job details: ' + (error?.message || ''));
        },
      });
    } catch (error) {
      showErrorMessage('There was an issue updating the job details: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { paddingTop: insets.top }]}>
      <View style={[styles.header, { height: 44 + insets.top, paddingTop: insets.top }]}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={[styles.backButton, { top: insets.top + 10 }]}
        >
          <Text style={styles.backButtonText}>ProfileTabs</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { marginTop: insets.top }]}>EditJob</Text>
      </View>
      
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={[styles.scrollContainer, { paddingBottom: insets.bottom + 16 }]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.card}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Organization</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter organization name"
                value={organization}
                onChangeText={setOrganization}
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Post</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Enter job post"
                value={post}
                onChangeText={setPost}
                multiline
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Experience</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter required experience"
                value={experience}
                onChangeText={setExperience}
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.dateContainer}>
              <View style={[styles.formGroup, styles.dateField]}>
                <Text style={styles.label}>From Date</Text>
                <TouchableOpacity
                  style={styles.dateButton}
                  onPress={() => setShowFromPicker(true)}
                >
                  <Text style={styles.dateButtonText}>{formatDate(fromDate)}</Text>
                </TouchableOpacity>
              </View>

              <View style={[styles.formGroup, styles.dateField]}>
                <Text style={styles.label}>To Date</Text>
                <TouchableOpacity
                  style={styles.dateButton}
                  onPress={() => setShowToPicker(true)}
                >
                  <Text style={styles.dateButtonText}>{formatDate(toDate)}</Text>
                </TouchableOpacity>
              </View>
            </View>

            {showFromPicker && (
              <DateTimePicker
                value={fromDate}
                mode="date"
                display="spinner"
                onChange={onFromDateChange}
              />
            )}

            {showToPicker && (
              <DateTimePicker
                value={toDate}
                mode="date"
                display="spinner"
                onChange={onToDateChange}
              />
            )}

            <TouchableOpacity
              style={[styles.button, isLoading && styles.buttonDisabled]}
              onPress={handleSubmit}
              disabled={isLoading}
            >
              <Text style={styles.buttonText}>
                {isLoading ? 'Updating...' : 'Update Job Post'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 0,
  },
  backButton: {
    position: 'absolute',
    left: 16,
    zIndex: 1,
  },
  backButtonText: {
    color: '#007AFF',
    fontSize: 17,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#000',
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
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
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
  },
  dateButtonText: {
    fontSize: 16,
    color: '#000',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
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

