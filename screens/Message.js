import React, { useState, useContext, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import "firebase/firestore";
import firebase from "firebase/app";

export default function RoomScreen({ route }) {
  const { user } = useContext(AuthenticatedUserContext);
  const currentUser = user.toJSON();
  // const { thread } = route.params;
  // const [receiver, setReceiver] = useState(route.params);
  
  //setReciever sets the person who will receive the message based on route params
  // const getReceiver = () => {
  //   console.log('this is ROUTEPARAMS================>', route.params)
  //         setReceiver(route.params);
  //         console.log('this is receiver', receiver)
   
  // };
  console.log('this is route.params', route.params)
  const receiver = route.params.userData;
  //messages hook with initial state
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
      .doc(user.uid+receiver.id)
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
      .doc(user.uid+receiver.id)
      .set(
        
        {
          latestMessage: {
            text,
            createdAt: new Date().getTime(),
          },
          users: [currentUser.uid, receiver.id],
          receiverID: receiver.id,
          senderID: currentUser.uid,
          receiverName: receiver.firstName,
          senderName: currentUser.email
        },
        { merge: true }
      );
  }



  useEffect(() => {
    // getReceiver()
    console.log('THIS is receiver>>>>>>>>>>>>>>>>>', receiver)
    const messagesListener = firebase.firestore()
      .collection("THREADS")
      .doc(user.uid+receiver.id)
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
