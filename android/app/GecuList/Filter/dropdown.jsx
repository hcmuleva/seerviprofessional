// components/Dropdown.js
import React, { memo } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";

const Dropdown = ({ options, onSelect, visible, setVisible }) => {
  if (!visible) return null;
  return (
    <View style={styles.dropdownContainer}>
      <ScrollView 
        style={styles.dropdownScrollView}
        nestedScrollEnabled
        keyboardShouldPersistTaps="handled"
      >
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.dropdownItem}
            onPress={() => {
              onSelect(option);
              setVisible(false);
            }}
          >
            <Text style={styles.dropdownItemText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default memo(Dropdown);

const styles = StyleSheet.create({
  dropdownContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#eee",
    maxHeight: 200,
    elevation: 5,
  },
  dropdownScrollView: {
    maxHeight: 200,
  },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  dropdownItemText: {
    fontSize: 16,
    color: "#333",
  },
});
