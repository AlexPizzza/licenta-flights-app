import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import Ripple from 'react-native-material-ripple';

import { Context as FlightsContext } from '../../context/FlightsContext';

import colors from '../../../global/colors';
import globalStyles from '../../../global/globalStyles';

const LocationsListItem = ({
  item,
  onPress,
  setModalVisible,
  setLocationModalVisible,
  setCity
}) => {
  const { clearLocations } = useContext(FlightsContext);

  return (
    <Ripple
      key={item.id}
      rippleColor={colors.PURPLE}
      rippleOpacity={0.8}
      onPress={() => {
        onPress(
          item.city_name
            ? item.city_name + ' (' + item.iata_code + ')'
            : item.capital
        );
        setCity(item);
        clearLocations();
        setLocationModalVisible(false);
        setModalVisible(true);
      }}
      onLongPress={() => {
        onPress(
          item.city_name
            ? item.city_name + '(' + item.iata_code + ')'
            : item.capital
        );
        setCity(item);
        clearLocations();
        setLocationModalVisible(false);
        setModalVisible(true);
      }}
      delayLongPress={150}
    >
      <ListItem>
        <ListItem.Content>
          <ListItem.Title style={styles.title}>
            {item.airport_name ? item.airport_name : item.capital}
          </ListItem.Title>
          <ListItem.Subtitle style={styles.subtitle}>
            {item.city_name
              ? item.city_name + ', ' + item.country_name
              : item.country_name}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </Ripple>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    ...globalStyles.normalText,
    fontSize: 16,
    marginTop: 4
  },
  title: {
    ...globalStyles.normalText,
    fontSize: 18,
    marginVertical: -6
  }
});

export default LocationsListItem;
