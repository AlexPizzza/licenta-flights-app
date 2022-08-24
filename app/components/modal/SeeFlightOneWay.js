import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import TextFromCityToAirport from '../modal/TextFromCityToAirport';
import FlightInfoOneWay from './FlightInfoOneWay';

import colors from '../../../global/colors';
import globalStyles from '../../../global/globalStyles';

const SeeFlightOneWay = ({ item, currency }) => {
  const [departureDate, setDepartureDate] = useState('');

  useEffect(() => {
    let splitDepartureDate;
    if (item.data) {
      if (item.data.departure_date instanceof Date) {
        splitDepartureDate = item.data.departure_date.toString().split(' ');
      } else {
        splitDepartureDate = item.data.departure_date
          .toDate()
          .toString()
          .split(' ');
      }
    } else {
      if (item.departure_date instanceof Date) {
        splitDepartureDate = item.departure_date.toString().split(' ');
      } else {
        splitDepartureDate = item.departure_date.toDate().toString().split(' ');
      }
    }

    const departureDateToShow =
      splitDepartureDate[0] +
      ', ' +
      splitDepartureDate[1] +
      ' ' +
      splitDepartureDate[2] +
      ', ' +
      splitDepartureDate[3];

    setDepartureDate(departureDateToShow);
  }, []);

  return (
    <View>
      <View style={styles.outerView}>
        <View style={styles.innerView}>
          <View style={styles.dateView}>
            <Text style={styles.dateTextStyle}>{departureDate}</Text>
          </View>

          <TextFromCityToAirport item={item} isFrom={true} />

          <FlightInfoOneWay item={item} />
        </View>
      </View>

      <View style={styles.priceView}>
        <Text style={styles.headerTextStyle}>
          Airline: {item.data ? item.data.airline : item.airline}
        </Text>
        <Text style={styles.headerTextStyle}>
          Ticket price:{' '}
          {item.data
            ? Math.ceil(item.data.ticket_price / currency.rate / 5) * 5
            : Math.ceil(item.ticket_price / currency.rate / 5) * 5}{' '}
          {currency.currency_iso}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dateTextStyle: {
    ...globalStyles.boldText,
    color: colors.WHITE,
    fontSize: 20,
    marginHorizontal: 6
  },
  dateView: {
    alignItems: 'center',
    backgroundColor: colors.PURPLE,
    borderRadius: 10,
    borderWidth: 1,
    height: 36,
    justifyContent: 'center',
    left: 10,
    padding: 2,
    position: 'absolute',
    top: -20,
    width: 200
  },
  headerTextStyle: {
    ...globalStyles.boldText,
    ...globalStyles.marginHorizontal,
    color: colors.BLACK,
    fontSize: 24,
    marginTop: 12
  },
  innerView: {
    backgroundColor: colors.WHITE,
    borderRadius: 4,
    elevation: 4
  },
  outerView: {
    ...globalStyles.marginHorizontal,
    borderRadius: 4,
    borderWidth: 1,
    marginTop: 26
  },
  priceView: {
    alignItems: 'center',
    marginTop: 2
  }
});

export default SeeFlightOneWay;
