import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import Ripple from 'react-native-material-ripple';

import { auth } from '../../config/firebase';

import ProfileCard from '../../components/profile/ProfileCard';

import settingsImage from '../../../assets/profile/settings.png';
import statisticsImage from '../../../assets/profile/statistics.png';
import supportImage from '../../../assets/profile/support.png';
import yourDetailsImage from '../../../assets/profile/your_details.png';

import colors from '../../../global/colors';
import globalStyles from '../../../global/globalStyles';

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
      quality: 1
    });

    if (!result.cancelled) {
      await auth.currentUser.updateProfile({
        photoURL: result.uri
      });
      setImage(result.uri);
    }
  };

  const onPress = () => {
    setTimeout(() => {
      pickImage();
    }, 200);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.profileHeaderText}>Profile</Text>
        <Ripple
          rippleColor={colors.WHITE}
          rippleOpacity={0.8}
          rippleContainerBorderRadius={100}
          onPress={onPress}
          onLongPress={onPress}
          delayLongPress={150}
        >
          {image ? (
            <Avatar
              rounded
              size='large'
              containerStyle={styles.avatarContainerStyle}
              titleStyle={styles.avatarTitleStyle}
              source={{ uri: image }}
            />
          ) : (
            <Avatar
              rounded
              size='large'
              containerStyle={styles.avatarContainerStyle}
              titleStyle={styles.avatarTitleStyle}
              icon={{ name: 'camera', type: 'font-awesome' }}
            />
          )}
        </Ripple>
      </View>

      <Text style={styles.manageAccountText}>Manage your account</Text>

      <View style={styles.cardsView}>
        <ProfileCard
          title='Your Details'
          image={yourDetailsImage}
          useNavigation={() => navigation.navigate('YourDetailsStack')}
        />
        <ProfileCard
          title='Settings'
          image={settingsImage}
          useNavigation={() => navigation.navigate('SettingsStack')}
        />
      </View>

      <View style={styles.cardsView}>
        <ProfileCard
          title='Support'
          image={supportImage}
          useNavigation={() => navigation.navigate('SupportStack')}
        />
        <ProfileCard
          title='Statistics'
          image={statisticsImage}
          useNavigation={() => navigation.navigate('StatisticsStack')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainerStyle: {
    alignSelf: 'flex-end',
    backgroundColor: colors.PURPLE,
    borderRadius: 100,
    height: 100,
    marginTop: 20,
    width: 100
  },
  avatarTitleStyle: {
    fontSize: 50
  },
  cardsView: {
    ...globalStyles.marginHorizontal,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  container: {
    backgroundColor: colors.BG_COLOR,
    flex: 1
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    marginTop: 20,
    ...globalStyles.marginHorizontal
  },
  manageAccountText: {
    ...globalStyles.headerText,
    ...globalStyles.marginHorizontal
  },
  profileHeaderText: {
    ...globalStyles.headerBoldText,
    fontSize: 40
  }
});

export default ProfileScreen;
