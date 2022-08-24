import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { ListItem } from "react-native-elements";

import colors from "../../../../global/colors";
import globalStyles from "../../../../global/globalStyles";

const thirdPartyLicensesList = [
  "@expo-google-fonts/inter",
  "@react-native-async-storage/async-storage",
  "@react-native-community/datetimepicker",
  "@react-native-community/masked-view",
  "@react-navigation/material-top-tabs",
  "@react-navigation/native",
  "@react-navigation/stack",
  "axios",
  "expo",
  "expo-app-loading",
  "expo-font",
  "expo-linear-gradient",
  "expo-status-bar",
  "firebase",
  "formik",
  "react",
  "react-dom",
  "react-native",
  "react-native-app-intro-slider",
  "react-native-chart-kit",
  "react-native-dashed-line",
  "react-native-dotenv",
  "react-native-elements",
  "react-native-gesture-handler",
  "react-native-image-picker",
  "react-native-keyboard-aware-scroll-view",
  "react-native-keyboard-aware-view",
  "react-native-material-ripple",
  "react-native-modals",
  "react-native-reanimated",
  "react-native-safe-area-context",
  "react-native-screens",
  "react-native-simple-toast",
  "react-native-svg",
  "react-native-tab-view",
  "react-native-web",
  "react-native-xml2js",
  "yup",
  "expo-image-picker",
];

const ThirdPartyLicensesScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <Text style={styles.headerText}>Third party licenses</Text>
      </View>
      <ScrollView>
        {thirdPartyLicensesList.map((item, index) => (
          <ListItem key={"key" + index} bottomDivider>
            <ListItem.Content>
              <ListItem.Title style={styles.title}>{item}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </ScrollView>
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
    marginBottom: 4,
  },
  title: {
    ...globalStyles.normalText,
  },
  headerView: {
    borderBottomWidth: 1,
  },
});

export default ThirdPartyLicensesScreen;
