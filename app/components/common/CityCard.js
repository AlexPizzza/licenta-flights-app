import React, { useContext, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';

import Ripple from 'react-native-material-ripple';

import CustomSearchFlightsModal from '../../components/common/CustomSearchFlightsModal';

import { Context as FlightsContext } from '../../context/FlightsContext';

import colors from '../../../global/colors';
import globalStyles from '../../../global/globalStyles';

const CityCard = ({ item, currency }) => {
  const { addWhereToCity } = useContext(FlightsContext);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <CustomSearchFlightsModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <Ripple
        rippleColor={colors.WHITE}
        rippleOpacity={0.8}
        rippleContainerBorderRadius={20}
        onPress={() => {
          addWhereToCity(item);
          setTimeout(() => {
            setModalVisible(true);
          }, 200);
        }}
        onLongPress={() => {
          addWhereToCity(item);
          setTimeout(() => {
            setModalVisible(true);
          }, 200);
        }}
        delayLongPress={150}
        style={styles.cardView}
      >
        <Image style={styles.image} source={{ uri: item.image }} />
        <View style={styles.textViewCountryName}>
          <Text style={styles.itemTitle}>{item.city_name}</Text>
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
    borderRadius: 20,
    height: 200,
    marginTop: 8,
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
    bottom: 5,
    left: 12,
    margin: 10,
    position: 'absolute',
    width: 160
  },
  textViewPrice: {
    bottom: 5,
    margin: 10,
    position: 'absolute',
    right: 12
  }
});

export default CityCard;
