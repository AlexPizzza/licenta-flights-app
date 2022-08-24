import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Context as AuthContext } from "../../context/AuthContext";

import { ListItem } from "react-native-elements";
import Ripple from "react-native-material-ripple";

import colors from "../../../global/colors";
import globalStyles from "../../../global/globalStyles";

const list = [
  {
    title: "Login info",
  },
  {
    title: "Account management",
  },
  {
    title: "Log out",
  },
];

const YourDetailsScreen = () => {
  const { signout } = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.yourDetailsHeaderText}>Your Details</Text>
        {list.map((item, index) => (
          <Ripple
            key={index}
            rippleColor={colors.PURPLE}
            rippleOpacity={0.8}
            onPress={() => {
              if (item.title === "Log out") {
                signout();
              } else if (item.title === "Account management") {
                navigation.navigate("AccountManagement");
              } else if (item.title === "Login info") {
                navigation.navigate("LoginInfo");
              }
            }}
            onLongPress={() => {
              if (item.title === "Log out") {
                signout();
              } else if (item.title === "Account management") {
                navigation.navigate("AccountManagement");
              } else if (item.title === "Login info") {
                navigation.navigate("LoginInfo");
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
  yourDetailsHeaderText: {
    ...globalStyles.headerBoldText,
    fontSize: 40,
    ...globalStyles.marginHorizontal,
    marginBottom: 16,
  },
  title: {
    ...globalStyles.normalText,
  },
});

export default YourDetailsScreen;
