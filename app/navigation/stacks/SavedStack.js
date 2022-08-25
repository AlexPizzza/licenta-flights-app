import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import SavedScreen from '../../screens/saved/SavedScreen';

const Stack = createStackNavigator();

const SavedStack = () => {
  return (
    <Stack.Navigator headerMode='none'>
      <Stack.Screen name='Saved' component={SavedScreen} />
    </Stack.Navigator>
  );
};

export default SavedStack;
