import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const renderInfoItem = (icon, label, value) => (
  <View style={styles.infoItem}>
    <Icon name={icon} size={24} color="#4A90E2" style={styles.infoIcon} />
    <View>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  </View>
);

export const OverviewTab = ({ user }) => (
  <ScrollView style={styles.tabContent}>
    <Text style={styles.sectionTitle}>Quick Overview</Text>
    {renderInfoItem('work', 'Job Title', user.jobInfo.title)}
    {renderInfoItem('business', 'Company', user.jobInfo.company)}
    {renderInfoItem('email', 'Email', user.personalInfo.email)}
    {renderInfoItem('phone', 'Phone', user.personalInfo.phone)}
  </ScrollView>
);

export const PersonalTab = ({ user }) => (
  <ScrollView style={styles.tabContent}>
    <Text style={styles.sectionTitle}>Personal Information</Text>
    {renderInfoItem('cake', 'Date of Birth', user.personalInfo.dateOfBirth)}
    {renderInfoItem('flag', 'Nationality', user.personalInfo.nationality)}
    {renderInfoItem('person', 'Gender', user.personalInfo.gender)}
  </ScrollView>
);

export const JobTab = ({ user }) => (
  <ScrollView style={styles.tabContent}>
    <Text style={styles.sectionTitle}>Job Information</Text>
    {renderInfoItem('work', 'Job Title', user.jobInfo.title)}
    {renderInfoItem('business', 'Company', user.jobInfo.company)}
    {renderInfoItem('timeline', 'Experience', user.jobInfo.experience)}
    <Text style={styles.subSectionTitle}>Skills</Text>
    {user.jobInfo.skills.map((skill, index) => (
      <Text key={index} style={styles.skillItem}>• {skill}</Text>
    ))}
  </ScrollView>
);

export const ContactTab = ({ user }) => (
  <ScrollView style={styles.tabContent}>
    <Text style={styles.sectionTitle}>Contact Information</Text>
    {renderInfoItem('email', 'Email', user.contactInfo.email)}
    {renderInfoItem('phone', 'Phone', user.contactInfo.phone)}
    {renderInfoItem('linkedin', 'LinkedIn', user.contactInfo.linkedin)}
    {renderInfoItem('code', 'GitHub', user.contactInfo.github)}
  </ScrollView>
);

export const FamilyTab = ({ user }) => (
  <ScrollView style={styles.tabContent}>
    <Text style={styles.sectionTitle}>Family Information</Text>
    {renderInfoItem('favorite', 'Marital Status', user.familyInfo.maritalStatus)}
    {renderInfoItem('person', 'Spouse', user.familyInfo.spouse)}
    {renderInfoItem('child-care', 'Children', user.familyInfo.children.toString())}
  </ScrollView>
);

export const EducationTab = ({ user }) => (
  <ScrollView style={styles.tabContent}>
    <Text style={styles.sectionTitle}>Education</Text>
    {user.education.map((edu, index) => (
      <View key={index} style={styles.educationItem}>
        <Text style={styles.degree}>{edu.degree}</Text>
        <Text style={styles.institution}>{edu.institution}</Text>
        <Text style={styles.year}>{edu.year}</Text>
      </View>
    ))}
  </ScrollView>
);

export const AddressTab = ({ user }) => (
  <ScrollView style={styles.tabContent}>
    <Text style={styles.sectionTitle}>Address Information</Text>
    {renderInfoItem('home', 'Street', user.address.street)}
    {renderInfoItem('location-city', 'City', user.address.city)}
    {renderInfoItem('map', 'State', user.address.state)}
    {renderInfoItem('pin-drop', 'Zip Code', user.address.zipCode)}
    {renderInfoItem('public', 'Country', user.address.country)}
  </ScrollView>
);

const styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontFamily: 'Roboto_700Bold',
    fontSize: 20,
    color: '#333333',
    marginBottom: 15,
  },
  subSectionTitle: {
    fontFamily: 'Roboto_500Medium',
    fontSize: 18,
    color: '#333333',
    marginTop: 10,
    marginBottom: 5,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoIcon: {
    marginRight: 10,
  },
  infoLabel: {
    fontFamily: 'Roboto_500Medium',
    fontSize: 14,
    color: '#666666',
  },
  infoValue: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    color: '#333333',
  },
  educationItem: {
    marginBottom: 15,
  },
  degree: {
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
    color: '#333333',
  },
  institution: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 14,
    color: '#666666',
  },
  year: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 14,
    color: '#666666',
  },
  skillItem: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 14,
    color: '#333333',
    marginLeft: 10,
    marginBottom: 5,
  },
});

