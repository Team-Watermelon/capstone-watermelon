import firebase from "firebase/app";
import "firebase/firestore";
import { Alert } from "react-native";

export async function registration(email, password) {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const currentUser = firebase.auth().currentUser;

    const db = firebase.firestore();
    db.collection("users").doc(currentUser.uid)
    .set({
      email: currentUser.email,
      firstName: "",
      lastName: "",
      userImage:"https://preview.redd.it/v0caqchbtn741.jpg?auto=webp&s=c5d05662a039c031f50032e22a7c77dfcf1bfddc"
  })}catch (err) {
    Alert.alert("There is something wrong!!!!", err.message);
  }
}

