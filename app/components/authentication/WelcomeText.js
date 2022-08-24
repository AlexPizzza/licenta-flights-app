import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import globalStyles from '../../../global/globalStyles';

const WelcomeText = ({ headerText, normalText }) => {
  return (
    <View style={styles.welcomeTextStyle}>
      <Text style={[globalStyles.headerBoldText, styles.headerText]}>
        {headerText}
      </Text>
      <Text style={[globalStyles.normalText, styles.normalText]}>
        {normalText}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontWeight: 'bold',
    marginBottom: 4
  },
  normalText: {
    textAlign: 'center'
  },
  welcomeTextStyle: {
    alignItems: 'center',
    flex: 1,
    marginBottom: 50,
    marginTop: 20
  }
});

export default WelcomeText;
