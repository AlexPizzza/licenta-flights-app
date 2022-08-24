import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Linking, StyleSheet, Text } from 'react-native';

import Ripple from 'react-native-material-ripple';

import colors from '../../../global/colors';
import globalStyles from '../../../global/globalStyles';

const europeUrls = [
  'https://wizzair.com/ro-ro#/',
  'https://www.ryanair.com/ro/ro',
  'https://www.easyjet.com/en/',
  'https://www.virginatlantic.com/'
];

const americaUrls = [
  'https://www.jetblue.com/',
  'https://www.aa.com/homePage.do?locale=en_US',
  'https://www.united.com/en/us',
  'https://www.delta.com/'
];

const africaUrls = [
  'https://www.royalairmaroc.com/int/',
  'https://www.rwandair.com/',
  'https://www.flysaa.com/',
  'https://www.kenya-airways.com/glo/en/'
];

const asiaUrls = [
  'https://www.cathaypacific.com/cx/en_US.html',
  'https://www.singaporeair.com/en_UK/sg/home',
  'https://flyasiana.com/',
  'https://www.evaair.com/en-global/index.html'
];

const australiaUrls = [
  'https://www.qantas.com/us/en.html',
  'https://www.virginaustralia.com/eu/en/',
  'https://www.jetstar.com/au/en/home',
  'https://www.fijiairways.com/en-us/'
];

const otherUrl = 'https://www.momondo.ro/?ispredir=true';

const ButtonGoToProvider = ({ item }) => {
  const [airline, setAirline] = useState('');
  useEffect(() => {
    if (item.data) {
      const flightAirline = item.data.airline.replace(/\s+/g, '').toLowerCase();
      setAirline(flightAirline);
    } else {
      const flightAirline = item.airline.replace(/\s+/g, '').toLowerCase();
      setAirline(flightAirline);
    }
  }, [item]);

  const handlePress = useCallback(async () => {
    let url;

    switch (airline) {
      case 'wizzair':
        url = europeUrls[0];
        break;
      case 'ryanair':
        url = europeUrls[1];
        break;
      case 'easyjet':
        url = europeUrls[2];
        break;
      case 'virginatlantic':
        url = europeUrls[3];
        break;
      case 'jetblue':
        url = americaUrls[0];
        break;
      case 'americanairlines':
        url = americaUrls[1];
        break;
      case 'unitedairlines':
        url = americaUrls[2];
        break;
      case 'deltaairline':
        url = americaUrls[3];
        break;
      case 'royalairmaroc':
        url = africaUrls[0];
        break;
      case 'rwandair':
        url = africaUrls[1];
        break;
      case 'southafricanairways':
        url = africaUrls[2];
        break;
      case 'kenyaairways':
        url = africaUrls[3];
        break;
      case 'cathaypacificairways':
        url = asiaUrls[0];
        break;
      case 'singaporeairlines':
        url = asiaUrls[1];
        break;
      case 'asianaairlines':
        url = asiaUrls[2];
        break;
      case 'evaair':
        url = asiaUrls[3];
        break;
      case 'qantas':
        url = australiaUrls[0];
        break;
      case 'virginaustralia':
        url = australiaUrls[1];
        break;
      case 'jetstarairways':
        url = australiaUrls[2];
        break;
      case 'fijiairways':
        url = australiaUrls[3];
        break;
      default:
        url = otherUrl;
    }

    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`URL format is bad: ${url}`);
    }
  }, [airline]);

  return (
    <Ripple
      rippleColor={colors.WHITE}
      rippleOpacity={0.8}
      rippleContainerBorderRadius={12}
      style={styles.buttonStyle}
      onPress={handlePress}
      onLongPress={handlePress}
      delayLongPress={150}
    >
      <Text style={styles.titleStyle}>Go to Provider</Text>
    </Ripple>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: colors.ORANGE,
    borderRadius: 40,
    height: 40,
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 20,
    width: 250
  },
  titleStyle: {
    color: colors.WHITE,
    ...globalStyles.boldText,
    fontSize: 20
  }
});

export default ButtonGoToProvider;
