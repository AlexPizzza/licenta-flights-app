import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SearchScreen from "../../screens/search/SearchScreen";
import RecommendedScreen from "../../screens/common/RecommendedScreen";
import CitiesScreen from "../../screens/common/CitiesScreen";

import globalStyles from "../../../global/globalStyles";

const Stack = createStackNavigator();

const SearchStack = () => {
  return (
    <Stack.Navigator initialRouteName="Search">
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Recommended"
        component={RecommendedScreen}
        options={{
          headerStyle: {
            elevation: 8,
          },
          headerTitleStyle: {
            ...globalStyles.boldText,
            fontSize: 20,
            marginLeft: -14,
            marginBottom: 4,
          },
          title: "Recommended Destinations",
        }}
      />
      <Stack.Screen
        name="CitiesScreen"
        component={CitiesScreen}
        options={({ route }) => ({
          headerStyle: {
            elevation: 8,
          },
          headerTitleStyle: {
            ...globalStyles.boldText,
            fontSize: 20,
            marginLeft: -14,
            marginBottom: 4,
          },
          title: route.params.title,
        })}
      />
    </Stack.Navigator>
  );
};

export default SearchStack;
