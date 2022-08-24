import React, { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import Ripple from "react-native-material-ripple";

import { FontAwesome5 } from "@expo/vector-icons";

import RecommendedCard from "../../components/search/RecommendedCard";
import SearchBar from "../../components/common/SearchBar";
import CustomSearchFlightsModal from "../../components/common/CustomSearchFlightsModal";

import { Context as UserContext } from "../../context/UserContext";
import { Context as FlightsContext } from "../../context/FlightsContext";
import { auth } from "../../config/firebase";

import useLocation from "../../hooks/useLocation";

import globalStyles from "../../../global/globalStyles";
import colors from "../../../global/colors";

const SearchScreen = ({ navigation }) => {
  const { state } = useContext(UserContext);
  const {
    state: { recommendedCountries },
  } = useContext(FlightsContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);
  const [displayName, setDisplayName] = useState("");
  const isFocused = useIsFocused();

  let [locationText] = useLocation();

  const getFilteredResults = () => {
    const filteredList = recommendedCountries.filter((result) => {
      const country_iso2 = result.data.country_iso2;
      return (
        country_iso2 === "GR" ||
        country_iso2 === "GB" ||
        country_iso2 === "FR" ||
        country_iso2 === "ES" ||
        country_iso2 === "CH"
      );
    });

    return filteredList;
  };

  useEffect(() => {
    const filteredResults = getFilteredResults();
    setFilteredResults(filteredResults);
    if (auth.currentUser.displayName) {
      setDisplayName(auth.currentUser.displayName);
    }
  }, []);

  useEffect(() => {
    if (isFocused) {
      if (
        auth.currentUser.displayName &&
        displayName !== auth.currentUser.displayName
      ) {
        setDisplayName(auth.currentUser.displayName);
      }
    }
  }, [isFocused]);

  const goToRecommendedScreen = () => {
    navigation.navigate("Recommended", { searchType: "recommended" });
  };

  const goToCitiesScreen = (title, country_iso2) => {
    navigation.navigate("CitiesScreen", { title, country_iso2 });
  };

  return (
    <View style={styles.container}>
      <CustomSearchFlightsModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <View style={styles.location}>
        <FontAwesome5 name="map-marker-alt" size={28} color={colors.ORANGE} />

        <View style={styles.locationText}>
          <Text style={globalStyles.headerBoldText}>
            {state.userLocation !== undefined
              ? state.userLocation.split(",")[0] + ","
              : locationText.split(",")[0] + ","}
          </Text>
          <Text style={globalStyles.headerText}>
            {state.userLocation !== undefined
              ? state.userLocation.split(",")[1]
              : locationText.split(",")[1]}
          </Text>
        </View>
      </View>

      <View style={styles.nameContainer}>
        <Text style={globalStyles.headerText}>Hi</Text>
        <Text style={globalStyles.headerBoldText}>
          {displayName !== "" ? " " + displayName.split(" ")[0] : null},
        </Text>
      </View>

      <View style={styles.welcomeTextContainer}>
        <Text style={styles.welcomeText}>Let's Discover a New Adventure!</Text>
      </View>

      <SearchBar
        sbText="Search your next flight"
        bdRadius={20}
        onPress={() => setModalVisible(true)}
      />

      <View style={styles.recommended_viewAll_Container}>
        <Text style={globalStyles.normalText}>Recommended</Text>

        <Ripple
          rippleColor={colors.PURPLE}
          rippleOpacity={0.8}
          rippleContainerBorderRadius={12}
          style={{ padding: 8 }}
          onPress={goToRecommendedScreen}
          onLongPress={goToRecommendedScreen}
          delayLongPress={150}
        >
          <Text style={styles.viewAll}>View All</Text>
        </Ripple>
      </View>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRat={0.8}
        data={filteredResults}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <RecommendedCard item={item.data} onPress={goToCitiesScreen} />
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
  },
  location: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  locationText: {
    marginHorizontal: 10,
    flexDirection: "row",
  },
  nameContainer: {
    flexDirection: "row",
    alignContent: "center",
    ...globalStyles.marginHorizontal,
    marginVertical: 8,
  },
  recommended_viewAll_Container: {
    ...globalStyles.marginHorizontal,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sbContainerStyle: {
    marginHorizontal: 8,
    marginVertical: 14,
  },
  sbInputContainerStyle: {
    borderRadius: 26,
    backgroundColor: colors.SEARCH_CONTAINER,
  },
  sbInputStyle: {
    color: colors.SEARCH_INPUT_TEXT,
    ...globalStyles.normalText,
  },
  sbSearchIcon: {
    color: colors.PURPLE,
    paddingLeft: 6,
  },
  viewAll: {
    ...globalStyles.normalText,
    color: colors.ORANGE,
  },
  welcomeTextContainer: {
    ...globalStyles.marginHorizontal,
    marginVertical: 4,
  },
  welcomeText: {
    ...globalStyles.normalText,
    color: colors.GRAY_SUBHEADER_TEXT,
  },
});

export default SearchScreen;
