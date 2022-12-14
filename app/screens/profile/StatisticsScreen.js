import { Ionicons } from '@expo/vector-icons';
import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';

import { Context as FlightsContext } from '../../context/FlightsContext';

import colors from '../../../global/colors';
import globalStyles from '../../../global/globalStyles';

const colorsLegend = [
  {
    color: '#C13018',
    legendFontColor: '#7F7F7F'
  },
  {
    color: '#F36F13',
    legendFontColor: '#7F7F7F'
  },
  {
    color: '#EBCB38',
    legendFontColor: '#7F7F7F'
  },
  {
    color: '#A2B969',
    legendFontColor: '#7F7F7F'
  },
  {
    color: '#0D95BC',
    legendFontColor: '#7F7F7F'
  }
];

const barChartConfig = {
  backgroundGradientFrom: '#d17500',
  backgroundGradientTo: '#ffa93b',
  barPercentage: 0.9,
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  propsForVerticalLabels: {
    translateX: -22,
    translateY: 18
  },
  propsForHorizontalLabels: {
    translateY: -2,
    translateX: 10
  },
  propsForBackgroundLines: {
    strokeWidth: 0.3,
    stroke: '#FFF',
    strokeDasharray: '10'
  },
  fillShadowGradient: 'white',
  fillShadowGradientOpacity: 0.4,
  propsForLabels: {
    fontSize: 12
  }
};

const { width } = Dimensions.get('window');
const StatisticsScreen = () => {
  const {
    state: { statisticsFlights }
  } = useContext(FlightsContext);

  const [routesData, setRoutesData] = useState(null);
  const [countriesData, setCountriesData] = useState([]);

  const routesFunction = () => {
    statisticsFlights.sort((a, b) => b.data.searches - a.data.searches);

    const firstFive = statisticsFlights.slice(0, 5);

    const firstFiveData = firstFive.map((flight) => {
      const flightToReturn = {
        label:
          flight.data.first_city.city_iata_code +
          ' - ' +
          flight.data.second_city.city_iata_code,
        searches: flight.data.searches,
        cities:
          flight.data.first_city.city_name +
          ' - ' +
          flight.data.second_city.city_name,
        countries:
          flight.data.first_city.country_name +
          ' ' +
          flight.data.second_city.country_name
      };
      return flightToReturn;
    });

    const others = statisticsFlights.slice(5, statisticsFlights.length);

    let sum = 0;
    for (let i = 0; i < others.length; i++) {
      sum += others[i].data.searches;
    }

    const otherData = {
      label: 'Others',
      searches: sum
    };

    let list = {
      labels: [],
      datasets: [
        {
          data: []
        }
      ],
      cities: [],
      countries: []
    };
    firstFiveData.forEach((flight) => {
      list.labels.push(flight.label);
      list.datasets[0].data.push(flight.searches);
      list.cities.push(flight.cities);
      list.countries.push(flight.countries);
    });

    list.labels.push(otherData.label);
    list.datasets[0].data.push(otherData.searches);

    setRoutesData(list);
  };

  const countriesFunction = () => {
    let countriesList = [];
    statisticsFlights.forEach((flight) => {
      let country;
      if (
        flight.data.first_city.country_iso2 ===
        flight.data.second_city.country_iso2
      ) {
        if (countriesList.length !== 0) {
          let found = false;
          countriesList.forEach((country) => {
            if (country.country_iso2 === flight.data.first_city.country_iso2) {
              country.searches += flight.data.searches;
              found = true;
            }
          });
          if (!found) {
            country = {
              country_iso2: flight.data.first_city.country_iso2,
              country_name: flight.data.first_city.country_name,
              searches: flight.data.searches
            };
            countriesList.push(country);
          }
        } else {
          country = {
            country_iso2: flight.data.first_city.country_iso2,
            country_name: flight.data.first_city.country_name,
            searches: flight.data.searches
          };
          countriesList.push(country);
        }
      } else {
        if (countriesList.length !== 0) {
          let foundFirst = false;
          let foundSecond = false;
          countriesList.forEach((country) => {
            if (country.country_iso2 === flight.data.first_city.country_iso2) {
              country.searches += flight.data.searches;
              foundFirst = true;
            } else if (
              country.country_iso2 === flight.data.second_city.country_iso2
            ) {
              country.searches += flight.data.searches;
              foundSecond = true;
            }
          });
          if (!foundFirst) {
            country = {
              country_iso2: flight.data.first_city.country_iso2,
              country_name: flight.data.first_city.country_name,
              searches: flight.data.searches
            };
            countriesList.push(country);
          }
          if (!foundSecond) {
            country = {
              country_iso2: flight.data.second_city.country_iso2,
              country_name: flight.data.second_city.country_name,
              searches: flight.data.searches
            };
            countriesList.push(country);
          }
        } else {
          country = {
            country_iso2: flight.data.first_city.country_iso2,
            country_name: flight.data.first_city.country_name,
            searches: flight.data.searches
          };
          countriesList.push(country);
          country = {
            country_iso2: flight.data.second_city.country_iso2,
            country_name: flight.data.second_city.country_name,
            searches: flight.data.searches
          };
          countriesList.push(country);
        }
      }
    });

    countriesList.sort((a, b) => b.searches - a.searches);

    const firstFive = countriesList.slice(0, 5);
    const firstFiveData = firstFive.map((flight, index) => {
      const flightToReturn = {
        color: colorsLegend[index].color,
        legendFontColor: colorsLegend[index].legendFontColor,
        legendFontSize: 14,
        name: flight.country_name,
        searches: flight.searches
      };
      return flightToReturn;
    });

    const others = countriesList.slice(5, countriesList.length);

    let sum = 0;
    for (let i = 0; i < others.length; i++) {
      sum += others[i].searches;
    }

    const otherData = {
      name: 'Others',
      searches: sum,
      color: '#063951',
      legendFontColor: '#7F7F7F',
      legendFontSize: 14
    };

    let list = [];
    firstFiveData.forEach((flight) => list.push(flight));
    list.push(otherData);

    setCountriesData(list);
  };

  useEffect(() => {
    routesFunction();
    countriesFunction();
  }, [statisticsFlights]);

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollViewContentContainerStyle}
    >
      <Text style={styles.headerText}>Statistics</Text>

      <View style={styles.pichartOuterView}>
        <Text style={styles.titlePieChart}>Most Sought Countries</Text>

        <View style={styles.piechartView}>
          {countriesData ? (
            <PieChart
              data={countriesData}
              width={width}
              height={250}
              chartConfig={{
                color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`
              }}
              accessor={'searches'}
              center={[10, 5]}
            />
          ) : null}
        </View>
      </View>

      <View style={styles.barChartOuterView}>
        <Text style={styles.titleBarChart}>Most Searched Routes</Text>

        <View style={styles.barChartView}>
          {routesData ? (
            <View>
              <Text style={styles.numberOfSearchesTextStyle}>
                Number of searches
              </Text>
              <BarChart
                data={routesData}
                width={width * 0.98}
                height={400}
                chartConfig={barChartConfig}
                showValuesOnTopOfBars={true}
                verticalLabelRotation={-30}
                style={styles.barChartStyle}
              />
              <Text style={styles.flightRoutesTextStyle}>Flight routes</Text>

              <View style={styles.routesOuterView}>
                {routesData.labels.map((route, index) => (
                  <View key={'key' + index} style={styles.routesView}>
                    <View style={styles.routesInnerView}>
                      <Ionicons name='airplane' size={18} color='#dd9500' />
                      <Text
                        style={[styles.descriptionText, styles.routesTextStyle]}
                      >
                        {route}
                      </Text>
                    </View>

                    <Text
                      style={[
                        styles.descriptionText,
                        styles.routeCityTextStyle
                      ]}
                    >
                      {routesData.cities[index]}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          ) : null}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  barChartOuterView: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 2,
    marginTop: 20
  },
  barChartStyle: {
    borderRadius: 16
  },
  barChartView: {
    flex: 1,
    marginHorizontal: 4
  },
  container: {
    backgroundColor: colors.BG_COLOR
  },
  descriptionText: {
    ...globalStyles.normalText,
    fontSize: 16
  },
  flightRoutesTextStyle: {
    color: colors.WHITE,
    elevation: 4,
    fontSize: 16,
    left: 140,
    opacity: 0.9,
    position: 'absolute',
    top: 370
  },
  headerText: {
    ...globalStyles.headerBoldText,
    ...globalStyles.marginHorizontal,
    fontSize: 40,
    marginBottom: 20
  },
  numberOfSearchesTextStyle: {
    color: colors.WHITE,
    elevation: 4,
    fontSize: 16,
    left: -56,
    opacity: 0.9,
    position: 'absolute',
    top: 170,
    transform: [{ rotate: '270deg' }]
  },
  pichartOuterView: {
    alignItems: 'center',
    flex: 1,
    margin: 4
  },
  piechartView: {
    flex: 1,
    marginLeft: 16
  },
  routeCityTextStyle: {
    fontSize: 16
  },
  routesInnerView: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  routesOuterView: {
    marginVertical: 10
  },
  routesTextStyle: {
    ...globalStyles.boldText,
    marginBottom: 2,
    marginLeft: 10
  },
  routesView: {
    marginTop: 8,
    ...globalStyles.marginHorizontal
  },
  scrollViewContentContainerStyle: {
    flexGrow: 1
  },
  titleBarChart: {
    ...globalStyles.boldText,
    fontSize: 20,
    marginBottom: 12
  },
  titlePieChart: {
    ...globalStyles.boldText,
    fontSize: 20,
    marginTop: 6
  }
});

export default StatisticsScreen;
