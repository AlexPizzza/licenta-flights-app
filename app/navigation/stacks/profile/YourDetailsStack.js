import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import YourDetailsScreen from "../../../screens/profile/YourDetailsScreen";
import AccountManagementScreen from "../../../screens/profile/yourDetails/AccountManagementScreen";
import LoginInfoScreen from "../../../screens/profile/yourDetails/LoginInfoScreen";

const Stack = createStackNavigator();

const YourDetailsStack = () => {
  return (
    <Stack.Navigator initialRouteName="YourDetails">
      <Stack.Screen
        name="YourDetails"
        component={YourDetailsScreen}
        options={{
          headerStyle: {
            elevation: 0,
          },
          title: "",
        }}
      />
      <Stack.Screen
        name="AccountManagement"
        component={AccountManagementScreen}
        options={{
          headerStyle: {
            elevation: 0,
          },
          title: "",
        }}
      />
      <Stack.Screen
        name="LoginInfo"
        component={LoginInfoScreen}
        options={{
          headerStyle: {
            elevation: 0,
          },
          title: "",
        }}
      />
    </Stack.Navigator>
  );
};

export default YourDetailsStack;
