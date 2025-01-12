import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Picker } from '@react-native-picker/picker';
import { TextInput, Card, Title, Button } from 'react-native-paper';
import { useCreate } from '@refinedev/core';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import AddressComponent from '../../../components/address/AddressComponent';

// Job Types and Employment Types (unchanged)
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

const AddJob = ({ route }) => {
  const { control, handleSubmit, setValue } = useForm();
  const { mutate: createAddress } = useCreate();
  const { mutate: createJobs } = useCreate();
  const { userid, job} = route.params;

  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [showFromDate, setShowFromDate] = useState(false);
  const [showToDate, setShowToDate] = useState(false);

  const onFromDateChange = (event, selectedDate) => {
    setShowFromDate(false);
    if (selectedDate) {
      setFromDate(selectedDate);
      setValue('from', selectedDate.toISOString().split('T')[0]);
    }
  };

  const onToDateChange = (event, selectedDate) => {
    setShowToDate(false);
    if (selectedDate) {
      setToDate(selectedDate);
      setValue('to', selectedDate.toISOString().split('T')[0]);
    }
  };

  const onSubmit = (values) => {
    const payload = {
      user: userid,
      orgtype: values.orgtype,
      organization: values.organization,
      job_type: values.job_type,
      post: values.post,
      experience: values.experience,
      skills: values.skills,
      from: values.from,
      to: values.to,
      annual_compensation: values.annual_compensation ? Number(values.annual_compensation) : null,
      employees_count: values.employees_count ? Number(values.employees_count) : null,
    };

    createJobs(
      {
        resource: 'jobs',
        values: payload,
      },
      {
        onSuccess: (response) => {
          console.log("Job created successfully:", response);
        },
        onError: (error) => {
          console.error("Error creating job:", error);
        },
      }
    );
  };

 useEffect(() => {
    if (job) {
      setValue('orgtype', job.orgtype);
      setValue('organization', job.organization);
      setValue('job_type', job.job_type);
      setValue('post', job.post);
      setValue('experience', job.experience);
      setValue('skills', job.skills);
      setValue('annual_compensation', job.annual_compensation?.toString());
      setValue('employees_count', job.employees_count?.toString());
      
      if (job.from) {
        setFromDate(new Date(job.from));
        setValue('from', job.from);
      }
      if (job.to) {
        setToDate(new Date(job.to));
        setValue('to', job.to);
      }
    }
  }, [job, setValue]);

  return (
    <SafeAreaView style={styles.safeArea}>
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Add Job</Title>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Job Type</Text>
            <Controller
              control={control}
              name="job_type"
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={value}
                    onValueChange={onChange}
                    style={styles.picker}
                  >
                    <Picker.Item label="Select Job Type" value="" />
                    {employmentTypes.map((item) => (
                      <Picker.Item key={item.value} label={item.label} value={item.value} />
                    ))}
                  </Picker>
                </View>
              )}
            />
          </View>

          <Controller
            control={control}
            name="orgtype"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Organization Type"
                mode="outlined"
                style={styles.input}
                value={value}
                onChangeText={onChange}
                placeholder="E.g. HARDWARE/SOFTWARE"
                left={<TextInput.Icon icon="domain" />}
              />
            )}
          />

          <Controller
            control={control}
            name="organization"
            rules={{ required: true }}
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Organization Name *"
                mode="outlined"
                style={styles.input}
                value={value}
                onChangeText={onChange}
                left={<TextInput.Icon icon="office-building" />}
              />
            )}
          />

          <Controller
            control={control}
            name="post"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Post"
                mode="outlined"
                style={styles.input}
                value={value}
                onChangeText={onChange}
                left={<TextInput.Icon icon="briefcase" />}
              />
            )}
          />

          <Controller
            control={control}
            name="experience"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Experience (years)"
                mode="outlined"
                style={styles.input}
                value={value}
                onChangeText={onChange}
                keyboardType="numeric"
                left={<TextInput.Icon icon="clock-outline" />}
              />
            )}
          />

          <Controller
            control={control}
            name="annual_compensation"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Annual Compensation"
                mode="outlined"
                style={styles.input}
                value={value}
                onChangeText={onChange}
                keyboardType="numeric"
                left={<TextInput.Icon icon="currency-usd" />}
                placeholder="Enter annual compensation"
              />
            )}
          />

          <Controller
            control={control}
            name="employees_count"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Number of Employees"
                mode="outlined"
                style={styles.input}
                value={value}
                onChangeText={onChange}
                keyboardType="numeric"
                left={<TextInput.Icon icon="account-group" />}
                placeholder="Enter number of employees"
              />
            )}
          />

          <Controller
            control={control}
            name="skills"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Skills (comma-separated)"
                mode="outlined"
                style={styles.input}
                value={value}
                onChangeText={onChange}
                placeholder="React, JavaScript, TypeScript"
                left={<TextInput.Icon icon="lightbulb-on" />}
              />
            )}
          />

          <View style={styles.formGroup}>
            <Text style={styles.label}>From Date</Text>
            <TouchableOpacity 
              style={styles.datePickerButton}
              onPress={() => setShowFromDate(true)}
            >
              <Text style={styles.dateText}>
                {fromDate.toLocaleDateString()}
              </Text>
              <MaterialCommunityIcons name="calendar" size={24} color="#666" />
            </TouchableOpacity>
            {showFromDate && (
              <DateTimePicker
                value={fromDate}
                mode="date"
                display="default"
                onChange={onFromDateChange}
              />
            )}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>To Date</Text>
            <TouchableOpacity 
              style={styles.datePickerButton}
              onPress={() => setShowToDate(true)}
            >
              <Text style={styles.dateText}>
                {toDate.toLocaleDateString()}
              </Text>
              <MaterialCommunityIcons name="calendar" size={24} color="#666" />
            </TouchableOpacity>
            {showToDate && (
              <DateTimePicker
                value={toDate}
                mode="date"
                display="default"
                onChange={onToDateChange}
              />
            )}
          </View>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.submitButtonText}>Save Job</Text>
            <MaterialCommunityIcons name="content-save" size={24} color="#fff" />
          </TouchableOpacity>
        </Card.Content>
      </Card>
    </ScrollView>
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
});

export default AddJob;