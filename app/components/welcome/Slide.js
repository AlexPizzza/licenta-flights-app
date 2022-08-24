import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";

import colors from "../../../global/colors";
import globalStyles from "../../../global/globalStyles";

const Slide = ({ item }) => {
  const { title, description, image } = item;

  return (
    <View style={styles.container}>
      <Text style={globalStyles.headerBoldText}>{title}</Text>
      <Image style={styles.imageStyle} source={image} />
      <Text style={[globalStyles.normalText, styles.normalText]}>
        {description}
      </Text>
    </View>
  );
};

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 40,
    backgroundColor: colors.BG_WELCOME,
  },
  imageStyle: {
    width,
    height: undefined,
    aspectRatio: 1,
    marginTop: 20,
  },
  normalText: {
    ...globalStyles.marginHorizontal,
    textAlign: "center",
    fontSize: 20,
    marginTop: 10,
  },
});

export default Slide;
