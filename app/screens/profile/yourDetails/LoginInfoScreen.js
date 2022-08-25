import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { auth } from '../../../config/firebase';

import ChangeFullNameButton from '../../../components/profile/loginInfo/ChangeFullNameButton';
import ChangeFullNameModal from '../../../components/profile/loginInfo/ChangeFullNameModal';

import colors from '../../../../global/colors';
import globalStyles from '../../../../global/globalStyles';

const LoginInfo = () => {
  const [fullNameModalVisible, setFullNameModalVisible] = useState(false);
  const [fullName, setFullName] = useState('Currently no name was added');

  useEffect(() => {
    if (auth.currentUser.displayName) {
      setFullName(auth.currentUser.displayName);
    }
  }, []);

  return (
    <View style={styles.container}>
      <ChangeFullNameModal
        fullNameModalVisible={fullNameModalVisible}
        setFullNameModalVisible={setFullNameModalVisible}
        setFullName={setFullName}
      />

      <View style={styles.subContainer}>
        <Text style={styles.headerText}>Login Information</Text>

        <View style={styles.infoContainer}>
          <View style={styles.eachInfoContainer}>
            <Text style={styles.subHeaderText}>Email address:</Text>
            <Text style={styles.infoText}>{auth.currentUser.email}</Text>
          </View>

          <View style={styles.eachInfoContainer}>
            <Text style={styles.subHeaderText}>Full Name:</Text>
            <Text style={styles.infoText}>{fullName}</Text>
          </View>

          <View style={styles.buttonContainer}>
            <ChangeFullNameButton
              onPress={() => {
                setFullNameModalVisible(true);
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    marginTop: 10
  },
  container: {
    backgroundColor: colors.BG_COLOR,
    flex: 1
  },
  eachInfoContainer: {
    marginVertical: 5
  },
  headerText: {
    ...globalStyles.headerBoldText,
    fontSize: 38,
    ...globalStyles.marginHorizontal,
    marginBottom: 16
  },
  infoContainer: {
    ...globalStyles.marginHorizontal
  },
  infoText: {
    ...globalStyles.normalText,
    fontSize: 22
  },
  subContainer: {
    paddingLeft: globalStyles.marginHorizontal.value
  },
  subHeaderText: {
    ...globalStyles.normalText,
    color: colors.PURPLE,
    fontSize: 20
  }
});

export default LoginInfo;
