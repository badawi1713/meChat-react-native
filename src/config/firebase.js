import Firebase from 'firebase';

let config = {
  apiKey: 'AIzaSyBnkpRG2oaGB2J4r3mRPLgzHi16kOG9PiA',
  authDomain: 'me-chat-7a826.firebaseapp.com',
  databaseURL: 'https://me-chat-7a826.firebaseio.com',
  projectId: 'me-chat-7a826',
  storageBucket: 'me-chat-7a826.appspot.com',
  messagingSenderId: '553331425844',
  appId: '1:553331425844:web:850d713ac219dd09960061',
};
// Initialize Firebase
let app = Firebase.initializeApp(config);
export const db = app.database();
