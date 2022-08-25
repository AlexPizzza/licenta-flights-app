import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CurrenciesScreen from '../../../screens/profile/settings/CurrenciesScreen';
import SettingsScreen from '../../../screens/profile/SettingsScreen';

const Stack = createStackNavigator();

const SettingsStack = () => {
  return (
    <Stack.Navigator initialRouteName='Settings'>
      <Stack.Screen
        name='Settings'
        component={SettingsScreen}
        options={{
          headerStyle: {
            elevation: 0
          },
          title: ''
        }}
      />
      <Stack.Screen
        name='Currencies'
        component={CurrenciesScreen}
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

export default SettingsStack;
