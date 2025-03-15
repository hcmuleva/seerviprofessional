// components/InputField.js
import React, { memo } from "react";
import { View, TextInput, StyleSheet } from "react-native";

const InputField = memo(({ icon, placeholder, value, onChangeText }) => (
  <View style={styles.inputContainer}>
    {icon}
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      placeholderTextColor="#999"
    />
  </View>
));

export default InputField;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
    borderWidth: 1,
    borderColor: "#eee",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
});
