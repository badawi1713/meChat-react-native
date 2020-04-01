import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import * as firebase from 'firebase';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');

  useEffect(() => {
    const {email, displayName} = firebase.auth().currentUser;
    setEmail(email);
    setDisplayName(displayName);
  }, []);

  const signOutHandler = () => {
    firebase.auth().signOut();
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>Hi {displayName}</Text>
        <Text>This is your email: {email}</Text>
      </View>
      <TouchableOpacity onPress={signOutHandler}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
