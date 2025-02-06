import React, { useState, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  Alert,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = process.env.VITE_SERVER_URL;

const MAX_IMAGE_SIZE = 1024; // Maximum dimension for the image

const ImageUpload = ({ onImageUploaded, userId }) => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [token, setToken] = useState(null);
  
  useEffect(() => {
    const initialize = async () => {
      try {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Sorry, we need camera permissions to make this work!');
        }

        const storedToken = await AsyncStorage.getItem('jwt-token');
        console.log('Token retrieved:', storedToken); // Debug log
        setToken(storedToken);
      } catch (error) {
        console.error('Error during initialization:', error);
        Alert.alert('Error', 'Failed to initialize camera permissions');
      }
    };

    initialize();
  }, []);

  // ... (previous useEffect remains the same)

  const compressImage = async (uri) => {
    try {
      const manipulatedImage = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: MAX_IMAGE_SIZE, height: MAX_IMAGE_SIZE } }],
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
      );
      return manipulatedImage.uri;
    } catch (error) {
      console.error('Error compressing image:', error);
      return uri; // Return original URI if compression fails
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        const compressedUri = await compressImage(result.assets[0].uri);
        setImage(compressedUri);
        setUploadedImageUrl(null);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image from gallery');
    }
  };

  const takePhoto = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        const compressedUri = await compressImage(result.assets[0].uri);
        setImage(compressedUri);
        setUploadedImageUrl(null);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to take photo');
    }
  };

  const uploadImage = async () => {
    if (!image) {
      Alert.alert('Please select an image first');
      return;
    }

    if (!token) {
      Alert.alert('Authentication Error', 'No token found. Please login again.');
      return;
    }

    setUploading(true);

    try {
      const fileName = image.split('/').pop();
      const fileType = fileName.split('.').pop();

      const formData = new FormData();
      formData.append('files', {
        uri: Platform.OS === 'android' ? image : image.replace('file://', ''),
        name: fileName,
        type: `image/${fileType}`,
      });

      const uploadResponse = await fetch(`${API_URL}/api/upload`, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text();
        throw new Error(`Upload failed: ${uploadResponse.status} ${errorText}`);
      }

      const uploadData = await uploadResponse.json();
      const imageId = uploadData[0].id;
      const imageUrl = uploadData[0].url;

      const updateResponse = await fetch(`${API_URL}/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          photo: imageId,
        }),
      });

      if (!updateResponse.ok) {
        const errorText = await updateResponse.text();
        throw new Error(`Profile update failed: ${updateResponse.status} ${errorText}`);
      }

      setUploadedImageUrl(imageUrl);
      onImageUploaded(imageUrl, imageId);
      Alert.alert('Success', 'Image uploaded successfully');
    } catch (error) {
      console.error('Upload error details:', error);
      
      if (error.message.includes('Network request failed')) {
        Alert.alert(
          'Connection Error',
          'Cannot connect to the server. Please check your internet connection.'
        );
      } else if (error.message.includes('413')) {
        Alert.alert(
          'File Too Large',
          'The image is still too large. Please try with a smaller image.'
        );
      } else {
        Alert.alert('Error', error.message || 'Failed to upload image');
      }
    } finally {
      setUploading(false);
    }
  }

  // Rest of the component remains the same
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <MaterialIcons name="person" size={50} color="#ccc" />
          </View>
        )}
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
          <MaterialIcons name="photo-library" size={24} color="white" />
          <Text style={styles.buttonText}>Gallery</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.imageButton} onPress={takePhoto}>
          <MaterialIcons name="camera-alt" size={24} color="white" />
          <Text style={styles.buttonText}>Camera</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={[styles.uploadButton, (!image || uploading) && styles.disabledButton]}
        onPress={uploadImage}
        disabled={!image || uploading}
      >
        {uploading ? (
          <ActivityIndicator color="white" />
        ) : (
          <>
            <MaterialIcons name="cloud-upload" size={24} color="white" />
            <Text style={styles.buttonText}>Upload Image</Text>
          </>
        )}
      </TouchableOpacity>

      {uploadedImageUrl && (
        <Text style={styles.successText}>✓ Image uploaded successfully</Text>
      )}
    </View>
  );
};

// Styles remain the same
const styles = StyleSheet.create({
  // ... (previous styles remain unchanged)
});

export default ImageUpload;