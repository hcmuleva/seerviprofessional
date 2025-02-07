import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Refine } from "@refinedev/core";
import Login from "./login";
import { authProvider } from "./config/authProvider";
import { axiosInstance } from "./config/axiosInstance";
import { resourcesConfig } from "./config/resources";
import { PageViewProvider } from "./contextprovider/PageProvider";
import Register from "./register/register";
import HomeScreen from "./Screen/HomeScreen";
import { DataProvider } from "@refinedev/strapi-v4";
import UserProfileOverview from "./Screen/userprofiledetails";
import AddJob from "./pages/myprofile/profession/JobForm";
import ProfileTabs from "./(tabs)/profiletabs";
import ProfileMobile from "./Screen/ProfileDisplay";
import EditJob from "./pages/myprofile/profession/EditJob";
import EditBasicAll from "./pages/myprofile/profession/EditBasicAll";
import ProfileScreen from "./pages/myprofile/profession/ProfileScreen";
import SettingsScreen from "./pages/myprofile/setting/setting";
import TestDashboard from "./Screen/TestDashboard";
import Dashboard from "./Dashboard/usersdashbaord";
import FilterScreen from "./Dashboard/Filter";
import AppTabs from "./Apptabs";
// import UserProfileDummy from "./Dashboard/UserProfileDisplay/userprofile";

const Stack = createStackNavigator();
export const TOKEN_KEY = process.env.VITE_TOKEN_KEY;
const API_URL = process.env.VITE_SERVER_URL;

export default function App() {
  return (
    <SafeAreaProvider>
      
        <Refine
          dataProvider={DataProvider(API_URL + `/api`, axiosInstance)}
          // routerProvider={{
          //   routes: {
          //     login: "/login",
          //   },
          // }}
          // resources={resourcesConfig}
          // authProvider={authProvider}
        >
          <PageViewProvider>
            <Stack.Navigator>

             <Stack.Screen name="login" component={Login} />
               <Stack.Screen name="Register" component={Register} />
               <Stack.Screen 
              name="Main" 
              component={AppTabs}  // Remove the props wrapper, handle userId in AppTabs
              options={{ headerShown: false }}
            />
              
              <Stack.Screen name="HomeScreen" component={HomeScreen} />
              <Stack.Screen name="Dashboard" component={Dashboard} options={{headerShown:false}}/>
              <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
              <Stack.Screen name="AddJob" component={AddJob} />
              <Stack.Screen name="EditJob" component={EditJob} />
              <Stack.Screen name="Settings" component={SettingsScreen} />
              <Stack.Screen name="FilterScreen" component={FilterScreen} options={{headerShown:false}} />
              <Stack.Screen name="EditBasicAll" component={EditBasicAll} />
              <Stack.Screen name="UserProfileOverview" component={UserProfileOverview} options={{headerShown:false}} />
              <Stack.Screen name="ProfileTabs" component={ProfileTabs} options={{headerShown:false}}/>
              <Stack.Screen name="ProfileMobile" component={ProfileMobile} options={{headerShown:false}}/>
              {/* <Stack.Screen name="UserProfileDummy" component={UserProfileDummy} options={{headerShown:false}}/> */}
            </Stack.Navigator>
          </PageViewProvider>
        </Refine>
    </SafeAreaProvider>
  );
};
