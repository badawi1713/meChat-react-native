/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
// import {useNavigation} from '@react-navigation/native';
import * as firebase from 'firebase';

const Register = (props) => {
  // const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const signInButtonHandler = () => {
    props.navigation.navigate('Login');
  };

  const registerHandler = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        return userCredentials.user.updateProfile({
          displayName: fullname,
        });
      })
      .then(async () => {
        const uid = await firebase.auth().currentUser.uid;
        const email = await firebase.auth().currentUser.email;
        const ref = await firebase.database().ref(`/users/${uid}`);
        const imageURL =
          'https://www.securities-services.societegenerale.com/uploads/tx_bisgbio/default-profile.png';
        await ref.set({
          uid: uid,
          email: email,
          displayName: fullname,
          imageURL: imageURL,
          latitude: -7.7584874,
          longitude: 110.3781121,
          phoneNumber: '',
          birthday: '',
          biodata: '',
        });
      })
      .then(() => {
        props.navigation.navigate('Profile');
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.message);
      });
  };

  return (
    <SafeAreaView style={styles.registerContainer}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.imageIcon}
          source={require('../../assets/small-icon.png')}
        />
      </View>
      <View style={styles.headerContainer}>
        <Text style={{fontSize: 36}}>Sign Up</Text>
        <Text style={{fontSize: 17, color: '#262626'}}>
          Register for new user
        </Text>
      </View>
      <View style={styles.errorMessage}>
        {/* {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>} */}
        <Text style={styles.errorText}>{errorMessage}</Text>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          value={fullname}
          onChangeText={(value) => {
            setFullname(value);
          }}
          style={styles.inputForm}
          placeholder="Fullname"
        />
        <TextInput
          value={email}
          onChangeText={(value) => {
            setEmail(value);
          }}
          style={styles.inputForm}
          placeholder="Email"
        />
        <TextInput
          value={password}
          onChangeText={(value) => {
            setPassword(value);
          }}
          style={styles.inputForm}
          placeholder="Password"
          secureTextEntry={true}
        />
      </View>

      <View style={styles.registerButtonContainer}>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={registerHandler}>
          <Text style={{color: '#fff', fontSize: 20, textAlign: 'center'}}>
            Register
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.signUpLinkContainer}>
        <Text style={{fontSize: 16, color: '#B2B2B2'}}>
          Already have an account?
        </Text>
        <Text style={{fontSize: 16}} onPress={signInButtonHandler}>
          Sign In
        </Text>
      </View>
      <View style={styles.circleImageContainer}>
        <Image
          style={styles.circleImage}
          source={require('../../assets/bottom-circle.png')}
        />
      </View>
    </SafeAreaView>
  );
};

Register.navigationOptions = {
  //To hide the ActionBar/NavigationBar
  headerShown: false,
};

export default Register;

const styles = StyleSheet.create({
  registerContainer: {
    padding: 40,
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  imageContainer: {
    // backgroundColor: 'grey',
    padding: 10,
    width: 100,
    height: 130,
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
