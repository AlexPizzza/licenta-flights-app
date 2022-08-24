import React, { useContext } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ListItem } from "react-native-elements";
import Ripple from "react-native-material-ripple";

import { Context as UserContext } from "../../../context/UserContext";

import colors from "../../../../global/colors";
import globalStyles from "../../../../global/globalStyles";

const CurrenciesScreen = ({ navigation }) => {
  const {
    state: { currencies },
    changeCurrentCurrency,
  } = useContext(UserContext);

  const changeCurrency = (item) => {
    changeCurrentCurrency(item);
    setTimeout(() => {
      navigation.goBack();
    }, 150);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.settingsHeaderText}>Currencies</Text>
      {currencies.map((item, index) => (
        <Ripple
          key={index}
          rippleColor={colors.PURPLE}
          rippleOpacity={0.8}
          onPress={() => {
            changeCurrency(item);
          }}
          onLongPress={() => {
            changeCurrency(item);
          }}
          delayLongPress={150}
        >
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title style={styles.title}>
                {item.currency_iso}
              </ListItem.Title>
              <ListItem.Subtitle style={styles.title}>
                {item.currency_name}
              </ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron
              size={20}
              iconStyle={{ color: colors.PURPLE_LIGHT }}
            />
          </ListItem>
        </Ripple>
      ))}
    </ScrollView>
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

export default CurrenciesScreen;
