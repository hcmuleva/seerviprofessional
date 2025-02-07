import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './Screen/HomeScreen';
import ProfileMobile from './Screen/ProfileDisplay';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Dashboard from './Dashboard/usersdashbaord';
// import ProfileScreen from './pages/myprofile/profession/ProfileScreen';
// import Dashboard from './Dashboard/usersdashbaord';
// import HelpScreen from './HelpScreen'; // Create this component

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
      CurrentUserId={userId} // Make sure userid is defined or passed as a prop to AppTabs
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
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen 
        name="Professions" 
        component={DashboardWrapper}
      />
      {/* <Tab.Screen name="Help" component={HelpScreen} /> */}
      {/* <Tab.Screen name="Profile" component={ProfileMobile} /> */}
      <Tab.Screen 
        name="Profile" 
        component={ProfileWrapper}
      />
    </Tab.Navigator>
    // onPress={() => {
    //   {icon ==  'people' ?
         
    //     navigation.navigate('ProfileMobile', {
    //       PofileShown: "LOGINUSER",
    //       CurrentUserId: userid.id,
    //     })
    //     : ""}
    // }}
  );
};

export default AppTabs;