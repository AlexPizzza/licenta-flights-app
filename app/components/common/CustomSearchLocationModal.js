import React, { useContext, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { SearchBar } from 'react-native-elements';

import LocationsListItem from '../modal/LocationsListItem';
import ModalCloseButton from '../modal/ModalCloseButton';

import { Feather } from '@expo/vector-icons';

import { Context as FlightsContext } from '../../context/FlightsContext';

import noLocationsImage from '../../../assets/no_locations_found.png';

import colors from '../../../global/colors';
import globalStyles from '../../../global/globalStyles';

const CustomSearchLocation = ({
  locationModalVisible,
  setLocationModalVisible,
  setModalVisible,
  isWhereFrom,
  whereFromText,
  whereToText,
  setWhereFromText,
  setWhereToText,
  setDepartureCity,
  setArrivalCity
}) => {
  const [locationText, setLocationText] = useState('');
  const [userIsTyping, setUserIsTyping] = useState(false);
  const [noLocations, setNoLocations] = useState(false);

  const {
    state: { locations },
    clearLocations,
    getLocations
  } = useContext(FlightsContext);

  useState(() => {
    if (isWhereFrom && whereFromText !== 'Where from?') {
      const location = whereFromText.split(' (')[0];
      setLocationText(location);
      getLocations(location);
    } else if (!isWhereFrom && whereToText !== 'Where to?') {
      const location = whereToText.split(' (')[0];
      setLocationText(location);
      getLocations(location);
    }
  }, []);

  return (
    <Modal
      animationType='slide'
      transparent={false}
      style={styles.container}
      visible={locationModalVisible}
      onRequestClose={() => {
        clearLocations();
        setLocationModalVisible(false);
        setModalVisible(true);
      }}
    >
      <View style={styles.outerView}>
        <View style={styles.innerView}>
          <ModalCloseButton
            isLocationModal={true}
            setModalVisible={setModalVisible}
            setLocationModalVisible={setLocationModalVisible}
            clearLocations={clearLocations}
          />

          <Text style={[globalStyles.headerBoldText, styles.whereFromText]}>
            {isWhereFrom ? 'Where from?' : 'Where to?'}
          </Text>
        </View>

        <SearchBar
          placeholder={'Country, city or airport'}
          placeholderTextColor={colors.SEARCH_INPUT_TEXT}
          platform='android'
          searchIcon={
            <Feather name='search' size={24} style={styles.iconStyle} />
          }
          containerStyle={styles.containerStyle}
          inputContainerStyle={styles.inputContainerStyle}
          clearIcon={{ color: colors.ORANGE }}
          cancelIcon={{ color: colors.SEARCH_INPUT_TEXT }}
          onCancel={() => {
            setUserIsTyping(false);
          }}
          onClear={() => {
            if (isWhereFrom) {
              setWhereFromText('Where from?');
              setDepartureCity(null);
            } else {
              setWhereToText('Where to?');
              setArrivalCity(null);
            }
            setUserIsTyping(false);
            setNoLocations(false);
          }}
          inputStyle={styles.inputStyle}
          onChangeText={(text) => {
            setUserIsTyping(true);
            setLocationText(text);
            if (text.length > 1) {
              getLocations(text);
              setTimeout(() => {
                if (locations.length === 0 && noLocations === false) {
                  setNoLocations(true);
                  setUserIsTyping(false);
                }
              }, 2.5 * 1000);
            }
            if (text.length <= 1) {
              setNoLocations(false);
              setUserIsTyping(false);
              clearLocations();
            }
          }}
          underlineColorAndroid='transparent'
          value={locationText}
        />
      </View>

      <View style={styles.locationsView}>
        {locations.length === 0 && userIsTyping ? (
          <View style={styles.activityIndicatorView}>
            <ActivityIndicator size='large' color={colors.PURPLE} />
          </View>
        ) : locations.length === 0 && noLocations ? (
          <View style={styles.noLocationsView}>
            <Image source={noLocationsImage} style={styles.imageStyle} />
            <Text style={styles.noLocationsFoundText}>
              No locations found for &apos;{locationText}&apos;!
            </Text>
          </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            decelerationRat={0.8}
            data={locations}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <LocationsListItem
                  item={item.data}
                  onPress={isWhereFrom ? setWhereFromText : setWhereToText}
                  setLocationModalVisible={setLocationModalVisible}
                  setModalVisible={setModalVisible}
                  setCity={isWhereFrom ? setDepartureCity : setArrivalCity}
                />
              );
            }}
          />
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  activityIndicatorView: {
    alignContent: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  container: {
    backgroundColor: colors.BG_COLOR,
    flex: 1
  },
  containerStyle: {
    backgroundColor: colors.PURPLE,
    ...globalStyles.marginHorizontal
  },
  iconStyle: {
    color: colors.SEARCH_INPUT_TEXT,
    marginLeft: 6
  },
  imageStyle: {
    aspectRatio: 5 / 6,
    height: undefined,
    width: '100%'
  },
  innerView: {
    alignContent: 'center',
    flexDirection: 'row'
  },
  inputContainerStyle: {
    backgroundColor: colors.BG_COLOR,
    borderRadius: 10
  },
  inputStyle: {
    ...globalStyles.normalText,
    color: colors.SEARCH_INPUT_TEXT,
    marginLeft: 10
  },
  locationsView: {
    flex: 1
  },
  noLocationsFoundText: {
    ...globalStyles.boldText
  },
  noLocationsView: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  outerView: {
    backgroundColor: colors.PURPLE,
    paddingBottom: 6
  },
  whereFromText: {
    alignSelf: 'center',
    color: colors.BLACK,
    fontSize: 30,
    paddingTop: 10
  }
});

export default CustomSearchLocation;
