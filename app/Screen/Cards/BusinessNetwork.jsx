import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BusinessNetwork = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Business Screen</Text>
      <Text>(Coming Soon)</Text>
      {/* Add your donation form or content here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default BusinessNetwork;
