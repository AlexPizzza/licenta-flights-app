import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SignInScreen from "../../screens/authentication/SignInScreen";
import SignUpScreen from "../../screens/authentication/SignUpScreen";

const Stack = createStackNavigator();

const AuthenticationStack = () => {
  return (
    <Stack.Navigator initialRouteName="SignIn" headerMode="none">
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
};

export default AuthenticationStack;
