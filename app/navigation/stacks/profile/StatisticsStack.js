import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import StatisticsScreen from "../../../screens/profile/StatisticsScreen";

const Stack = createStackNavigator();

const StatisticsStack = () => {
  return (
    <Stack.Navigator initialRouteName="Statistics">
      <Stack.Screen
        name="Statistics"
        component={StatisticsScreen}
        options={{
          headerStyle: {
            elevation: 4,
          },
          title: "",
        }}
      />
    </Stack.Navigator>
  );
};

export default StatisticsStack;
