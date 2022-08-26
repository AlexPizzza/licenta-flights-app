import { useFonts } from 'expo-font';
import * as ExpoSplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

import { Context as AuthContext } from '../context/AuthContext';
import { Context as FlightsContext } from '../context/FlightsContext';
import { Context as UserContext } from '../context/UserContext';

import MainTabs from '../navigation/MainTabs';
import Authentication from '../navigation/stacks/AuthenticationStack';
import WelcomeScreen from './authentication/WelcomeScreen';

import globalStyles from '../../global/globalStyles';

import useLocation from '../hooks/useLocation';

ExpoSplashScreen.preventAutoHideAsync();

const SplashScreen = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const [fontsLoaded] = useFonts({
    'nunito-bold': require('../../assets/fonts/Nunito-Bold.ttf'),
    'nunito-regular': require('../../assets/fonts/Nunito-Regular.ttf'),
    'nunito-semi-bold': require('../../assets/fonts/Nunito-SemiBold.ttf')
  });
  const [locationText] = useLocation();

  const { state: authState, tryLocalSignIn } = useContext(AuthContext);
  const {
    state: userState,
    checkIsFirstTime,
    addUserLocation,
    getUserRating,
    addCurrencies,
    getCurrentCurrency
  } = useContext(UserContext);

  const {
    state: {
      exploreEverywhere,
      recommendedCountries,
      popularDestinations,
      quickGetaways,
      longerTrips,
      lastMinute,
      planAhead,
      userCoords
    },
    getRecommendedCountries,
    getCountriesBySearchType,
    addPriceToCountries,
    getSavedFlights,
    getDate,
    getStatisticsFlights
  } = useContext(FlightsContext);

  useEffect(() => {
    const getData = async () => {
      try {
        await checkIsFirstTime();
        await tryLocalSignIn();
        getDate();

        getCountriesBySearchType();

        await Promise.all([
          await addCurrencies(),
          await getRecommendedCountries(),
          await getUserRating(),
          await getStatisticsFlights(),
          await getCurrentCurrency(),
          await getSavedFlights()
        ]);

        await new Promise((res) => setTimeout(res, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    };
    getData();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (!appIsReady || !fontsLoaded) {
      return;
    }

    addUserLocation(locationText);

    await new Promise((res) => {
      setTimeout(() => {
        addPriceToCountries(
          exploreEverywhere,
          recommendedCountries,
          popularDestinations,
          quickGetaways,
          longerTrips,
          lastMinute,
          planAhead,
          userCoords
        );
        res();
      }, 600);
    });

    await ExpoSplashScreen.hideAsync();
  }, [appIsReady, fontsLoaded]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView} style={styles.container}>
      <StatusBar style='dark' backgroundColor='white' />

      {userState.isFirstTime === null || userState.isFirstTime ? (
        <WelcomeScreen />
      ) : authState.token ? (
        <SafeAreaView style={globalStyles.AndroidSafeArea}>
          <MainTabs />
        </SafeAreaView>
      ) : (
        <Authentication />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default SplashScreen;
