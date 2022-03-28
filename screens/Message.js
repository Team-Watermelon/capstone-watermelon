import React, { useState, useContext, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import "firebase/firestore";
import firebase from "firebase/app";

export default function RoomScreen({ route }) {
  const { user } = useContext(AuthenticatedUserContext);
  const currentUser = user.toJSON();
  const { thread } = route.params;

  // useEffect(() => {
  //   console.log('this is thread', { thread })
  //   console.log('this is user',{ user });
  // }, []);

  const [messages, setMessages] = useState([
    /**
     * Mock message data
     */
    // example of system message
    {
      _id: 0,
      text: "New room created.",
      createdAt: new Date().getTime(),
      system: true,
    },
    // example of chat message
    {
      _id: 1,
      text: "Henlo!",
      createdAt: new Date().getTime(),
      user: {
        _id: 2,
        name: "Test User",
      },
    },
  ]);

  // helper method that is sends a message
  async function handleSend(messages) {
    const text = messages[0].text;

    firebase
      .firestore()
      .collection("THREADS")
      .doc(thread._id)
      .collection("MESSAGES")
      .add({
        text,
        createdAt: new Date().getTime(),
        user: {
          _id: currentUser.uid,
          email: currentUser.email,
        },
      });

    await firebase
      .firestore()
      .collection("THREADS")
      .doc(thread._id)
      .set(
        {
          latestMessage: {
            text,
            createdAt: new Date().getTime(),
          },
        },
        { merge: true }
      );
  }

  useEffect(() => {
    const messagesListener = firebase.firestore()
      .collection("THREADS")
      .doc(thread._id)
      .collection("MESSAGES")
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        const messages = querySnapshot.docs.map((doc) => {
          const firebaseData = doc.data();

          const data = {
            _id: doc.id,
            text: "",
            createdAt: new Date().getTime(),
            ...firebaseData,
          };

          if (!firebaseData.system) {
            data.user = {
              ...firebaseData.user,
              name: firebaseData.user.email,
            };
          }

          return data;
        });

        setMessages(messages);
      });

    return () => messagesListener();
  }, []);

  return (
    <GiftedChat
    messages={messages}
    // Modify the following
    onSend={handleSend}
    user={{ _id: currentUser.uid }}
    // ...rest remains same
      placeholder="Changed this message!!! Woohoo..."
      showUserAvatar
      alwaysShowSend
      scrollToBottom
    />
  );
}
