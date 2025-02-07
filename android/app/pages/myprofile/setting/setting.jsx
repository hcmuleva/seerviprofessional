import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = ({ navigation }) => {
  const SettingItem = ({ title, onPress, isHeader, isLast }) => (
    <TouchableOpacity
      style={[
        styles.settingItem,
        isHeader && styles.headerItem,
        isLast && styles.lastItem,
      ]}
      onPress={onPress}
      disabled={isHeader}
    >
      <Text style={[styles.settingText, isHeader && styles.headerText]}>{title}</Text>
    </TouchableOpacity>
  );

  const handleLogout = async () => {
    try {
        await AsyncStorage.clear()  // Optionally, remove the user ID as well
        navigation.navigate('login');  // Navigate to the login screen
      } catch (error) {
        console.error("Error during logout", error);  // Handle potential errors
      }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <SettingItem title="Licenses" onPress={() => {}} />
        <SettingItem title="Download My Data" onPress={() => {}} />
        
        <View style={styles.separator} />
        
        <SettingItem title="Community" isHeader />
        <SettingItem title="Safe Dating Tips" onPress={() => {}} />
        <SettingItem title="Member Principles" onPress={() => {}} />
        
        <View style={styles.separator} />
        
        <SettingItem title="Log Out" onPress={handleLogout} />
        <SettingItem title="Delete or Pause Account" onPress={() => {}} isLast />
        
        <Text style={styles.versionText}>9.64.0 (168200440)</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#000000',
  },
  scrollView: {
    flex: 1,
  },
  settingItem: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  headerItem: {
    paddingVertical: 8,
    backgroundColor: '#F8F8F8',
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  settingText: {
    fontSize: 16,
    color: '#000000',
  },
  headerText: {
    fontSize: 14,
    color: '#888888',
    textTransform: 'uppercase',
  },
  separator: {
    height: 32,
  },
  versionText: {
    fontSize: 14,
    color: '#888888',
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
});

export default SettingsScreen;