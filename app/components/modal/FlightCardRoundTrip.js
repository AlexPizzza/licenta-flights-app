import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

import Ripple from 'react-native-material-ripple';
import DashedLine from 'react-native-dashed-line';

import colors from '../../../global/colors';
import globalStyles from '../../../global/globalStyles';

const { width, height } = Dimensions.get('window');
const FlightCardRoundTrip = ({
  item,
  setSeeFlightModalVisible,
  setFlightsModalVisible,
  setFlightToShow,
  currency
}) => {
  return (
    <View style={styles.container}>
      <Ripple
        rippleColor={colors.PURPLE}
        rippleOpacity={0.8}
        rippleContainerBorderRadius={20}
        onPress={() => {
          setFlightToShow(item);
          setSeeFlightModalVisible(true);
          setFlightsModalVisible(false);
        }}
        onLongPress={() => {
          setFlightToShow(item);
          setSeeFlightModalVisible(true);
          setFlightsModalVisible(false);
        }}
        delayLongPress={150}
        style={styles.cardView}
      >
        <View style={styles.informationStyle}>
          <View style={styles.departureCityView}>
            <View style={styles.outboundStyle}>
              <View style={styles.outboundView}>
                <Text style={styles.textDepartureStyle}>
                  {item.departure_city.city_iata_code
                    ? item.departure_city.city_iata_code
                    : item.departure_city.iata_code}
                </Text>

                <Text style={styles.cityTextStyle}>
                  {item.departure_city.city_name}
                </Text>

                <Text style={styles.timeStyle}>
                  {item.outbound.departure_time.hours}:
                  {item.outbound.departure_time.minutes}{' '}
                  {parseInt(item.outbound.departure_time.hours) < 12
                    ? 'AM'
                    : 'PM'}
                </Text>
              </View>

              <View style={styles.arrivalCityView}>
                <Text style={styles.textDepartureStyle}>
                  {item.arrival_city.city_iata_code
                    ? item.arrival_city.city_iata_code
                    : item.arrival_city.iata_code}
                </Text>

                <Text style={styles.cityTextStyle}>
                  {item.arrival_city.city_name}
                </Text>

                <Text style={styles.timeStyle}>
                  {item.return.departure_time.hours}:
                  {item.return.departure_time.minutes}{' '}
                  {parseInt(item.return.departure_time.hours) < 12
                    ? 'AM'
                    : 'PM'}
                </Text>
              </View>
            </View>

            <View style={styles.returnStyle}>
              <View style={styles.returnView}>
                <Text style={styles.textArrivalStyle}>
                  {item.arrival_city.city_iata_code
                    ? item.arrival_city.city_iata_code
                    : item.arrival_city.iata_code}
                </Text>

                <Text style={styles.cityTextStyle}>
                  {item.arrival_city.city_name}
                </Text>

                <Text style={styles.timeStyle}>
                  {item.outbound.arrival_time.hours}:
                  {item.outbound.arrival_time.minutes}{' '}
                  {parseInt(item.outbound.arrival_time.hours) < 12
                    ? 'AM'
                    : 'PM'}
                </Text>
              </View>

              <View style={styles.arrivalView}>
                <Text style={styles.textArrivalStyle}>
                  {item.departure_city.city_iata_code
                    ? item.departure_city.city_iata_code
                    : item.departure_city.iata_code}
                </Text>

                <Text style={styles.cityTextStyle}>
                  {item.departure_city.city_name}
                </Text>

                <Text style={styles.timeStyle}>
                  {item.return.arrival_time.hours}:
                  {item.return.arrival_time.minutes}{' '}
                  {parseInt(item.return.arrival_time.hours) < 12 ? 'AM' : 'PM'}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.flightDurationView}>
            <Text style={styles.flightDurationStyle}>Flight time:</Text>
            <Text style={styles.flightDurationStyle}>
              {item.return.flight_duration.hours !== '00'
                ? item.return.flight_duration.hours + 'H'
                : null}{' '}
              {item.return.flight_duration.minutes}M
            </Text>
          </View>
        </View>

        <View style={styles.priceAndAirlineStyle}>
          <DashedLine
            dashLength={12}
            dashGap={12}
            style={styles.dashedLineStyle}
          />

          <View style={styles.textViewAirline}>
            <Text style={styles.airlineText}>{item.airline}</Text>
          </View>

          <View style={styles.textViewPrice}>
            <Text style={styles.itemPrice}>
              {Math.ceil(item.ticket_price / currency.rate / 5) * 5}{' '}
              {currency.currency_iso}
            </Text>
          </View>
        </View>
      </Ripple>
      <View>
        <View style={styles.circleLeftStyle}></View>
        <View style={styles.circleRightStyle}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  airlineText: {
    color: colors.BLACK,
    marginBottom: 5,
    ...globalStyles.boldText,
    fontSize: 20
  },
  arrivalCityView: {
    flexDirection: 'column',
    marginVertical: 4
  },
  arrivalView: {
    flexDirection: 'column',
    marginLeft: 4,
    marginVertical: 4
  },
  cardView: {
    borderRadius: 20,
    elevation: 4,
    flex: 1
  },
  circleLeftStyle: {
    backgroundColor: colors.BLACK,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    bottom: 78,
    elevation: 4,
    height: 40,
    left: 0,
    position: 'absolute',
    width: 20
  },
  circleRightStyle: {
    backgroundColor: colors.BLACK,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    bottom: 78,
    elevation: 4,
    height: 40,
    position: 'absolute',
    right: 0,
    width: 20
  },
  cityTextStyle: {
    ...globalStyles.normalText,
    color: colors.SEARCH_INPUT_TEXT,
    fontSize: 18
  },
  container: {
    flex: 1,
    ...globalStyles.marginHorizontal,
    borderRadius: 22,
    borderWidth: 2,
    height: 0.626 * height,
    marginVertical: 6,
    width: 0.92 * width
  },
  dashedLineStyle: {
    marginTop: -3
  },
  departureCityView: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  flightDurationStyle: {
    ...globalStyles.boldText,
    color: colors.BLACK,
    fontSize: 24
  },
  flightDurationView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  informationStyle: {
    backgroundColor: colors.WHITE,
    borderRadius: 18,
    height: 0.48 * height,
    padding: 8,
    paddingHorizontal: 20
  },
  itemPrice: {
    color: colors.BLACK,
    marginBottom: 5,
    ...globalStyles.boldText,
    fontSize: 20
  },
  outboundStyle: {
    flexDirection: 'column',
    marginVertical: 8
  },
  outboundView: {
    flexDirection: 'column',
    marginBottom: 4
  },
  priceAndAirlineStyle: {
    backgroundColor: colors.WHITE,
    borderRadius: 18,
    height: 0.14 * height
  },
  returnStyle: {
    flexDirection: 'column',
    marginTop: 10
  },
  returnView: {
    flexDirection: 'column',
    marginBottom: 4,
    marginLeft: 4
  },
  textArrivalStyle: {
    ...globalStyles.boldText,
    color: colors.ORANGE,
    fontSize: 26
  },
  textDepartureStyle: {
    ...globalStyles.boldText,
    color: colors.PURPLE,
    fontSize: 26
  },
  textViewAirline: {
    bottom: 10,
    left: 8,
    margin: 4,
    position: 'absolute',
    width: 160
  },
  textViewPrice: {
    bottom: 10,
    margin: 4,
    position: 'absolute',
    right: 8
  },
  timeStyle: {
    ...globalStyles.boldText,
    color: colors.BLACK,
    fontSize: 22
  }
});

export default FlightCardRoundTrip;
