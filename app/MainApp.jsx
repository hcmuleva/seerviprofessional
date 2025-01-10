import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import HomeScreen from "./Screen/HomeScreen";
import ProfileMobile from "./Screen/ProfileDisplay";
import AddJob from "./pages/myprofile/profession/JobForm";
import UserProfileOverview from "./Screen/userprofiledetails";
import ProfileTabs from "./(tabs)/profiletabs";
import ProfessionDetails from "./Screen/ProfessionDetails";
import EditJob from "./pages/myprofile/profession/EditJob";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Create stack navigators for each tab
const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const JobStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="JobScreen" component={LocationScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const HelpStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="HelpScreen" component={ApplicationsScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

// Profile stack with all profile-related screens
const ProfileStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="ProfileScreen" component={ProfileMobile} options={{ headerShown: false }} />
    <Stack.Screen name="AddJob" component={AddJob} options={{ headerShown: true }} />
    <Stack.Screen name="ProfessionalDetails" component={ProfessionDetails} options={{ headerShown: false }} />
    <Stack.Screen name="UserProfileOverview" component={UserProfileOverview} options={{ headerShown: false }} />
    <Stack.Screen name="ProfileTabs" component={ProfileTabs} options={{ headerShown: false }} />
    <Stack.Screen name="EditJob" component={EditJob} options={{ headerShown: true }} />
  </Stack.Navigator>
);

// Placeholder screens
const LocationScreen = () => (
  <SafeAreaView style={styles.centeredScreen}>
    <Text>Location Screen</Text>
  </SafeAreaView>
);

const ApplicationsScreen = () => (
  <SafeAreaView style={styles.centeredScreen}>
    <Text>Applications Screen</Text>
  </SafeAreaView>
);

const MainApp = () => {
  return (
    <SafeAreaProvider>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            switch (route.name) {
              case "Home":
                iconName = focused ? "home" : "home-outline";
                break;
              case "Job":
                iconName = focused ? "briefcase" : "briefcase-outline";
                break;
              case "Help":
                iconName = focused ? "help-circle" : "help-circle-outline";
                break;
              case "Profile":
                iconName = focused ? "person" : "person-outline";
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
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Job" component={JobStack} />
        <Tab.Screen name="Help" component={HelpStack} />
        <Tab.Screen name="Profile" component={ProfileStack} />
      </Tab.Navigator>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  centeredScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MainApp;

