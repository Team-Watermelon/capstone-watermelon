import { initializeApp } from 'firebase/app';
import Constants from 'expo-constants';
import * as firebase from 'firebase';
import 'firebase/firestore';

// Firebase config
const firebaseConfig = {
  apiKey: Constants.manifest.extra.apiKey,
  authDomain: Constants.manifest.extra.authDomain,
  projectId: Constants.manifest.extra.projectId,
  storageBucket: Constants.manifest.extra.storageBucket,
  messagingSenderId: Constants.manifest.extra.messagingSenderId,
  appId: Constants.manifest.extra.appId
};

let Firebase;
if (firebase.apps.length === 0) {
  Firebase = firebase.initializeApp(firebaseConfig);
}

export const db = firebase.firestore();
export const chatsRef = db.collection('chats')
export const roomsRef = db.collection('rooms')
// leads to list of messages
// each message is in a chat room

export default Firebase;


// another collection of chat groups
  // document should have info of chat id
    // id is associated with 2 id's
    
// users collection should have chat group id for each user  