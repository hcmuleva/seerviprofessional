import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = process.env.VITE_SERVER_URL;
const TOKEN_KEY = process.env.VITE_TOKEN_KEY;

const CommunityMembers = () => {
  const [photo, setPhoto] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState(null);

  useEffect(() => {
    fetchProfileImage();
  }, []);

  const fetchProfileImage = async () => {
    try {
      const userId = await AsyncStorage.getItem('userid');
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      
      if (!userId || !token) return;

      const response = await fetch(`${API_URL}/api/users/${userId}?populate=photo`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Log the response to see the structure
        console.log('User data:', data);
        
        // Check different possible paths for the image URL
        const imageUrl = data?.photo?.url || 
                        data?.photo?.data?.attributes?.url ||
                        data?.photo?.formats?.thumbnail?.url ||
                        null;

        if (imageUrl) {
          // If the URL is relative, make it absolute
          const fullImageUrl = imageUrl.startsWith('http') 
            ? imageUrl 
            : `${API_URL}${imageUrl}`;
          
          console.log('Profile image URL:', fullImageUrl);
          setProfileImageUrl(fullImageUrl);
        }
      }
    } catch (error) {
      console.error('Error fetching profile image:', error);
    }
  };

  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Please grant camera roll permissions to upload photos.'
      );
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets[0]) {
        setPhoto(result.assets[0]);
        uploadPhoto(result.assets[0]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
      console.error(error);
    }
  };

  const uploadPhoto = async (photoAsset) => {
    setUploading(true);

    try {
      const userId = await AsyncStorage.getItem('userid');
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      
      if (!userId || !token) {
        Alert.alert('Error', 'Please login first');
        return;
      }

      // First, upload the file
      const formData = new FormData();
      const fileExtension = photoAsset.uri.split('.').pop();
      formData.append('files', {
        uri: photoAsset.uri,
        type: `image/${fileExtension}`,
        name: `profile-photo.${fileExtension}`,
      });

      const uploadResponse = await fetch(`${API_URL}/api/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload image');
      }

      const uploadedFiles = await uploadResponse.json();
      console.log('Upload response:', uploadedFiles); // Log upload response
      const photoId = uploadedFiles[0].id;

      // Then update the user's photo field
      const updateResponse = await fetch(`${API_URL}/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          photo: photoId
        }),
      });

      if (!updateResponse.ok) {
        throw new Error('Failed to update user profile');
      }

      Alert.alert('Success', 'Profile photo updated successfully');
      await fetchProfileImage(); // Refresh profile image
      
    } catch (error) {
      console.error('Upload error:', error);
      Alert.alert('Error', error.message || 'Failed to upload photo');
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.profileSection}>
      <View style={styles.profileImageContainer}>
        <Image
          style={styles.profileImage}
          source={
            profileImageUrl 
              ? { uri: profileImageUrl } 
              : require('../../images/logo.png')
          }
        />
        <TouchableOpacity
          style={styles.editButton}
          onPress={pickImage}
          disabled={uploading}
        >
          <Text style={styles.editButtonText}>
            {uploading ? 'Uploading...' : 'Edit'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileSection: {
    alignItems: 'center',
    padding: 20,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f0f0f0',
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default CommunityMembers;