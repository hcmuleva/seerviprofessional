// components/FilterForm.js
import React, { useReducer, useEffect, useCallback, useState } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  Modal, 
  SafeAreaView,
  Animated,
  Easing
} from "react-native";
import { Search, ChevronDown } from "react-native-feather";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "expo-router";
import FilterHeader from "./Filter/filterheader";
import Dropdown from "./Filter/dropdown";
import InputField from "./Filter/inputfields";

const BATCH_YEARS = Array.from(
  { length: 2024 - 1967 + 1 },
  (_, index) => (1967 + index).toString()
);
const BRANCHES = ["Computer Science", "Electrical", "Mechanical", "Civil", "Chemical"];
const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const initialState = {
  name: "",
  batchYear: "",
  branch: "",
  city: "",
  country: "",
  bloodGroup: "",
  flag: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "CLEAR":
      return initialState;
    case "SET_FLAG":
      return { ...state, flag: action.value };
    default:
      return state;
  }
}

function FilterForm({ visible, onClose, onApplyFilters }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigation = useNavigation();

  const [batchYearDropdownVisible, setBatchYearDropdownVisible] = useState(false);
  const [branchDropdownVisible, setBranchDropdownVisible] = useState(false);
  const [bloodGroupDropdownVisible, setBloodGroupDropdownVisible] = useState(false);

  // Animation values
  const translateX = useState(new Animated.Value(300))[0];
  const backdropOpacity = useState(new Animated.Value(0))[0];

  useEffect(() => {
    const animations = visible
      ? [
          Animated.timing(translateX, {
            toValue: 0,
            duration: 300,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(backdropOpacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ]
      : [
          Animated.timing(translateX, {
            toValue: 300,
            duration: 250,
            easing: Easing.in(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(backdropOpacity, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
          }),
        ];
    Animated.parallel(animations).start();
  }, [visible, translateX, backdropOpacity]);

  const handleFieldChange = useCallback((field, value) => {
    dispatch({ type: "SET_FIELD", field, value });
  }, []);

  const clearFilters = useCallback(() => {
    dispatch({ type: "CLEAR" });
    navigation.navigate("MemberDashboard");
    onClose();
  }, [navigation, onClose]);

  const applyFilters = () => {
    const updatedFilters = { ...state, flag: true };
    dispatch({ type: "SET_FLAG", value: true });
    onApplyFilters(updatedFilters);
    onClose();
  };
  

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]}>
        <TouchableOpacity 
          style={styles.backdropTouchable}
          activeOpacity={1}
          onPress={onClose}
        >
          <Animated.View style={[styles.modalContent, { transform: [{ translateX }] }]}>
            <SafeAreaView style={styles.safeArea}>
              <FilterHeader onClose={onClose} />
              <ScrollView 
                style={styles.formContainer}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
              >
                {/* Name Filter */}
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Name</Text>
                  <InputField
                    icon={<Search width={20} height={20} color="#999" style={styles.inputIcon} />}
                    placeholder="Search by name..."
                    value={state.name}
                    onChangeText={(value) => handleFieldChange("name", value)}
                  />
                </View>

                {/* Batch Year */}
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Batch Year</Text>
                  <TouchableOpacity
                    style={styles.selectContainer}
                    onPress={() => setBatchYearDropdownVisible((prev) => !prev)}
                  >
                    <Text style={state.batchYear ? styles.selectText : styles.selectPlaceholder}>
                      {state.batchYear || "Select batch year"}
                    </Text>
                    <ChevronDown width={20} height={20} color="#999" />
                  </TouchableOpacity>
                  <Dropdown 
                    options={BATCH_YEARS}
                    onSelect={(option) => handleFieldChange("batchYear", option)}
                    visible={batchYearDropdownVisible}
                    setVisible={setBatchYearDropdownVisible}
                  />
                </View>

                {/* Branch */}
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Branch</Text>
                  <TouchableOpacity
                    style={styles.selectContainer}
                    onPress={() => setBranchDropdownVisible((prev) => !prev)}
                  >
                    <Text style={state.branch ? styles.selectText : styles.selectPlaceholder}>
                      {state.branch || "Select branch"}
                    </Text>
                    <ChevronDown width={20} height={20} color="#999" />
                  </TouchableOpacity>
                  <Dropdown 
                    options={BRANCHES}
                    onSelect={(option) => handleFieldChange("branch", option)}
                    visible={branchDropdownVisible}
                    setVisible={setBranchDropdownVisible}
                  />
                </View>

                {/* City */}
                <View style={styles.formGroup}>
                  <Text style={styles.label}>City</Text>
                  <InputField
                    icon={<Search width={20} height={20} color="#999" style={styles.inputIcon} />}
                    placeholder="Enter city..."
                    value={state.city}
                    onChangeText={(value) => handleFieldChange("city", value)}
                  />
                </View>

                {/* Country */}
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Country</Text>
                  <InputField
                    icon={<Search width={20} height={20} color="#999" style={styles.inputIcon} />}
                    placeholder="Enter country..."
                    value={state.country}
                    onChangeText={(value) => handleFieldChange("country", value)}
                  />
                </View>

                {/* Blood Group */}
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Blood Group</Text>
                  <TouchableOpacity
                    style={styles.selectContainer}
                    onPress={() => setBloodGroupDropdownVisible((prev) => !prev)}
                  >
                    <Text style={state.bloodGroup ? styles.selectText : styles.selectPlaceholder}>
                      {state.bloodGroup || "Select blood group"}
                    </Text>
                    <ChevronDown width={20} height={20} color="#999" />
                  </TouchableOpacity>
                  <Dropdown 
                    options={BLOOD_GROUPS}
                    onSelect={(option) => handleFieldChange("bloodGroup", option)}
                    visible={bloodGroupDropdownVisible}
                    setVisible={setBloodGroupDropdownVisible}
                  />
                </View>
              </ScrollView>

              {/* Footer */}
              <View style={styles.footer}>
                <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
                  <Text style={styles.clearButtonText}>Clear</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
                  <LinearGradient
                    colors={['#FFA500', '#FF6347']}
                    style={styles.gradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <Text style={styles.applyButtonText}>Apply Filters</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    </Modal>
  );
}

export default FilterForm;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  backdropTouchable: {
    flex: 1,
    flexDirection: "row-reverse",
  },
  modalContent: {
    width: "85%",
    height: "100%",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 20,
    position: "absolute",
    right: 0,
  },
  safeArea: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#444",
    marginBottom: 10,
  },
  inputIcon: {
    marginRight: 10,
  },
  selectContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
    borderWidth: 1,
    borderColor: "#eee",
  },
  selectText: {
    fontSize: 16,
    color: "#333",
  },
  selectPlaceholder: {
    fontSize: 16,
    color: "#999",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  clearButton: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
  },
  applyButton: {
    flex: 1,
    borderRadius: 10,
    overflow: "hidden",
    marginLeft: 15,
  },
  gradient: {
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  clearButtonText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "600",
  },
  applyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
