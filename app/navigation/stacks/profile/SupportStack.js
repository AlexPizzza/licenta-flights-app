import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SupportScreen from "../../../screens/profile/SupportScreen";
import ThirdPartyLicensesScreen from "../../../screens/profile/support/ThirdPartyLicensesScreen";

const Stack = createStackNavigator();

const SupportStack = () => {
  return (
    <Stack.Navigator initialRouteName="Support">
      <Stack.Screen
        name="Support"
        component={SupportScreen}
        options={{
          headerStyle: {
            elevation: 0,
          },
          title: "",
        }}
      />
      <Stack.Screen
        name="ThirdPartyLicenses"
        component={ThirdPartyLicensesScreen}
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

export default SupportStack;
