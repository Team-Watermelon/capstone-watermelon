import firebase from "firebase/app";
import "firebase/firestore";
import {Alert} from "react-native";

export async function registration(email, password) {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      const currentUser = firebase.auth().currentUser;
  
      const db = firebase.firestore();
      db.collection("users")
        .doc(currentUser.uid)
        .set({
          email: currentUser.email,
        //   firstName: firstName,
        });
    } catch (err) {
      Alert.alert("There is something wrong!!!!", err.message);
    }
  }