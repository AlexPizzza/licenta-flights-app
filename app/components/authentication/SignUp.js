import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input } from 'react-native-elements';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import WelcomeText from './WelcomeText';

import globalStyles from '../../../global/globalStyles';
import colors from '../../../global/colors';

import { Context as AuthContext } from '../../context/AuthContext';
import AuthButton from './AuthButton';

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Email badly formatted!').required('Required.'),
  password: Yup.string()
    .matches(
      '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]',
      'Password must have at least one letter and one number.'
    )
    .min(6, 'The password must be 6 characters long or more.')
    .required('No password provided.'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords do not match.')
    .required('Required.')
});

const SignUp = () => {
  const {
    state,
    clearEmailErrorMessage,
    clearPasswordErrorMessage,
    clearConfirmPasswordErrorMessage
  } = useContext(AuthContext);

  return (
    <View style={styles.formContainer}>
      <WelcomeText
        headerText='Create account'
        normalText='Let us know your email and password'
      />

      <Formik
        initialValues={{
          fullName: '',
          email: '',
          password: '',
          confirmPassword: ''
        }}
        validationSchema={SignupSchema}
      >
        {({ handleChange, handleBlur, values, errors, touched }) => (
          <View style={styles.inputsContainer}>
            <Input
              placeholder='Enter your email'
              autoCapitalize='none'
              keyboardType='email-address'
              value={values.email}
              onChangeText={(text) => {
                handleChange('email')(text);
                clearEmailErrorMessage();
              }}
              onBlur={handleBlur('email')}
              leftIcon={() => (
                <MaterialIcons
                  name='email'
                  size={globalStyles.authIconSize}
                  color={colors.FOOTER}
                  style={styles.leftIconMarginRight}
                />
              )}
              errorStyle={[globalStyles.normalText, styles.errorMessage]}
              errorMessage={state.emailError || (touched.email && errors.email)}
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
              errorMessage={
                state.passwordError || (touched.password && errors.password)
              }
              contextMenuHidden={true}
            />
            <Input
              placeholder='Confirm password'
              secureTextEntry
              value={values.confirmPassword}
              onChangeText={(text) => {
                handleChange('confirmPassword')(text);
                clearConfirmPasswordErrorMessage();
                clearPasswordErrorMessage();
              }}
              onBlur={handleBlur('confirmPassword')}
              leftIcon={() => (
                <MaterialCommunityIcons
                  name='lock-check'
                  size={globalStyles.authIconSize}
                  color={colors.FOOTER}
                  style={styles.leftIconMarginRight}
                />
              )}
              errorStyle={[globalStyles.normalText, styles.errorMessage]}
              errorMessage={
                state.confirmPasswordError ||
                (touched.confirmPassword && errors.confirmPassword)
              }
              contextMenuHidden={true}
            />

            <AuthButton
              authText='signup'
              email={values.email}
              password={values.password}
              confirmPassword={values.confirmPassword}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  errorMessage: {
    color: colors.RED,
    fontSize: 16
  },
  formContainer: {
    backgroundColor: colors.BG_COLOR,
    borderRadius: globalStyles.authBorderRadius,
    borderTopLeftRadius: 0,
    flex: 5,
    paddingHorizontal: globalStyles.marginHorizontal.marginHorizontal
  },
  inputsContainer: {
    flex: 9
  },
  leftIconMarginRight: {
    marginRight: 4
  }
});

export default SignUp;
