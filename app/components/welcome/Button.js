import React from 'react';
import { StyleSheet, Text } from 'react-native';
import colors from '../../../global/colors';

const Button = ({ title }) => {
  return <Text style={styles.text}>{title}</Text>;
};

const styles = StyleSheet.create({
  text: {
    color: colors.PURPLE,
    fontSize: 20,
    marginTop: 8
  }
});

export default Button;
