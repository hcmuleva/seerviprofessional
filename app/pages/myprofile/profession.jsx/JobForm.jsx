import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Picker } from '@react-native-picker/picker';
import { TextInput } from 'react-native-paper';
import { useCreate } from '@refinedev/core';

// Job Types and Employment Types
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

// AddJob Component
const AddJob = ({ userId, job, setIsModalVisible }) => {
  const { control, handleSubmit, setValue } = useForm();
  const { mutate: createAddress } = useCreate();
  const { mutate: createJobs } = useCreate();

  // Handle form submission
  const onSubmit = (values) => {
    values['user'] = userId;
    values['addresstype'] = 'JOB';
    console.log("Submitting values:", values);
    
    // Save job and address
    createAddress(
      {
        resource: 'addresses',
        values: {
          addresstype: values.addresstype,
          district: values.district,
          housename: values.housename,
          landmark: values.landmark,
          lat: values.lat,
          lng: values.lng,
          pincode: values.pincode,
          state: values.state,
          tehsil: values.tehsil,
          village: values.village,
        },
      },
      {
        onSuccess: (data) => {
          const payload = {
            address: data.data.data.id,
            user: userId,
            type: values.type,
            organization: values.organization,
            job_type: values.jobtype,
            post: values.post,
            experience: values.experience,
            skills: values.skills,
            from: values.from,
            to: values.to,
          };

          // Create Job after saving address
          createJobs(
            {
              resource: 'jobs',
              values: payload,
            },
            {
              onError: (error) => {
                console.error("Error saving job:", error);
              },
              onSuccess: () => {
                setIsModalVisible(false);
              },
            }
          );
        },
      }
    );
  };

  // Initialize form values if job exists
  useEffect(() => {
    if (job) {
      setValue('type', job.type);
      setValue('orgtype', job.orgtype);
      setValue('organization', job.organization);
      setValue('jobtype', job.jobtype);
      setValue('post', job.post);
      setValue('experience', job.experience);
      setValue('skills', job.skills);
      setValue('from', job.from);
      setValue('to', job.to);
    }
  }, [job, setValue]);

  return (
    <ScrollView style={styles.container}>
      <Controller
        control={control}
        name="type"
        rules={{ required: true }}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <View style={styles.formGroup}>
            <Text style={styles.label}>Type *</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={value}
                onValueChange={onChange}
                style={styles.picker}
              >
                <Picker.Item label="Select Type" value="" />
                {jobTypes.map((type) => (
                  <Picker.Item key={type.value} label={type.label} value={type.value} />
                ))}
              </Picker>
            </View>
          </View>
        )}
      />

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
          />
        )}
      />

      <Controller
        control={control}
        name="jobtype"
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <View style={styles.formGroup}>
            <Text style={styles.label}>Job Type</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={value}
                onValueChange={onChange}
                style={styles.picker}
              >
                <Picker.Item label="Select Job Type" value="" />
                {employmentTypes.map((type) => (
                  <Picker.Item key={type.value} label={type.label} value={type.value} />
                ))}
              </Picker>
            </View>
          </View>
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
          />
        )}
      />

      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={styles.submitButtonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Styles for the form
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
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
  },
  picker: {
    height: 50,
  },
  submitButton: {
    backgroundColor: '#1890ff',
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 32,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddJob;
