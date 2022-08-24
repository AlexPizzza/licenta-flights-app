import createDataContext from "./createDataContext";
import { auth, db } from "../config/firebase";

import generatePrice from "../functions/generatePrice";
import sorter from "../functions/sorter";

const flightsReducer = (state, action) => {
  switch (action.type) {
    case "add_explore_everywhere_countries":
      return {
        ...state,
        exploreEverywhere: action.payload,
      };
    case "add_recommended_countries":
      return {
        ...state,
        recommendedCountries: action.payload,
      };
    case "add_popular_destinations_countries":
      return {
        ...state,
        popularDestinations: action.payload,
      };
    case "add_quick_getaways_countries":
      return {
        ...state,
        quickGetaways: action.payload,
      };
    case "add_longer_trips_countries":
      return {
        ...state,
        longerTrips: action.payload,
      };
    case "add_last_minute_countries":
      return {
        ...state,
        lastMinute: action.payload,
      };
    case "add_plan_ahead_countries":
      return {
        ...state,
        planAhead: action.payload,
      };
    case "add_cities":
      return {
        ...state,
        cities: {
          ...state.cities,
          [action.attribute]: action.payload,
        },
      };
    case "clear_cities":
      return {
        ...state,
        cities: action.payload,
      };
    case "add_locations":
      return {
        ...state,
        locations: action.payload,
      };
    case "clear_locations":
      return {
        ...state,
        locations: action.payload,
      };
    case "add_user_coords":
      return {
        ...state,
        userCoords: action.payload,
      };
    case "add_user_date":
      return {
        ...state,
        date: action.payload,
      };
    case "add_flights_round_trip":
      return {
        ...state,
        flightsRoundTrip: [...state.flightsRoundTrip, action.payload],
      };
    case "add_flights_one_way":
      return {
        ...state,
        flightsOneWay: [...state.flightsOneWay, action.payload],
      };
    case "add_where_to_city":
      return {
        ...state,
        whereToCity: action.payload,
      };
    case "add_flight_to_saved_flights":
      return {
        ...state,
        savedFlights: [...state.savedFlights, action.payload],
      };
    case "get_saved_flights":
      return {
        ...state,
        savedFlights: action.payload,
      };
    case "delete_flight_from_saved_flights":
      return {
        ...state,
        savedFlights: action.payload,
      };
    case "get_statistics_flights":
      return {
        ...state,
        statisticsFlights: action.payload,
      };
    case "add_flight_to_show":
      return {
        ...state,
        flightToShow: action.payload,
      };
    default:
      return state;
  }
};

const getRecommendedCountries = (dispatch) => async () => {
  try {
    let list = [];
    const snapshot = await db.collection("flights_recommended").get();

    snapshot.forEach((doc) => {
      list.push({ id: doc.id, data: doc.data() });
    });

    dispatch({ type: "add_recommended_countries", payload: list });
  } catch (error) {
    console.log(error);
  }
};

const getCountriesBySearchType = (dispatch) => async () => {
  try {
    let list = [];
    let snapshot = await db.collection("flights_explore_everywhere").get();
    snapshot.forEach((doc) => {
      list.push({ id: doc.id, data: doc.data() });
    });
    dispatch({ type: "add_explore_everywhere_countries", payload: list });

    list = [];
    snapshot = await db.collection("flights_popular_destinations").get();
    snapshot.forEach((doc) => {
      list.push({ id: doc.id, data: doc.data() });
    });
    dispatch({ type: "add_popular_destinations_countries", payload: list });

    list = [];
    snapshot = await db.collection("flights_quick_getaways").get();
    snapshot.forEach((doc) => {
      list.push({ id: doc.id, data: doc.data() });
    });
    dispatch({ type: "add_quick_getaways_countries", payload: list });

    list = [];
    snapshot = await db.collection("flights_longer_trips").get();
    snapshot.forEach((doc) => {
      list.push({ id: doc.id, data: doc.data() });
    });
    dispatch({ type: "add_longer_trips_countries", payload: list });

    list = [];
    snapshot = await db.collection("flights_last_minute").get();
    snapshot.forEach((doc) => {
      list.push({ id: doc.id, data: doc.data() });
    });
    dispatch({ type: "add_last_minute_countries", payload: list });

    list = [];
    snapshot = await db.collection("flights_plan_ahead").get();
    snapshot.forEach((doc) => {
      list.push({ id: doc.id, data: doc.data() });
    });
    dispatch({ type: "add_plan_ahead_countries", payload: list });
  } catch (error) {
    console.log(error);
  }
};

const addPriceToCountries =
  (dispatch) =>
  (
    exploreEverywhere,
    recommendedCountries,
    popularDestinations,
    quickGetaways,
    longerTrips,
    lastMinute,
    planAhead,
    userCoords
  ) => {
    exploreEverywhere.forEach((element) => {
      element.data.price = generatePrice(
        1,
        userCoords.latitude,
        userCoords.longitude,
        element.data.latitude,
        element.data.longitude
      );
    });
    exploreEverywhere.sort(sorter);
    dispatch({
      type: "add_explore_everywhere_countries",
      payload: exploreEverywhere,
    });

    recommendedCountries.forEach((element) => {
      element.data.price = generatePrice(
        1,
        userCoords.latitude,
        userCoords.longitude,
        element.data.latitude,
        element.data.longitude
      );
    });
    recommendedCountries.sort(sorter);
    dispatch({
      type: "add_recommended_countries",
      payload: recommendedCountries,
    });

    popularDestinations.forEach((element) => {
      element.data.price = generatePrice(
        1,
        userCoords.latitude,
        userCoords.longitude,
        element.data.latitude,
        element.data.longitude
      );
    });
    popularDestinations.sort(sorter);
    dispatch({
      type: "add_popular_destinations_countries",
      payload: popularDestinations,
    });

    quickGetaways.forEach((element) => {
      element.data.price = generatePrice(
        1,
        userCoords.latitude,
        userCoords.longitude,
        element.data.latitude,
        element.data.longitude
      );
    });
    quickGetaways.sort(sorter);
    dispatch({ type: "add_quick_getaways_countries", payload: quickGetaways });

    longerTrips.forEach((element) => {
      element.data.price = generatePrice(
        1,
        userCoords.latitude,
        userCoords.longitude,
        element.data.latitude,
        element.data.longitude
      );
    });
    longerTrips.sort(sorter);
    dispatch({ type: "add_longer_trips_countries", payload: longerTrips });

    lastMinute.forEach((element) => {
      element.data.price = generatePrice(
        1,
        userCoords.latitude,
        userCoords.longitude,
        element.data.latitude,
        element.data.longitude
      );
    });
    lastMinute.sort(sorter);
    dispatch({ type: "add_last_minute_countries", payload: lastMinute });

    planAhead.forEach((element) => {
      element.data.price = generatePrice(
        1,
        userCoords.latitude,
        userCoords.longitude,
        element.data.latitude,
        element.data.longitude
      );
    });
    planAhead.sort(sorter);
    dispatch({ type: "add_plan_ahead_countries", payload: planAhead });
  };

const getLocations = (dispatch) => async (text) => {
  const toTitleCase = (phrase) => {
    return phrase
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const newText = toTitleCase(text);

  const airportsRef = db.collection("flights_airports");

  const airports = await airportsRef
    .where("airport_name", ">=", newText)
    .where("airport_name", "<=", newText + "\uf8ff")
    .get();
  const cities = await airportsRef
    .where("city_name", ">=", newText)
    .where("city_name", "<=", newText + "\uf8ff")
    .get();
  const countries = await airportsRef
    .where("country_name", ">=", newText)
    .where("country_name", "<=", newText + "\uf8ff")
    .get();

  let list = [];
  airports.forEach((doc) => {
    list.push({
      id: doc.id,
      data: doc.data(),
    });
  });
  cities.forEach((doc) => {
    list.push({
      id: doc.id,
      data: doc.data(),
    });
  });
  countries.forEach((doc) => {
    list.push({
      id: doc.id,
      data: doc.data(),
    });
  });

  const seen = new Set();

  const locationsList = list.filter((el) => {
    const duplicate = seen.has(el.id);
    seen.add(el.id);
    return !duplicate;
  });

  dispatch({ type: "add_locations", payload: locationsList });
};

const clearLocations = (dispatch) => () => {
  dispatch({ type: "clear_locations", payload: [] });
};

const addPriceToRecommendedCountries =
  (dispatch) => (countries, userLat, userLong) => {
    countries.forEach((element) => {
      element.data.price = generatePrice(
        1,
        userLat,
        userLong,
        element.data.latitude,
        element.data.longitude
      );
    });

    dispatch({ type: "add_recommended_countries", payload: countries });
  };

const addCities =
  (dispatch) => async (country_iso2, userCoords, citiesContext) => {
    if (!citiesContext.hasOwnProperty(country_iso2)) {
      let citiesList = [];

      const citiesRef = db.collection("flights_cities_" + country_iso2);
      const cities = await citiesRef.orderBy("image", "asc").get();
      cities.forEach((doc) => {
        citiesList.push({ id: doc.id, data: doc.data() });
      });

      citiesList.forEach((element) => {
        element.data.price = generatePrice(
          1,
          userCoords.latitude,
          userCoords.longitude,
          element.data.latitude,
          element.data.longitude
        );
      });

      citiesList.sort(sorter);
      dispatch({
        type: "add_cities",
        attribute: country_iso2,
        payload: citiesList,
      });
    }
  };

const addUserCoordinates = (dispatch) => (coords) => {
  dispatch({ type: "add_user_coords", payload: coords });
};

const getDate = (dispatch) => () => {
  const date = new Date().toString();
  dispatch({ type: "add_user_date", payload: date });
};

const addFlightsRoundTrip =
  (dispatch) =>
  (departureCity, arrivalCity, departureDate, arrivalDate, flightsList) => {
    const flights = {};
    flights.departure_city = departureCity;
    flights.arrival_city = arrivalCity;
    flights.departure_date = departureDate;
    flights.arrival_date = arrivalDate;
    flights.flights_list = flightsList;
    dispatch({ type: "add_flights_round_trip", payload: flights });
  };

const addFlightsOneWay =
  (dispatch) => (departureCity, arrivalCity, departureDate, flightsList) => {
    const flights = {};
    flights.departure_city = departureCity;
    flights.arrival_city = arrivalCity;
    flights.departure_date = departureDate;
    flights.flights_list = flightsList;
    dispatch({ type: "add_flights_one_way", payload: flights });
  };

const addWhereToCity = (dispatch) => (whereToCity) => {
  dispatch({ type: "add_where_to_city", payload: whereToCity });
};

const addFlightToSavedFlights =
  (dispatch) => async (flight, token, setFlightToShow) => {
    if (!flight.hasOwnProperty("data")) {
      flight.user_token = token;
    }

    const documentRef = db.collection("flights_saved_flights").doc();
    const id = documentRef.id;
    if (flight.hasOwnProperty("data")) {
      await documentRef.set(flight.data);
    } else {
      await documentRef.set(flight);
    }

    if (flight.hasOwnProperty("data")) {
      flight.id = id;
      dispatch({ type: "add_flight_to_saved_flights", payload: flight });
      setFlightToShow(flight);
    } else {
      const savedFlight = {
        id: id,
        data: flight,
      };

      dispatch({ type: "add_flight_to_saved_flights", payload: savedFlight });
      setFlightToShow(savedFlight);
    }
  };

const deleteFlightFromSavedFlights =
  (dispatch) => async (flight, savedFlights) => {
    await db.collection("flights_saved_flights").doc(flight.id).delete();

    const newSavedFlights = savedFlights.filter(
      (savedFlight) => savedFlight.id !== flight.id
    );
    dispatch({
      type: "delete_flight_from_saved_flights",
      payload: newSavedFlights,
    });
  };

const getSavedFlights = (dispatch) => async () => {
  if (auth.currentUser !== null) {
    let snapshot = await db.collection("flights_saved_flights").get();
    if (!snapshot.empty) {
      let list = [];
      let flightsToDelete = [];

      const date = new Date();

      const token = auth.currentUser.uid;

      snapshot.forEach((doc) => {
        if (doc.data().user_token === token) {
          const docDate = new Date(doc.data().departure_date);

          if (date.getTime() >= docDate.getTime()) {
            flightsToDelete.push({ id: doc.id, data: doc.data() });
          } else {
            list.push({ id: doc.id, data: doc.data() });
          }
        }
      });

      if (flightsToDelete.length !== 0) {
        flightsToDelete.forEach((flight) =>
          db.collection("flights_saved_flights").doc(flight.id).delete()
        );
      }
      dispatch({ type: "get_saved_flights", payload: list });
    }
  }
};

const getStatisticsFlights = (dispatch) => async () => {
  let list = [];
  let snapshot = await db.collection("flights_statistics").get();
  snapshot.forEach((doc) => {
    list.push({ id: doc.id, data: doc.data() });
  });

  dispatch({ type: "get_statistics_flights", payload: list });
};

const addToStatistics = (dispatch) => async (departureCity, arrivalCity) => {
  let list = [];
  let isInDatabase = false;
  let documentId;
  let searches;
  let flightIndex = -1;
  let i = 0;
  let snapshot = await db.collection("flights_statistics").get();
  snapshot.forEach((doc) => {
    list.push({ id: doc.id, data: doc.data() });
    if (
      (doc.data().first_city.city_iata_code === departureCity.city_iata_code &&
        doc.data().second_city.city_iata_code === arrivalCity.city_iata_code) ||
      (doc.data().first_city.city_iata_code === arrivalCity.city_iata_code &&
        doc.data().second_city.city_iata_code === departureCity.city_iata_code)
    ) {
      flightIndex = i;

      isInDatabase = true;
      documentId = doc.id;
      searches = doc.data().searches;
    }
    i++;
  });

  if (!isInDatabase) {
    const documentRef = db.collection("flights_statistics").doc();
    const id = documentRef.id;
    const flight = {
      first_city: {
        city_name: departureCity.city_name,
        city_iata_code: departureCity.city_iata_code,
        country_iso2: departureCity.country_iso2,
        country_name: departureCity.country_name,
      },
      searches: 1,
      second_city: {
        city_name: arrivalCity.city_name,
        city_iata_code: arrivalCity.city_iata_code,
        country_iso2: arrivalCity.country_iso2,
        country_name: arrivalCity.country_name,
      },
    };
    await documentRef.set(flight);
    list.push({ id: id, data: flight });
  } else {
    searches += 1;
    list[flightIndex].data.searches = searches;
    await db
      .collection("flights_statistics")
      .doc(documentId)
      .update({ searches: searches });
  }

  dispatch({ type: "get_statistics_flights", payload: list });
};

const addFlightToShow = (dispatch) => (flight) => {
  dispatch({ type: "add_flight_to_show", payload: flight });
};

export const { Context, Provider } = createDataContext(
  flightsReducer,
  {
    addFlightToShow,
    addCities,
    addFlightsRoundTrip,
    addFlightsOneWay,
    addWhereToCity,
    addFlightToSavedFlights,
    addToStatistics,
    getSavedFlights,
    deleteFlightFromSavedFlights,
    addPriceToCountries,
    addPriceToRecommendedCountries,
    addUserCoordinates,
    clearLocations,
    getDate,
    getCountriesBySearchType,
    getLocations,
    getRecommendedCountries,
    getStatisticsFlights,
  },
  {
    cities: {},
    date: null,
    flightsRoundTrip: [],
    flightsOneWay: [],
    recommendedCountries: [],
    popularDestinations: [],
    quickGetaways: [],
    longerTrips: [],
    lastMinute: [],
    planAhead: [],
    exploreEverywhere: [],
    lastViewed: [],
    locations: [],
    userCoords: null,
    whereToCity: null,
    savedFlights: [],
    statisticsFlights: [],
    flightToShow: null,
  }
);
