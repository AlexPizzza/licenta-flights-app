import React from 'react';
import { Dimensions, Image, StyleSheet } from 'react-native';

import globalStyles from '../../../global/globalStyles';

const { width, height } = Dimensions.get('window');

const CustomImage = ({ image }) => {
  return (
    <Image
      style={[
        styles.imageStyle,
        {
          ...StyleSheet.absoluteFillObject,
          transform: [{ rotateX: '180deg' }],
          height: height * globalStyles.imageHeightRatio
        }
      ]}
      source={image}
    />
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    height: height * globalStyles.imageHeightRatio,
    width
  }
});

export default CustomImage;
