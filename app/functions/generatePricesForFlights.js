import randomIntFromInterval from "./generateNumberFromInterval";
import computeDistance from "./computeDistance";
import generatePriceBasedOnDistance from "./generatePriceBasedOnDistance";
import generateAdditionalPriceBasedOnDaysLeftTillFlight from "./generateAdditionalPriceBasedOnDaysLeftTillFlight";

const speed = 900;
const numberOfMinutesInADay = 1440;

const Europe = ["Wizz Air", "Ryanair", "EasyJet", "Virgin Atlantic"];

const America = [
  "Jet Blue",
  "American Airlines",
  "United Airlines",
  "Delta Air Lines",
];

const Africa = [
  "Royal Air Maroc",
  "RwandAir",
  "South African Airways",
  "Kenya Airways",
];

const Asia = [
  "Cathay Pacific Airways",
  "Singapore Airlines",
  "Asiana Airlines",
  "EVA Air",
];

const Australia = [
  "Qantas",
  "Virgin Australia",
  "JetStar Airways",
  "Fiji Airways",
];

const otherAirlines = ["Core Airways", "Jet Air", "Blue Sky", "Peak Airways"];

const generatePriceForRoundTripFlights = (
  departureCity,
  arrivalCity,
  noOfDaysTillFlight,
  departureDate,
  arrivalDate
) => {
  const flightsList = [];

  const numberOfFlights = randomIntFromInterval(1, 5) + 1;

  const distance = computeDistance(
    [departureCity.latitude, departureCity.longitude],
    [arrivalCity.latitude, arrivalCity.longitude]
  );
  const time = Math.floor((distance / speed) * 60);

  for (let i = 0; i < numberOfFlights; i++) {
    const additionalPrice =
      generateAdditionalPriceBasedOnDaysLeftTillFlight(noOfDaysTillFlight);
    const priceBasedOnDistance = generatePriceBasedOnDistance(distance);

    const randomFlightTime =
      Math.floor((time + randomIntFromInterval(0, 15)) / 5) * 5;
    const randomFlightTimeInHrs = Math.floor(randomFlightTime / 60);
    const randomFlightTimeInHrsWithDecimals = (randomFlightTime / 60).toFixed(
      2
    );
    const decimal =
      randomFlightTimeInHrsWithDecimals -
      Math.floor(randomFlightTimeInHrsWithDecimals);
    const randomFlightTimeInMins = Math.round(decimal * 60);

    const [departureHours, departureMinutes, departureTotalMinutes] =
      randomTime();

    let arrivalHours;
    let arrivalHoursWithDecimals;
    let arrivalDecimal;
    let arrivalMinutes;
    if (departureTotalMinutes + randomFlightTime === numberOfMinutesInADay) {
      arrivalHours = 0;
      arrivalMinutes = 0;
    } else if (
      departureTotalMinutes + randomFlightTime >
      numberOfMinutesInADay
    ) {
      const minutesOver =
        departureTotalMinutes + randomFlightTime - numberOfMinutesInADay;
      if (minutesOver < 60) {
        arrivalHours = 0;
        arrivalMinutes = minutesOver;
      } else {
        arrivalHours = Math.floor(minutesOver / 60);
        arrivalHoursWithDecimals = (minutesOver / 60).toFixed(2);
        arrivalDecimal =
          arrivalHoursWithDecimals - Math.floor(arrivalHoursWithDecimals);
        arrivalMinutes = Math.round(arrivalDecimal * 60);
      }
    } else {
      const totalMinutes = departureTotalMinutes + randomFlightTime;
      arrivalHours = Math.floor(totalMinutes / 60);
      arrivalHoursWithDecimals = (totalMinutes / 60).toFixed(2);
      arrivalDecimal =
        arrivalHoursWithDecimals - Math.floor(arrivalHoursWithDecimals);
      arrivalMinutes = Math.round(arrivalDecimal * 60);
    }

    const [
      departureFromArrivalCityHours,
      departureFromArrivalCityMinutes,
      departureFromArrivalCityTotalMinutes,
    ] = randomTime();

    let arrivalToDepartureCityHours;
    let arrivalToDepartureCityHoursWithDecimals;
    let arrivalToDepartureCityDecimal;
    let arrivalToDepartureCityMinutes;
    if (
      departureFromArrivalCityTotalMinutes + randomFlightTime ===
      numberOfMinutesInADay
    ) {
      arrivalToDepartureCityHours = 0;
      arrivalToDepartureCityMinutes = 0;
    } else if (
      departureFromArrivalCityTotalMinutes + randomFlightTime >
      numberOfMinutesInADay
    ) {
      const minutesOver =
        departureFromArrivalCityTotalMinutes +
        randomFlightTime -
        numberOfMinutesInADay;
      if (minutesOver < 60) {
        arrivalToDepartureCityHours = 0;
        arrivalToDepartureCityMinutes = minutesOver;
      } else {
        arrivalToDepartureCityHours = Math.floor(minutesOver / 60);
        arrivalToDepartureCityHoursWithDecimals = (minutesOver / 60).toFixed(2);
        arrivalToDepartureCityDecimal =
          arrivalToDepartureCityHoursWithDecimals -
          Math.floor(arrivalToDepartureCityHoursWithDecimals);
        arrivalToDepartureCityMinutes = Math.round(
          arrivalToDepartureCityDecimal * 60
        );
      }
    } else {
      const totalMinutes =
        departureFromArrivalCityTotalMinutes + randomFlightTime;
      arrivalToDepartureCityHours = Math.floor(totalMinutes / 60);
      arrivalToDepartureCityHoursWithDecimals = (totalMinutes / 60).toFixed(2);
      arrivalToDepartureCityDecimal =
        arrivalToDepartureCityHoursWithDecimals -
        Math.floor(arrivalToDepartureCityHoursWithDecimals);
      arrivalToDepartureCityMinutes = Math.round(
        arrivalToDepartureCityDecimal * 60
      );
    }

    const ticket_price =
      Math.ceil((priceBasedOnDistance + additionalPrice) / 10) * 10;

    const flight = {
      departure_city: departureCity,
      arrival_city: arrivalCity,
      departure_date: departureDate,
      arrival_date: arrivalDate,
      ticket_price: ticket_price,
      outbound: {
        flight_duration: {
          hours:
            randomFlightTimeInHrs < 10
              ? "0" + randomFlightTimeInHrs
              : randomFlightTimeInHrs + "",
          minutes:
            randomFlightTimeInMins < 10
              ? "0" + randomFlightTimeInMins
              : randomFlightTimeInMins + "",
        },
        departure_time: {
          hours:
            departureHours < 10 ? "0" + departureHours : departureHours + "",
          minutes:
            departureMinutes < 10
              ? "0" + departureMinutes
              : departureMinutes + "",
        },
        arrival_time: {
          hours: arrivalHours < 10 ? "0" + arrivalHours : arrivalHours + "",
          minutes:
            arrivalMinutes < 10 ? "0" + arrivalMinutes : arrivalMinutes + "",
        },
      },
      return: {
        flight_duration: {
          hours:
            randomFlightTimeInHrs < 10
              ? "0" + randomFlightTimeInHrs
              : randomFlightTimeInHrs + "",
          minutes:
            randomFlightTimeInMins < 10
              ? "0" + randomFlightTimeInMins
              : randomFlightTimeInMins + "",
        },
        departure_time: {
          hours:
            departureFromArrivalCityHours < 10
              ? "0" + departureFromArrivalCityHours
              : departureFromArrivalCityHours + "",
          minutes:
            departureFromArrivalCityMinutes < 10
              ? "0" + departureFromArrivalCityMinutes
              : departureFromArrivalCityMinutes + "",
        },
        arrival_time: {
          hours:
            arrivalToDepartureCityHours < 10
              ? "0" + arrivalToDepartureCityHours
              : arrivalToDepartureCityHours + "",
          minutes:
            arrivalToDepartureCityMinutes < 10
              ? "0" + arrivalToDepartureCityMinutes
              : arrivalToDepartureCityMinutes + "",
        },
      },
    };

    let airline;
    const randomAirport = randomIntFromInterval(0, 3);
    if (i % 2 === 0) {
      const timezone = flight.departure_city.timezone;
      if (timezone.toLowerCase().includes("europe")) {
        airline = Europe[randomAirport];
      } else if (timezone.toLowerCase().includes("america")) {
        airline = America[randomAirport];
      } else if (timezone.toLowerCase().includes("asia")) {
        airline = Asia[randomAirport];
      } else if (timezone.toLowerCase().includes("africa")) {
        airline = Africa[randomAirport];
      } else if (timezone.toLowerCase().includes("australia")) {
        airline = Australia[randomAirport];
      } else {
        airline = otherAirlines[randomAirport];
      }
    } else {
      const timezone = flight.arrival_city.timezone;
      if (timezone.toLowerCase().includes("europe")) {
        airline = Europe[randomAirport];
      } else if (timezone.toLowerCase().includes("america")) {
        airline = America[randomAirport];
      } else if (timezone.toLowerCase().includes("asia")) {
        airline = Asia[randomAirport];
      } else if (timezone.toLowerCase().includes("africa")) {
        airline = Africa[randomAirport];
      } else if (timezone.toLowerCase().includes("australia")) {
        airline = Australia[randomAirport];
      } else {
        airline = otherAirlines[randomAirport];
      }
    }
    flight.airline = airline;

    flightsList.push(flight);
  }

  flightsList.sort((a, b) => a.ticket_price - b.ticket_price);

  return flightsList;
};

const generatePriceForOneWayFlights = (
  departureCity,
  arrivalCity,
  noOfDaysTillFlight,
  departureDate
) => {
  const flightsList = [];

  const numberOfFlights = randomIntFromInterval(1, 5) + 1;

  const distance = computeDistance(
    [departureCity.latitude, departureCity.longitude],
    [arrivalCity.latitude, arrivalCity.longitude]
  );
  const time = Math.floor((distance / speed) * 60);

  for (let i = 0; i < numberOfFlights; i++) {
    const additionalPrice =
      generateAdditionalPriceBasedOnDaysLeftTillFlight(noOfDaysTillFlight);
    const priceBasedOnDistance = generatePriceBasedOnDistance(distance);
    const randomFlightTime =
      Math.floor((time + randomIntFromInterval(0, 15)) / 5) * 5;

    const randomFlightTimeInHrs = Math.floor(randomFlightTime / 60);
    const randomFlightTimeInHrsWithDecimals = (randomFlightTime / 60).toFixed(
      2
    );
    const decimal =
      randomFlightTimeInHrsWithDecimals -
      Math.floor(randomFlightTimeInHrsWithDecimals);
    const randomFlightTimeInMins = Math.round(decimal * 60);

    const [departureHours, departureMinutes, departureTotalMinutes] =
      randomTime();

    let arrivalHours;
    let arrivalHoursWithDecimals;
    let arrivalDecimal;
    let arrivalMinutes;
    if (departureTotalMinutes + randomFlightTime === numberOfMinutesInADay) {
      arrivalHours = 0;
      arrivalMinutes = 0;
    } else if (
      departureTotalMinutes + randomFlightTime >
      numberOfMinutesInADay
    ) {
      const minutesOver =
        departureTotalMinutes + randomFlightTime - numberOfMinutesInADay;
      if (minutesOver < 60) {
        arrivalHours = 0;
        arrivalMinutes = minutesOver;
      } else {
        arrivalHours = Math.floor(minutesOver / 60);
        arrivalHoursWithDecimals = (minutesOver / 60).toFixed(2);
        arrivalDecimal =
          arrivalHoursWithDecimals - Math.floor(arrivalHoursWithDecimals);
        arrivalMinutes = Math.round(arrivalDecimal * 60);
      }
    } else {
      const totalMinutes = departureTotalMinutes + randomFlightTime;
      arrivalHours = Math.floor(totalMinutes / 60);
      arrivalHoursWithDecimals = (totalMinutes / 60).toFixed(2);
      arrivalDecimal =
        arrivalHoursWithDecimals - Math.floor(arrivalHoursWithDecimals);
      arrivalMinutes = Math.round(arrivalDecimal * 60);
    }

    const ticket_price =
      Math.ceil((priceBasedOnDistance + additionalPrice) / 20) * 10;

    const flight = {
      departure_city: departureCity,
      arrival_city: arrivalCity,
      departure_date: departureDate,
      ticket_price: ticket_price,
      flight_duration: {
        hours:
          randomFlightTimeInHrs < 10
            ? "0" + randomFlightTimeInHrs
            : randomFlightTimeInHrs + "",
        minutes:
          randomFlightTimeInMins < 10
            ? "0" + randomFlightTimeInMins
            : randomFlightTimeInMins + "",
      },
      departure_time: {
        hours: departureHours < 10 ? "0" + departureHours : departureHours + "",
        minutes:
          departureMinutes < 10
            ? "0" + departureMinutes
            : departureMinutes + "",
      },
      arrival_time: {
        hours: arrivalHours < 10 ? "0" + arrivalHours : arrivalHours + "",
        minutes:
          arrivalMinutes < 10 ? "0" + arrivalMinutes : arrivalMinutes + "",
      },
    };

    let airline;
    const randomAirport = randomIntFromInterval(0, 3);
    if (i % 2 === 0) {
      const timezone = flight.departure_city.timezone;
      if (timezone.toLowerCase().includes("europe")) {
        airline = Europe[randomAirport];
      } else if (timezone.toLowerCase().includes("america")) {
        airline = America[randomAirport];
      } else if (timezone.toLowerCase().includes("asia")) {
        airline = Asia[randomAirport];
      } else if (timezone.toLowerCase().includes("africa")) {
        airline = Africa[randomAirport];
      } else if (timezone.toLowerCase().includes("australia")) {
        airline = Australia[randomAirport];
      } else {
        airline = otherAirlines[randomAirport];
      }
    } else {
      const timezone = flight.arrival_city.timezone;
      if (timezone.toLowerCase().includes("europe")) {
        airline = Europe[randomAirport];
      } else if (timezone.toLowerCase().includes("america")) {
        airline = America[randomAirport];
      } else if (timezone.toLowerCase().includes("asia")) {
        airline = Asia[randomAirport];
      } else if (timezone.toLowerCase().includes("africa")) {
        airline = Africa[randomAirport];
      } else if (timezone.toLowerCase().includes("australia")) {
        airline = Australia[randomAirport];
      } else {
        airline = otherAirlines[randomAirport];
      }
    }
    flight.airline = airline;

    flightsList.push(flight);
  }

  flightsList.sort((a, b) => a.ticket_price - b.ticket_price);

  return flightsList;
};

const randomTime = () => {
  let hrs = Math.round(Math.random() * 24);
  let mins = Math.round(Math.round(Math.random() * 60) / 10) * 10;

  if (hrs === 24) {
    hrs = 0;
  }

  if (mins === 60) {
    hrs++;
    if (hrs === 24) {
      hrs = 0;
    }
    mins = 0;
  }

  const hrsToMins = hrs * 60;

  const totalMins = hrsToMins + mins;

  return [hrs, mins, totalMins];
};

export { generatePriceForRoundTripFlights, generatePriceForOneWayFlights };
