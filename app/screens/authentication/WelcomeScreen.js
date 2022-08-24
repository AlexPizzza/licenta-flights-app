import React, { useContext } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";

import Slide from "../../components/welcome/Slide";
import Button from "../../components/welcome/Button";

import { Context as UserContext } from "../../context/UserContext";

import colors from "../../../global/colors";

import firstImage from "../../../assets/welcome/1.png";
import secondImage from "../../../assets/welcome/2.png";
import thirdImage from "../../../assets/welcome/3.png";
import fourthImage from "../../../assets/welcome/4.png";

const slides = [
  {
    key: "1",
    title: "Welcome to Fly!",
    description: "",
    image: firstImage,
  },
  {
    key: "2",
    title: "Time to travel!",
    description: "View the cheapest flights through our app.",
    image: secondImage,
  },
  {
    key: "3",
    title: "Book a flight!",
    description: "Find the best flight for your next travel.",
    image: thirdImage,
  },
  {
    key: "4",
    title: "Getting started is easy!",
    description: "Create an account and enjoy your next vacation!",
    image: fourthImage,
  },
];

const WelcomeScreen = () => {
  const { setValueIsFirstTime } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />

      <AppIntroSlider
        data={slides}
        activeDotStyle={styles.activeDotStyle}
        dotStyle={styles.dotStyle}
        showSkipButton
        showNextButton
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => <Slide item={item} />}
        renderSkipButton={() => <Button title="Skip" />}
        renderNextButton={() => <Button title="Next" />}
        renderDoneButton={() => <Button title="Done" />}
        onDone={() => {
          setValueIsFirstTime(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BG_COLOR,
  },
  activeDotStyle: {
    backgroundColor: colors.PURPLE,
    marginHorizontal: 8,
  },
  dotStyle: {
    backgroundColor: colors.BLACK,
    marginHorizontal: 8,
  },
});

export default WelcomeScreen;
