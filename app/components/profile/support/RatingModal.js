import React, { useContext, useState } from 'react';
import { Dimensions, Modal, StyleSheet, Text, View } from 'react-native';

import { AirbnbRating } from 'react-native-elements';
import Ripple from 'react-native-material-ripple';

import { Context as UserContext } from '../../../context/UserContext';

import colors from '../../../../global/colors';
import globalStyles from '../../../../global/globalStyles';

const { width, height } = Dimensions.get('window');
const RatingModal = ({ ratingModalVisible, setRatingModalVisible }) => {
  const [rating, setRating] = useState(userRating);

  const {
    state: { userRating },
    addUserRating
  } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <Modal
        animationType='slide'
        transparent={true}
        style={styles.container}
        visible={ratingModalVisible}
        onRequestClose={setRatingModalVisible}
      >
        <View style={styles.outerView}>
          <View style={styles.innerView}>
            <Text style={styles.normalText}>Rate &quot;Flights!&quot; app</Text>
            <AirbnbRating
              count={5}
              reviews={['Terrible', 'Bad', 'OK', 'Good', 'Very Good']}
              defaultRating={userRating}
              size={40}
              onFinishRating={(ratingVal) => {
                setRating(ratingVal);
              }}
            />

            <View style={styles.buttonsView}>
              <Ripple
                rippleColor={colors.WHITE}
                rippleOpacity={0.8}
                rippleContainerBorderRadius={12}
                style={styles.buttonStyle}
                onPress={() => {
                  setRatingModalVisible(false);
                }}
                onLongPress={() => {
                  setRatingModalVisible(false);
                }}
                delayLongPress={150}
              >
                <Text style={styles.buttonTextStyle}>Cancel</Text>
              </Ripple>
              <Ripple
                rippleColor={colors.WHITE}
                rippleOpacity={0.8}
                rippleContainerBorderRadius={12}
                style={[styles.buttonStyle, styles.okButtonStyle]}
                onPress={() => {
                  addUserRating(rating);
                  setRatingModalVisible(false);
                }}
                onLongPress={() => {
                  addUserRating(rating);
                  setRatingModalVisible(false);
                }}
                delayLongPress={150}
              >
                <Text style={styles.buttonTextStyle}>Ok</Text>
              </Ripple>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: colors.ORANGE,
    borderRadius: 20,
    height: 50,
    justifyContent: 'center',
    width: 100
  },
  buttonTextStyle: {
    ...globalStyles.boldText,
    color: colors.WHITE,
    fontSize: 18
  },
  buttonsView: {
    flexDirection: 'row',
    marginTop: 38
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0
  },
  innerView: {
    alignItems: 'center',
    backgroundColor: colors.WHITE,
    borderRadius: 20,
    elevation: 10,
    height: height * 0.4,
    shadowColor: colors.BLACK,
    width: width * 0.8
  },
  normalText: {
    ...globalStyles.boldText,
    fontSize: 22,
    marginVertical: 20
  },
  okButtonStyle: {
    flexDirection: 'row',
    marginTop: 38
  },
  outerView: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  }
});

export default RatingModal;
