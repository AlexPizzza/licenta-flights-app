import React, { useContext } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';

import Ripple from 'react-native-material-ripple';

import { Context as FlightsContext } from '../../context/FlightsContext';

import globalStyles from '../../../global/globalStyles';
import colors from '../../../global/colors';

const RecommendedCard = ({ item, onPress }) => {
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
        <View style={styles.textView}>
          <Text style={styles.itemTitle}>{item.country_name}</Text>
          <Text style={styles.itemDescription}>{item.description}</Text>
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
    marginVertical: 10
  },
  container: {
    flex: 1,
    ...globalStyles.marginHorizontal,
    height: 0.45 * height,
    width: 0.75 * width
  },
  image: {
    alignSelf: 'center',
    borderRadius: 10,
    height: 170,
    marginTop: 10,
    width: 240
  },
  itemDescription: {
    ...globalStyles.normalText,
    color: colors.BLACK,
    marginRight: 4
  },
  itemTitle: {
    ...globalStyles.headerBoldText,
    color: colors.BLACK,
    marginBottom: 5
  },
  textView: {
    bottom: 10,
    left: 5,
    margin: 10,
    position: 'absolute'
  }
});

export default RecommendedCard;
