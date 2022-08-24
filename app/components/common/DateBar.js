import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Ripple from 'react-native-material-ripple';
import { Context as FlightsContext } from '../../context/FlightsContext';

import colors from '../../../global/colors';
import globalStyles from '../../../global/globalStyles';

const DateBar = ({ text, bdRadius, onPress }) => {
  const {
    state: { date }
  } = useContext(FlightsContext);

  const [setCurrentDate] = useState('');

  useEffect(() => {
    const dateSplit = date.split(' ');
    setCurrentDate(dateSplit[1] + ', ' + dateSplit[3]);
  }, []);

  return (
    <Ripple
      rippleColor={colors.WHITE}
      rippleOpacity={0.8}
      rippleContainerBorderRadius={bdRadius}
      style={[styles.ripple, { borderRadius: bdRadius }]}
      onPress={onPress}
      onLongPress={onPress}
      delayLongPress={150}
    >
      <View style={styles.innerView}>
        <Text style={styles.text}>Date of travel: </Text>
        <Text style={{ color: colors.WHITE, ...globalStyles.normalText }}>
          {text}
        </Text>
      </View>
    </Ripple>
  );
};

const styles = StyleSheet.create({
  innerView: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  ripple: {
    padding: 12,
    ...globalStyles.marginHorizontal,
    backgroundColor: colors.ORANGE,
    marginBottom: 10
  },
  text: {
    color: colors.WHITE,
    ...globalStyles.normalText,
    marginLeft: 10
  }
});

export default DateBar;
