import React, { useState, useContext, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import "firebase/firestore";
import firebase from "firebase/app";

export default function RoomScreen({ route }) {
  const { user } = useContext(AuthenticatedUserContext);
  const currentUser = user.toJSON();
  const { thread } = route.params;
  const [receiver, setReceiver] = useState(null);
  // const receiver = route.params.data;
  const getReceiver = async () => {
    const myPromise = new Promise( async (resolve, reject) => {
      let newReceiverFromZach = await firebase
      .firestore()
      .collection("users")
      .doc(route.params.thread)
      .get()

      if (newReceiverFromZach.exists) {
        console.log("User Data in Profile", newReceiverFromZach.data());
          let receiverData = {};
          receiverData.data = newReceiverFromZach.data()
          receiverData.data.id = newReceiverFromZach.id;
          console.log('this is receiverData!!!!!!!!!!!!!', receiverData)
          resolve(receiverData.data) 
      } else {
        reject()
      }
    });

    return myPromise
  }
    // console.log('this is ROUTEPARAMS================>', route.params)
    // let newReceiverFromZach = await firebase
    //   .firestore()
    //   .collection("users")
    //   .doc(route.params.thread)
    //   .get()

    //   if (newReceiverFromZach.exists) {
    //     console.log("User Data in Profile", newReceiverFromZach.data());
    //       let receiverData = {};
    //       receiverData.data = newReceiverFromZach.data()
    //       receiverData.data.id = newReceiverFromZach.id;
    //       console.log('this is receiverData!!!!!!!!!!!!!', receiverData)
    //       setReceiver(receiverData.data)
    //   }
    //   console.log('this is receiverDAta', receiverData)
    // };
   

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
    // {
    //   _id: 1,
    //   text: "Henlo!",
    //   createdAt: new Date().getTime(),
    //   user: {
    //     _id: 2,
    //     name: "Test User",
    //   },
    // },
  ]);

  // const getThreads = async () => {
  //   await firebase
  //     .firestore()
  //     .collection('THREADS')
  //     .where('user1', '==', "19nD7SIhT6aXCBFohpWEtlyJuPp2")
  //     .get()
  //     .then((querySnapshot) => {
  //       const data = querySnapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));
  //       console.log('Users with id 19nD7SIhT6aXCBFohpWEtlyJuPp2', data);
  //     });
  // };

  // helper method that is sends a message
  async function handleSend(messages) {
    const text = messages[0].text;

    firebase
      .firestore()
      .collection("THREADS")
      .doc("TEST NAME")
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
      .doc("TEST NAME")
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

  // useEffect(()=>{},[receiver])

  useEffect(() => {
    getReceiver().then((receiverPromiseObj)=> {
      setReceiver(receiverPromiseObj)
      return receiverPromiseObj
    }).then((again)=>{
      
    })
    
 
    console.log('this is receiver++++++++++++@@@@@@@@@@QQ>>>>>>>>>>>>>>>>>>>', receiver)
    const messagesListener = firebase.firestore()
      .collection("THREADS")
      .doc("TEST NAME")
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