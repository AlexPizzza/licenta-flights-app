import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import { StyleSheet } from 'react-native';

import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import ExploreStack from './stacks/ExploreStack';
import ProfileStack from './stacks/ProfileStack';
import SavedStack from './stacks/SavedStack';
import SearchStack from './stacks/SearchStack';

import colors from '../../global/colors';
import globalStyles from '../../global/globalStyles';

const Tab = createMaterialTopTabNavigator();

const screenOptions = {
  tabBarActiveTintColor: colors.TAB_BAR_ICON_SELECTED,
  tabBarInactiveTintColor: colors.TAB_BAR_ICON_DEFAULT,
  tabBarPressColor: colors.TAB_BAR_PRESS_COLOR,
  tabBarIndicatorStyle: {
    top: 0,
    backgroundColor: colors.TAB_BAR_ICON_DEFAULT
  },
  tabBarLabelStyle: {
    ...globalStyles.labelText,
    marginTop: 0,
    marginLeft: 6
  },
  tabBarStyle: {
    backgroundColor: colors.TAB_BAR_BG_COLOR,
    elevation: 4,
    height: 52
  },
  tabBarShowIcon: true,
  tabBarIconStyle: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  swipeEnabled: false
};

const iconSize = 22;

const MainTabs = () => {
  return (
    <Tab.Navigator
      tabBarPosition='bottom'
      backBehavior='history'
      initialRouteName='Search'
      screenOptions={screenOptions}
    >
      <Tab.Screen
        name='Search'
        component={SearchStack}
        key='1'
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name='ios-search' size={iconSize} color={color} />
          ),
          unmountOnBlur: true
        }}
      />
      <Tab.Screen
        name='Explore'
        component={ExploreStack}
        key='2'
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name='explore' size={iconSize} color={color} />
          ),
          unmountOnBlur: true
        }}
      />
      <Tab.Screen
        name='Saved'
        component={SavedStack}
        key='3'
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons
              name='bookmark'
              color={color}
              size={iconSize}
              style={styles.iconStyle}
            />
          ),
          unmountOnBlur: true
        }}
      />
      <Tab.Screen
        name='Profile'
        component={ProfileStack}
        key='4'
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name='account-circle'
              size={iconSize}
              color={color}
            />
          ),
          unmountOnBlur: true
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconStyle: {
    marginLeft: 2
  }
});

export default MainTabs;
