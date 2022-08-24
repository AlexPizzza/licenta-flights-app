import randomIntFromInterval from "./generateNumberFromInterval";

const generateAdditionalPriceBasedOnDaysLeftTillFlight = (
  noOfDaysTillFlight
) => {
  switch (true) {
    case noOfDaysTillFlight < 3:
      return randomIntFromInterval(50, 70);
    case noOfDaysTillFlight < 7:
      return randomIntFromInterval(30, 50);
    case noOfDaysTillFlight < 14:
      return randomIntFromInterval(10, 30);
    default:
      return 0;
  }
};

export default generateAdditionalPriceBasedOnDaysLeftTillFlight;
