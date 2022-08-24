import React, { useEffect, useState } from 'react';
import { Dimensions, Modal, StyleSheet, Text, View } from 'react-native';
import { Input } from 'react-native-elements';

import { auth } from '../../../config/firebase';

import Ripple from 'react-native-material-ripple';

import colors from '../../../../global/colors';
import globalStyles from '../../../../global/globalStyles';

const { width, height } = Dimensions.get('window');
const ChangeFullNameModal = ({
  fullNameModalVisible,
  setFullNameModalVisible,
  setFullName
}) => {
  const changeAuthDisplayFullName = async (fullName) => {
    await auth.currentUser.updateProfile({
      displayName: fullName
    });
    await auth.currentUser.reload();
  };

  const [fullNameModal, setFullNameModal] = useState('');

  useEffect(() => {
    if (auth.currentUser.displayName) {
      setFullNameModal(auth.currentUser.displayName);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Modal
        animationType='slide'
        transparent={true}
        style={styles.container}
        visible={fullNameModalVisible}
        onRequestClose={setFullNameModalVisible}
      >
        <View style={styles.outerView}>
          <View style={styles.innerView}>
            <Text style={styles.normalText}>Change Full Name</Text>

            <Input
              placeholder='Enter your full name'
              autoCapitalize='words'
              value={fullNameModal}
              onChangeText={(text) => {
                setFullNameModal(text);
              }}
              keyboardType='default'
              containerStyle={styles.inputContainerStyle}
            />
            <View style={styles.buttonsView}>
              <Ripple
                rippleColor={colors.WHITE}
                rippleOpacity={0.8}
                rippleContainerBorderRadius={12}
                style={styles.buttonStyle}
                onPress={() => {
                  setFullNameModalVisible(false);
                }}
                onLongPress={() => {
                  setFullNameModalVisible(false);
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
                  changeAuthDisplayFullName(fullNameModal);
                  if (fullNameModal === '') {
                    setFullName('Currently no name was added');
                  } else {
                    setFullName(fullNameModal);
                  }
                  setFullNameModalVisible(false);
                }}
                onLongPress={() => {
                  changeAuthDisplayFullName(fullNameModal);
                  setFullName(fullNameModal);
                  setFullNameModalVisible(false);
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
  inputContainerStyle: {
    marginTop: 20,
    width: width * 0.7
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

export default ChangeFullNameModal;
