import React, { useContext } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';

import Ripple from 'react-native-material-ripple';

import { Context as FlightsContext } from '../../context/FlightsContext';

import globalStyles from '../../../global/globalStyles';
import colors from '../../../global/colors';

const RecommendedScreenCard = ({ item, onPress, currency }) => {
  const {
    state: { cities, userCoords },
    addCities
  } = useContext(FlightsContext);

  const addCitiesBackToList = () => {
    addCities(item.country_iso2, userCoords, cities);
  };

  return (
    <View style={styles.container}>
      <Ripple
        rippleColor={colors.WHITE}
        rippleOpacity={0.8}
        rippleContainerBorderRadius={20}
        onPress={() => {
          addCitiesBackToList();

          onPress(item.country_name, item.country_iso2);
        }}
        onLongPress={() => {
          addCitiesBackToList();

          onPress(item.country_name, item.country_iso2);
        }}
        delayLongPress={150}
        style={styles.cardView}
      >
        <Image style={styles.image} source={{ uri: item.image }} />
        <View style={styles.textViewCountryName}>
          <Text style={styles.itemTitle}>{item.country_name}</Text>
        </View>
        <View style={styles.textViewPrice}>
          <Text style={styles.itemPrice}>
            from {Math.ceil(item.price / currency.rate / 5) * 5}{' '}
            {currency.currency_iso}
          </Text>
        </View>
      </Ripple>
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
    flex: 1,
    ...globalStyles.marginHorizontal,
    height: 0.35 * height,
    width: 0.92 * width
  },
  image: {
    alignSelf: 'center',
    borderRadius: 10,
    height: 200,
    marginTop: 10,
    width: 300
  },
  itemPrice: {
    color: colors.WHITE,
    marginBottom: 5,
    ...globalStyles.normalText,
    fontSize: 18
  },
  itemTitle: {
    color: colors.WHITE,
    marginBottom: 5,
    ...globalStyles.headerBoldText,
    fontSize: 20
  },
  textViewCountryName: {
    bottom: 10,
    left: 12,
    margin: 10,
    position: 'absolute',
    width: 150
  },
  textViewPrice: {
    bottom: 10,
    margin: 10,
    position: 'absolute',
    right: 12
  }
});

export default RecommendedScreenCard;
