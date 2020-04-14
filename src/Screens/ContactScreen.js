/* eslint-disable dot-notation */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  ScrollView,
  Image,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import * as firebase from 'firebase';

export default class Contact extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      userUID: '',
      data2: {},
    };
    this.getAllUser();
  }

  getAllUser = async () => {
    const uid = firebase.auth().currentUser.uid;
    const ref = firebase.database().ref('users');

    await ref.on('value', async snapshot => {
      let data = [];
      let data2 = [];
      let data3 = [];
      let data4 = {};
      await Object.keys(snapshot.val()).map(async key => {
        const friendUID = snapshot.val()[key].uid;
        const noRead = [];
        let x = [];
        const ref2 = firebase.database().ref(`/chat/${friendUID}/${uid}/`);
        await ref2.on('value', async snapshot => {
          if (snapshot.val() !== null) {
            await Object.keys(snapshot.val()).map(key => {
              if (snapshot.val()[key].isRead !== undefined) {
                noRead.push(snapshot.val()[key].isRead);
                console.log('READDDD', snapshot.val()[key].isRead);
                x = snapshot.val()[key];
                x['total'] = noRead.length;
              }
            });
          }
          if (x.messages !== undefined) {
            data2.push(x);
            data3.push(x.messages.user);
          }
        });
        await data.push({
          uid: key,
          data: snapshot.val()[key],
        });
      });
      console.log('data22', data2);
      console.log('data3', data3);
      for (let i = 0; i < data3.length; i++) {
        data4[`${data3[i]._id}`] = data2[i].total;
      }
      await this.setState({
        data: data,
        data2: data4,
      });
      console.log('data4', data4);
    });
  };

  getUser = async () => {
    const uid = firebase.auth().currentUser.uid;
    this.setState({
      userUID: uid,
    });
  };

  handleChat = async friendUID => {
    const uid = firebase.auth().currentUser.uid;
    const ref = firebase.database().ref(`/chat/${friendUID}/${uid}/`);
    ref.on('value', async snapshot => {
      if (Object.keys(snapshot.val()) != null) {
        await Object.keys(snapshot.val()).map(async key => {
          const ref2 = firebase
            .database()
            .ref(`/chat/${friendUID}/${uid}/${key}/isRead`);
          ref2.remove();
        });
        delete this.state.data2[`${friendUID}`];
        this.forceUpdate();
        console.log('dadadat2', this.state.data2);
        this.getAllUser();
      }
    });
    this.props.navigation.push('Chat', {
      uid: friendUID,
    });
  };

  componentDidMount() {
    this.getUser();
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View
          style={{
            height: 60,
            backgroundColor: '#FFD700',
            alignItems: 'center',
            paddingHorizontal: 30,
            flexDirection: 'row',
          }}>
          <Text style={{fontSize: 24, color: '#000'}}>My Contact</Text>
        </View>
        <ScrollView style={{flex: 0.5}}>
          {this.state.data.map(data => {
            const {userUID} = this.state;
            return userUID === data.uid ? null : (
              <TouchableOpacity
                onPress={() => this.handleChat(data.uid)}
                activeOpacity={0.5}
                style={{
                  height: 75,
                  backgroundColor: '#FFF',
                  borderBottomColor: '#DBD4AD',
                  borderBottomWidth: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                }}
                key={data.uid}>
                {data.data.imageURL === '' || null ? (
                  <Image
                    source={{
                      uri:
                        'https://www.securities-services.societegenerale.com/uploads/tx_bisgbio/default-profile.png',
                    }}
                    style={{
                      backgroundColor: '#fff',
                      height: 60,
                      width: 60,
                      borderRadius: 40,
                      marginRight: 20,
                    }}
                  />
                ) : (
                  <Image
                    source={{uri: `${data.data.imageURL}`}}
                    style={{
                      backgroundColor: '#fff',
                      height: 60,
                      width: 60,
                      borderRadius: 40,
                      marginRight: 20,
                    }}
                  />
                )}

                <View>
                  <Text style={{fontSize: 16}}>{data.data.displayName}</Text>
                  <View style={{flexDirection: 'row'}} />
                </View>
                {this.state.data2[`${data.data.uid}`] != null ? (
                  <View
                    style={{
                      height: 20,
                      width: 20,
                      backgroundColor: '#FFD700',
                      borderRadius: 10,
                      position: 'absolute',
                      right: '3%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{color: 'white'}}>
                      {this.state.data2[`${data.data.uid}`]}
                    </Text>
                  </View>
                ) : null}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}
