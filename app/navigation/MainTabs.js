import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { MaterialIcons, Ionicons } from "@expo/vector-icons";

import SearchStack from "./stacks/SearchStack";
import ExploreStack from "./stacks/ExploreStack";
import ProfileStack from "./stacks/ProfileStack";
import SavedStack from "./stacks/SavedStack";

import colors from "../../global/colors";
import globalStyles from "../../global/globalStyles";

const Tab = createMaterialTopTabNavigator();

const barOptions = {
  activeTintColor: colors.TAB_BAR_ICON_SELECTED,
  inactiveTintColor: colors.TAB_BAR_ICON_DEFAULT,
  pressColor: colors.TAB_BAR_PRESS_COLOR,
  indicatorStyle: {
    top: 0,
    backgroundColor: colors.TAB_BAR_ICON_DEFAULT,
  },
  labelStyle: {
    ...globalStyles.labelText,
    marginTop: 0,
    marginLeft: 6,
  },
  tabStyle: {
    height: 52,
  },
  style: {
    backgroundColor: colors.TAB_BAR_BG_COLOR,
    elevation: 4,
  },
  showIcon: true,
  iconStyle: {
    justifyContent: "center",
  },
};

const iconSize = 22;

const MainTabs = () => {
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      backBehavior="history"
      initialRouteName="Search"
      swipeEnabled={false}
      tabBarOptions={barOptions}
    >
      <Tab.Screen
        name="Search"
        component={SearchStack}
        key="1"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-search" size={iconSize} color={color} />
          ),
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreStack}
        key="2"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="explore" size={iconSize} color={color} />
          ),
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="Saved"
        component={SavedStack}
        key="3"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="bookmark"
              color={color}
              size={iconSize}
              style={{
                marginLeft: 2,
              }}
            />
          ),
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        key="4"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name="account-circle"
              size={iconSize}
              color={color}
            />
          ),
          unmountOnBlur: true,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;
