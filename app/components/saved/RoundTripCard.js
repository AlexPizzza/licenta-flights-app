import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

import Ripple from "react-native-material-ripple";

import colors from "../../../global/colors";
import globalStyles from "../../../global/globalStyles";

const RoundTripCard = ({ item, onPress, currency }) => {
  const [departureDate, setDepartureDate] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");

  useEffect(() => {
    let splitDepartureDate;
    let splitArrivalDate;
    if (item.data) {
      if (item.data.departure_date instanceof Date) {
        splitDepartureDate = item.data.departure_date.toString().split(" ");
        splitArrivalDate = item.data.arrival_date.toString().split(" ");
      } else {
        splitDepartureDate = item.data.departure_date
          .toDate()
          .toString()
          .split(" ");
        splitArrivalDate = item.data.arrival_date
          .toDate()
          .toString()
          .split(" ");
      }
    } else {
      if (item.departure_date instanceof Date) {
        splitDepartureDate = item.departure_date.toString().split(" ");
        splitArrivalDate = item.arrival_date.toString().split(" ");
      } else {
        splitDepartureDate = item.departure_date.toDate().toString().split(" ");
        splitArrivalDate = item.arrival_date.toDate().toString().split(" ");
      }
    }

    const departureDateToShow =
      splitDepartureDate[0] +
      ", " +
      splitDepartureDate[1] +
      " " +
      splitDepartureDate[2] +
      ", " +
      splitDepartureDate[3];

    const arrivalDateToShow =
      splitArrivalDate[0] +
      ", " +
      splitArrivalDate[1] +
      " " +
      splitArrivalDate[2] +
      ", " +
      splitArrivalDate[3];

    setDepartureDate(departureDateToShow);
    setArrivalDate(arrivalDateToShow);
  }, [item]);

  return (
    <Ripple
      rippleColor={colors.PURPLE}
      rippleOpacity={0.8}
      onPress={onPress}
      onLongPress={onPress}
      rippleContainerBorderRadius={14}
      delayLongPress={150}
      style={styles.rippleContainer}
    >
      <View style={styles.outerContainer}>
        <View style={styles.subHeaderContainer}>
          <Text style={[styles.subHeaderText, { color: colors.PURPLE }]}>
            Outbound
          </Text>
          <Text style={[styles.subHeaderDateText, { color: colors.PURPLE }]}>
            {" - "}
            {departureDate}
          </Text>
        </View>

        <View style={styles.innerContainer}>
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.cityTextStyle}>
              {item.departure_city.city_name}
            </Text>
            <Text style={styles.airportTextStyle}>
              {item.departure_city.iata_code}
            </Text>
          </View>

          <View style={{ marginHorizontal: 4 }}>
            <Text style={styles.cityTextStyle}>{" - "}</Text>
          </View>

          <View style={{ flexDirection: "column" }}>
            <Text style={styles.cityTextStyle}>
              {item.arrival_city.city_name}
            </Text>
            <Text style={styles.airportTextStyle}>
              {item.arrival_city.iata_code}
            </Text>
          </View>
        </View>

        <View style={[styles.subHeaderContainer, { marginTop: 10 }]}>
          <Text style={[styles.subHeaderText, { color: colors.ORANGE }]}>
            Return
          </Text>
          <Text style={[styles.subHeaderDateText, { color: colors.ORANGE }]}>
            {" - "}
            {arrivalDate}
          </Text>
        </View>

        <View style={styles.innerContainer}>
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.cityTextStyle}>
              {item.arrival_city.city_name}
            </Text>
            <Text style={styles.airportTextStyle}>
              {item.arrival_city.iata_code}
            </Text>
          </View>

          <View style={{ marginHorizontal: 4 }}>
            <Text style={styles.cityTextStyle}>{" - "}</Text>
          </View>

          <View style={{ flexDirection: "column" }}>
            <Text style={styles.cityTextStyle}>
              {item.departure_city.city_name}
            </Text>
            <Text style={styles.airportTextStyle}>
              {item.departure_city.iata_code}
            </Text>
          </View>
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.priceTextStyle}>Ticket price: </Text>
          <Text style={styles.priceTextStyle}>
            {Math.ceil(item.ticket_price / currency.rate / 5) * 5}{" "}
            {currency.currency_iso}
          </Text>
        </View>
      </View>
    </Ripple>
  );
};

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  rippleContainer: {
    height: height * 0.36,
    marginVertical: 5,
    padding: 10,
    borderWidth: 1,
    borderRadius: 16,
  },
  outerContainer: {
    flexDirection: "column",
  },
  subHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  innerContainer: {
    flexDirection: "row",
    marginVertical: 5,
  },
  cityTextStyle: {
    ...globalStyles.boldText,
    fontSize: 18,
  },
  airportTextStyle: {
    ...globalStyles.normalText,
    color: colors.SEARCH_INPUT_TEXT,
  },
  subHeaderText: {
    ...globalStyles.boldText,
    fontSize: 20,
  },
  subHeaderDateText: {
    ...globalStyles.boldText,
    fontSize: 18,
  },
  priceContainer: {
    marginTop: 10,
    flexDirection: "row",
  },
  priceTextStyle: {
    ...globalStyles.boldText,
  },
});

export default RoundTripCard;
