import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Ripple from 'react-native-material-ripple';

import colors from '../../../global/colors';
import globalStyles from '../../../global/globalStyles';

const RippleText = ({
  text,
  isRoundtripSelected,
  isOnewaySelected,
  setIsRoundTrip,
  onPress
}) => {
  const _setIsRoundTrip = () => {
    text === 'ROUNDTRIP' ? setIsRoundTrip(true) : setIsRoundTrip(false);
    onPress();
  };

  return (
    <Ripple
      rippleColor={colors.ORANGE}
      rippleOpacity={0.9}
      rippleContainerBorderRadius={12}
      style={
        isRoundtripSelected || isOnewaySelected
          ? styles.activeRippleStyle
          : styles.defaultRippleStyle
      }
      onPress={_setIsRoundTrip}
      onLongPress={_setIsRoundTrip}
      delayLongPress={150}
    >
      <Text
        style={
          isRoundtripSelected
            ? [styles.textStyle, { color: colors.WHITE }]
            : isOnewaySelected
            ? [styles.textStyle, { color: colors.WHITE }]
            : styles.textStyle
        }
      >
        {text}
      </Text>
    </Ripple>
  );
};

const styles = StyleSheet.create({
  activeRippleStyle: {
    backgroundColor: colors.ORANGE,
    borderRadius: 10,
    padding: 8
  },
  defaultRippleStyle: {
    borderRadius: 10,
    padding: 8
  },
  textStyle: {
    ...globalStyles.normalText,
    color: colors.BLACK
  }
});

export default RippleText;
