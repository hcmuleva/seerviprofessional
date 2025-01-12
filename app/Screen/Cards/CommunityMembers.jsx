import React, { useState } from 'react';
import { Button, Image, View, Platform, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import axios from 'axios';
const API_URL = process.env.VITE_SERVER_URL;
const TOKEN_KEY = process.env.VITE_TOKEN_KEY
;
const api = axios.create({
  baseURL: 'https://eksamaj.com/bader_preprod',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'multipart/form-data',
  },
});

const CommunityMembers = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 1024,
      maxWidth: 1024,
      quality: 0.7,
    };

    launchImageLibrary(options, handleResponse);
  };

  const handleCameraLaunch = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 1024,
      maxWidth: 1024,
      quality: 0.7,
      saveToPhotos: true,
    };

    launchCamera(options, handleResponse);
  };

  const handleResponse = async (response) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorCode) {
      console.log('Image picker error: ', response.errorMessage);
      Alert.alert('Error', response.errorMessage);
    } else if (response.assets && response.assets.length > 0) {
      try {
        const imageAsset = response.assets[0];
        setSelectedImage(imageAsset.uri);
        await uploadImageToStrapi(imageAsset);
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    }
  };

  const uploadImageToStrapi = async (imageAsset) => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const formData = new FormData();
    
    // Create file object
    formData.append('files', {
      uri: Platform.OS === 'ios' ? imageAsset.uri.replace('file://', '') : imageAsset.uri,
      type: imageAsset.type || 'image/jpeg',
      name: imageAsset.fileName || `photo_${Date.now()}.jpg`,
    });

    try {
      console.log('Uploading to:', `${api.defaults.baseURL}/api/upload`);
      console.log('FormData:', formData);

      const response = await api({
        method: 'POST',
        url: '/api/upload',
        data: formData,
        headers: {
          'Authorization': `Bearer ${TOKEN_KEY}`,  // Use the environment token
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(progress);
        },
      });

      if (response.data) {
        console.log('Upload successful:', response.data);
        Alert.alert('Success', 'Image uploaded successfully');
        const uploadedFileUrl = response.data[0]?.url;
        console.log('Uploaded file URL:', uploadedFileUrl);
      }
    } catch (error) {
      console.log('Full error:', error);
      console.log('Response data:', error.response?.data);
      console.log('Response status:', error.response?.status);

      let errorMessage = 'Failed to upload image';

      if (error.response) {
        switch (error.response.status) {
          case 401:
            errorMessage = 'Authentication failed. Please check your API token.';
            break;
          case 403:
            errorMessage = 'Permission denied. Please check your API token permissions.';
            break;
          case 405:
            errorMessage = 'Upload endpoint not configured correctly. Please check API configuration.';
            break;
          case 413:
            errorMessage = 'Image file is too large. Please try a smaller image.';
            break;
          default:
            errorMessage = error.response.data?.error?.message || 'Upload failed';
        }
      }

      Alert.alert('Error', errorMessage);
      console.error('Upload error details:', errorMessage);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <View style={styles.container}>
      {selectedImage && (
        <Image
          source={{ uri: selectedImage }}
          style={styles.image}
          resizeMode="contain"
        />
      )}
      <View style={styles.buttonContainer}>
        <Button
          title={isUploading ? `Uploading... ${uploadProgress}%` : "Choose from Device"}
          onPress={openImagePicker}
          disabled={isUploading}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title={isUploading ? `Uploading... ${uploadProgress}%` : "Open Camera"}
          onPress={handleCameraLaunch}
          disabled={isUploading}
        />
      </View>
      {isUploading && (
        <View style={styles.progressContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <View style={[styles.progressBar, { width: `${uploadProgress}%` }]} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
    backgroundColor: '#f0f0f0',
  },
  buttonContainer: {
    marginVertical: 10,
    width: '80%',
  },
  progressContainer: {
    marginTop: 20,
    width: '80%',
    height: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#0066ff',
    position: 'absolute',
  },
});

export default CommunityMembers;
