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
// import {db} from '../config/firebase';
import {TextInput} from 'react-native-gesture-handler';
// import {useNavigation} from '@react-navigation/native';

const ProfileScreen = props => {
  // const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  // const [longtitude, setLongtitude] = useState('');
  // const [latitude, setLatitude] = useState('');
  const [status, setStatus] = useState('');

  // state = {
  //   displayName: '',
  //   status: '',
  // };

  useEffect(() => {
    // const {displayName} = firebase.auth().currentUser;
    console.log('uid:', firebase.auth().currentUser.uid);
    console.log('status', status);
    console.log('fullname', displayName);

    const {displayName} = firebase.auth().currentUser;
    setDisplayName(displayName);
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // componentDidMount() {
  //   const {displayName} = firebase.auth().currentUser;
  //   this.setState({displayName});
  //   console.log('uid:', firebase.auth().currentUser.uid);
  //   console.log('status', this.state.status);
  // }

  const signOutHandler = () => {
    firebase.auth().signOut();
    // props.navigation.navigate('LoginScreen');
  };

  const setupProfileHandler = () => {
    props.navigation.navigate('SetupProfile');
  };

  const getUserData = () => {
    const uid = firebase.auth().currentUser.uid;
    let ref = firebase.database().ref(`/users/${uid}`);
    ref.on('value', snapshot => {
      setStatus(
        snapshot.val() != null ? snapshot.val().status : 'Status Undefined',
      );
    });
  };

  const updateProfileHandler = async () => {
    // const {displayName, status} = this.state;
    const uid = firebase.auth().currentUser.uid;
    const email = firebase.auth().currentUser.email;
    const ref = firebase.database().ref(`/users/${uid}`);

    setTimeout(async () => {
      await ref.set({
        uid: uid,
        email: email,
        displayName,
        status,
      });
      ToastAndroid.showWithGravity(
        'Data Updated',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.circle} />
        <View style={styles.headerNavItems}>
          <Text onPress={setupProfileHandler} style={styles.navItems}>
            Edit Profile <Icon style={{}} name="edit" size={15} />
          </Text>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>|</Text>
          <Text onPress={signOutHandler} style={styles.navItems}>
            Sign Out <Icon style={{}} name="sign-out" size={15} />
          </Text>
        </View>
        {/* <Text onPress={signOutHandler} style={{marginTop: 10}}>
          Sign Out <Icon style={{}} name="sign-out" size={15} />
        </Text> */}
        <Text style={styles.displayName}>{displayName}</Text>
        <Text>{status}</Text>

        {/* {status.map(item => (
          <View>
            <Text>{item.status}</Text>
          </View>
        ))} */}
        {/* <Icon size={20} style={{marginVertical: 8}} name="envelope" />
        <Text style={{fontSize: 16}}>({email})</Text> */}
      </View>
      <View style={styles.profileContent}>
        <View>
          <Image />
          {/* <Text style={{fontSize: 20}}>{email}</Text> */}
        </View>
        <View>
          <Image />
          <Text style={{fontSize: 24}}>Profile Data</Text>
        </View>
        <View style={styles.profileForm}>
          {/* <TextInput style={styles.formInput} placeholder="Latitude" /> */}
          {/* <TextInput style={styles.formInput} placeholder="Longtitude" /> */}
          <TextInput
            // value={status}
            onChangeText={value => setStatus(value)}
            style={styles.formInput}
            placeholder="Status"
          />
        </View>
        <TouchableOpacity
          onPress={updateProfileHandler}
          style={styles.saveButton}>
          <Text style={{color: '#fff', fontSize: 20, textAlign: 'center'}}>
            Save
          </Text>
        </TouchableOpacity>
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
  circle: {
    backgroundColor: '#262626',
    width: 150,
    height: 150,
    borderRadius: 25,
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
  profileForm: {
    // backgroundColor: 'yellow',
    width: '100%',
    marginTop: 5,
  },
  formInput: {
    marginVertical: 15,
    borderWidth: 1,
    borderColor: '#262626',
    borderRadius: 15,
    paddingHorizontal: 10,
  },
  saveButton: {
    marginTop: 10,
    width: '100%',
    backgroundColor: '#262626',
    borderRadius: 15,
    padding: 15,
  },
});
