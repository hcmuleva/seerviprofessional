import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

const Checkbox = ({ checked, onCheckedChange }) => {
  return (
    <TouchableOpacity onPress={onCheckedChange} style={styles.container}>
      <View style={[styles.checkbox, checked && styles.checked]}>
        {checked && <View style={styles.innerCheckbox} />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 4,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: '#2196F3',
  },
  innerCheckbox: {
    width: 14,
    height: 14,
    backgroundColor: '#fff',
    borderRadius: 2,
  },
  label: {
    fontSize: 14,
    color: '#212121',
  },
});

export { Checkbox };
