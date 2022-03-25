// import firebase from "firebase/app";
// import "firebase/firestore";

// export const getAudio = async() => {
//     const currentUser = firebase.auth().currentUser;
//     firebase.firestore()
//     .collection('users')
//     .doc(currentUser.uid)
//     .get()
//     .then((documentSnapshot) => {
//       if( documentSnapshot.exists ) {
//         console.log('Audio Data', documentSnapshot.data().audio);
//         return documentSnapshot.data().audio;
//       }
//     })
//   }