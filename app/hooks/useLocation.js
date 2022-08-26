import { useContext, useEffect, useState } from 'react';
import * as Location from 'expo-location';

import { Context as UserContext } from '../context/UserContext';
import { Context as FlightsContext } from '../context/FlightsContext';

export default () => {
  const [locationText, setLocationText] = useState('');

  const { addUserLocationError } = useContext(UserContext);

  const { addUserCoordinates } = useContext(FlightsContext);

  useEffect(() => {
    const geUserLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        const coords = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        };
        addUserCoordinates(coords);

        const cityLocation = await Location.reverseGeocodeAsync(coords);

        const city = JSON.stringify(cityLocation[0].city).replace(
          /^"(.+(?="$))"$/,
          '$1'
        );
        const isoCountryCode = JSON.stringify(
          cityLocation[0].isoCountryCode
        ).replace(/^"(.+(?="$))"$/, '$1');

        setLocationText(city + ', ' + isoCountryCode);
      } catch (error) {
        addUserLocationError(error);
      }
    };

    geUserLocation();
  }, []);

  return [locationText];
};
