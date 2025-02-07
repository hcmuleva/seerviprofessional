import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Alert } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingSection = ({ title, children }) => (
  <View style={styles.section}>
    {title && (
      <Text style={styles.sectionHeader}>{title}</Text>
    )}
    <View style={styles.sectionContent}>
      {children}
    </View>
  </View>
);

const SettingItem = ({ 
  title, 
  onPress, 
  destructive = false,
  showChevron = true 
}) => (
  <TouchableOpacity
    style={styles.settingItem}
    onPress={onPress}
  >
    <Text style={[
      styles.settingText,
      destructive && styles.destructiveText
    ]}>
      {title}
    </Text>
    {showChevron && (
      <ChevronLeft 
        size={20} 
        color="#CCCCCC" 
        style={styles.chevron} 
      />
    )}
  </TouchableOpacity>
);

const SettingsScreen = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      Alert.alert(
        "Confirm Logout",
        "Are you sure you want to log out?",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          {
            text: "Log Out",
            style: "destructive",
            onPress: async () => {
              await AsyncStorage.clear();
              navigation.reset({
                index: 0,
                routes: [{ name: 'login' }],
              });
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert(
        "Error",
        "Failed to log out. Please try again."
      );
      console.error("Logout error:", error);
    }
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            // Implement account deletion logic
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <ChevronLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView style={styles.scrollView} bounces={false}>
        <SettingSection>
          <SettingItem 
            title="Licenses" 
            onPress={() => navigation.navigate('Licenses')} 
          />
          <SettingItem 
            title="Download My Data" 
            onPress={() => navigation.navigate('DataDownload')} 
          />
        </SettingSection>

        <SettingSection title="COMMUNITY">
          <SettingItem 
            title="Safe Dating Tips" 
            onPress={() => navigation.navigate('SafetyTips')} 
          />
          <SettingItem 
            title="Member Principles" 
            onPress={() => navigation.navigate('Principles')} 
          />
        </SettingSection>

        <SettingSection>
          <SettingItem 
            title="Log Out" 
            onPress={handleLogout}
            destructive
            showChevron={false}
          />
          <SettingItem 
            title="Delete Account" 
            onPress={handleDeleteAccount}
            destructive
            showChevron={false}
          />
        </SettingSection>

        <Text style={styles.versionText}>Version 9.64.0 (168200440)</Text>
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
    borderBottomWidth: StyleSheet.hairlineWidth,
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
  section: {
    marginTop: 24,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: '500',
    color: '#888888',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  sectionContent: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#E5E5E5',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E5E5',
  },
  settingText: {
    fontSize: 16,
    color: '#000000',
  },
  destructiveText: {
    color: '#FF3B30',
  },
  chevron: {
    transform: [{ rotate: '180deg' }],
  },
  versionText: {
    fontSize: 13,
    color: '#888888',
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 32,
  },
});

export default SettingsScreen;