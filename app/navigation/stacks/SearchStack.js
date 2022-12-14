import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CitiesScreen from '../../screens/common/CitiesScreen';
import RecommendedScreen from '../../screens/common/RecommendedScreen';
import SearchScreen from '../../screens/search/SearchScreen';

import globalStyles from '../../../global/globalStyles';

const Stack = createStackNavigator();

const SearchStack = () => {
  return (
    <Stack.Navigator initialRouteName='SearchScreen'>
      <Stack.Screen
        name='SearchScreen'
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='RecommendedScreen'
        component={RecommendedScreen}
        options={{
          headerStyle: {
            elevation: 8
          },
          headerTitleStyle: {
            ...globalStyles.boldText,
            fontSize: 20,
            marginLeft: -14,
            marginBottom: 4
          },
          title: 'Recommended Destinations'
        }}
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

export default SearchStack;
