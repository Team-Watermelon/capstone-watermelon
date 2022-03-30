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
import { NewAudioPlayer, RNActionButton } from "../components";
import Icon from "react-native-vector-icons/Ionicons";
import firebase from "firebase/app";
import "firebase/firestore";
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";


const PersonalPage = ({ navigation, route }) => {
  const { user } = useContext(AuthenticatedUserContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    await firebase
      .firestore()
      .collection("users")
      .doc(route.params ? route.params.userId : user.uid)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          console.log("User Data in Profile", documentSnapshot.data());
          let userFullData = {};
          userFullData.data = documentSnapshot.data()
          userFullData.data.id = documentSnapshot.id;
          console.log('this is userFullData', userFullData)
          setUserData(userFullData);
        }
      });
      console.log('this is userData', userData)
   
  };
  

  useEffect(() => {
    getUser();
    navigation.addListener("focus", () => setLoading(!loading));
  }, [navigation, loading]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.userName}>{userData ? userData.firstName || 'Test' : 'Test'}</Text>
        <Text style={styles.userLocation}>{userData ? userData.city || 'City' : 'City'}</Text>
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
          <TouchableOpacity
                style={styles.userCategoryIvf}
                >
                <Text style={styles.userCategoryBtnTxtIvf}>{userData ? userData.category || 'Category' : 'Category'}</Text>
              </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.userBtn} onPress={() => {
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
              </TouchableOpacity>
        <View style={styles.userBtnWrapper}>
          {route.params ? (
            <>
              <TouchableOpacity style={styles.userBtn} onPress={() => {}}>
                <Text style={styles.userBtnTxt}>
                  {userData ? userData.firstName || "Test" : "Test"}'s Story
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.userBtn} onPress={() => {
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
          <NewAudioPlayer url={userData ? userData.audio:null } />
          <RNActionButton buttonColor="blue">
            <RNActionButton.Item
              buttonColor="#9b59b6"
              title="Add Audio"
              onPress={() => navigation.navigate("AudioRecord")}
            >
              <Icon name="md-create" style={styles.actionButtonIcon} />
            </RNActionButton.Item>
            {/* add video story from here? */}
            {/* <RNActionButton.Item buttonColor='#3498db' title="Add Video" onPress={() => navigation.navigate('upload video story?')}>
            <Icon name="md-create" style={styles.actionButtonIcon} />
          </RNActionButton.Item> */}
          </RNActionButton>
        </View>
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
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white",
    backgroundColor: "#fff",
    paddingTop: 140,
    paddingHorizontal: 12,
  },
  userImage: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
  aboutMe: {
    fontSize: 14,
    marginTop: 10,
    marginBottom: 10,
  },
  userLocation: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
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
  },
  userBtnTxt: {
    color: "#AF8EC9",
  },
  userCategoryIvf: {
    borderColor: '#E8A196',
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 6,
    marginHorizontal: 15,
    backgroundColor: '#E8A196'
  },
  userCategoryBtnTxtIvf: {
    color: '#fff',
    backgroundColor: '#E8A196'
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
});
