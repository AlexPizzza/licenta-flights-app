import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import DashedLine from 'react-native-dashed-line';

import colors from '../../../global/colors';
import globalStyles from '../../../global/globalStyles';

const FlightInfoRoundTrip = ({ item, isFrom }) => {
  const [outboundDepartureTime, setOutboundDepartureTime] = useState('');
  const [outboundArrivalTime, setOutboundArrivalTime] = useState('');

  const [returnDepartureTime, setReturnDepartureTime] = useState('');
  const [returnArrivalTime, setReturnArrivalTime] = useState('');

  useEffect(() => {
    if (item.data) {
      if (parseInt(item.data.outbound.departure_time.hours) < 12) {
        setOutboundDepartureTime('AM');
      } else {
        setOutboundDepartureTime('PM');
      }

      if (parseInt(item.data.outbound.arrival_time.hours) < 12) {
        setOutboundArrivalTime('AM');
      } else {
        setOutboundArrivalTime('PM');
      }

      if (parseInt(item.data.return.departure_time.hours) < 12) {
        setReturnDepartureTime('AM');
      } else {
        setReturnDepartureTime('PM');
      }

      if (parseInt(item.data.return.arrival_time.hours) < 12) {
        setReturnArrivalTime('AM');
      } else {
        setReturnArrivalTime('PM');
      }
    } else {
      if (parseInt(item.outbound.departure_time.hours) < 12) {
        setOutboundDepartureTime('AM');
      } else {
        setOutboundDepartureTime('PM');
      }

      if (parseInt(item.outbound.arrival_time.hours) < 12) {
        setOutboundArrivalTime('AM');
      } else {
        setOutboundArrivalTime('PM');
      }

      if (parseInt(item.return.departure_time.hours) < 12) {
        setReturnDepartureTime('AM');
      } else {
        setReturnDepartureTime('PM');
      }

      if (parseInt(item.return.arrival_time.hours) < 12) {
        setReturnArrivalTime('AM');
      } else {
        setReturnArrivalTime('PM');
      }
    }
  }, []);
  return (
    <View style={styles.container}>
      {isFrom ? (
        <View style={styles.outerView}>
          <View style={styles.timeView}>
            <Text style={styles.timeTextStyle}>
              {item.data
                ? item.data.outbound.departure_time.hours +
                  ':' +
                  item.data.outbound.departure_time.minutes +
                  ' ' +
                  outboundDepartureTime
                : item.outbound.departure_time.hours +
                  ':' +
                  item.outbound.departure_time.minutes +
                  ' ' +
                  outboundDepartureTime}
            </Text>
            <Text style={styles.flightDurationStyle}>
              {item.data
                ? item.data.outbound.flight_duration.hours +
                  'h ' +
                  item.data.outbound.flight_duration.minutes +
                  'm'
                : item.outbound.flight_duration.hours +
                  'h ' +
                  item.outbound.flight_duration.minutes +
                  'm'}
            </Text>
            <Text style={styles.timeTextStyle}>
              {item.data
                ? item.data.outbound.arrival_time.hours +
                  ':' +
                  item.data.outbound.arrival_time.minutes +
                  ' ' +
                  outboundArrivalTime
                : item.outbound.arrival_time.hours +
                  ':' +
                  item.outbound.arrival_time.minutes +
                  ' ' +
                  outboundArrivalTime}
            </Text>
          </View>

          <View style={styles.circlesView}>
            <View style={styles.topCircle} />
            <DashedLine
              dashGap={0}
              dashThickness={2}
              axis='vertical'
              style={styles.dashedLineStyle}
            />
            <View style={styles.bottomCircle} />
          </View>

          <View style={styles.airportView}>
            <Text style={[styles.airportTextStyle, styles.topText]}>
              {item.data
                ? item.data.departure_city.airport_name
                : item.departure_city.airport_name}
            </Text>
            <Text style={styles.airportTextStyle}>
              {item.data
                ? item.data.arrival_city.airport_name
                : item.arrival_city.airport_name}
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.outerView}>
          <View style={styles.timeView}>
            <Text style={styles.timeTextStyle}>
              {item.data
                ? item.data.return.departure_time.hours +
                  ':' +
                  item.data.return.departure_time.minutes +
                  ' ' +
                  returnDepartureTime
                : item.return.departure_time.hours +
                  ':' +
                  item.return.departure_time.minutes +
                  ' ' +
                  returnDepartureTime}
            </Text>
            <Text style={styles.flightDurationStyle}>
              {item.data
                ? item.data.return.flight_duration.hours +
                  'h ' +
                  item.data.return.flight_duration.minutes +
                  'm'
                : item.return.flight_duration.hours +
                  'h ' +
                  item.return.flight_duration.minutes +
                  'm'}
            </Text>
            <Text style={styles.timeTextStyle}>
              {item.data
                ? item.data.return.arrival_time.hours +
                  ':' +
                  item.data.return.arrival_time.minutes +
                  ' ' +
                  returnArrivalTime
                : item.return.arrival_time.hours +
                  ':' +
                  item.return.arrival_time.minutes +
                  ' ' +
                  returnArrivalTime}
            </Text>
          </View>

          <View style={styles.circlesView}>
            <View style={styles.topCircle} />
            <DashedLine
              dashGap={0}
              dashThickness={2}
              axis='vertical'
              style={styles.dashedLineStyle}
            />
            <View style={styles.bottomCircle} />
          </View>

          <View style={styles.airportView}>
            <Text style={[styles.airportTextStyle, styles.topText]}>
              {item.data
                ? item.data.arrival_city.airport_name
                : item.arrival_city.airport_name}
            </Text>
            <Text style={styles.airportTextStyle}>
              {item.data
                ? item.data.departure_city.airport_name
                : item.departure_city.airport_name}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  airportTextStyle: {
    ...globalStyles.boldText,
    fontSize: 14
  },
  airportView: {
    justifyContent: 'space-between',
    marginHorizontal: 14,
    width: 170
  },
  bottomCircle: {
    backgroundColor: colors.ORANGE,
    borderRadius: 20,
    borderWidth: 1,
    height: 16,
    width: 16
  },
  circlesView: {
    marginLeft: 20,
    marginVertical: 4
  },
  container: {
    borderTopWidth: 1
  },
  dashedLineStyle: {
    height: 44,
    marginLeft: 6
  },
  flightDurationStyle: {
    ...globalStyles.normalText,
    fontSize: 16
  },
  outerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 14,
    marginLeft: 16
  },
  timeTextStyle: {
    ...globalStyles.boldText,
    fontSize: 18
  },
  timeView: {
    justifyContent: 'space-between'
  },
  topCircle: {
    backgroundColor: colors.PURPLE,
    borderRadius: 20,
    borderWidth: 1,
    height: 16,
    width: 16
  },
  topText: {
    marginBottom: 4
  }
});

export default FlightInfoRoundTrip;
