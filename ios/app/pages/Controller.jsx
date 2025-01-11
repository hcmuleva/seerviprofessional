import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, Alert } from 'react-native';
import { Appbar, Menu, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
// import UserDashboard from './UserDashboard'; // assuming this is a separate component

// Constants
const TOKEN_KEY = 'your-token-key'; // You can replace this with your actual key

export default function Controller() {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState('mail');

  // Retrieve data from localStorage (use AsyncStorage for React Native)
  const userState = 'your-userstatus'; // Example value, replace with your logic
  const userRole = 'your-role'; // Example value, replace with your logic
  const token = 'your-token'; // Example value, replace with your logic
  const userid = 'your-userid'; // Example value, replace with your logic

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const onItemSelect = (key) => {
    console.log('Item clicked:', key);
    setCurrent(key);
    closeMenu();
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Header Bar */}
      <Appbar.Header>
        <Appbar.Content title="Controller" />
        <Appbar.Action icon="dots-vertical" onPress={openMenu} />
      </Appbar.Header>

      {/* Menu */}
      <Menu visible={visible} onDismiss={closeMenu} anchor={<TouchableOpacity />}>
        <Menu.Item onPress={() => onItemSelect('mail')} title="Information" />
        <Menu.Item onPress={() => onItemSelect('app')} title="Professions" disabled />
        <Divider />
        <Menu.Item onPress={() => Alert.alert('Option 1 selected')} title="Option 1" />
        <Menu.Item onPress={() => Alert.alert('Option 2 selected')} title="Option 2" />
      </Menu>

      {/* Dashboard */}
      {/* <UserDashboard /> */}

      {/* Additional Buttons or Content */}
      <Button title="Go to Another Page" onPress={() => navigation.navigate('AnotherPage')} />
    </View>
  );
}
