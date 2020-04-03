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
} from 'react-native';
import * as firebase from 'firebase';

const SetupProfile = props => {
  const [displayName, setDisplayName] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [birthday, setBirthday] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [biodata, setBiodata] = useState('');

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
    });
  };

  return (
    <SafeAreaView style={styles.registerContainer}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.imageIcon}
          source={require('../../assets/setupProfile.png')}
        />
      </View>
      <View style={styles.headerContainer}>
        <Text style={{fontSize: 30}}>Hi, {displayName}</Text>
        <Text style={{fontSize: 17, color: '#262626'}}>
          Set up your profile first
        </Text>
      </View>

      <View style={styles.formContainer}>
        <TextInput
          value={imageURL}
          onChangeText={value => {
            setImageURL(value);
          }}
          style={styles.inputForm}
          placeholder="Profil Image URL"
        />
        <TextInput
          value={phoneNumber}
          onChangeText={value => {
            setPhoneNumber(value);
          }}
          style={styles.inputForm}
          placeholder="Phone Number"
        />
        <TextInput
          value={birthday}
          onChangeText={value => {
            setBirthday(value);
          }}
          style={styles.inputForm}
          placeholder="Birth Date"
        />
        <TextInput
          value={biodata}
          onChangeText={value => {
            setBiodata(value);
          }}
          style={styles.inputFormBio}
          placeholder="Bio"
          multiline={true}
        />
      </View>

      <View style={styles.registerButtonContainer}>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={updateProfileHandler}>
          <Text style={{color: '#fff', fontSize: 20, textAlign: 'center'}}>
            Save
          </Text>
        </TouchableOpacity>
      </View>
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
    padding: 40,
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  imageContainer: {
    // backgroundColor: 'grey',
    // padding: 10,
    width: 230,
    height: 150,
  },
  imageIcon: {
    // backgroundColor: 'grey',
    width: '100%',
    height: '100%',
  },
  headerContainer: {
    marginTop: 35,
    width: '100%',
    textAlign: 'left',
    // backgroundColor: 'red',
  },
  formContainer: {
    marginTop: 15,
    // backgroundColor: 'yellow',
    width: '100%',
  },
  inputForm: {
    height: 50,
    marginBottom: 15,
    padding: 10,
    borderRadius: 10,
    fontSize: 17,
    // backgroundColor: 'yellow',
    borderWidth: 1,
    borderColor: '#B2B2B2',
  },
  inputFormBio: {
    height: 80,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    fontSize: 17,
    // backgroundColor: 'yellow',
    borderWidth: 1,
    borderColor: '#B2B2B2',
  },
  registerButtonContainer: {
    // backgroundColor: 'aqua',
    width: '100%',
  },
  registerButton: {
    borderWidth: 1,
    backgroundColor: '#262626',
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
  },
  signUpLinkContainer: {
    marginVertical: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  circleImageContainer: {width: 500, height: 210},
  circleImage: {
    zIndex: -1,
    position: 'absolute',
    bottom: 5,
    width: 260,
    height: '100%',
  },
  errorMessage: {
    marginTop: 10,
    width: '100%',
  },
  errorText: {textAlign: 'center', color: 'red', fontSize: 16},
});
