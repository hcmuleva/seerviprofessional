import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import HomeScreen from "./Screen/HomeScreen";
import ProfileMobile from "./Screen/ProfileDisplay";

const Tab = createBottomTabNavigator();

// Placeholder screens - replace these with your actual screens
const LocationScreen = () => (
  <View style={styles.centeredScreen}>
    <Text>Location Screen</Text>
  </View>
);

const ApplicationsScreen = () => (
  <View style={styles.centeredScreen}>
    <Text>Applications Screen</Text>
  </View>
);

const MenuScreen = () => (
  <View style={styles.centeredScreen}>
    <Text>Menu Screen</Text>
  </View>
);

const MainApp = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            switch (route.name) {
              case "Home":
                iconName = focused ? "home" : "home-outline";
                break;
              case "Location":
                iconName = focused ? "location" : "location-outline";
                break;
              case "Applications":
                iconName = focused ? "documents" : "documents-outline";
                break;
              case "Menu":
                iconName = focused ? "menu" : "menu-outline";
                break;
              case "Profile":
                iconName = focused ? "person" : "person-outline";
                break;
              case "Donation":
                iconName = focused ? "heart" : "heart-outline";
                break;
              case "Job": // Changed from 'Location'
                iconName = focused ? "briefcase" : "briefcase-outline"; // Changed to job-related icon
                break;
              case "Help": // Changed from 'Applications'
                iconName = focused ? "help-circle" : "help-circle-outline"; // Changed to help-related icon
                break;
              default:
                iconName = "help-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#007AFF",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            height: 60,
            paddingBottom: 5,
            paddingTop: 5,
          },
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Job" component={LocationScreen} />
        <Tab.Screen name="Help" component={ApplicationsScreen} />
        <Tab.Screen name="Profile" component={ProfileMobile} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white", // Set the background color to your preference
  },
  centeredScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MainApp;
