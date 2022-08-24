import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Ripple from 'react-native-material-ripple';

import { Feather, FontAwesome5 } from '@expo/vector-icons';

import colors from '../../../global/colors';
import globalStyles from '../../../global/globalStyles';

const SearchBar = ({
  sbText,
  bdRadius,
  marginBottom,
  onPress,
  isDate,
  isDeparture,
  isRoundTrip
}) => {
  return (
    <Ripple
      rippleColor={colors.SILVER}
      rippleOpacity={0.8}
      rippleContainerBorderRadius={bdRadius}
      style={
        isRoundTrip
          ? { ...styles.dateRipple, borderRadius: bdRadius, marginBottom }
          : { ...styles.ripple, borderRadius: bdRadius, marginBottom }
      }
      onPress={onPress}
      onLongPress={onPress}
      delayLongPress={150}
    >
      <View style={styles.innerView}>
        {isDate ? (
          <Feather name='calendar' size={20} color={colors.PURPLE} />
        ) : isDeparture ? (
          <FontAwesome5
            name='plane-departure'
            size={20}
            color={colors.PURPLE}
          />
        ) : (
          <FontAwesome5 name='plane-arrival' size={20} color={colors.PURPLE} />
        )}
        <Text style={styles.text}>{sbText}</Text>
      </View>
    </Ripple>
  );
};

const styles = StyleSheet.create({
  dateRipple: {
    backgroundColor: colors.SEARCH_CONTAINER,
    paddingHorizontal: 14,
    paddingVertical: 12
  },
  innerView: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  ripple: {
    padding: 12,
    ...globalStyles.marginHorizontal,
    backgroundColor: colors.SEARCH_CONTAINER
  },
  text: {
    color: colors.BLACK,
    ...globalStyles.normalText,
    marginHorizontal: 10
  }
});

export default SearchBar;
