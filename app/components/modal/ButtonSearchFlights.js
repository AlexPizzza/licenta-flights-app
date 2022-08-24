import React, { useContext } from 'react';
import { StyleSheet, Text } from 'react-native';

import Ripple from 'react-native-material-ripple';
import Toast from 'react-native-simple-toast';

import {
  generatePriceForRoundTripFlights,
  generatePriceForOneWayFlights
} from '../../functions/generatePricesForFlights';
import generateTrueOrFalseFlight from '../../functions/generateTrueOrFalseFlight';
import { Context as FlightsContext } from '../../context/FlightsContext';

import colors from '../../../global/colors';
import globalStyles from '../../../global/globalStyles';

const ButtonSearchFlights = ({
  whereFromText,
  whereToText,
  isRoundTrip,
  selectedFirstDate,
  selectedSecondDate,
  selectedThirdDate,
  departureCity,
  arrivalCity,
  setFlightsModalVisible,
  setModalVisible,
  setFlightsToShow
}) => {
  const {
    state: { flightsRoundTrip, flightsOneWay },
    addFlightsOneWay,
    addFlightsRoundTrip,
    addToStatistics
  } = useContext(FlightsContext);

  const treatAsUTC = (date) => {
    var result = new Date(date);
    result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
    return result;
  };

  const daysBetween = (startDate, endDate) => {
    var millisecondsPerDay = 24 * 60 * 60 * 1000;
    return (treatAsUTC(endDate) - treatAsUTC(startDate)) / millisecondsPerDay;
  };

  const onButtonPress = async () => {
    if (whereFromText === 'Where from?') {
      Toast.show(
        '"Where from?" field must contain a Country, City or Airport.',
        Toast.LONG
      );
    } else if (whereToText === 'Where to?') {
      Toast.show(
        '"Where to?" field must contain a Country, City or Airport.',
        Toast.LONG
      );
    } else {
      let flightInList = null;
      await addToStatistics(departureCity, arrivalCity);

      if (isRoundTrip) {
        if (flightsRoundTrip.length !== 0) {
          flightsRoundTrip.forEach((flight) => {
            const splitDepartureDate = flight.departure_date
              .toString()
              .split(' ');
            const splitArrivalDate = flight.arrival_date.toString().split(' ');

            const monthDepartureDate = splitDepartureDate[1];
            const dayDepartureDate = splitDepartureDate[2];

            const monthArrivalDate = splitArrivalDate[1];
            const dayArrivalDate = splitArrivalDate[2];

            const splitSelectedFirstDate = selectedFirstDate
              .toString()
              .split(' ');
            const splitSelectedSecondDate = selectedSecondDate
              .toString()
              .split(' ');

            const monthSelectedFirstDate = splitSelectedFirstDate[1];
            const daySelectedFirstDate = splitSelectedFirstDate[2];

            const monthSelectedSecondDate = splitSelectedSecondDate[1];
            const daySelectedSecondDate = splitSelectedSecondDate[2];

            if (
              departureCity === flight.departure_city &&
              arrivalCity === flight.arrival_city &&
              monthDepartureDate === monthSelectedFirstDate &&
              dayDepartureDate === daySelectedFirstDate &&
              monthArrivalDate === monthSelectedSecondDate &&
              dayArrivalDate === daySelectedSecondDate
            ) {
              flightInList = flight;
            }
          });
        }
      } else {
        if (flightsOneWay.length !== 0) {
          flightsOneWay.forEach((flight) => {
            const splitDepartureDate = flight.departure_date
              .toString()
              .split(' ');

            const monthDepartureDate = splitDepartureDate[1];
            const dayDepartureDate = splitDepartureDate[2];

            const splitSelectedThirdDate = selectedThirdDate
              .toString()
              .split(' ');

            const monthSelectedThirdDate = splitSelectedThirdDate[1];
            const daySelectedThirdDate = splitSelectedThirdDate[2];

            if (
              departureCity === flight.departure_city &&
              arrivalCity === flight.arrival_city &&
              monthDepartureDate === monthSelectedThirdDate &&
              dayDepartureDate === daySelectedThirdDate
            ) {
              flightInList = flight;
            }
          });
        }
      }

      if (flightInList) {
        setFlightsToShow(flightInList.flights_list);
      } else {
        let daysBetweenDates;

        if (isRoundTrip) {
          daysBetweenDates = daysBetween(new Date(), selectedFirstDate);
        } else {
          daysBetweenDates = daysBetween(new Date(), selectedThirdDate);
        }

        let isTrue = generateTrueOrFalseFlight(
          departureCity,
          arrivalCity,
          daysBetweenDates
        );

        let flights = [];

        if (isTrue) {
          if (isRoundTrip) {
            flights = generatePriceForRoundTripFlights(
              departureCity,
              arrivalCity,
              daysBetweenDates,
              selectedFirstDate,
              selectedSecondDate
            );
          } else {
            flights = generatePriceForOneWayFlights(
              departureCity,
              arrivalCity,
              daysBetweenDates,
              selectedThirdDate
            );
          }
        }
        if (isRoundTrip) {
          addFlightsRoundTrip(
            departureCity,
            arrivalCity,
            selectedFirstDate,
            selectedSecondDate,
            flights
          );
        } else {
          addFlightsOneWay(
            departureCity,
            arrivalCity,
            selectedThirdDate,
            flights
          );
        }
        setFlightsToShow(flights);
      }

      setFlightsModalVisible(true);
      setModalVisible(false);
    }
  };

  return (
    <Ripple
      rippleColor={colors.WHITE}
      rippleOpacity={0.8}
      rippleContainerBorderRadius={12}
      style={styles.buttonStyle}
      onPress={onButtonPress}
      onLongPress={onButtonPress}
      delayLongPress={150}
    >
      <Text style={styles.titleStyle}>Search Flight</Text>
    </Ripple>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.ORANGE,
    borderRadius: 40,
    height: 40,
    justifyContent: 'center',
    marginTop: 20,
    width: 250
  },
  titleStyle: {
    color: colors.WHITE,
    ...globalStyles.boldText,
    fontSize: 20
  }
});

export default ButtonSearchFlights;
