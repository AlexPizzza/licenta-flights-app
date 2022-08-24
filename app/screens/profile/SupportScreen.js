import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { ListItem } from "react-native-elements";
import Ripple from "react-native-material-ripple";

import RatingModal from "../../components/profile/support/RatingModal";

import colors from "../../../global/colors";
import globalStyles from "../../../global/globalStyles";

const feedback = [
  {
    title: "Rating",
  },
];

const termsAndPolicies = [
  {
    title: "Third-party licenses",
  },
];

const SupportScreen = ({ navigation }) => {
  const [ratingModalVisible, setRatingModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Support</Text>

      <Text style={styles.subHeaderText}>Feedback</Text>

      <RatingModal
        ratingModalVisible={ratingModalVisible}
        setRatingModalVisible={setRatingModalVisible}
      />
      <View style={{ marginBottom: 30 }}>
        {feedback.map((item, index) => (
          <Ripple
            key={index}
            rippleColor={colors.PURPLE}
            rippleOpacity={0.8}
            onPress={() => {
              if (item.title === "Rating") {
                setRatingModalVisible(true);
              }
            }}
            onLongPress={() => {
              if (item.title === "Rating") {
                setRatingModalVisible(true);
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

      <Text style={styles.subHeaderText}>Third-party licenses</Text>
      {termsAndPolicies.map((item, index) => (
        <Ripple
          key={index}
          rippleColor={colors.PURPLE}
          rippleOpacity={0.8}
          onPress={() => {
            if (item.title === "Third-party licenses") {
              navigation.navigate("ThirdPartyLicenses");
            }
          }}
          onLongPress={() => {
            if (item.title === "Third-party licenses") {
              navigation.navigate("ThirdPartyLicenses");
            }
          }}
          delayLongPress={150}
        >
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title style={styles.title}>{item.title}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron
              size={20}
              iconStyle={{ color: colors.PURPLE_LIGHT }}
            />
          </ListItem>
        </Ripple>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BG_COLOR,
  },
  headerText: {
    ...globalStyles.headerBoldText,
    fontSize: 40,
    ...globalStyles.marginHorizontal,
    marginBottom: 30,
  },
  subHeaderText: {
    ...globalStyles.headerBoldText,
    fontSize: 30,
    ...globalStyles.marginHorizontal,
  },
  title: {
    ...globalStyles.normalText,
  },
});

export default SupportScreen;
