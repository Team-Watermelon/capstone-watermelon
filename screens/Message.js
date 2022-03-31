import React, { useState, useContext, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import "firebase/firestore";
import firebase from "firebase/app";

export default function RoomScreen({ route }) {
  const { user } = useContext(AuthenticatedUserContext);
  const currentUser = user.toJSON();
  const { thread } = route.params;
  const [receiver, setReceiver] = useState({});
  let receiverFullData= {};

  const getReceiver = async () => {
    console.log('this is ROUTEPARAMS================>', route.params)
    await firebase
      .firestore()
      .collection("users")
      .doc(route.params.thread.id)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          console.log("exists");
          console.log("receiver data", documentSnapshot.data());
          receiverFullData = documentSnapshot.data()
          receiverFullData.id = documentSnapshot.id;
          console.log('this is receiverDataSnap', receiverFullData )
          setReceiver(receiverFullData);
          console.log('this is receiver', receiver)
          
        }
      });
     
  };

  const [messages, setMessages] = useState([

    {
      _id: 0,
      text: "New room created.",
      createdAt: new Date().getTime(),
      system: true,
    },
    
  ]);

  async function handleSend(messages) {
    const text = messages[0].text;

    firebase
      .firestore()
      .collection("THREADS")
      .doc(user.uid)
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
      .doc(user.uid)
      .set(
        
        {
          latestMessage: {
            text,
            createdAt: new Date().getTime(),
          },
          users: [currentUser.uid, ],
          receiverID: receiver.id,
          senderID: currentUser.uid,
          receiverName: receiver.id,
          senderName: currentUser.email
        },
        { merge: true }
      );
  }

  useEffect(() => {
    getReceiver();
    console.log('THIS is receiver>>>>>>>>>>>>>>>>>', receiver)
    const messagesListener = firebase.firestore()
      .collection("THREADS")
      .doc(user.uid)
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
