import React, { useContext, useEffect } from "react";
import { StatusBar, StyleSheet, View } from "react-native";

import Footer from "../../components/authentication/Footer";
import Header from "../../components/authentication/Header";
import CustomImage from "../../components/authentication/CustomImage";
import SignIn from "../../components/authentication/SignIn";

import { Context as AuthContext } from "../../context/AuthContext";

import colors from "../../../global/colors";
import globalStyles from "../../../global/globalStyles";

import authImage from "../../../assets/auth.jpg";

const SignInScreen = ({ navigation }) => {
  const { clearEmailErrorMessage, clearPasswordErrorMessage } =
    useContext(AuthContext);

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      clearEmailErrorMessage();
      clearPasswordErrorMessage();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />

      <Header image={authImage} />

      <View style={styles.imageAndFormContainer}>
        <CustomImage image={authImage} />

        <View style={{ flex: 5 }}>
          <SignIn />
        </View>

        <Footer
          basicText="Don't have an account?"
          authText="Sign Up Here"
          screenName="SignUp"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.FOOTER,
  },
  imageAndFormContainer: {
    flex: 1,
    borderTopLeftRadius: globalStyles.authBorderRadius,
  },
});

export default SignInScreen;