import { useFonts } from "expo-font";

const useFontsHook = () => {
  let [fontsLoaded] = useFonts({
    "nunito-bold": require("../../assets/fonts/Nunito-Bold.ttf"),
    "nunito-regular": require("../../assets/fonts/Nunito-Regular.ttf"),
    "nunito-semi-bold": require("../../assets/fonts/Nunito-SemiBold.ttf"),
  });

  return [fontsLoaded];
};

export default useFontsHook;
