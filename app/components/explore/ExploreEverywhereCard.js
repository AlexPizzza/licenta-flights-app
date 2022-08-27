import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Ripple from 'react-native-material-ripple';

import exploreEverywhereImage from '../../../assets/explore/explore-everywhere.jpg';

import colors from '../../../global/colors';
import globalStyles from '../../../global/globalStyles';

const ExploreEverywhereCard = () => {
  const navigation = useNavigation();

  const goToExploreCountries = () => {
    navigation.navigate('RecommendedScreen', {
      title: 'Explore Everywhere',
      searchType: 'explore_everywhere'
    });
  };

  return (
    <View style={styles.container}>
      <Ripple
        rippleColor={colors.EXPLORE_CARD_TAP}
        rippleOpacity={0.4}
        rippleContainerBorderRadius={8}
        onPress={goToExploreCountries}
        onLongPress={goToExploreCountries}
        delayLongPress={150}
        style={styles.rippleContainer}
      >
        <Image source={exploreEverywhereImage} style={styles.imageStyle} />
        <View style={styles.innerContainer}>
          <View style={styles.opaqueContainer} />
          <Text style={styles.text}>Explore Everywhere</Text>
        </View>
      </Ripple>
    </View>
  );
};

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    height: height / 3,
    ...globalStyles.marginHorizontal,
    elevation: 30,
    marginBottom: 8,
    shadowColor: colors.BLACK
  },
  imageStyle: {
    borderRadius: 8,
    height: height / 3,
    width: width - 2 * globalStyles.marginHorizontal.marginHorizontal
  },
  innerContainer: {
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
    position: 'absolute',
    top: 95,
    width: 250
  },
  opaqueContainer: {
    backgroundColor: colors.BLACK,
    borderRadius: 8,
    height: 40,
    opacity: 0.4,
    width: 250
  },
  rippleContainer: {
    alignItems: 'center',
    height: height / 3
  },
  text: {
    color: colors.ORANGE,
    position: 'absolute',
    ...globalStyles.headerText,
    fontSize: 22
  }
});

export default ExploreEverywhereCard;
