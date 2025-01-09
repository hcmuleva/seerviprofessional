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
import ProfileMobile from "./Screen/tinderc";
import AddJob from "./pages/myprofile/profession.jsx/JobForm";

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
            <Stack.Navigator>

             <Stack.Screen name="login" component={Login} />
               <Stack.Screen name="Register" component={Register} />
                
              <Stack.Screen name="HomeScreen" component={HomeScreen} />
              <Stack.Screen name="AddJob" component={AddJob} />
              <Stack.Screen name="UserProfileOverview" component={UserProfileOverview} options={{headerShown:false}} />
              <Stack.Screen name="ProfileMobile" component={ProfileMobile} options={{headerShown:false}}/>

            </Stack.Navigator>
          </PageViewProvider>
        </Refine>
    </SafeAreaProvider>
  );
};
