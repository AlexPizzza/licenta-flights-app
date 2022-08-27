import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

import Toast from 'react-native-toast-message';
import Ripple from 'react-native-material-ripple';
import { Entypo } from '@expo/vector-icons';

import globalStyles from '../../../global/globalStyles';
import colors from '../../../global/colors';

const EstimatedPrices = () => {
  return (
    <Ripple
      rippleColor={colors.GRAY}
      rippleOpacity={0.9}
      rippleContainerBorderRadius={12}
      style={styles.container}
      onPress={() => {
        Toast.show({
          type: 'info',
          text1: 'Estimated lowest prices per person',
          text2: '(Economy class for a Round Trip flight)'
        });
      }}
      onLongPress={() => {
        Toast.show({
          type: 'info',
          text1: 'Estimated lowest prices per person',
          text2: '(Economy class for a Round Trip flight)'
        });
      }}
      delayLongPress={150}
    >
      <Entypo name='info-with-circle' size={20} style={styles.iconStyle} />
      <View style={styles.textView}>
        <Text style={styles.textStyle}>* Estimated lowest prices</Text>
      </View>
    </Ripple>
  );
};

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
    width
  },
  iconStyle: {
    color: colors.LIGHT_GRAY,
    marginRight: -4
  },
  textStyle: {
    ...globalStyles.normalText,
    ...globalStyles.marginHorizontal,
    fontSize: 18
  },
  textView: {
    alignItems: 'center'
  }
});

export default EstimatedPrices;
