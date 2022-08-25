import React, { useContext, useEffect } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';

import CustomImage from '../../components/authentication/CustomImage';
import Footer from '../../components/authentication/Footer';
import Header from '../../components/authentication/Header';
import SignIn from '../../components/authentication/SignIn';

import { Context as AuthContext } from '../../context/AuthContext';

import colors from '../../../global/colors';
import globalStyles from '../../../global/globalStyles';

import authImage from '../../../assets/auth.jpg';

const SignInScreen = ({ navigation }) => {
  const { clearEmailErrorMessage, clearPasswordErrorMessage } =
    useContext(AuthContext);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      clearEmailErrorMessage();
      clearPasswordErrorMessage();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor='transparent' />

      <Header image={authImage} />

      <View style={styles.imageAndFormContainer}>
        <CustomImage image={authImage} />

        <View style={styles.signInView}>
          <SignIn />
        </View>

        <Footer
          basicText="Don't have an account?"
          authText='Sign Up Here'
          screenName='SignUp'
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.FOOTER,
    flex: 1
  },
  imageAndFormContainer: {
    borderTopLeftRadius: globalStyles.authBorderRadius,
    flex: 1
  },
  signInView: {
    flex: 5
  }
});

export default SignInScreen;
