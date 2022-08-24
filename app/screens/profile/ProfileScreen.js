import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-elements";
import Ripple from "react-native-material-ripple";
import * as ImagePicker from "expo-image-picker";

import { auth } from "../../config/firebase";

import ProfileCard from "../../components/profile/ProfileCard";

import settingsImage from "../../../assets/profile/settings.png";
import supportImage from "../../../assets/profile/support.png";
import yourDetailsImage from "../../../assets/profile/your_details.png";
import statisticsImage from "../../../assets/profile/statistics.png";

import colors from "../../../global/colors";
import globalStyles from "../../../global/globalStyles";

const ProfileScreen = ({ navigation }) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (auth.currentUser.photoURL) {
      setImage(auth.currentUser.photoURL);
    }
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      await auth.currentUser.updateProfile({
        photoURL: result.uri,
      });
      setImage(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.profileHeaderText}>Profile</Text>

        <Ripple
          rippleColor={colors.WHITE}
          rippleOpacity={0.8}
          rippleContainerBorderRadius={100}
          onPress={() => {
            setTimeout(() => {
              pickImage();
            }, 200);
          }}
          onLongPress={() => {
            setTimeout(() => {
              pickImage();
            }, 200);
          }}
          delayLongPress={150}
        >
          {image ? (
            <Avatar
              rounded
              size="large"
              containerStyle={{
                backgroundColor: colors.PURPLE,
                marginTop: 20,
                alignSelf: "flex-end",
                width: 100,
                height: 100,
                borderRadius: 100,
              }}
              titleStyle={{
                fontSize: 50,
              }}
              source={{ uri: image }}
            />
          ) : (
            <Avatar
              rounded
              size="large"
              containerStyle={{
                backgroundColor: colors.PURPLE,
                marginTop: 20,
                alignSelf: "flex-end",
                width: 100,
                height: 100,
                borderRadius: 100,
              }}
              titleStyle={{
                fontSize: 50,
              }}
              icon={{ name: "camera", type: "font-awesome" }}
            />
          )}
        </Ripple>
      </View>

      <Text style={styles.manageAccountText}>Manage your account</Text>

      <View style={styles.cardsView}>
        <ProfileCard
          title="Your Details"
          image={yourDetailsImage}
          useNavigation={() => navigation.navigate("YourDetailsStack")}
        />
        <ProfileCard
          title="Settings"
          image={settingsImage}
          useNavigation={() => navigation.navigate("SettingsStack")}
        />
      </View>

      <View style={styles.cardsView}>
        <ProfileCard
          title="Support"
          image={supportImage}
          useNavigation={() => navigation.navigate("SupportStack")}
        />
        <ProfileCard
          title="Statistics"
          image={statisticsImage}
          useNavigation={() => navigation.navigate("StatisticsStack")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BG_COLOR,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 24,
    ...globalStyles.marginHorizontal,
  },
  manageAccountText: {
    ...globalStyles.headerText,
    ...globalStyles.marginHorizontal,
  },
  profileHeaderText: {
    ...globalStyles.headerBoldText,
    fontSize: 40,
  },
  cardsView: {
    flexDirection: "row",
    justifyContent: "space-between",
    ...globalStyles.marginHorizontal,
  },
});

export default ProfileScreen;
