import 'react-native-gesture-handler';
import React from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { Provider as AuthProvider } from './app/context/AuthContext';
import { Provider as UserProvider } from './app/context/UserContext';
import { Provider as FlightsProvider } from './app/context/FlightsContext';

import SplashScreen from './app/screens/SplashScreen';

const App = () => (
  <NavigationContainer>
    <SplashScreen />
  </NavigationContainer>
);

const Root = () => (
  <AuthProvider>
    <FlightsProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </FlightsProvider>
  </AuthProvider>
);

export default Root;
