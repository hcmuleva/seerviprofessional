import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
} from 'react-native';
import { useUpdate } from "@refinedev/core";

const EditJob = ({route}) => {
   const{jobid} = route.params;
   const { mutate: updateJob } = useUpdate();
  const [post, setPost] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

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

  const handleSubmit = async () => {
    if (!post.trim()) {
      showErrorMessage('Please enter the post');
      return;
    }

    setIsLoading(true);

    try {
      console.log("Attempting to update job with ID 89:", { post });
      
      await updateJob(
        {
          resource: "jobs",
          id: jobid, // Hardcoded job ID
          values: {
            post: post,
          },
        },
        {
          onSuccess: (response) => {
            console.log("Update success:", response);
            showSuccessMessage();
            setPost(''); // Clear the input after successful update
          },
          onError: (error) => {
            console.error("Update error details:", error);
            showErrorMessage('Failed to update job details.');
          },
        }
      );
    } catch (error) {
      console.error("Error occurred:", error);
      showErrorMessage('There was an issue updating the job details.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Post</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter job post"
            value={post}
            onChangeText={setPost}
            multiline={true}
            numberOfLines={3}
          />
        </View>

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
});

export default EditJob;