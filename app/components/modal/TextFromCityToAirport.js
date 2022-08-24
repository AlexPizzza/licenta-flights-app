import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import globalStyles from '../../../global/globalStyles';

const TextFromCityToAirport = ({ item, isFrom }) => {
  return (
    <View style={styles.textView}>
      {isFrom ? (
        <View>
          <Text style={styles.departureTextStyle}>
            {item.data
              ? item.data.departure_city.city_name +
                ' ' +
                item.data.departure_city.iata_code
              : item.departure_city.city_name +
                ' ' +
                item.departure_city.iata_code}
            {' to'}
          </Text>
          <Text style={styles.arrivalTextStyle}>
            {item.data
              ? item.data.arrival_city.city_name +
                ', ' +
                item.data.arrival_city.airport_name
              : item.arrival_city.city_name +
                ', ' +
                item.arrival_city.airport_name}
          </Text>
        </View>
      ) : (
        <View>
          <Text style={styles.departureTextStyle}>
            {item.data
              ? item.data.arrival_city.city_name +
                ' ' +
                item.data.arrival_city.iata_code
              : item.arrival_city.city_name + ' ' + item.arrival_city.iata_code}
            {' to'}
          </Text>
          <Text style={styles.arrivalTextStyle}>
            {item.data
              ? item.data.departure_city.airport_name
              : item.departure_city.airport_name}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  arrivalTextStyle: {
    ...globalStyles.boldText,
    fontSize: 20
  },
  departureTextStyle: {
    ...globalStyles.normalText,
    fontSize: 18
  },
  textView: {
    margin: 16,
    marginTop: 20
  }
});

export default TextFromCityToAirport;
