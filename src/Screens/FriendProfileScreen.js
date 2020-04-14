/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */

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
    // const {displayName} = firebase.auth().currentUser;
    // setDisplayName(displayName);
    getFriendData();
    // updateLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const chatIconHandler = () => {
    props.navigation.push('Chat', {
      uid: props.navigation.getParam('uid'),
    });
  };

  const backIconHanlder = () => {
    props.navigation.navigate('Map');
  };

  const getFriendData = () => {
    const uid = props.navigation.getParam('uid');
    let ref = firebase.database().ref(`/users/${uid}`);
    ref.on('value', snapshot => {
      setDisplayName(
        snapshot.val() != null || '' ? snapshot.val().displayName : '',
      );
      setImageURL(snapshot.val() != null || '' ? snapshot.val().imageURL : '');
      setEmail(snapshot.val() != null || '' ? snapshot.val().email : '');
      setBirthday(snapshot.val() != null || '' ? snapshot.val().birthday : '');
      setPhoneNumber(
        snapshot.val() != null || '' ? snapshot.val().phoneNumber : '',
      );
      setBiodata(snapshot.val() != null || '' ? snapshot.val().biodata : '');
      setLatitude(snapshot.val() != null || '' ? snapshot.val().latitude : '');
      setLongitude(
        snapshot.val() != null || '' ? snapshot.val().longitude : '',
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileNavbarContainer}>
        <TouchableOpacity onPress={backIconHanlder} activeOpacity={0.5}>
          <Icon name="arrow-left" style={styles.navbarIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={chatIconHandler} activeOpacity={0.5}>
          <Icon name="comment-o" style={styles.navbarIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.displayName}>{displayName}</Text>
        <Text style={styles.displayLocation}>
          <Icon name="map-marker" size={20} /> My Location
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
