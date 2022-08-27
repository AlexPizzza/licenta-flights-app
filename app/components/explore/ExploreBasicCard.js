import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ripple from 'react-native-material-ripple';

import globalStyles from '../../../global/globalStyles';
import colors from '../../../global/colors';

const ExploreBasicCard = ({ item }) => {
  const navigation = useNavigation();

  const goToSpecifiedScreen = (title) => {
    let searchTypeString = title.toLowerCase();
    searchTypeString = searchTypeString.split(' ');

    const searchType = searchTypeString[0] + '_' + searchTypeString[1];
    navigation.navigate('RecommendedScreen', { title, searchType });
  };

  return (
    <View style={styles.container}>
      <Ripple
        rippleColor={colors.WHITE}
        rippleOpacity={0.8}
        rippleContainerBorderRadius={8}
        onPress={() => goToSpecifiedScreen(item.title)}
        onLongPress={() => goToSpecifiedScreen(item.title)}
        delayLongPress={150}
        style={styles.cardView}
      >
        <Image style={styles.image} source={item.image} />
      </Ripple>
      <View style={styles.textView}>
        <Text style={styles.itemTitle}>{item.title}</Text>
      </View>
    </View>
  );
};

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  cardView: {
    backgroundColor: colors.WHITE,
    borderRadius: 8,
    elevation: 6,
    flex: 1,
    marginHorizontal: 1,
    marginVertical: 6,
    shadowColor: colors.BLACK
  },
  container: {
    flex: 1,
    ...globalStyles.marginHorizontal,
    height: 0.32 * height,
    width: 0.5 * width
  },
  image: {
    borderRadius: 8,
    height: 0.26 * height,
    width: 0.494 * width
  },
  itemTitle: {
    color: colors.BLACK,
    marginBottom: 5,
    ...globalStyles.normalText
  },
  textView: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default ExploreBasicCard;
