import { useContext, useEffect, useState } from "react";
import * as Location from "expo-location";

import { Context as UserContext } from "../context/UserContext";
import { Context as FlightsContext } from "../context/FlightsContext";

export default () => {
  const [location, setLocation] = useState(null);
  const [locationText, setLocationText] = useState("");

  const { addUserLocationError } = useContext(UserContext);

  const { addUserCoordinates } = useContext(FlightsContext);

  useEffect(() => {
    const geUserLocation = async () => {
      try {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== "granted") {
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        let coords = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        addUserCoordinates(coords);

        let cityLocation = await Location.reverseGeocodeAsync(coords);
        setLocation(cityLocation);

        const city = JSON.stringify(cityLocation[0].city).replace(
          /^"(.+(?="$))"$/,
          "$1"
        );
        const isoCountryCode = JSON.stringify(
          cityLocation[0].isoCountryCode
        ).replace(/^"(.+(?="$))"$/, "$1");

        setLocationText(city + ", " + isoCountryCode);
      } catch (error) {
        addUserLocationError(error);
      }
    };
    geUserLocation();
  }, []);
  return [locationText];
};
