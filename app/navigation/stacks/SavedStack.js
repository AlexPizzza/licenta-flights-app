import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import SavedScreen from '../../screens/saved/SavedScreen';

const Stack = createStackNavigator();

const SavedStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: false
      }}
    >
      <Stack.Screen name='SavedScreen' component={SavedScreen} />
    </Stack.Navigator>
  );
};

export default SavedStack;
