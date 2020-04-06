/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TouchableHighlight,
  TextInput,
  PermissionsAndroid,
  ActivityIndicator,
  ToastAndroid,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {GiftedChat, Send, Bubble} from 'react-native-gifted-chat';
import firebase from 'firebase';
import Geolocation from 'react-native-geolocation-service';

class ChatScreen extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      name: '',
      uid: '',
      url: '',

      friendUID: '',
      friendName: '',
      friendUrl: '',
      friendStatus: '',

      lastSeen: '',
    };
    this.getUser();
    this.getChat();
    this.getFriendUser();
  }

  getUser = async () => {
    const uid = firebase.auth().currentUser.uid;
    const ref = firebase.database().ref(`/users/${uid}`);
    ref.on('value', (snapshot) => {
      this.setState({
        name: snapshot.val().displayName,
        uid: snapshot.val().uid,
        url: snapshot.val().imageURL,
      });
    });
  };

  getFriendUser = async () => {
    const friendUID = await this.props.navigation.getParam('uid');
    const ref = firebase.database().ref(`/users/${friendUID}`);
    ref.on('value', (snapshot) => {
      console.log(snapshot.val().displayName);
      this.setState({
        friendName: `${snapshot.val().displayName}`,
        friendUrl: `${snapshot.val().imageURL}`,
        friendStatus: `${snapshot.val().status}`,
      });
    });
  };

  getLastSeen = async () => {
    const friendUID = await this.props.navigation.getParam('uid');
    const ref = firebase.database().ref(`/users/${friendUID}`);
    ref.on('value', async (snapshot) => {
      const date1 = new Date();
      const date2 = new Date(snapshot.val().last_seen);
      var res = Math.abs(date1 - date2) / 1000;
      var minutes = Math.floor(res / 60) % 60;
      this.setState({
        lastSeen: `${minutes}`,
        friendStatus: `${snapshot.val().status}`,
      });
    });
  };

  getChat = async () => {
    const uid = firebase.auth().currentUser.uid;
    const ref = firebase.database().ref(`/chat/${uid}/${this.state.friendUID}`);
    const ref2 = firebase
      .database()
      .ref(`/chat/${this.state.friendUID}/${uid}`);
    let data = [];
    ref.on('child_added', async (snapshot) => {
      data.push(snapshot.val().messages);
    });

    ref2.on('child_added', async (snapshot) => {
      data.push(snapshot.val().messages);
    });

    data = data.sort((a, b) => {
      if (a.createdAt < b.createdAt) {
        return 1;
      } else if (a.createdAt > b.createdAt) {
        return -1;
      }
      return 0;
    });
    this.setState((previousState) => ({
      messages: data,
    }));
  };

  async onSend(messages) {
    const {friendUID} = this.state;
    const uid = firebase.auth().currentUser.uid;
    const ref = firebase.database().ref(`/chat/${uid}/${friendUID}/`);
    // const ref2 = firebase.database().ref(`/isread/${uid}/${friendUID}/`)

    await ref.push({
      isRead: 'no',
      messages: {
        _id: Math.floor(Math.random() * 10000000000000) + 1,
        text: messages[0].text,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        user: {
          _id: uid,
          avatar: `${this.state.url}`,
          name: `${this.state.displayName}`,
        },
      },
    });
    await this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  interval = 0;
  lastSeenInterval = 0;

  async componentDidMount() {
    const friendUID = await this.props.navigation.getParam('uid');
    await this.setState({
      friendUID,
    });
    await this.getUser();
    this.getChat();
    this.getFriendUser();
    // this.getLastSeen();
    this.interval = setInterval(() => {
      this.getChat();
    }, 2000);
    // this.lastSeenInterval = setInterval(() => {
    //   this.getLastSeen();
    // }, 30000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    clearInterval(this.lastSeenInterval);
  }

  renderSend(props) {
    return (
      <Send {...props}>
        <View style={{marginRight: 15, paddingVertical: 5}}>
          <Icon name="chevron-right" size={30} color="#262626" />
        </View>
      </Send>
    );
  }

  renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        textStyle={{
          right: {
            color: '#262626',
          },
          left: {
            color: '#262626',
          },
        }}
        wrapperStyle={{
          left: {
            backgroundColor: '#FFF3E0',
          },
          right: {
            backgroundColor: '#FFD700',
          },
        }}
      />
    );
  };

  render() {
    return (
      <>
        <View
          style={{
            height: 60,
            backgroundColor: '#FFD700',
            elevation: 2,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 15,
          }}>
          <Icon
            name="arrow-left"
            size={24}
            color="#262626"
            onPress={() => this.props.navigation.navigate('ChatList')}
          />
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() =>
              this.props.navigation.push('FriendProfile', {
                uid: this.state.friendUID,
              })
            }>
            <Image
              source={{
                uri: `${
                  this.state.friendUrl ||
                  'https://www.securities-services.societegenerale.com/uploads/tx_bisgbio/default-profile.png'
                }`,
              }}
              style={{
                marginLeft: 15,
                height: 50,
                width: 50,
                borderRadius: 50,
                backgroundColor: '#FFFADD',
              }}
            />
          </TouchableOpacity>
          <View>
            <Text style={{marginLeft: 15, fontSize: 24, color: '#262626'}}>
              {this.state.friendName}
            </Text>
          </View>
        </View>
        <GiftedChat
          messagesContainerStyle={{backgroundColor: '#FAF8F0'}}
          renderBubble={this.renderBubble}
          renderSend={this.renderSend}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={{
            _id: this.state.uid,
            name: `${this.state.name}`,
            avatar: `${this.state.url}`,
          }}
        />
      </>
    );
  }
}

export default ChatScreen;
