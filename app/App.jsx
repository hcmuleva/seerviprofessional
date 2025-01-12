// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Refine } from "@refinedev/core";
import { DataProvider } from "@refinedev/strapi-v4";

// Import components
import Login from "./login";
import Register from "./register/register";
import MainApp from "./MainApp";
import AddJob from "./pages/myprofile/profession/JobForm";
import UserProfileOverview from "./Screen/userprofiledetails";
import ProfileTabs from "./(tabs)/profiletabs"

// Import providers and config
import { authProvider } from "./config/authProvider";
import { axiosInstance } from "./config/axiosInstance";
import { resourcesConfig } from "./config/resources";
import { PageViewProvider } from "./contextprovider/PageProvider";
import ProfessionDetails from "./Screen/ProfessionDetails";

const Stack = createStackNavigator();
export const TOKEN_KEY = process.env.VITE_TOKEN_KEY;
const API_URL = process.env.VITE_SERVER_URL;

export default function App() {
  return (
    <SafeAreaProvider>
      <Refine
        dataProvider={DataProvider(API_URL + `/api`, axiosInstance)}
        routerProvider={{
          routes: {
            login: "/login",
          },
        }}
        resources={resourcesConfig}
        authProvider={authProvider}
      >
        <PageViewProvider>
          <Stack.Navigator initialRouteName="login">
            {/* Auth screens */}
            <Stack.Screen 
              name="login" 
              component={Login} 
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="Register" 
              component={Register} 
              options={{ headerShown: true }}
            />
            
            {/* Main app with bottom tabs */}
            <Stack.Screen 
              name="MainApp" 
              component={MainApp} 
              options={{ headerShown: false }}
            />
            
            {/* Other screens that will stack on top of MainApp */}
            <Stack.Screen 
              name="AddJob" 
              component={AddJob} 
              options={{ headerShown: true }}
            />
             <Stack.Screen 
              name="ProfessionalDetails" 
              component={ProfessionDetails} 
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="UserProfileOverview" 
              component={UserProfileOverview} 
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="ProfileTabs" 
              component={ProfileTabs} 
              options={{ headerShown: false }}
            />

          </Stack.Navigator>
        </PageViewProvider>
      </Refine>
    </SafeAreaProvider>
  );
}