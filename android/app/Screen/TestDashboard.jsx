import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const TestDashboard = () => {
  const navigation = useNavigation();

  
  const handleLogout = async () => {
    try {
      await AsyncStorage.clear(); // Clear all stored data
      setTimeout(() => {
        navigation.navigate('login'); // Navigate to the login screen
      }, 100); // Delay for 100ms
    } catch (error) {
      console.error("Error during logout", error); // Handle potential errors
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#4a90e2', '#357abd']} style={styles.header}>
        <Text style={styles.headerTitle}>Home Screen</Text>
        <Button title="Log Out" onPress={handleLogout} />
      </LinearGradient>

      <ScrollView style={styles.content}>
        {/* Your content here */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    elevation: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
  },
});

export default TestDashboard;
