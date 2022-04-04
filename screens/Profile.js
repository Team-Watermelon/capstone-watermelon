import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { NewestAudioPlayer } from "../components";
import Icon from "react-native-vector-icons/Ionicons";
import firebase from "firebase/app";
import "firebase/firestore";
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";

const PersonalPage = ({ navigation, route }) => {
  const { user } = useContext(AuthenticatedUserContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loggedInUserData, setloggedInUserData] = useState(null);
  let userFullData = {};
  let loggedInUserFullData = {};
  const auth = firebase.auth();

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };


  const getUser = async () => {
    console.log('this is ROUTEPARAMS================>', route.params)
    await firebase
      .firestore()
      .collection("users")
      .doc(route.params ? route.params.currentUser.id : user.uid)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          console.log("User Data in Profile", documentSnapshot.data());
          // let userFullData = {};
          userFullData.data = documentSnapshot.data();
          userFullData.data.id = documentSnapshot.id;
          console.log("this is userFullData", userFullData);
          setUserData(userFullData.data);
        }
      });
    console.log("this is userFullData", userFullData);
  };
  const getLoggedInUser = async () => {
    await firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          console.log("User Data in Profile", documentSnapshot.data());
          console.log(
            "Logged in User Data in Profile",
            documentSnapshot.data()
          );
          // let userFullData = {};
          loggedInUserFullData.data = documentSnapshot.data();
          loggedInUserFullData.data.id = documentSnapshot.id;
          console.log("this is LOGGED IN userFullData", loggedInUserFullData);
          setloggedInUserData(loggedInUserFullData.data);
        }
      });
    console.log("this is loggedin userFullData.name", loggedInUserFullData);
  };

  useEffect(() => {
    getUser();
    getLoggedInUser();
    // console.log("THIS IS USERDATA___________________________", userData);
    // console.log(
    //   "THIS IS LOGGEDIN USERDATA==========================>>>>>>>>>>>>",
    //   loggedInUserData
    // );
    navigation.addListener("focus", () => setLoading(!loading));
  }, [navigation, loading]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          // justifyContent: "center",
          alignItems: "center",
          paddingTop: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* <Text style={styles.userName}>{userData ? userData.firstName || 'Test' : 'Test'}</Text>
        <Text style={styles.userLocation}>{userData ? userData.city || 'City' : 'City'}</Text> */}
        <View>
        <Text style={styles.userName}>
          {userData ? userData.firstName || "Test" : "Test"}
        <Text style={styles.pronouns}>
        ({userData ? userData.pronouns  || "Pronouns " : "Pronouns "})
        </Text></Text>
          </View>
        <Text style={styles.userLocation}>
          {userData ? userData.city || "City" : "City"}
        </Text>
        <Image
          style={styles.userImage}
          source={{
            uri: userData
              ? userData.userImage ||
                "https://i.pinimg.com/custom_covers/222x/85498161615209203_1636332751.jpg"
              : "https://i.pinimg.com/custom_covers/222x/85498161615209203_1636332751.jpg",
          }}
        />

        {/* <Icon name="map-marker-outline" color="#777777" size={15}/> */}
        <View>
          <TouchableOpacity style={styles.userCategoryIvf}>
            <Text style={styles.userCategoryBtnTxtIvf}>
              {userData ? userData.category || "Category" : "Category"}
            </Text>
          </TouchableOpacity>
        </View>
        {/* <TouchableOpacity style={styles.userBtn} onPress={() => {
          //we need to check whether the two users (route.params.uid and user.uid) already have a chat
          //YES: get the existing chat and direct to message room
          //NO: create a new room
          firebase.firestore()
      .collection('THREADS')
      .add({
        id: userData.data.id,
        users: [userData.data.id, user.uid],
        name: userData.data.firstName
      }
      )
      .then(() => {
        navigation.navigate('Message', { thread: userData.data.id });
      });
        }}>
                <Text style={styles.userBtnTxt}>Message</Text>
              </TouchableOpacity> */}
        <View style={styles.userBtnWrapper}>
          {route.params ? (
            <>
              <TouchableOpacity style={styles.userBtn} onPress={() => {}}>
                <Text style={styles.userBtnTxt}>
                  Follow
                  {/* {userData ? userData.firstName || "Test" : "Test"}'s Story */}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.userBtn} onPress={() => {
                
                 firebase.firestore()
                 .collection('THREADS')
                 .doc(`${userData.id}_${user.uid}`)
                 .set({
                   id: `${userData.id}_${user.uid}`,
                   //this is setting the thread id to the userid
                   users: [userData.id, user.uid],
                   receiverID: userData.id,
                   senderID: user.uid,
                   receiverName: userData.firstName,
                   senderName: loggedInUserData.firstName,
                  //  receiverImage: userData.userImage
                 }
                 )
                 .then(() => {
                   navigation.navigate('Message', { thread: `${userData.id}_${user.uid}` });
                 });   
                   }
              }>
                <Text style={styles.userBtnTxt}>Message</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={styles.userBtn}
                onPress={() => {
                  navigation.navigate("EditProfile");
                }}
              >
                <Text style={styles.userBtnTxt}>Edit Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.userBtn}
                onPress={() => navigation.navigate("AudioRecord")}
              >
                <Text style={styles.userBtnTxt}>Record Story</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
        <View>
          <Text style={styles.aboutMe}>
            {userData ? userData.aboutMe || "About Me" : "About Me"}
          </Text>
        </View>
        {/* <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>10</Text>
            <Text style={styles.userInfoSubTitle}>Posts</Text>
          </View> */}
        <View>
          <NewestAudioPlayer url={userData ? userData.audio : null} />
        </View>
        
        <TouchableOpacity style={styles.logoutBtn} onPress={handleSignOut}
             >
               <Text style={styles.userBtnTxt}>{userData && userData.id === user.uid ? "Logout" : ""}</Text>
             </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PersonalPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 12,

  },
  userImage: {
    height: 170,
    width: 170,
    borderRadius: 75,
    paddingVertical: 40,
  },
  userName: {
    fontSize: 40,
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 0,
    color: "#AF8EC9",
  },
  pronouns: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
    color: "#AF8EC9",
    marginBottom: 20,
  },
  aboutMe: {
    fontSize: 14,
    marginTop: 10,
    marginBottom: 10,
  },
  userLocation: {
    fontSize: 18,
    fontWeight: "600",
    color: "#AF8EC9",
    textAlign: "center",
    marginBottom: 10,
  },
  userBtnWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginBottom: 10,
  },
  userBtn: {
    borderColor: "#AF8EC9",
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
    margin: 10,
  },
  userBtnTxt: {
    color: "#AF8EC9",
  },
  userCategoryIvf: {
    borderColor: "#E8A196",
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 6,
    marginHorizontal: 15,
    backgroundColor: "#E8A196",
    padding: 10,
    margin: 10,
  },
  userCategoryBtnTxtIvf: {
    color: "#fff",
    backgroundColor: "#E8A196",
  },
  userInfoItem: {
    justifyContent: "center",
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  logoutBtn: {
    borderColor: "#AF8EC9",
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 4,
    paddingHorizontal:12,
    marginHorizontal: 5,
    marginTop: 0,
    marginBottom: 34
  },
});
