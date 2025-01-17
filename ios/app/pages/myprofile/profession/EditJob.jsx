import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  ScrollView,
  Platform,
  Modal,
} from 'react-native';
import { useUpdate } from "@refinedev/core";
import { Picker } from '@react-native-picker/picker';
import { TextInput, Card, Title, Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const jobTypes = [
  { label: 'Private', value: 'PRIVATE' },
  { label: 'Public', value: 'PUBLIC' },
  { label: 'Govt', value: 'GOVT' },
  { label: 'SemiPrivate', value: 'SEMIPRIVATE' },
  { label: 'PublicSector', value: 'PUBLICSECTOR' },
  { label: 'Administrative', value: 'ADMINISTRATIVE' },
  { label: 'Other', value: 'OTHER' }
];

const employmentTypes = [
  { label: 'Permanent', value: 'PERMANENT' },
  { label: 'Part Time', value: 'PARTTIME' },
  { label: 'Contract', value: 'CONTRACT' },
  { label: 'Other', value: 'OTHER' }
];

const EditJob = ({ route }) => {
  const { jobid, job } = route.params;
  const { mutate: updateJob } = useUpdate();

  const [orgType, setOrgType] = useState(job?.orgtype || '');
  const [organization, setOrganization] = useState(job?.organization || '');
  const [jobType, setJobType] = useState(job?.job_type || '');
  const [post, setPost] = useState(job?.post || '');
  const [experience, setExperience] = useState(job?.experience || '');
  const [skills, setSkills] = useState(job?.skills || '');
  const [fromDate, setFromDate] = useState(job?.from ? new Date(job.from) : new Date());
  const [toDate, setToDate] = useState(job?.to ? new Date(job.to) : new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [annualCompensation, setAnnualCompensation] = useState(job?.annual_compensation?.toString() || '');
  const [employeesCount, setEmployeesCount] = useState(job?.employees_count?.toString() || '');

  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);
  const [showJobTypePicker, setShowJobTypePicker] = useState(false);

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const showSuccessMessage = () => {
    Alert.alert(
      'Success',
      'Job has been successfully updated.',
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
    setShowFromPicker(Platform.OS === 'ios');
    if (selectedDate) {
      setFromDate(selectedDate);
    }
  };

  const onToDateChange = (event, selectedDate) => {
    setShowToPicker(Platform.OS === 'ios');
    if (selectedDate) {
      setToDate(selectedDate);
    }
  };

  const validateForm = () => {
    if (!organization.trim() || !jobType || !post.trim()) {
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
          orgtype: orgType,
          organization,
          job_type: jobType,
          post,
          experience,
          skills,
          from: formatDate(fromDate),
          to: formatDate(toDate),
          annual_compensation: annualCompensation ? Number(annualCompensation) : null,
          employees_count: employeesCount ? Number(employeesCount) : null,
        },
      };

      await updateJob(updateData, {
        onSuccess: (response) => {
          console.log("Update success:", response);
          showSuccessMessage();
        },
        onError: (error) => {
          console.error("Update error details:", error);
          showErrorMessage('Failed to update job details: ' + (error?.message || ''));
        },
      });
    } catch (error) {
      console.error("Error occurred:", error);
      showErrorMessage('There was an issue updating the job details: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const renderPicker = () => {
    if (Platform.OS === 'ios') {
      return (
        <TouchableOpacity
          style={styles.pickerButton}
          onPress={() => setShowJobTypePicker(true)}
        >
          <Text style={styles.pickerButtonText}>
            {jobType ? employmentTypes.find(type => type.value === jobType)?.label : 'Select Job Type'}
          </Text>
          <MaterialCommunityIcons name="chevron-down" size={24} color="#666" />
        </TouchableOpacity>
      );
    }

    return (
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={jobType}
          onValueChange={(value) => setJobType(value)}
          style={styles.picker}
        >
          <Picker.Item label="Select Job Type" value="" />
          {employmentTypes.map((item) => (
            <Picker.Item key={item.value} label={item.label} value={item.value} />
          ))}
        </Picker>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>Edit Job</Title>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Job Type</Text>
              {renderPicker()}
            </View>

            <TextInput
              label="Organization Type"
              mode="outlined"
              style={styles.input}
              value={orgType}
              onChangeText={setOrgType}
              placeholder="E.g. HARDWARE/SOFTWARE"
              left={<TextInput.Icon icon="domain" />}
            />

            <TextInput
              label="Organization Name *"
              mode="outlined"
              style={styles.input}
              value={organization}
              onChangeText={setOrganization}
              left={<TextInput.Icon icon="office-building" />}
            />

            <TextInput
              label="Post"
              mode="outlined"
              style={styles.input}
              value={post}
              onChangeText={setPost}
              left={<TextInput.Icon icon="briefcase" />}
            />

            <TextInput
              label="Experience (years)"
              mode="outlined"
              style={styles.input}
              value={experience.toString()}
              onChangeText={setExperience}
              keyboardType="numeric"
              left={<TextInput.Icon icon="clock-outline" />}
            />

            <TextInput
              label="Annual Compensation"
              mode="outlined"
              style={styles.input}
              value={annualCompensation}
              onChangeText={setAnnualCompensation}
              keyboardType="numeric"
              left={<TextInput.Icon icon="currency-usd" />}
              placeholder="Enter annual compensation"
            />

            <TextInput
              label="Number of Employees"
              mode="outlined"
              style={styles.input}
              value={employeesCount}
              onChangeText={setEmployeesCount}
              keyboardType="numeric"
              left={<TextInput.Icon icon="account-group" />}
              placeholder="Enter number of employees"
            />

            <TextInput
              label="Skills (comma-separated)"
              mode="outlined"
              style={styles.input}
              value={skills}
              onChangeText={setSkills}
              placeholder="React, JavaScript, TypeScript"
              left={<TextInput.Icon icon="lightbulb-on" />}
            />

            <View style={styles.formGroup}>
              <Text style={styles.label}>From Date</Text>
              <TouchableOpacity 
                style={styles.datePickerButton}
                onPress={() => setShowFromPicker(true)}
              >
                <Text style={styles.dateText}>
                  {fromDate.toLocaleDateString()}
                </Text>
                <MaterialCommunityIcons name="calendar" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>To Date</Text>
              <TouchableOpacity 
                style={styles.datePickerButton}
                onPress={() => setShowToPicker(true)}
              >
                <Text style={styles.dateText}>
                  {toDate.toLocaleDateString()}
                </Text>
                <MaterialCommunityIcons name="calendar" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.submitButton, isLoading && styles.buttonDisabled]}
              onPress={handleSubmit}
              disabled={isLoading}
            >
              <Text style={styles.submitButtonText}>
                {isLoading ? 'Updating...' : 'Update Job'}
              </Text>
              <MaterialCommunityIcons name="content-save" size={24} color="#fff" />
            </TouchableOpacity>
          </Card.Content>
        </Card>
      </ScrollView>

      <Modal
        visible={showJobTypePicker}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.pickerModalContent}>
            <Picker
              selectedValue={jobType}
              onValueChange={(value) => setJobType(value)}
              style={styles.modalPicker}
            >
              <Picker.Item label="Select Job Type" value="" />
              {employmentTypes.map((item) => (
                <Picker.Item key={item.value} label={item.label} value={item.value} />
              ))}
            </Picker>
            <Button onPress={() => setShowJobTypePicker(false)}>Done</Button>
          </View>
        </View>
      </Modal>

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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  container: {
    flex: 1,
  },
  card: {
    margin: 16,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1890ff',
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
    fontWeight: '600',
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
  },
  submitButton: {
    backgroundColor: '#1890ff',
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  datePickerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 12,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  pickerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 12,
    backgroundColor: '#fff',
  },
  pickerButtonText: {
    fontSize: 16,
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  pickerModalContent: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalPicker: {
    height: 200,
  },
});

export default EditJob;

