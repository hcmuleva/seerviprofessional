// index.js or main entry file
import { AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { name as EasyAPp} from '../app.json';
import App from './App';

// Wrap the App in NavigationContainer here (only once)
const AppWithNavigation = () => (
  <NavigationContainer>
    <App/>
  </NavigationContainer>
);

AppRegistry.registerComponent(EasyAPp, () => AppWithNavigation);
