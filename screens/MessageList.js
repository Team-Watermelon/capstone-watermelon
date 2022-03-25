// add logic to click on list of messages

import React, { useState, useEffect, useCallback, useContext } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
//what is this exactly? Has to do with how we are retrieving users from firestore
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, TextInput, View, Button } from 'react-native';
//this is our chats collection in firestore
import { chatsRef } from '../config/firebase';
//this allows us to access auth data from firebase, which gives us the user id BUT not the user obj
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import firebase from 'firebase/app';

export default function MessageList() {
  //this is wrong--this was to get auth user data. we need to use an async function to retrieve user obj using this uid
  //the auth context user should probably be moved to setUser hook definition
  const { user } = useContext(AuthenticatedUserContext);
  console.log('this is user', user);
  //uid is the right one--we just need to use it to request the right obj
  console.log('this is userID', user.uid);
  const [foundUser, setUser] = useState(null);
  console.log('this is foundUser', foundUser);
  //this will change to retrieving user name from user obj
  const [name, setName] = useState('');

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    //find the user
    readUser();
    const unsubscribe = chatsRef.onSnapshot((querySnapshot) => {
      //this is how the message list is rendered
      const messagesFirestore = querySnapshot
        .docChanges()
        .filter(({ type }) => type === 'added')
        .map(({ doc }) => {
          const message = doc.data();
          return {
            ...message,
            createdAt: message.createdAt.toDate(),
          };
        })
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      //this is where a new message is added using messages hook
      appendMessages(messagesFirestore);
    });
    return () => unsubscribe();
  }, []);

  const appendMessages = useCallback(
    (messages) => {
      //where does previousMessages come from?
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );
    },
    [messages]
  );

  //right now we have the auth context setting user globally, but we really want to use it here to set locally and then
  //we want to set the real user obj in setUser
  // async function readUser() {
  //   const user = await AsyncStorage.getItem('user');
  //   if (user) {
  //     setUser(JSON.parse(user));
  //   }
  // }

  //code from user profile
  const readUser = async () => {
    await firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          console.log('User Data', documentSnapshot.data());
          setUser(documentSnapshot.data());
        }
      });
  };

  // async function handlePress() {
  //   // this could be id we get from firebase?
  //   const _id = user.uid;
  //   console.log("this is uid", _id);
  //   const user = { _id, name };
  //   //the below sets the uer that is now appaering in messages
  //   await AsyncStorage.setItem("user", JSON.stringify(user));
  //   setUser(user);
  // }

  async function handleSend(messages) {
    const writes = messages.map((m) => chatsRef.add(m));
    await Promise.all(writes);
  }

  // if (!user) {
  //   return (
  //     <View style={styles.container}>
  //       <TextInput
  //         style={styles.input}
  //         placeholder="Enter your name"
  //         value={name}
  //         //this is proabably irrelevant, bc we will pull name from user obj
  //         onChangeText={setName}
  //       />
  //       <Button onPress={handlePress} title="💬 Enter chat room" />
  //     </View>
  //   );
  // }

  return (
    <GiftedChat messages={messages} user={foundUser} onSend={handleSend} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  input: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    padding: 15,
    marginBottom: 20,
    borderColor: 'gray',
  },
});
