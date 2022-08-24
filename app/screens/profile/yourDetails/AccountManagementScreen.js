import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { ListItem } from "react-native-elements";
import Ripple from "react-native-material-ripple";

import { Context as UserContext } from "../../../context/UserContext";
import { Context as AuthContext } from "../../../context/AuthContext";

import colors from "../../../../global/colors";
import globalStyles from "../../../../global/globalStyles";

const list = [
  {
    title: "Clear async storage",
  },
  {
    title: "Set app first time",
  },
];

const AccountManagementScreen = () => {
  const { setValueIsFirstTime } = useContext(UserContext);
  const { signout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.headerText}>Manage your account</Text>
        {list.map((item, index) => (
          <Ripple
            key={index}
            rippleColor={colors.PURPLE}
            rippleOpacity={0.8}
            onPress={() => {
              if (item.title.toLowerCase().includes("async".toLowerCase())) {
                const clear = async () => {
                  await AsyncStorage.clear();
                };
                try {
                  clear();
                } catch (error) {
                  console.log(error);
                }
              } else if (
                item.title.toLowerCase().includes("first".toLowerCase())
              ) {
                setValueIsFirstTime(true);
                signout();
              }
            }}
            onLongPress={() => {
              if (item.title.toLowerCase().includes("async".toLowerCase())) {
                const clear = async () => {
                  // await AsyncStorage.removeItem("");
                  await AsyncStorage.clear();
                };
                try {
                  clear();
                } catch (error) {
                  console.log(error);
                }
              } else if (
                item.title.toLowerCase().includes("first".toLowerCase())
              ) {
                setValueIsFirstTime(true);
                signout();
              }
            }}
            delayLongPress={150}
          >
            <ListItem bottomDivider>
              <ListItem.Content>
                <ListItem.Title style={styles.title}>
                  {item.title}
                </ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron
                size={20}
                iconStyle={{ color: colors.PURPLE_LIGHT }}
              />
            </ListItem>
          </Ripple>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BG_COLOR,
  },
  subContainer: {
    paddingLeft: globalStyles.marginHorizontal.value,
  },
  headerText: {
    ...globalStyles.headerBoldText,
    fontSize: 38,
    ...globalStyles.marginHorizontal,
    marginBottom: 16,
  },
  title: {
    ...globalStyles.normalText,
  },
});

export default AccountManagementScreen;
