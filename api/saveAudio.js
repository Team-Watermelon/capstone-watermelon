import firebase from "firebase/app";
import "firebase/firestore";
import {Alert} from "react-native";


export const saveAudio = async(audioURL) => {
    const currentUser = firebase.auth().currentUser;
    firebase.firestore()
    .collection('users')
    .doc(currentUser.uid)
    .update({
      audio: audioURL,
    })
    .then(() => {
      console.log('Audio Updated!');
      Alert.alert(
        'Audio Updated!',
        'Your audio has been updated successfully.'
      );
    })
  }
