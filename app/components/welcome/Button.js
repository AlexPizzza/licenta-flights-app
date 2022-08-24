import React from "react";
import { StyleSheet, Text } from "react-native";
import colors from "../../../global/colors";

const Button = ({ title }) => {
  return <Text style={styles.text}>{title}</Text>;
};

const styles = StyleSheet.create({
  text: {
    marginTop: 8,
    color: colors.PURPLE,
    fontSize: 20,
  },
});

export default Button;
