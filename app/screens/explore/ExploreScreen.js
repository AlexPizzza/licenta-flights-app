import React, { useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";

import SearchBar from "../../components/common/SearchBar";
import ExploreEverywhereCard from "../../components/explore/ExploreEverywhereCard";
import ExploreBasicCard from "../../components/explore/ExploreBasicCard";
import CustomSearchFlightsModal from "../../components/common/CustomSearchFlightsModal";

import popularDestinationsImage from "../../../assets/explore/popular-destinations.jpg";
import quickGetawaysImage from "../../../assets/explore/quick-getaways.jpg";
import longerTripsImage from "../../../assets/explore/longer-trips.jpg";
import lastMinuteImage from "../../../assets/explore/last-minute.jpg";
import planAheadImage from "../../../assets/explore/plan-ahead.jpg";

import globalStyles from "../../../global/globalStyles";
import colors from "../../../global/colors";

const data = [
  {
    id: "1",
    title: "Popular Destinations",
    image: popularDestinationsImage,
  },
  {
    id: "2",
    title: "Quick Getaways",
    image: quickGetawaysImage,
  },
  {
    id: "3",
    title: "Longer Trips",
    image: longerTripsImage,
  },
  {
    id: "4",
    title: "Last Minute",
    image: lastMinuteImage,
  },
  {
    id: "5",
    title: "Plan Ahead",
    image: planAheadImage,
  },
];

const ExploreScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <CustomSearchFlightsModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />

      <View style={styles.headerContainer}>
        <Text style={styles.profileHeaderText}>Explore</Text>
      </View>

      <SearchBar
        sbText="Find your next destination"
        bdRadius={8}
        marginBottom={22}
        onPress={() => setModalVisible(true)}
      />

      <ExploreEverywhereCard />

      <View style={styles.recommendedDestinationsContainer}>
        <Text style={styles.recommendedText}>Recommended Destinations</Text>
      </View>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 14 }}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return <ExploreBasicCard item={item} />;
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BG_COLOR,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    ...globalStyles.marginHorizontal,
  },
  profileHeaderText: {
    ...globalStyles.headerBoldText,
    fontSize: 40,
  },
  recommendedDestinationsContainer: {
    ...globalStyles.marginHorizontal,
    marginVertical: 16,
  },
  recommendedText: {
    ...globalStyles.boldText,
    color: "black",
  },
});

export default ExploreScreen;
