import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const FeatureCard = ({ icon, title, color }) => {
  return (
    <TouchableOpacity style={styles.card}>
      <Feather name={icon} size={24} color={color} />
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.actionText}>GET MORE</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1A1A1A',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    width: '30%',
  },
  featureTitle: { color: '#fff', marginTop: 8 },
  actionText: { color: '#00A0FF', marginTop: 4, fontSize: 12 },
});

export default FeatureCard;
