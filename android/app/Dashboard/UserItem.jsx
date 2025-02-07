import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const UserItem = ({ user, onPress }) => (
  <TouchableOpacity style={styles.userItem} onPress={onPress} currentId={user.id}>
    <Image
      source={user.profilePicture?.url ? { uri: user.profilePicture.url } : require('../images/logo.png')}
      style={styles.avatar}
    />
    <View style={styles.userInfo}>
      <Text style={styles.userName}>{user.FirstName}</Text>
      <Text style={styles.userDetail}>Father: {user.FatherName}</Text>
      <View style={styles.additionalInfo}>
        <Text style={styles.infoText}>Vyaapar: {user.VyaaparType || 'N/A'}</Text>
        <Text style={styles.infoText}>City: {user.WorkingCity}</Text>
      </View>
    </View>
    <TouchableOpacity style={styles.arrowButton} onPress={onPress}>
      <Icon name="arrow-forward-ios" size={24} color="#3498db" />
    </TouchableOpacity>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    elevation: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  userDetail: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 4,
  },
  additionalInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  infoText: {
    fontSize: 12,
    color: '#95a5a6',
  },
  arrowButton: {
    padding: 8,
  },
});

export default UserItem;

