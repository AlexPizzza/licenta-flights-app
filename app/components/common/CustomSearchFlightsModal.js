import React, { useContext, useEffect, useState } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import ModalCloseButton from '../modal/ModalCloseButton';
import RippleText from '../modal/RippleText';
import SearchBar from '../modal/SearchBar';
import ButtonSearchFlights from '../modal/ButtonSearchFlights';
import CustomSearchLocationModal from './CustomSearchLocationModal';
import CustomShowFlightsModal from './CustomShowFlightsModal';

import { Context as FlightsContext } from '../../context/FlightsContext';

import colors from '../../../global/colors';
import globalStyles from '../../../global/globalStyles';
import CustomSeeFlightModal from './CustomSeeFlightModal';

const bucharest = {
  airport_name: 'Henri Coanda International',
  city_iata_code: 'BUH',
  city_name: 'Bucharest',
  country_iso2: 'RO',
  country_name: 'Romania',
  geoname_id: '6301793',
  gmt: '2',
  iata_code: 'OTP',
  icao_code: 'LROP',
  latitude: '44.571156',
  longitude: '26.077063',
  phone_number: '+4 021-204-10',
  timezone: 'Europe/Bucharest'
};

const CustomModal = ({ modalVisible, setModalVisible }) => {
  const {
    state: { whereToCity }
  } = useContext(FlightsContext);

  const [isRoundTrip, setIsRoundTrip] = useState(true);
  const [isRoundtripSelected, setIsRoundtripSelected] = useState(true);
  const [isOnewaySelected, setIsOnewaySelected] = useState(false);

  const [whereFromText, setWhereFromText] = useState('Where from?');
  const [whereToText, setWhereToText] = useState('Where to?');

  const [isWhereFrom, setIsWhereFrom] = useState(false);

  const [departureCity, setDepartureCity] = useState(null);
  const [arrivalCity, setArrivalCity] = useState(null);

  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [flightsModalVisible, setFlightsModalVisible] = useState(false);
  const [seeFlightModalVisible, setSeeFlightModalVisible] = useState(false);

  const [flightToShow, setFlightToShow] = useState(null);
  const [flightsToShow, setFlightsToShow] = useState([]);

  const [showFirstDatetimePicker, setShowFirstDatetimePicker] = useState(false);
  const [showSecondDatetimePicker, setShowSecondDatetimePicker] =
    useState(false);
  const [showThirdDatetimePicker, setShowThirdDatetimePicker] = useState(false);

  const [selectedFirstDate, setSelectedFirstDate] = useState(
    new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000)
  );
  const [selectedSecondDate, setSelectedSecondDate] = useState(
    new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000)
  );
  const [selectedThirdDate, setSelectedThirdDate] = useState(
    new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000)
  );

  const [firstDate, setFirstDate] = useState('');
  const [secondDate, setSecondDate] = useState('');
  const [thirdDate, setThirdDate] = useState('');

  const onChangeFirst = (event, selectedFirstDate) => {
    const currentDate = selectedFirstDate;
    if (event.type == 'set') {
      setShowFirstDatetimePicker(false);
      setSelectedFirstDate(currentDate);
      setSelectedSecondDate(
        new Date(currentDate.getTime() + 2 * 24 * 60 * 60 * 1000)
      );
    } else {
      setShowFirstDatetimePicker(false);
    }
  };

  const onChangeSecond = (event, selectedSecondDate) => {
    const currentDate = selectedSecondDate;
    if (event.type == 'set') {
      setShowSecondDatetimePicker(false);
      setSelectedSecondDate(currentDate);
    } else {
      setShowSecondDatetimePicker(false);
    }
  };

  const onChangeThird = (event, selectedThirdDate) => {
    const currentDate = selectedThirdDate;
    if (event.type == 'set') {
      setShowThirdDatetimePicker(false);
      setSelectedThirdDate(currentDate);
    } else {
      setShowThirdDatetimePicker(false);
    }
  };

  useEffect(() => {
    const firstDateSplit = selectedFirstDate.toString().split(' ');
    setFirstDate(
      firstDateSplit[0] + ', ' + firstDateSplit[1] + ' ' + firstDateSplit[2]
    );
  }, [selectedFirstDate]);

  useEffect(() => {
    const secondDateSplit = selectedSecondDate.toString().split(' ');
    setSecondDate(
      secondDateSplit[0] + ', ' + secondDateSplit[1] + ' ' + secondDateSplit[2]
    );
  }, [selectedSecondDate]);

  useEffect(() => {
    const thirdDateSplit = selectedThirdDate.toString().split(' ');
    setThirdDate(
      thirdDateSplit[0] + ', ' + thirdDateSplit[1] + ' ' + thirdDateSplit[2]
    );
  }, [selectedThirdDate]);

  useEffect(() => {
    if (whereToCity !== null) {
      setWhereFromText('Bucharest (OTP)');
      setWhereToText(
        whereToCity.city_name + ' (' + whereToCity.iata_code + ')'
      );
      setDepartureCity(bucharest);
      setArrivalCity(whereToCity);
    }
  }, [whereToCity]);

  return (
    <View style={styles.container}>
      {modalVisible ? (
        <Modal
          animationType='slide'
          transparent={false}
          style={styles.container}
          visible={modalVisible}
          onRequestClose={setModalVisible}
        >
          <View style={styles.modalCloseButtonView}>
            <ModalCloseButton setModalVisible={setModalVisible} />
          </View>

          <View style={styles.buttonsStyle}>
            <RippleText
              text='ROUNDTRIP'
              setIsRoundTrip={setIsRoundTrip}
              onPress={() => {
                setIsRoundtripSelected(true);
                setIsOnewaySelected(false);
              }}
              isRoundtripSelected={isRoundtripSelected}
            />

            <RippleText
              text='ONE-WAY'
              setIsRoundTrip={setIsRoundTrip}
              onPress={() => {
                setIsRoundtripSelected(false);
                setIsOnewaySelected(true);
              }}
              isOnewaySelected={isOnewaySelected}
            />
          </View>

          <View style={styles.formStyle}>
            <SearchBar
              sbText={whereFromText}
              bdRadius={globalStyles.modalSearchBarBdRadius}
              marginBottom={globalStyles.modalSearchMarginBottom}
              onPress={() => {
                setIsWhereFrom(true);
                setLocationModalVisible(true);
                setModalVisible(false);
              }}
              isDeparture={true}
            />

            <SearchBar
              sbText={whereToText}
              bdRadius={globalStyles.modalSearchBarBdRadius}
              marginBottom={globalStyles.modalSearchMarginBottom}
              onPress={() => {
                setIsWhereFrom(false);
                setLocationModalVisible(true);
                setModalVisible(false);
              }}
              isDeparture={false}
            />

            {isRoundTrip ? (
              <View style={styles.roundTripView}>
                <SearchBar
                  sbText={firstDate}
                  bdRadius={globalStyles.modalSearchBarBdRadius}
                  marginBottom={globalStyles.modalSearchMarginBottom}
                  onPress={() => {
                    setShowFirstDatetimePicker(true);
                  }}
                  isDate={true}
                  isRoundTrip={isRoundTrip}
                />

                <SearchBar
                  sbText={secondDate}
                  bdRadius={globalStyles.modalSearchBarBdRadius}
                  marginBottom={globalStyles.modalSearchMarginBottom}
                  onPress={() => {
                    setShowSecondDatetimePicker(true);
                  }}
                  isDate={true}
                  isRoundTrip={isRoundTrip}
                />
              </View>
            ) : (
              <SearchBar
                sbText={thirdDate}
                bdRadius={globalStyles.modalSearchBarBdRadius}
                marginBottom={globalStyles.modalSearchMarginBottom}
                onPress={() => {
                  setShowThirdDatetimePicker(true);
                }}
                isDate={true}
              />
            )}
          </View>

          <ButtonSearchFlights
            whereFromText={whereFromText}
            whereToText={whereToText}
            isRoundTrip={isRoundTrip}
            selectedFirstDate={selectedFirstDate}
            selectedSecondDate={selectedSecondDate}
            selectedThirdDate={selectedThirdDate}
            departureCity={departureCity}
            arrivalCity={arrivalCity}
            setFlightsModalVisible={setFlightsModalVisible}
            setModalVisible={setModalVisible}
            setFlightsToShow={setFlightsToShow}
          />

          {showFirstDatetimePicker && (
            <DateTimePicker
              value={selectedFirstDate}
              mode='date'
              display='calendar'
              onChange={onChangeFirst}
              minimumDate={
                new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000)
              }
              maximumDate={new Date(2021, 9, 31)}
              onTouchCancel={() => setShowFirstDatetimePicker(false)}
            />
          )}

          {showSecondDatetimePicker && (
            <DateTimePicker
              value={
                new Date(selectedFirstDate.getTime() + 2 * 24 * 60 * 60 * 1000)
              }
              mode='date'
              display='calendar'
              onChange={onChangeSecond}
              minimumDate={
                new Date(selectedFirstDate.getTime() + 2 * 24 * 60 * 60 * 1000)
              }
              maximumDate={new Date(2021, 9, 31)}
              onTouchCancel={() => setShowSecondDatetimePicker(false)}
            />
          )}

          {showThirdDatetimePicker && (
            <DateTimePicker
              value={selectedThirdDate}
              mode='date'
              display='calendar'
              onChange={onChangeThird}
              minimumDate={
                new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000)
              }
              maximumDate={new Date(2021, 9, 31)}
              onTouchCancel={() => setShowThirdDatetimePicker(false)}
            />
          )}
        </Modal>
      ) : locationModalVisible ? (
        <CustomSearchLocationModal
          locationModalVisible={locationModalVisible}
          setLocationModalVisible={setLocationModalVisible}
          setModalVisible={setModalVisible}
          isWhereFrom={isWhereFrom}
          whereFromText={whereFromText}
          whereToText={whereToText}
          setWhereFromText={setWhereFromText}
          setWhereToText={setWhereToText}
          setDepartureCity={setDepartureCity}
          setArrivalCity={setArrivalCity}
        />
      ) : flightsModalVisible ? (
        <CustomShowFlightsModal
          flightsModalVisible={flightsModalVisible}
          setFlightsModalVisible={setFlightsModalVisible}
          setModalVisible={setModalVisible}
          departureCity={departureCity}
          arrivalCity={arrivalCity}
          isRoundTrip={isRoundTrip}
          selectedFirstDate={selectedFirstDate}
          selectedSecondDate={selectedSecondDate}
          selectedThirdDate={selectedThirdDate}
          flightsToShow={flightsToShow}
          setSeeFlightModalVisible={setSeeFlightModalVisible}
          setFlightToShow={setFlightToShow}
        />
      ) : seeFlightModalVisible ? (
        <CustomSeeFlightModal
          flightToShow={flightToShow}
          setFlightToShow={setFlightToShow}
          seeFlightModalVisible={seeFlightModalVisible}
          setFlightsModalVisible={setFlightsModalVisible}
          setSeeFlightModalVisible={setSeeFlightModalVisible}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10
  },
  container: {
    backgroundColor: colors.BG_COLOR,
    paddingBottom: 8
  },
  formStyle: {
    paddingVertical: 10
  },
  modalCloseButtonView: {
    backgroundColor: colors.PURPLE,
    paddingBottom: 10
  },
  roundTripView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }
});

export default CustomModal;
