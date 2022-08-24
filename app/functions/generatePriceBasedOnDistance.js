import randomIntFromInterval from "./generateNumberFromInterval";

const generatePriceBasedOnDistance = (distance) => {
  switch (true) {
    case distance < 3000:
      return Math.floor(50 + distance * 0.1 + randomIntFromInterval(100, 200));
    case distance < 6000:
      return Math.floor(
        100 + distance * 0.25 + randomIntFromInterval(200, 300)
      );
    default:
      return Math.floor(
        200 + distance * 0.35 + randomIntFromInterval(300, 500)
      );
  }
};

export default generatePriceBasedOnDistance;
