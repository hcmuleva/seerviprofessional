import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './Screen/HomeScreen';
import ProfileMobile from './Screen/ProfileDisplay';
import Dashboard from './Dashboard/usersdashbaord';
import MemberDashboard from './MemberDashboard';

const Tab = createBottomTabNavigator();

const AppTabs = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const getUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userid');
        setUserId(storedUserId);
      } catch (error) {
        console.error('Error getting userId from AsyncStorage:', error);
      }
    };
    getUserId();
  }, []);

  const ProfileWrapper = ({ navigation }) => (
    <ProfileMobile 
      PofileShown="LOGINUSER"
      CurrentUserId={userId}
    />
  );

  const DashboardWrapper = ({ navigation }) => (
    <Dashboard 
      route={{
        params: {
          CurrentUserId: userId
        }
      }}
    />
  );

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case "Home":
              iconName = focused ? "home" : "home-outline";
              break;
            case "Professions":
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
        headerShown: false,
        // Fix for keyboard pushing tabs down
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          position: 'absolute',
          borderTopWidth: 0,
          elevation: 0,
          backgroundColor: '#ffffff',
        }
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={MemberDashboard}
        options={{ unmountOnBlur: true }}
      />
      <Tab.Screen 
        name="Professions" 
        component={DashboardWrapper}
        options={{ unmountOnBlur: true }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileWrapper}
        options={{ unmountOnBlur: true }}
      />
    </Tab.Navigator>
  );
};

export default AppTabs;