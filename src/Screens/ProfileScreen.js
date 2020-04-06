/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
// import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  PermissionsAndroid,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Geolocation from 'react-native-geolocation-service';

import * as firebase from 'firebase';

const ProfileScreen = props => {
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [imageURL, setImageURL] = useState('');
  // const [status, setStatus] = useState('online');
  const [birthday, setBirthday] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [biodata, setBiodata] = useState('');

  useEffect(() => {
    console.log('uid:', firebase.auth().currentUser.uid);
    console.log('fullname', displayName);
    console.log('image', imageURL);
    const {displayName} = firebase.auth().currentUser;
    const getLocation = async () => {
      await updateLocation();
    };
    getLocation();
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
      setEmail(snapshot.val() != null || '' ? snapshot.val().email : '');
      setBirthday(snapshot.val() != null || '' ? snapshot.val().birthday : '');
      setPhoneNumber(
        snapshot.val() != null || '' ? snapshot.val().phoneNumber : '',
      );
      setBiodata(snapshot.val() != null || '' ? snapshot.val().biodata : '');
    });
  };

  const updateLocation = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'MeChat Location Permission',
        message: 'MeChat needs access to your location',
      },
    );
    if (granted) {
      await Geolocation.getCurrentPosition(
        async position => {
          console.log('Current Location', JSON.stringify(position));
          // await this.setState({
          //   latitude: position.coords.latitude.toString(),
          //   longitude: position.coords.longitude.toString(),
          // });
          setLatitude(position.coords.latitude.toString());
          setLongitude(position.coords.longitude.toString());
        },
        error => {
          console.log(error.code, error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        },
      );

      this.watchID = Geolocation.watchPosition(position => {
        let region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.00922 * 1.5,
          longitudeDelta: 0.00421 * 1.5,
        };
      });
    }
  };

  const handleUpdateLocation = async () => {
    const uid = firebase.auth().currentUser.uid;
    const email = firebase.auth().currentUser.email;
    const ref = firebase.database().ref(`/users/${uid}`);
    setTimeout(async () => {
      await ref.set({
        email,
        uid,
        displayName,
        latitude,
        longitude,
        imageURL,
        birthday,
        biodata,
        phoneNumber,
      });
      ToastAndroid.showWithGravity(
        'Location Updated',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileNavbarContainer}>
        <TouchableOpacity onPress={setupProfileHandler} activeOpacity={0.5}>
          <Icon name="gear" style={styles.navbarIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={signOutHandler} activeOpacity={0.5}>
          <Icon name="sign-out" style={styles.navbarIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.displayName}>Hi, {displayName}</Text>
        <Text style={styles.displayLocation} onPress={handleUpdateLocation}>
          <Icon name="map-marker" size={20} /> Tap Here to Update Location
        </Text>
        {(latitude && longitude === '') || undefined || null ? (
          <Text style={styles.displayLocation}>
            Location is undefined please update your location
          </Text>
        ) : (
          <Text style={styles.displayLocation}>
            {latitude}, {longitude}
          </Text>
        )}
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
      </View>
      <ScrollView
        style={styles.profileContent}
        showsVerticalScrollIndicator={false}>
        <View>
          <View>
            <View style={styles.profileItems}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: '#FFD700',
                  borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon
                  style={{
                    fontSize: 18,
                  }}
                  name="envelope"
                />
              </View>
              {email === '' || undefined ? (
                <Text style={{fontSize: 18}}>undefined</Text>
              ) : (
                <Text style={{fontSize: 18}}>{email}</Text>
              )}
            </View>
            <View style={styles.profileItems}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: '#FFD700',
                  borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon
                  style={{
                    fontSize: 18,
                  }}
                  name="calendar"
                />
              </View>
              {birthday === '' || undefined ? (
                <Text style={{fontSize: 18}}>undefined</Text>
              ) : (
                <Text style={{fontSize: 18}}>{birthday}</Text>
              )}
            </View>
            <View style={styles.profileItems}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: '#FFD700',
                  borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon
                  style={{
                    fontSize: 18,
                  }}
                  name="phone"
                />
              </View>
              {phoneNumber === '' || undefined ? (
                <Text style={{fontSize: 18}}>undefined</Text>
              ) : (
                <Text style={{fontSize: 18}}>{phoneNumber}</Text>
              )}
            </View>
            <View style={styles.profileItems}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: '#FFD700',
                  borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon
                  style={{
                    fontSize: 18,
                  }}
                  name="info"
                />
              </View>
              {biodata === '' || undefined ? (
                <Text style={{fontSize: 18}}>undefined</Text>
              ) : (
                <Text style={{fontSize: 18}}>{biodata}</Text>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
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
    // padding: 40,
    width: '100%',
    height: 230,
    backgroundColor: '#FFD700',
    flexDirection: 'column',
    alignItems: 'center',
    borderBottomRightRadius: 75,
    borderBottomLeftRadius: 75,
    marginBottom: 65,
  },
  imageContainer: {
    backgroundColor: '#fff',
    width: 150,
    height: 150,
    borderRadius: 75,
    top: 155,
    position: 'absolute',
    zIndex: 2,
    // shadowOffset: 150,
    // shadowColor: 'black',
    elevation: 10,
  },
  photoProfile: {
    height: '100%',
    width: '100%',
    borderRadius: 75,
  },
  headerNavItems: {
    // marginTop: 20,
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navItems: {
    fontSize: 18,
  },
  displayName: {
    top: 0,
    textAlign: 'center',
    width: '100%',
    // backgroundColor: '#fff',
    // paddingHorizontal: 40,
    // marginVertical: 10,
    fontSize: 32,
  },
  displayLocation: {
    top: 10,
    textAlign: 'center',
    width: '100%',
    // backgroundColor: '#fff',
    marginTop: 10,
    fontSize: 18,
  },
  profileContent: {
    marginTop: 35,
    paddingHorizontal: 40,
    // backgroundColor: 'aqua',
    width: '100%',
    height: '60%',
  },
  profileItems: {
    flexDirection: 'row',
    fontSize: 24,
    justifyContent: 'space-between',
    alignContent: 'space-between',
    marginBottom: 20,
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#FFD700',
  },
  profileNavbarContainer: {
    // marginRight: 30,
    // marginLeft: 30,
    // paddingTop: 20,
    width: '100%',
    // paddingBottom: 20,
    paddingVertical: 30,
    paddingHorizontal: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFD700',
    alignItems: 'center',
  },
  navbarIcon: {
    fontSize: 28,
    fontWeight: 'normal',
  },
  navbarTitle: {
    fontSize: 24,
    color: 'black',
    textAlign: 'center',
  },
});
