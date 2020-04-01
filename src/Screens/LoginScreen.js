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
import {useNavigation} from '@react-navigation/native';
import * as firebase from 'firebase';

const Login = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const signUpButtonHandler = () => {
    navigation.navigate('Register');
  };

  const loginHandler = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        navigation.navigate('Home');
      })
      .catch(error => {
        setErrorMessage(error.message);
        console.log(String(error));
        // navigation.navigate('Login');
      });
  };
  return (
    <SafeAreaView style={styles.loginContainer}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.imageIcon}
          source={require('../../assets/small-icon.png')}
        />
      </View>
      <View style={styles.headerContainer}>
        <Text style={{fontSize: 36}}>Welcome,</Text>
        <Text style={{fontSize: 17, color: '#262626'}}>
          Please sign in to continue using MeChat
        </Text>
      </View>
      <View style={styles.errorMessage}>
        {/* {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>} */}
        <Text style={styles.errorText}>{errorMessage}</Text>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          value={email}
          autoCapitalize="none"
          style={styles.inputForm}
          placeholder="Email"
          onChangeText={value => {
            setEmail(value);
          }}
        />
        <TextInput
          value={password}
          style={styles.inputForm}
          placeholder="Password"
          secureTextEntry={true}
          autoCapitalize="none"
          onChangeText={value => {
            setPassword(value);
          }}
        />
      </View>
      <View style={styles.forgotPasswordText}>
        {/* <Text>{''}</Text> */}
        <Text style={{textAlign: 'right', fontSize: 16}}>Forgot Password?</Text>
      </View>
      <View style={styles.loginButtonContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={loginHandler}>
          <Text style={{color: '#fff', fontSize: 28, textAlign: 'center'}}>
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.signUpLinkContainer}>
        <Text style={{fontSize: 16, color: '#B2B2B2'}}>
          Don't have an account?
        </Text>
        <Text style={{fontSize: 16}} onPress={signUpButtonHandler}>
          Sign Up
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

export default Login;

const styles = StyleSheet.create({
  loginContainer: {
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
  errorMessage: {
    marginTop: 10,
    width: '100%',
  },
  errorText: {textAlign: 'center', color: 'red', fontSize: 16},
  inputForm: {
    height: 50,
    marginVertical: 8,
    padding: 10,
    borderRadius: 10,
    fontSize: 17,
    // backgroundColor: 'yellow',
    borderWidth: 1,
    borderColor: '#B2B2B2',
  },
  forgotPasswordText: {
    width: '100%',
    // padding: 10,
    // backgroundColor: 'yellow',
    marginVertical: 10,
  },
  loginButtonContainer: {
    // backgroundColor: 'aqua',
    width: '100%',
  },
  loginButton: {
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
  circleImageContainer: {marginTop: 10, width: 500, height: 210},
  circleImage: {
    top: 10,
    width: 260,
    height: '100%',
  },
});
