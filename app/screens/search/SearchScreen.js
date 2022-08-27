import { useIsFocused } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Ripple from 'react-native-material-ripple';

import { FontAwesome5 } from '@expo/vector-icons';

import CustomSearchFlightsModal from '../../components/common/CustomSearchFlightsModal';
import SearchBar from '../../components/common/SearchBar';
import RecommendedCard from '../../components/search/RecommendedCard';

import { auth } from '../../config/firebase';
import { Context as FlightsContext } from '../../context/FlightsContext';
import { Context as UserContext } from '../../context/UserContext';

import colors from '../../../global/colors';
import globalStyles from '../../../global/globalStyles';

const SearchScreen = ({ navigation }) => {
  const {
    state: { userLocation }
  } = useContext(UserContext);
  const {
    state: { recommendedCountries }
  } = useContext(FlightsContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);
  const [displayName, setDisplayName] = useState('');
  const isFocused = useIsFocused();

  const getFilteredResults = () => {
    const filteredList = recommendedCountries.filter((result) => {
      const country_iso2 = result.data.country_iso2;
      return (
        country_iso2 === 'GR' ||
        country_iso2 === 'GB' ||
        country_iso2 === 'FR' ||
        country_iso2 === 'ES' ||
        country_iso2 === 'CH'
      );
    });

    return filteredList;
  };

  useEffect(() => {
    const filteredResults = getFilteredResults();
    setFilteredResults(filteredResults);
    if (auth.currentUser.displayName) {
      setDisplayName(auth.currentUser.displayName);
    }
  }, []);

  useEffect(() => {
    if (isFocused) {
      if (
        auth.currentUser.displayName &&
        displayName !== auth.currentUser.displayName
      ) {
        setDisplayName(auth.currentUser.displayName);
      }
    }
  }, [isFocused]);

  const goToRecommendedScreen = () => {
    navigation.navigate('RecommendedScreen', { searchType: 'recommended' });
  };

  const goToCitiesScreen = (title, country_iso2) => {
    navigation.navigate('CitiesScreen', { title, country_iso2 });
  };

  return (
    <View style={styles.container}>
      <CustomSearchFlightsModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      {userLocation && (
        <View style={styles.location}>
          <FontAwesome5 name='map-marker-alt' size={28} color={colors.ORANGE} />

          <View style={styles.locationText}>
            <Text style={globalStyles.headerBoldText}>
              {userLocation !== undefined
                ? userLocation.split(',')[0] + ','
                : ''}
            </Text>
            <Text style={globalStyles.headerText}>
              {userLocation !== undefined ? userLocation.split(',')[1] : ''}
            </Text>
          </View>
        </View>
      )}

      <View style={styles.nameContainer}>
        <Text style={globalStyles.headerText}>Hi</Text>
        <Text style={globalStyles.headerBoldText}>
          {displayName !== '' ? ' ' + displayName.split(' ')[0] : null}
        </Text>
        <Text style={globalStyles.headerText}>,</Text>
      </View>

      <View style={styles.welcomeTextContainer}>
        <Text style={styles.welcomeText}>
          Let&apos;s Discover a New Adventure!
        </Text>
      </View>

      <SearchBar
        sbText='Search your next flight'
        bdRadius={20}
        onPress={() => setModalVisible(true)}
      />

      <View style={styles.recommended_viewAll_Container}>
        <Text style={globalStyles.normalText}>Recommended</Text>

        <Ripple
          rippleColor={colors.PURPLE}
          rippleOpacity={0.8}
          rippleContainerBorderRadius={12}
          style={styles.viewAllRippleStyle}
          onPress={goToRecommendedScreen}
          onLongPress={goToRecommendedScreen}
          delayLongPress={150}
        >
          <Text style={styles.viewAll}>View All</Text>
        </Ripple>
      </View>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRat={0.8}
        data={filteredResults}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RecommendedCard item={item.data} onPress={goToCitiesScreen} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.BG_COLOR,
    flex: 1
  },
  location: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 20
  },
  locationText: {
    flexDirection: 'row',
    marginHorizontal: 10
  },
  nameContainer: {
    ...globalStyles.marginHorizontal,
    alignContent: 'center',
    flexDirection: 'row',
    marginVertical: 8
  },
  recommended_viewAll_Container: {
    ...globalStyles.marginHorizontal,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  viewAll: {
    ...globalStyles.normalText,
    color: colors.ORANGE
  },
  viewAllRippleStyle: {
    padding: 8
  },
  welcomeText: {
    ...globalStyles.normalText,
    color: colors.GRAY_SUBHEADER_TEXT
  },
  welcomeTextContainer: {
    ...globalStyles.marginHorizontal,
    marginVertical: 4
  }
});

export default SearchScreen;
