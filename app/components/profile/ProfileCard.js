import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';

import Ripple from 'react-native-material-ripple';

import globalStyles from '../../../global/globalStyles';
import colors from '../../../global/colors';

const ProfileCard = ({ title, image, useNavigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.cardView}>
        <Ripple
          rippleColor={colors.PURPLE}
          rippleOpacity={0.8}
          rippleContainerBorderRadius={20}
          style={styles.rippleStyle}
          onPress={useNavigation}
          onLongPress={useNavigation}
          delayLongPress={150}
        >
          <Image source={image} style={styles.image} />
          <Text style={styles.textStyle}>{title}</Text>
        </Ripple>
      </View>
    </View>
  );
};

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  cardView: {
    backgroundColor: colors.WHITE,
    borderRadius: 20,
    elevation: 10,
    flex: 1,
    marginHorizontal: 4,
    marginVertical: 10,
    shadowColor: colors.BLACK
  },
  container: {
    height: 0.3 * height,
    width: 0.45 * width
  },
  image: {
    height: 80,
    marginBottom: 26,
    width: 80
  },
  rippleStyle: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingBottom: 10
  },
  textStyle: {
    ...globalStyles.normalText,
    marginBottom: 6
  }
});

export default ProfileCard;
