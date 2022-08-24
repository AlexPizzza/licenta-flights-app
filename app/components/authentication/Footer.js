import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import colors from '../../../global/colors';

const Footer = ({ basicText, authText, screenName }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.footerContainer}>
      <Text style={styles.basicTextStyle}>{basicText}</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate(screenName)}
        activeOpacity={0.4}
      >
        <Text style={styles.blueText}> {authText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  basicTextStyle: {
    color: colors.WHITE
  },
  blueText: {
    color: colors.BLUE
  },
  footerContainer: {
    alignItems: 'center',
    backgroundColor: colors.FOOTER,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  }
});

export default Footer;
