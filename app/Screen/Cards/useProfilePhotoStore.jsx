import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

const API_URL = process.env.VITE_SERVER_URL;
const TOKEN_KEY = process.env.VITE_TOKEN_KEY;

const useProfilePhotoStore = create((set, get) => ({
  // State
  profileImageUrl: null,
  isUploading: false,
  error: null,

  // Actions
  setProfileImageUrl: (url) => set({ profileImageUrl: url }),
  setIsUploading: (status) => set({ isUploading: status }),
  setError: (error) => set({ error }),

  // Fetch profile image
  fetchProfileImage: async () => {
    try {
      const userId = await AsyncStorage.getItem('userid');
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      
      if (!userId || !token) {
        get().setError('User not authenticated');
        return;
      }

      const response = await fetch(
        `${API_URL}/api/usermeelans/${userId}?populate=*`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const photoUrl = data?.data?.attributes?.photos?.[0]?.url;
        get().setProfileImageUrl(photoUrl);
      } else {
        throw new Error('Failed to fetch profile image');
      }
    } catch (error) {
      get().setError(error.message);
      console.error('Error fetching profile image:', error);
    }
  },

  // Request permissions
  requestPermissions: async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      get().setError('Permission to access media library was denied');
      return false;
    }
    return true;
  },

  // Pick image
  pickImage: async () => {
    const hasPermission = await get().requestPermissions();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets[0]) {
        await get().uploadPhoto(result.assets[0]);
      }
    } catch (error) {
      get().setError('Failed to pick image');
      console.error('Error picking image:', error);
    }
  },

  // Upload photo
  uploadPhoto: async (photoAsset) => {
    get().setIsUploading(true);
    get().setError(null);

    try {
      const userId = await AsyncStorage.getItem('userid');
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      
      if (!userId || !token) {
        throw new Error('Please login first');
      }

      const formData = new FormData();
      formData.append('ref', 'api::usermeelan.usermeelan');
      formData.append('refId', userId);
      formData.append('field', 'photos');

      const fileExtension = photoAsset.uri.split('.').pop();
      formData.append('files', {
        uri: photoAsset.uri,
        type: `image/${fileExtension}`,
        name: `profile-photo.${fileExtension}`,
      });

      const response = await fetch(`${API_URL}/api/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      // First, get the raw response text
      const responseText = await response.text();
      
      // Try to parse it as JSON
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        // If parsing fails, log the response for debugging
        console.error('Server response:', responseText);
        throw new Error(
          'Server returned an invalid response. ' +
          'If this persists, please contact support.'
        );
      }

      if (response.ok && data) {
        if (data[0]?.url) {
          get().setProfileImageUrl(data[0].url);
          await get().fetchProfileImage();
        } else {
          throw new Error('Invalid response format from server');
        }
      } else {
        // Handle various error cases
        const errorMessage = data?.error?.message || 
                           data?.message || 
                           'Upload failed';
        throw new Error(errorMessage);
      }
    } catch (error) {
      get().setError(error.message);
      console.error('Upload error details:', error);
    } finally {
      get().setIsUploading(false);
    }
  },

  // Clear error
  clearError: () => set({ error: null }),

  // Reset store
  reset: () => set({
    profileImageUrl: null,
    isUploading: false,
    error: null,
  }),
}));

export default useProfilePhotoStore;