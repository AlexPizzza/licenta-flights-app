import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem } from "react-native-elements";
import Ripple from "react-native-material-ripple";

import { Context as UserContext } from "../../context/UserContext";

import colors from "../../../global/colors";
import globalStyles from "../../../global/globalStyles";

const SettingsScreen = ({ navigation }) => {
  const {
    state: { currentCurrency },
  } = useContext(UserContext);

  const onPress = () => {
    navigation.navigate("Currencies");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.settingsHeaderText}>Settings</Text>
      <Ripple
        rippleColor={colors.PURPLE}
        rippleOpacity={0.8}
        onPress={onPress}
        onLongPress={onPress}
        delayLongPress={150}
      >
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title style={styles.title}>Currency</ListItem.Title>
            <ListItem.Subtitle style={styles.title}>
              {currentCurrency.currency_name}
            </ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron
            size={20}
            iconStyle={{ color: colors.PURPLE_LIGHT }}
          />
        </ListItem>
      </Ripple>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BG_COLOR,
  },
  settingsHeaderText: {
    ...globalStyles.headerBoldText,
    ...globalStyles.marginHorizontal,

    fontSize: 40,
    marginBottom: 16,
  },
  title: {
    ...globalStyles.normalText,
  },
});

export default SettingsScreen;
