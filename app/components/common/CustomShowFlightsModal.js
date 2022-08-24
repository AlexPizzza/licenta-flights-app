import React, { useContext, useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';

import ModalCloseButton from '../modal/ModalCloseButton';
import FlightCardRoundTrip from '../modal/FlightCardRoundTrip';
import FlightCardOneWay from '../modal/FlightCardOneWay';

import { Context as UserContext } from '../../context/UserContext';

import noFlightsImage from '../../../assets/no_flights_found.png';

import colors from '../../../global/colors';
import globalStyles from '../../../global/globalStyles';

const { width } = Dimensions.get('window');
const CustomShowFlightsModal = ({
  flightsModalVisible,
  setFlightsModalVisible,
  setModalVisible,
  departureCity,
  arrivalCity,
  isRoundTrip,
  selectedFirstDate,
  selectedSecondDate,
  selectedThirdDate,
  flightsToShow,
  setSeeFlightModalVisible,
  setFlightToShow
}) => {
  const {
    state: { currentCurrency }
  } = useContext(UserContext);

  const [modalFirstDate, setModalFirstDate] = useState('');
  const [modalSecondDate, setModalSecondDate] = useState('');
  const [modalThirdDate, setModalThirdDate] = useState('');

  useEffect(() => {
    const modalFirstDateSplit = selectedFirstDate.toString().split(' ');
    setModalFirstDate(modalFirstDateSplit[2] + ' ' + modalFirstDateSplit[1]);
    const modalSecondDateSplit = selectedSecondDate.toString().split(' ');
    setModalSecondDate(modalSecondDateSplit[2] + ' ' + modalSecondDateSplit[1]);
    const modalThirdDateSplit = selectedThirdDate.toString().split(' ');
    setModalThirdDate(modalThirdDateSplit[2] + ' ' + modalThirdDateSplit[1]);
  });

  return (
    <Modal
      animationType='slide'
      transparent={false}
      style={styles.container}
      visible={flightsModalVisible}
      onRequestClose={() => {
        setFlightsModalVisible(false);
        setModalVisible(true);
      }}
    >
      <View style={styles.headerStyle}>
        <ModalCloseButton
          setModalVisible={() => {
            setFlightsModalVisible(false);
            setModalVisible(true);
          }}
        />
        {isRoundTrip ? (
          <View style={styles.flexDirectionColumn}>
            <View style={styles.flexDirectionRow}>
              <Text style={styles.headerTextStyle}>
                {departureCity.city_name &&
                departureCity.city_name.includes('(')
                  ? departureCity.city_name.substr(
                      0,
                      departureCity.city_name.indexOf('(')
                    )
                  : departureCity.city_name &&
                    !departureCity.city_name.includes('(')
                  ? departureCity.city_name
                  : departureCity.capital
                  ? departureCity.capital
                  : null}
              </Text>
              <Text style={styles.headerTextStyle}>
                {'  -  '}
                {arrivalCity.city_name && arrivalCity.city_name.includes('(')
                  ? arrivalCity.city_name.substr(
                      0,
                      arrivalCity.city_name.indexOf('(')
                    )
                  : arrivalCity.city_name &&
                    !arrivalCity.city_name.includes('(')
                  ? arrivalCity.city_name
                  : arrivalCity.capital
                  ? arrivalCity.capital
                  : null}
              </Text>
            </View>

            <View style={styles.flexDirectionRow}>
              <Text style={styles.headerDateTextStyle}>{modalFirstDate}</Text>
              <Text style={styles.headerDateTextStyle}>
                {'  -  '}
                {modalSecondDate}
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.flexDirectionColumn}>
            <View style={styles.flexDirectionRow}>
              <Text style={styles.headerTextStyle}>
                {departureCity.city_name &&
                departureCity.city_name.includes('(')
                  ? departureCity.city_name.substr(
                      0,
                      departureCity.city_name.indexOf('(')
                    )
                  : departureCity.city_name &&
                    !departureCity.city_name.includes('(')
                  ? departureCity.city_name
                  : departureCity.capital
                  ? departureCity.capital
                  : null}
              </Text>
              <Text style={styles.headerTextStyle}>
                {'  -  '}
                {arrivalCity.city_name && arrivalCity.city_name.includes('(')
                  ? arrivalCity.city_name.substr(
                      0,
                      arrivalCity.city_name.indexOf('(')
                    )
                  : arrivalCity.city_name &&
                    !arrivalCity.city_name.includes('(')
                  ? arrivalCity.city_name
                  : arrivalCity.capital
                  ? arrivalCity.capital
                  : null}
              </Text>
            </View>

            <Text style={styles.headerDateTextStyle}>
              Departure date:{'  '}
              {modalThirdDate}
            </Text>
          </View>
        )}
      </View>

      {flightsToShow && flightsToShow.length !== 0 ? (
        <ScrollView
          style={styles.scrollViewStyle}
          showsVerticalScrollIndicator={false}
        >
          <Text
            style={[
              styles.headerTextStyle,
              {
                color: colors.BLACK,
                ...globalStyles.marginHorizontal
              }
            ]}
          >
            Flights to{' '}
            {arrivalCity.airport_name ? arrivalCity.airport_name + ', ' : null}
            {arrivalCity.city_name}
          </Text>
          {isRoundTrip
            ? flightsToShow.map((item, index) => (
                <FlightCardRoundTrip
                  key={'key' + index}
                  item={item}
                  setFlightsModalVisible={setFlightsModalVisible}
                  setSeeFlightModalVisible={setSeeFlightModalVisible}
                  setFlightToShow={setFlightToShow}
                  currency={currentCurrency}
                />
              ))
            : flightsToShow.map((item, index) => (
                <FlightCardOneWay
                  key={'key' + index}
                  item={item}
                  setFlightsModalVisible={setFlightsModalVisible}
                  setSeeFlightModalVisible={setSeeFlightModalVisible}
                  setFlightToShow={setFlightToShow}
                  currency={currentCurrency}
                />
              ))}
        </ScrollView>
      ) : (
        <View style={styles.noFlightsView}>
          <Image source={noFlightsImage} style={styles.imageStyle} />
          <Text style={styles.noFlightsFoundText}>
            No flights found for selected dates!
          </Text>
        </View>
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.BG_COLOR,
    flex: 1,
    flexDirection: 'column',
    paddingBottom: 8,
    width: width
  },
  flexDirectionColumn: {
    flexDirection: 'column'
  },
  flexDirectionRow: {
    flexDirection: 'row'
  },
  headerDateTextStyle: {
    ...globalStyles.normalText,
    color: colors.WHITE,
    fontSize: 20
  },
  headerStyle: {
    alignItems: 'center',
    backgroundColor: colors.PURPLE,
    flexDirection: 'row',
    paddingBottom: 10
  },
  headerTextStyle: {
    ...globalStyles.boldText,
    color: colors.WHITE,
    fontSize: 22,
    marginTop: 8
  },
  imageStyle: {
    aspectRatio: 3 / 4,
    height: undefined,
    width: '100%'
  },
  noFlightsFoundText: {
    ...globalStyles.boldText
  },
  noFlightsView: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    marginTop: 0
  },
  scrollViewStyle: {
    backgroundColor: colors.WHITE
  }
});

export default CustomShowFlightsModal;
