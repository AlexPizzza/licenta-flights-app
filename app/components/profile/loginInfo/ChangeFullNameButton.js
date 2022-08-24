import React from 'react';
import { StyleSheet, Text } from 'react-native';

import Ripple from 'react-native-material-ripple';

import colors from '../../../../global/colors';
import globalStyles from '../../../../global/globalStyles';

const ChangeFullNameButton = ({ onPress }) => {
  return (
    <Ripple
      rippleColor={colors.WHITE}
      rippleOpacity={0.8}
      rippleContainerBorderRadius={12}
      style={styles.buttonStyle}
      onPress={onPress}
      onLongPress={onPress}
      delayLongPress={150}
    >
      <Text style={styles.titleStyle}>Change Full Name</Text>
    </Ripple>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: colors.ORANGE,
    borderRadius: 40,
    height: 40,
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 20,
    width: 250
  },
  titleStyle: {
    ...globalStyles.boldText,
    color: colors.WHITE,
    fontSize: 20
  }
});

export default ChangeFullNameButton;
