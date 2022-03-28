import firebase from "firebase/app";
import "firebase/firestore";
import {Alert} from "react-native";


export const saveProfileImage = async(ImageURL) => {
    const currentUser = firebase.auth().currentUser;
    firebase.firestore()
    .collection('users')
    .doc(currentUser.uid)
    .update({
      userImage: ImageURL,
    })
    .then(() => {
      console.log('Profile Image Updated!')
    })
  }
