import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const ProfileImageDisplay = ({ imageUrl, size = 150, onPress, loading = false }) => {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <TouchableOpacity
        onPress={onPress}
        disabled={loading}
        style={[styles.imageContainer, { borderRadius: size / 2 }]}
      >
        {loading ? (
          <ActivityIndicator size="large" color="#1890ff" />
        ) : imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholderContainer}>
            <MaterialIcons name="person" size={size / 3} color="#ccc" />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    marginVertical: 10,
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f5f5f5',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e8e8e8',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileImageDisplay;