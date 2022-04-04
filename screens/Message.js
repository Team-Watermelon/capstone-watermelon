import React, { useState, useContext, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import "firebase/firestore";
import firebase from "firebase/app";

export default function RoomScreen({ route }) {
  const { user } = useContext(AuthenticatedUserContext);
  const currentUser = user.toJSON();
  const { thread } = route.params;
  const [threadObj, setThreadObj] = useState(null);
  const [userData, setUserData] = useState(null)

  const getUser = async () => {
    await firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
        console.log('exists')
        console.log("User Data in Profile", documentSnapshot.data());
          // let userFullData = {};
          let userinfo = documentSnapshot.data();
          userinfo.id = documentSnapshot.id;
          console.log("this is userinfo", userinfo);
          setUserData(userinfo);

        }
      });
    console.log("this is loggedinuser", userData);
  };

  

  const getThreadObj = async () => {
    console.log('this is ROUTEPARAMS================>', route.params)
    await firebase
      .firestore()
      .collection("THREADS")
      .doc(route.params.receiverID ===user.uid ? `${route.params.senderID}_${user.uid}` : `${user.uid}_${route.params.receiverID}`)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          console.log("THREAD OBJ DOC SNAP>>>>>>>>>>>>", documentSnapshot.data());
          let threadData = documentSnapshot.data().
          console.log('this is threadData', threadData)
          setThreadObj(threadData);
          
        }
      });
  };

  getThreadObj()
  console.log('this is currentUser??????????????', currentUser)

  // const getReceiverObj = async () => {
  //   console.log('this is receiverID', threadObj.receiverID)
  //   await firebase
  //     .firestore()
  //     .collection("users")
  //     .doc(threadObj.receiverID)
  //     .get()
  //     .then((documentSnapshot) => {
  //       if (documentSnapshot.exists) {
  //         console.log("ReceiverObj>>>>>>>>>>>>", documentSnapshot.data());
  //         let receiverData = documentSnapshot.data().
  //         console.log('this is receiverData', receiverData)
  //         setThreadObj(receiverData);
          
  //       }
  //     });

     
      
   
  // };
  // getReceiverObj();



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
    
    console.log('threadObj!!!!!!!>>>>>>>>>>>>>>>>>>>>>', threadObj)
    const text = messages[0].text;

    firebase
      .firestore()
      .collection("THREADS")
      .doc(`${route.params.receiverID}_${user.uid}`)
      .collection("MESSAGES")
      .add({
        text,
        createdAt: new Date().getTime(),
        user: {
          _id: currentUser.uid,
          email: currentUser.email,
             avatar: currentUser.uid === route.params.receiverID ? route.params.receiverImage : route.params.senderImage 
          // avatar: route.params.senderImage
        },
       
      });

    await firebase
      .firestore()
      .collection("THREADS")
      .doc(route.params.thread)
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
    getUser();
   
    const messagesListener = firebase.firestore()
      .collection("THREADS")
      .doc(route.params.thread)
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
    isTyping={false}
    // Modify the following
    onSend={handleSend}
    user={{ _id: currentUser.uid }}
    // ...rest remains same
      placeholder= "Type you message here"
      showUserAvatar
      alwaysShowSend
      scrollToBottom
    />
  );
}
