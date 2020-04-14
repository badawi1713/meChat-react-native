/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ToastAndroid,
  Platform,
  ScrollView,
  YellowBox,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as firebase from 'firebase';
import DatePicker from 'react-native-datepicker';

const SetupProfile = props => {
  const [displayName, setDisplayName] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [birthday, setBirthday] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [biodata, setBiodata] = useState('');
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');

  useEffect(() => {
    const {displayName} = firebase.auth().currentUser;
    setDisplayName(displayName);
    getUserData();
  }, []);

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
        biodata,
        phoneNumber,
        birthday,
        imageURL,
        latitude,
        longitude,
      });
      ToastAndroid.showWithGravity(
        'Data Updated',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }, 3000);

    setTimeout(async () => {
      await props.navigation.navigate('Profile');
    }, 4000);
  };

  const getUserData = () => {
    const uid = firebase.auth().currentUser.uid;
    let ref = firebase.database().ref(`/users/${uid}`);
    ref.on('value', snapshot => {
      setImageURL(snapshot.val() != null ? snapshot.val().imageURL : '');
      setPhoneNumber(snapshot.val() != null ? snapshot.val().phoneNumber : '');
      setBirthday(snapshot.val() != null ? snapshot.val().birthday : '');
      setBiodata(snapshot.val() != null ? snapshot.val().biodata : '');
      setLatitude(
        snapshot.val() != null || undefined ? snapshot.val().latitude : '',
      );
      setLongitude(
        snapshot.val() != null || undefined ? snapshot.val().longitude : '',
      );
    });
  };

  const backButtonHandler = () => {
    props.navigation.navigate('Profile');
  };

  return (
    <SafeAreaView style={styles.registerContainer}>
      {/* <View style={styles.imageContainer}>
        <Image
          style={styles.imageIcon}
          source={require('../../assets/setupProfile.png')}
        />
      </View> */}
      <View style={styles.header}>
        <View style={styles.setupNavbarContainer}>
          <TouchableOpacity activeOpacity={1} onPress={backButtonHandler}>
            <Icon name="arrow-left" style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.navbarTitle}> Setup Profile </Text>
          <Text style={styles.navbarTitle}>{''}</Text>
          <Text style={styles.navbarTitle}>{''}</Text>
          <Text style={styles.navbarTitle}>{''}</Text>
          <Text style={styles.navbarTitle}>{''}</Text>
          <Text style={styles.navbarTitle}>{''}</Text>
        </View>
      </View>
      <View style={styles.headerContainer}>
        <Text style={{fontSize: 30}}>Hi, {displayName}</Text>
        <Text style={{fontSize: 17, color: '#262626'}}>
          Configure your profile
        </Text>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          borderColor: 'grey',
          width: '80%',
          paddingHorizontal: 40,
        }}>
        <Text>{''}</Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.formContainer}>
        <View>
          <View>
            <Text style={styles.formLabel}>Profile Image URL</Text>
            <TextInput
              // value={imageURL}
              onChangeText={value => {
                if (value === '' || null) {
                  setImageURL(imageURL);
                } else {
                  setImageURL(value);
                }
              }}
              style={styles.inputForm}
              placeholder="Input your profile image URL..."
            />
          </View>
          <View>
            <Text style={styles.formLabel}>Phone Number</Text>

            <TextInput
              // dataDetectorTypes={'phoneNumber'}
              keyboardType={'phone-pad'}
              value={phoneNumber}
              onChangeText={value => {
                setPhoneNumber(value);
              }}
              style={styles.inputForm}
              placeholder="Input your phone number..."
            />
          </View>
          <View>
            <Text style={styles.formLabel}>Birth Date</Text>
            {/* <View style={styles.inputForm}> */}
            <DatePicker
              date={birthday}
              style={styles.datePicker}
              mode="date"
              placeholder="Select your birth date"
              format="YYYY-MM-DD"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              showIcon={true}
              onDateChange={date => {
                setBirthday(date);
              }}
            />
          </View>

          <View>
            <Text style={styles.formLabel}>Bio</Text>
            <TextInput
              value={biodata}
              onChangeText={value => {
                setBiodata(value);
              }}
              style={styles.inputFormBio}
              placeholder="Input your bio..."
              multiline={true}
            />
          </View>
        </View>
        <View style={styles.formButtonContainer}>
          <TouchableOpacity
            style={styles.formSaveButton}
            onPress={updateProfileHandler}>
            <Text style={{color: '#fff', fontSize: 20, textAlign: 'center'}}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

SetupProfile.navigationOptions = {
  //To hide the ActionBar/NavigationBar
  headerShown: false,
};

export default SetupProfile;

const styles = StyleSheet.create({
  registerContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#FFD700',
    elevation: 8,
    width: '100%',
  },
  setupNavbarContainer: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 24,
    fontWeight: 'normal',
  },
  navbarTitle: {
    fontSize: 24,
    color: 'black',
    textAlign: 'center',
  },
  imageContainer: {
    width: 230,
    height: 150,
  },
  imageIcon: {
    width: '100%',
    height: '100%',
  },
  headerContainer: {
    marginTop: 35,
    width: '100%',
    textAlign: 'left',
    paddingHorizontal: 40,
  },
  formContainer: {
    paddingTop: 15,
    paddingBottom: 20,
    paddingHorizontal: 40,
    // marginBottom: 20,
    width: '100%',
  },
  inputForm: {
    height: 50,
    paddingTop: 10,
    borderRadius: 10,
    fontSize: 17,
    // backgroundColor: 'yellow',
    borderWidth: 1,
    marginBottom: 15,
    borderColor: '#B2B2B2',
  },
  inputFormBio: {
    height: 100,
    paddingHorizontal: 10,
    borderRadius: 10,
    // paddingTop: -10,
    fontSize: 17,
    // backgroundColor: 'yellow',
    borderWidth: 1,
    borderColor: '#B2B2B2',
  },
  formButtonContainer: {
    // paddingHorizontal: 40,
    paddingVertical: 40,
    width: '100%',
  },

  formSaveButton: {
    borderWidth: 1,
    backgroundColor: '#262626',
    padding: 10,
    // marginVertical: 10,
    borderRadius: 10,
  },
  errorMessage: {
    marginTop: 10,
    width: '100%',
  },
  errorText: {textAlign: 'center', color: 'red', fontSize: 16},
  datePicker: {
    borderRadius: 10,
    // marginTop: 10,
    marginBottom: 15,
    width: '100%',
    // borderWidth: 'none',
  },
  formLabel: {
    marginBottom: 10,
    fontSize: 14,
  },
});
