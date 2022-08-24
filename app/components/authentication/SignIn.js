import React, { useContext } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Input } from 'react-native-elements';
import { Formik } from 'formik';

import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import WelcomeText from './WelcomeText';
import AuthButton from './AuthButton';

import { Context as AuthContext } from '../../context/AuthContext';

import colors from '../../../global/colors';
import globalStyles from '../../../global/globalStyles';

const SignIn = () => {
  const { state, clearEmailErrorMessage, clearPasswordErrorMessage } =
    useContext(AuthContext);

  return (
    <View style={styles.formContainer}>
      <WelcomeText
        headerText='Welcome back'
        normalText='Use your credentials below and login to your account'
      />

      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
      >
        {({ handleChange, handleBlur, values }) => (
          <View style={styles.inputsContainer}>
            <Input
              placeholder='Enter your email'
              autoCapitalize='none'
              value={values.email}
              onChangeText={(text) => {
                handleChange('email')(text);
                clearEmailErrorMessage();
              }}
              onBlur={handleBlur('email')}
              keyboardType='email-address'
              leftIcon={() => (
                <MaterialIcons
                  name='email'
                  size={globalStyles.authIconSize}
                  color={colors.FOOTER}
                  style={styles.leftIconMarginRight}
                />
              )}
              errorStyle={[globalStyles.normalText, styles.errorMessage]}
              errorMessage={state.emailError}
            />
            <Input
              placeholder='Enter your password'
              secureTextEntry
              value={values.password}
              onChangeText={(text) => {
                handleChange('password')(text);
                clearPasswordErrorMessage();
              }}
              onBlur={handleBlur('password')}
              leftIcon={() => (
                <MaterialCommunityIcons
                  name='lock'
                  size={globalStyles.authIconSize}
                  color={colors.FOOTER}
                  style={styles.leftIconMarginRight}
                />
              )}
              errorStyle={[globalStyles.normalText, styles.errorMessage]}
              errorMessage={state.passwordError}
            />

            <AuthButton
              authText='signin'
              email={values.email}
              password={values.password}
              style={styles.authButton}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

const { height } = Dimensions.get('window');
const styles = StyleSheet.create({
  authButton: {
    marginTop: 30
  },
  errorMessage: {
    color: colors.RED,
    fontSize: 16
  },
  formContainer: {
    backgroundColor: colors.BG_COLOR,
    borderRadius: globalStyles.authBorderRadius,
    borderTopLeftRadius: 0,
    flex: 1,
    paddingHorizontal: globalStyles.marginHorizontal.marginHorizontal
  },
  inputsContainer: {
    flex: 4,
    height: height
  },
  leftIconMarginRight: {
    marginRight: 4
  }
});

export default SignIn;
