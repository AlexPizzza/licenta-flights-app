import React, { useContext } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Divider } from "react-native-elements";

import RecommendedScreenCard from "../../components/recommendedScreen/RecommendedScreenCard";
import EstimatedPrices from "../../components/common/EstimatedPrices";

import { Context as FlightsContext } from "../../context/FlightsContext";
import { Context as UserContext } from "../../context/UserContext";

import colors from "../../../global/colors";

const RecommendedScreen = ({ navigation, route }) => {
  const {
    state: {
      exploreEverywhere,
      recommendedCountries,
      popularDestinations,
      quickGetaways,
      longerTrips,
      lastMinute,
      planAhead,
    },
  } = useContext(FlightsContext);
  const {
    state: { currentCurrency },
  } = useContext(UserContext);

  const { searchType } = route.params;

  const goToCitiesScreen = (title, country_iso2) => {
    navigation.navigate("CitiesScreen", { title, country_iso2 });
  };

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        decelerationRat={0.8}
        data={
          searchType === "recommended"
            ? recommendedCountries
            : searchType === "popular_destinations"
            ? popularDestinations
            : searchType === "quick_getaways"
            ? quickGetaways
            : searchType === "longer_trips"
            ? longerTrips
            : searchType === "last_minute"
            ? lastMinute
            : searchType === "plan_ahead"
            ? planAhead
            : searchType === "explore_everywhere"
            ? exploreEverywhere
            : null
        }
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          if (index === 0) {
            return (
              <View>
                <EstimatedPrices />
                <Divider
                  style={{
                    backgroundColor: colors.BLACK,
                  }}
                />
              </View>
            );
          } else
            return (
              <RecommendedScreenCard
                item={item.data}
                onPress={goToCitiesScreen}
                currency={currentCurrency}
              />
            );
        }}
      />
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

export default RecommendedScreen;
