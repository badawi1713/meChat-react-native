import React, {Component} from 'react';
import {Text, Image, StyleSheet, View, TouchableOpacity} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import firebase from 'firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import fire from '../../../../config/firebase';

export default class Map extends Component {
  constructor() {
    super();
    this.state = {
      tracksViewChanges: true,
      userData: [],
      isVisible: false,
      urlImage: '',
      uid: '',
      friendName: '',
      friendDob: '',
      friendGender: '',

      userUID: '',

      friendLatitude: '',
      friendLongitude: '',
    };
    this.getAllUser();
    // this.isVisible = true;
  }

  getAllUser = async () => {
    const ref = firebase.database().ref('/users');

    ref.on('value', async (snapshot) => {
      let data = [];
      await Object.keys(snapshot.val()).map((key) => {
        data.push({
          uid: key,
          data: snapshot.val()[key],
        });
      });
      await this.setState({
        userData: data,
      });
      console.log('userdata', this.state.userData);
      console.log('laatitidute', this.state.userData[0].data.latitude);
    });
  };

  getUser = async () => {
    const uid = firebase.auth().currentUser.uid;
    this.setState({
      userUID: uid,
    });
  };

  handleProfile = async (url, uid) => {
    this.setState({
      isVisible: !this.state.isVisible,
      urlImage: url,
      uid,
    });
    const ref = firebase.database().ref(`users/${uid}`);
    await ref.on('value', (snapshot) => {
      this.setState({
        friendName: snapshot.val().name,
        friendDob: snapshot.val().dob,
        friendGender: snapshot.val().gender,
      });
    });
  };

  stopTrackingViewChanges = () => {
    this.setState(() => ({
      tracksViewChanges: false,
    }));
  };

  componentDidMount() {
    this.getUser();
  }

  render() {
    const {tracksViewChanges} = this.state;
    return (
      <>
        <MapView
          onPress={() => this.setState({isVisible: false})}
          provider={PROVIDER_GOOGLE}
          style={{flex: 1}}
          initialRegion={{
            latitude: -7.7584874,
            longitude: 110.3781121,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          {this.state.userData.map((data) => {
            {
              console.log('dataaaq', data.data.latitude);
            }
            return (
              <Marker
                onPress={() =>
                  this.handleProfile(data.data.urlImage, data.data.uid)
                }
                coordinate={{
                  // latitude: -7.7584874,
                  // longitude: 110.3781121,
                  // latitudeDelta: 0.0922,
                  // longitudeDelta: 0.0421,
                  latitude: Number(data.data.latitude),
                  longitude: Number(data.data.longitude),
                }}
                title={data.data.name}
                description={data.data.status}
                key={data.data.uid}>
                <View style={styles.marker}>
                  <Image
                    source={{
                      uri: `${data.data.urlImage}`,
                    }}
                    style={{
                      height: 40,
                      width: 40,
                      borderRadius: 20,
                      borderColor: 'white',
                      borderWidth: 1,
                    }}
                  />
                </View>
              </Marker>
            );
          })}
        </MapView>
        {this.state.isVisible ? (
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#FAF8F0',
              paddingVertical: 10,
            }}>
            <View
              style={{
                flex: 0.5,
                justifyContent: 'center',
                paddingHorizontal: 20,
              }}>
              <Image
                source={{
                  uri: `${this.state.urlImage}`,
                }}
                style={{
                  height: 110,
                  width: 110,
                  borderRadius: 100,
                  borderColor: 'white',
                  borderWidth: 1,
                  justifyContent: 'center',
                }}
              />
            </View>
            <View
              style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
              <Text style={{fontSize: 16, color: '#F49FB6'}}>
                {this.state.friendName}
              </Text>
              <Text style={{fontSize: 16, color: '#F49FB6'}}>
                {this.state.friendDob}
              </Text>
              <Text style={{fontSize: 16, color: '#F49FB6'}}>
                {this.state.friendGender}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.push('Profile', {
                      uid: this.state.uid,
                    })
                  }
                  style={{
                    marginTop: 10,
                    backgroundColor: '#F49FB6',
                    width: 80,
                    height: 30,
                    borderRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 10,
                  }}>
                  <Text style={{color: 'white', fontSize: 16}}>Profile</Text>
                </TouchableOpacity>
                {this.state.uid == this.state.userUID ? null : (
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.push('Chat', {
                        uid: this.state.uid,
                      })
                    }
                    style={{
                      marginTop: 10,
                      backgroundColor: '#F49FB6',
                      width: 80,
                      height: 30,
                      borderRadius: 20,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={{color: 'white', fontSize: 16}}>Chat</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        ) : null}
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  marker: {
    padding: 5,
    borderRadius: 20,
    elevation: 10,
  },
});
