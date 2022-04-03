import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Alert,
} from "react-native";
import UserCard from "../components/UserCard";
import { IconButton } from "../components";

import Firebase from "../config/firebase";
import firebase from "firebase/app";
import "firebase/firestore";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import Welcome from "./Welcome"
const auth = firebase.auth();

export default function HomeScreen({ navigation }) {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newUser, setNewUser] =useState(null);

const auth = firebase.auth();

// export const reachOut = ({ navigation }) => {
//   firebase
//     .firestore()
//     .collection("THREADS")
//     .add({
//       id: userData.id,
//       users: [userData.id, user.uid],
//       receiverID: userData.id,
//       senderID: user.uid,
//       receiverName: userData.firstName,
//       senderName: loggedInUserData.firstName,
//     })
//     .then(() => {
//       navigation.navigate("Message", { thread: userData.id });
//     });
// };

  const { user } = useContext(AuthenticatedUserContext);
  let signedUp = {};

  const getUser = async () => {
    await firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
        console.log("User Data in Profile", documentSnapshot.data());
          // let userFullData = {};
          signedUp.data = documentSnapshot.data();
          signedUp.data.id = documentSnapshot.id;
          console.log("this is signedUp", signedUp);
          setNewUser(signedUp.data);
          setLoading(false)
        }
      });
    console.log("this is newUSer", newUser);
  };
  
  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const list = [];
      await firebase
        .firestore()
        .collection("users")
        .get()
        .then((querySnapshot) => {
          console.log("Total Users: ", querySnapshot.size);
          querySnapshot.forEach((doc) => {
            const { id, firstName, userImage, audio, aboutMe } = doc.data();
            list.push({
              id: doc.id,
              firstName,
              userImage,
              audio,
              aboutMe,
            });
          });
        });
      setUsers(list);
      // console.log("list", list);
      // console.log("Users: ", users);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUser();
    fetchUsers();
    navigation.addListener("focus", () => setLoading(!loading));
  }, [navigation, loading]);

  const renderItem = ({ item }) => {
    return (
      <UserCard
        data={users}
        key={item.id}
        item={item}
        onPress={() =>
          navigation.navigate("HomeProfile", { currentUser: item })
        }
      />
    );
  };
  return (
    <View style={styles.container}>

      {newUser ? (
      <View> 
      <FlatList
        ListHeaderComponent={
          <>
            <StatusBar style="dark-content" />
            <View style={styles.row}>
              {/* <Text style={styles.title}>
                open.{"\n"}
                {"\n"}
                {"\n"}
              </Text>
              <IconButton
                name="logout"
                size={24}
                color="black"
                onPress={handleSignOut}
              /> */}
              {/* <Text style={styles.text}>
                Your UID is: {user.uid}
                {"\n"}
                {"\n"}
                {"\n"}
              </Text> */}
            </View>
            <Text style={styles.stories}>Stories</Text>
          </>
        }
        data={users}
        renderItem={renderItem}
        // ListFooterComponent={
        //   <Footer/>
        // }
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      /></View>):(<Welcome/>)
      }
                
    </View>
  );
}
{
  /* <FlatList

>>>>>>> 77144cd138ad1f9bb50fccf7d412bdff6e54b25d
            data={users}
            renderItem={({item}) => (
              <UserCard
                item={item}
                // onDelete={handleDelete}
                onPress={() =>
                  navigation.navigate('HomeProfile',{currentUser:item})
                }
              />
            )}
            keyExtractor={(item) => item.id}
            // ListHeaderComponent={ListHeader}
            // ListFooterComponent={ListHeader}
            showsVerticalScrollIndicator={false}
          /> */
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#fff',
    paddingTop: 0,

    paddingHorizontal: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 0,

  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#AC9292",
  },
  text: {
    fontSize: 16,
    fontWeight: "normal",
    color: "#AC9292",
  },
  stories: {
    fontSize: 28,

    fontWeight: 'normal',
    color: '#AC9292',
    padding: 8,
  }

});
