import computeDistance from "./computeDistance";
import generatePriceBasedOnDistance from "./generatePriceBasedOnDistance";
import generateAdditionalPriceBasedOnDaysLeftTillFlight from "./generateAdditionalPriceBasedOnDaysLeftTillFlight";

const generatePrice = (noOfDaysTillFlight, prevLat, prevLong, lat, long) => {
  const additionalPrice =
    generateAdditionalPriceBasedOnDaysLeftTillFlight(noOfDaysTillFlight);
  const priceBasedOnDistance = generatePriceBasedOnDistance(
    computeDistance([prevLat, prevLong], [lat, long])
  );

  return Math.ceil((priceBasedOnDistance + additionalPrice) / 10) * 10;
};

export default generatePrice;
