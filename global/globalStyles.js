import { StyleSheet, Platform, StatusBar } from 'react-native';

const globalStyles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
  authBorderRadius: 80,
  authIconSize: 26,
  boldText: {
    fontFamily: 'nunito-bold',
    fontSize: 18
  },
  headerBoldText: {
    fontFamily: 'nunito-bold',
    fontSize: 24
  },
  headerText: {
    fontFamily: 'nunito-regular',
    fontSize: 24
  },
  imageHeightRatio: 0.14,
  labelText: {
    fontSize: 12
  },
  marginHorizontal: {
    marginHorizontal: 16
  },
  modalSearchBarBdRadius: 8,
  modalSearchMarginBottom: 4,
  normalText: {
    fontFamily: 'nunito-regular',
    fontSize: 18
  }
});

export default globalStyles;
