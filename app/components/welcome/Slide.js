import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';

import colors from '../../../global/colors';
import globalStyles from '../../../global/globalStyles';

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

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.BG_WELCOME,
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 40
  },
  imageStyle: {
    aspectRatio: 1,
    height: undefined,
    marginTop: 20,
    width
  },
  normalText: {
    ...globalStyles.marginHorizontal,
    fontSize: 20,
    marginTop: 10,
    textAlign: 'center'
  }
});

export default Slide;
