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
// import fire from '../config/firebase';

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
    const ref = firebase.database().ref('/users');

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
          if (snapshot.val() != null) {
            await Object.keys(snapshot.val()).map(key => {
              if (snapshot.val()[key].isRead != undefined) {
                noRead.push(snapshot.val()[key].isRead);
                console.log('READDDD', snapshot.val()[key].isRead);
                x = snapshot.val()[key];
                x['total'] = noRead.length;
              }
            });
          }
          if (x.messages != undefined) {
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
      <View style={{flex: 1}}>
        <View
          style={{
            height: 60,
            backgroundColor: '#FFD700',
            alignItems: 'center',
            paddingHorizontal: 30,
            flexDirection: 'row',
          }}>
          <Text style={{fontSize: 20, color: '#000'}}>Friend List</Text>
        </View>
        <ScrollView style={{flex: 0.5}}>
          {this.state.data.map(data => {
            const {userUID} = this.state;
            return userUID == data.uid ? null : (
              <TouchableOpacity
                onPress={() => this.handleChat(data.uid)}
                activeOpacity={0.5}
                style={{
                  height: 75,
                  backgroundColor: '#FFFBC9',
                  borderBottomColor: '#bfbfbf',
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
                  <View style={{flexDirection: 'row'}}>
                    {data.data.status == 'offline' ? (
                      <View
                        style={{
                          height: 8,
                          width: 8,
                          borderRadius: 8,
                          backgroundColor: 'gray',
                          opacity: 0.5,
                          alignSelf: 'center',
                          marginRight: '5%',
                          marginTop: '5%',
                        }}
                      />
                    ) : (
                      <View
                        style={{
                          height: 8,
                          width: 8,
                          borderRadius: 8,
                          backgroundColor: '#FFD700',
                          alignSelf: 'center',
                          marginRight: '5%',
                          marginTop: '5%',
                        }}
                      />
                    )}
                    <Text
                      style={{
                        fontSize: 12,
                        color: 'gray',
                        alignSelf: 'center',
                      }}>
                      {data.data.status}
                    </Text>
                  </View>
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

// import React, {useEffect, useState} from 'react';
// import {
//   ScrollView,
//   Image,
//   TouchableOpacity,
//   View,
//   Text,
//   StyleSheet,
// } from 'react-native';
// import * as firebase from 'firebase';
// // import fire from '../config/firebase';

// const Contact = props => {
//   // constructor() {
//   //   super();
//   //   this.state = {
//   //     data: [],
//   //     userUID: '',
//   //     data2: {},
//   //   };
//   //   this.getAllUser();
//   // }
//   const [data, setData] = useState([]);
//   const [userUID, setUserUID] = useState('');
//   const [data2, setData2] = useState({});

//   const getAllUser = async () => {
//     const uid = firebase.auth().currentUser.uid;
//     const ref = firebase.database().ref('/users');

//     await ref.on('value', async snapshot => {
//       let data = [];
//       let data2 = [];
//       let data3 = [];
//       let data4 = {};
//       await Object.keys(snapshot.val()).map(async key => {
//         const friendUID = snapshot.val()[key].uid;
//         const noRead = [];
//         let x = [];
//         const ref2 = firebase.database().ref(`/chat/${friendUID}/${uid}/`);
//         await ref2.on('value', async snapshot => {
//           if (snapshot.val() != null) {
//             await Object.keys(snapshot.val()).map(key => {
//               if (snapshot.val()[key].isRead != undefined) {
//                 noRead.push(snapshot.val()[key].isRead);
//                 console.log('READDDD', snapshot.val()[key].isRead);
//                 x = snapshot.val()[key];
//                 x['total'] = noRead.length;
//               }
//             });
//           }
//           if (x.messages != undefined) {
//             data2.push(x);
//             data3.push(x.messages.user);
//           }
//         });
//         await data.push({
//           uid: key,
//           data: snapshot.val()[key],
//         });
//       });
//       console.log('data22', data2);
//       console.log('data3', data3);
//       for (let i = 0; i < data3.length; i++) {
//         data4[`${data3[i]._id}`] = data2[i].total;
//       }
//       // await this.setState({
//       //   data: data,
//       //   data2: data4,
//       // });
//       await setData(data);
//       await setData2(data4);
//       console.log('data4', data4);
//     });
//   };

//   const getUser = async () => {
//     const uid = firebase.auth().currentUser.uid;
//     setUserUID(uid);
//     // this.setState({
//     //   userUID: uid,
//     // });
//   };

//   const handleChat = async friendUID => {
//     const uid = firebase.auth().currentUser.uid;
//     const ref = firebase.database().ref(`/chat/${friendUID}/${uid}/`);
//     ref.on('value', async snapshot => {
//       if (Object.keys(snapshot.val()) != null) {
//         await Object.keys(snapshot.val()).map(async key => {
//           const ref2 = firebase
//             .database()
//             .ref(`/chat/${friendUID}/${uid}/${key}/isRead`);
//           ref2.remove();
//         });
//         delete data2[`${friendUID}`];
//         // forceUpdate();
//         console.log('dadadat2', data2);
//         getAllUser();
//       }
//     });
//     props.navigation.push('Chat', {
//       uid: friendUID,
//     });
//   };

//   // componentDidMount() {
//   //   this.getUser();
//   // }

//   useEffect(() => {
//     getUser();
//   }, []);

//   // render() {
//   return (
//     <View style={{flex: 1}}>
//       <View
//         style={{
//           height: 60,
//           backgroundColor: '#FFD700',
//           alignItems: 'center',
//           paddingHorizontal: 30,
//           flexDirection: 'row',
//         }}>
//         <Text style={{fontSize: 20, color: '#000'}}>Friend List</Text>
//       </View>
//       <ScrollView style={{flex: 0.5}}>
//         {data.map(data => {
//           // const {userUID} = this.state;
//           return userUID == data.uid ? null : (
//             <TouchableOpacity
//               onPress={() => handleChat(data.uid)}
//               activeOpacity={0.5}
//               style={{
//                 height: 75,
//                 backgroundColor: '#FAF8F0',
//                 borderBottomColor: '#F4D2D2',
//                 borderBottomWidth: 1,
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 paddingHorizontal: 10,
//               }}
//               key={data.uid}>
//               <Image
//                 source={{uri: `${data.data.urlImage}`}}
//                 style={{
//                   height: 60,
//                   width: 60,
//                   borderRadius: 40,
//                   marginRight: 20,
//                 }}
//               />
//               <View>
//                 <Text style={{fontSize: 16}}>{data.data.name}</Text>
//                 <View style={{flexDirection: 'row'}}>
//                   {data.data.status == 'offline' ? (
//                     <View
//                       style={{
//                         height: 8,
//                         width: 8,
//                         borderRadius: 8,
//                         backgroundColor: 'gray',
//                         opacity: 0.5,
//                         alignSelf: 'center',
//                         marginRight: '5%',
//                         marginTop: '5%',
//                       }}
//                     />
//                   ) : (
//                     <View
//                       style={{
//                         height: 8,
//                         width: 8,
//                         borderRadius: 8,
//                         backgroundColor: '#FFD700',
//                         alignSelf: 'center',
//                         marginRight: '5%',
//                         marginTop: '5%',
//                       }}
//                     />
//                   )}
//                   <Text
//                     style={{
//                       fontSize: 12,
//                       color: 'gray',
//                       alignSelf: 'center',
//                     }}>
//                     {data.data.status}
//                   </Text>
//                 </View>
//               </View>
//               {data2[`${data.data.uid}`] != null ? (
//                 <View
//                   style={{
//                     height: 20,
//                     width: 20,
//                     backgroundColor: '#FFD700',
//                     borderRadius: 10,
//                     position: 'absolute',
//                     right: '3%',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                   }}>
//                   <Text style={{color: 'white'}}>
//                     {data2[`${data.data.uid}`]}
//                   </Text>
//                 </View>
//               ) : null}
//             </TouchableOpacity>
//           );
//         })}
//       </ScrollView>
//     </View>
//   );
// };
// // }

// export default Contact;
