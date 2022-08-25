import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CitiesScreen from '../../screens/common/CitiesScreen';
import RecommendedScreen from '../../screens/common/RecommendedScreen';
import ExploreScreen from '../../screens/explore/ExploreScreen';

import globalStyles from '../../../global/globalStyles';

const Stack = createStackNavigator();

const ExploreStack = () => {
  return (
    <Stack.Navigator initialRouteName='Explore'>
      <Stack.Screen
        name='Explore'
        component={ExploreScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Recommended'
        component={RecommendedScreen}
        options={({ route }) => ({
          headerStyle: {
            elevation: 8
          },
          headerTitleStyle: {
            ...globalStyles.boldText,
            fontSize: 20,
            marginLeft: -14,
            marginBottom: 4
          },
          title: route.params.title
        })}
      />
      <Stack.Screen
        name='CitiesScreen'
        component={CitiesScreen}
        options={({ route }) => ({
          headerStyle: {
            elevation: 8
          },
          headerTitleStyle: {
            ...globalStyles.boldText,
            fontSize: 20,
            marginLeft: -14,
            marginBottom: 4
          },
          title: route.params.title
        })}
      />
    </Stack.Navigator>
  );
};

export default ExploreStack;
