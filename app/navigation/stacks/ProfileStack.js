import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import ProfileScreen from '../../screens/profile/ProfileScreen';
import SettingsStack from './profile/SettingsStack';
import StatisticsStack from './profile/StatisticsStack';
import SupportStack from './profile/SupportStack';
import YourDetailsStack from './profile/YourDetailsStack';

const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='ProfileScreen'
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen
        name='ProfileScreen'
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='YourDetailsStack'
        component={YourDetailsStack}
        options={{
          headerStyle: {
            elevation: 0
          },
          title: ''
        }}
      />
      <Stack.Screen
        name='SettingsStack'
        component={SettingsStack}
        options={{
          headerStyle: {
            elevation: 0
          },
          title: ''
        }}
      />
      <Stack.Screen
        name='SupportStack'
        component={SupportStack}
        options={{
          headerStyle: {
            elevation: 0
          },
          title: ''
        }}
      />
      <Stack.Screen
        name='StatisticsStack'
        component={StatisticsStack}
        options={{
          headerStyle: {
            elevation: 0
          },
          title: ''
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
