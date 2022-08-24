import computeDistance from "./computeDistance";

const generateTrueOrFalseFlight = (
  departureCity,
  arrivalCity,
  noOfDaysTillFlight
) => {
  let isTrue;
  const distance = computeDistance(
    [departureCity.latitude, departureCity.longitude],
    [arrivalCity.latitude, arrivalCity.longitude]
  );
  if (noOfDaysTillFlight < 8 && distance < 3000) {
    isTrue = Math.random() >= 0.1 ? true : false;
  } else if (noOfDaysTillFlight < 8 && distance > 3000) {
    isTrue = Math.random() >= 0.3 ? true : false;
  } else if (noOfDaysTillFlight > 7 && distance < 3000) {
    isTrue = Math.random() >= 0.1 ? true : false;
  } else if (noOfDaysTillFlight > 7 && distance > 3000) {
    isTrue = Math.random() >= 0.2 ? true : false;
  }

  return isTrue;
};

export default generateTrueOrFalseFlight;
