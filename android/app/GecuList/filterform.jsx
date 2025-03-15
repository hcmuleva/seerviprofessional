import React, { useReducer, useEffect, useCallback, useState, memo } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  Modal, 
  SafeAreaView,
  Animated,
  Easing
} from "react-native";
import { Search, ChevronDown, X } from "react-native-feather";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "expo-router";

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


const Dropdown = memo(({ options, onSelect, visible, setVisible }) => {
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
});

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


  const clearFilters = useCallback(() => {
    dispatch({ type: "CLEAR" });
    navigation.navigate("MemberDashboard");
    onClose();
  }, [navigation, onClose]);


  const applyFilters = useCallback(() => {
    dispatch({ type: "SET_FLAG", value: true });
    onApplyFilters(state);
    onClose();
  }, [onApplyFilters, state, onClose]);


  const handleFieldChange = useCallback((field, value) => {
    dispatch({ type: "SET_FIELD", field, value });
  }, []);

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]}>
        <TouchableOpacity 
          style={styles.backdropTouchable}
          activeOpacity={1}
          onPress={onClose}
        >
          <Animated.View 
            style={[styles.modalContent, { transform: [{ translateX }] }]}
          >
            <SafeAreaView style={styles.safeArea}>
              {/* Header */}
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Filters</Text>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <X width={24} height={24} color="#666" />
                </TouchableOpacity>
              </View>

              {/* Form */}
              <ScrollView 
                style={styles.formContainer}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
              >
                {/* Name Filter */}
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Name</Text>
                  <View style={styles.inputContainer}>
                    <Search width={20} height={20} color="#999" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Search by name..."
                      value={state.name}
                      onChangeText={(value) => handleFieldChange("name", value)}
                      placeholderTextColor="#999"
                    />
                  </View>
                </View>

                {/* Batch Year */}
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Batch Year</Text>
                  <TouchableOpacity
                    style={styles.selectContainer}
                    onPress={() => setBatchYearDropdownVisible(prev => !prev)}
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
                    onPress={() => setBranchDropdownVisible(prev => !prev)}
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
                  <View style={styles.inputContainer}>
                    <Search width={20} height={20} color="#999" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Enter city..."
                      value={state.city}
                      onChangeText={(value) => handleFieldChange("city", value)}
                      placeholderTextColor="#999"
                    />
                  </View>
                </View>

                {/* Country */}
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Country</Text>
                  <View style={styles.inputContainer}>
                    <Search width={20} height={20} color="#999" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Enter country..."
                      value={state.country}
                      onChangeText={(value) => handleFieldChange("country", value)}
                      placeholderTextColor="#999"
                    />
                  </View>
                </View>

                {/* Blood Group */}
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Blood Group</Text>
                  <TouchableOpacity
                    style={styles.selectContainer}
                    onPress={() => setBloodGroupDropdownVisible(prev => !prev)}
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
                <TouchableOpacity 
                  style={styles.clearButton}
                  onPress={clearFilters}
                >
                  <Text style={styles.clearButtonText}>Clear</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.applyButton}
                  onPress={applyFilters}
                >
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
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
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

export default FilterForm;
