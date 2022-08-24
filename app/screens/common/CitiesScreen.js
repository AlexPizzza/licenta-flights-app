import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";
import { Divider } from "react-native-elements";

import CityCard from "../../components/common/CityCard";
import EstimatedPrices from "../../components/common/EstimatedPrices";

import { Context as FlightsContext } from "../../context/FlightsContext";
import { Context as UserContext } from "../../context/UserContext";

import colors from "../../../global/colors";

const CitiesScreen = ({ route }) => {
  const { country_iso2 } = route.params;

  const {
    state: { cities },
  } = useContext(FlightsContext);
  const {
    state: { currentCurrency },
  } = useContext(UserContext);

  const [citiesToShow, setCitiesToShow] = useState([]);

  useEffect(() => {
    if (cities && cities.hasOwnProperty(country_iso2)) {
      setCitiesToShow(cities[country_iso2]);
    }
  }, [cities]);

  return (
    <View style={styles.container}>
      <View>
        {!citiesToShow ? (
          <ActivityIndicator size="large" />
        ) : (
          <ScrollView>
            <EstimatedPrices />
            <Divider
              style={{
                backgroundColor: colors.BLACK,
              }}
            />
            {citiesToShow.map((item, index) => (
              <CityCard
                key={"key" + index}
                item={item.data}
                currency={currentCurrency}
              />
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BG_COLOR,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CitiesScreen;
