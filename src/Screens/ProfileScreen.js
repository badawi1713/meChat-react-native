import React, {useState, useEffect} from 'react';
// import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import * as firebase from 'firebase';
import {TextInput} from 'react-native-gesture-handler';

const ProfileScreen = props => {
  // const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  // const [longtitude, setLongtitude] = useState('');
  // const [latitude, setLatitude] = useState('');
  const [imageURL, setImageURL] = useState('');

  useEffect(() => {
    console.log('uid:', firebase.auth().currentUser.uid);
    console.log('fullname', displayName);
    console.log('image', imageURL);
    const {displayName} = firebase.auth().currentUser;
    setDisplayName(displayName);
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signOutHandler = () => {
    firebase.auth().signOut();
  };

  const setupProfileHandler = () => {
    props.navigation.navigate('SetupProfile');
  };

  const getUserData = () => {
    const uid = firebase.auth().currentUser.uid;
    let ref = firebase.database().ref(`/users/${uid}`);
    ref.on('value', snapshot => {
      setImageURL(snapshot.val() != null || '' ? snapshot.val().imageURL : '');
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.imageContainer}>
          {imageURL === '' ? (
            <Image
              style={styles.photoProfile}
              source={{
                uri:
                  'https://www.securities-services.societegenerale.com/uploads/tx_bisgbio/default-profile.png',
              }}
            />
          ) : (
            <Image style={styles.photoProfile} source={{uri: imageURL}} />
          )}
        </View>
        <View style={styles.headerNavItems}>
          <Text onPress={setupProfileHandler} style={styles.navItems}>
            Edit Profile <Icon style={{}} name="edit" size={15} />
          </Text>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>|</Text>
          <Text onPress={signOutHandler} style={styles.navItems}>
            Sign Out <Icon style={{}} name="sign-out" size={15} />
          </Text>
        </View>

        <Text style={styles.displayName}>{displayName}</Text>
      </View>
      <View style={styles.profileContent}>
        <View>
          <Text style={{fontSize: 24}}>Profile Data</Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  headerContainer: {
    padding: 40,
    width: '100%',
    height: 300,
    backgroundColor: '#FFD700',
    flexDirection: 'column',
    alignItems: 'center',
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
  },
  imageContainer: {
    backgroundColor: '#fff',
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  photoProfile: {
    height: '100%',
    width: '100%',
    borderRadius: 75,
  },
  headerNavItems: {
    marginTop: 20,
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navItems: {
    fontSize: 18,
  },
  displayName: {
    marginTop: 10,
    fontSize: 24,
  },
  profileContent: {
    marginTop: 25,
    paddingHorizontal: 40,
    backgroundColor: 'white',
    width: '100%',
    height: '60%',
    alignItems: 'center',
  },
});
