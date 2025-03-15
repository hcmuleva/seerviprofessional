// components/FilterHeader.js
import React, { memo } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { X } from "react-native-feather";

const FilterHeader = memo(({ onClose }) => (
  <View style={styles.header}>
    <Text style={styles.headerTitle}>Filters</Text>
    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
      <X width={24} height={24} color="#666" />
    </TouchableOpacity>
  </View>
));

export default FilterHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
  },
  closeButton: {
    padding: 8,
  },
});
