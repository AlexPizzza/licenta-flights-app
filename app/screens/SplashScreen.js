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
  useLocation();

  const { state: authState, tryLocalSignIn } = useContext(AuthContext);
  const {
    state: userState,
    checkIsFirstTime,
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
    addPriceToCountries,
    getCountriesBySearchType,
    getSavedFlights,
    getDate,
    getStatisticsFlights
  } = useContext(FlightsContext);

  useEffect(() => {
    (async () => {
      await checkIsFirstTime();
      await tryLocalSignIn();
      await getCountriesBySearchType();
      getDate();
    })();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        await Promise.all([
          addCurrencies(),
          getUserRating(),
          getStatisticsFlights(),
          getCurrentCurrency(),
          getSavedFlights()
        ]);

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

        await new Promise((res) => setTimeout(res, 1000));
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
