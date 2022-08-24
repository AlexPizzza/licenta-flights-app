import React, { useContext } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";

import Ripple from "react-native-material-ripple";

import { Context as FlightsContext } from "../../context/FlightsContext";

import globalStyles from "../../../global/globalStyles";
import colors from "../../../global/colors";

const RecommendedScreenCard = ({ item, onPress, currency }) => {
  const {
    state: { cities, userCoords },
    addCities,
  } = useContext(FlightsContext);

  const addCitiesBackToList = () => {
    addCities(item.country_iso2, userCoords, cities);
  };

  return (
    <View style={styles.container}>
      <Ripple
        rippleColor={colors.WHITE}
        rippleOpacity={0.8}
        rippleContainerBorderRadius={20}
        onPress={() => {
          addCitiesBackToList();

          onPress(item.country_name, item.country_iso2);
        }}
        onLongPress={() => {
          addCitiesBackToList();

          onPress(item.country_name, item.country_iso2);
        }}
        delayLongPress={150}
        style={styles.cardView}
      >
        <Image style={styles.image} source={{ uri: item.image }} />
        <View style={styles.textViewCountryName}>
          <Text style={styles.itemTitle}>{item.country_name}</Text>
        </View>
        <View style={styles.textViewPrice}>
          <Text style={styles.itemPrice}>
            from {Math.ceil(item.price / currency.rate / 5) * 5}{" "}
            {currency.currency_iso}
          </Text>
        </View>
      </Ripple>
    </View>
  );
};

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...globalStyles.marginHorizontal,
    width: 0.92 * width,
    height: 0.35 * height,
  },
  cardView: {
    flex: 1,
    backgroundColor: colors.WHITE,
    marginHorizontal: 4,
    marginVertical: 10,
    borderRadius: 20,
    shadowColor: "#000",
    elevation: 10,
  },
  textViewCountryName: {
    position: "absolute",
    bottom: 10,
    margin: 10,
    left: 12,
    width: 150,
  },
  textViewPrice: {
    position: "absolute",
    bottom: 10,
    margin: 10,
    right: 12,
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 10,
    marginTop: 10,
    alignSelf: "center",
  },
  itemTitle: {
    color: colors.WHITE,
    marginBottom: 5,
    ...globalStyles.headerBoldText,
    fontSize: 20,
  },
  itemPrice: {
    color: colors.WHITE,
    marginBottom: 5,
    ...globalStyles.normalText,
    fontSize: 18,
  },
});

export default RecommendedScreenCard;
