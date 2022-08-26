import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import SignInScreen from '../../screens/authentication/SignInScreen';
import SignUpScreen from '../../screens/authentication/SignUpScreen';

const Stack = createStackNavigator();

const AuthenticationStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='SignIn'
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name='SignIn' component={SignInScreen} />
      <Stack.Screen name='SignUp' component={SignUpScreen} />
    </Stack.Navigator>
  );
};

export default AuthenticationStack;
