import React, { useContext, useEffect, useState } from "react";
import Card from "react-native-card-component";
import { SafeAreaView, StyleSheet, View, Image } from "react-native";
import { Button, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
// import FontAwesomeIcon from "font-awesome";
import firebase from "firebase/app";
import "firebase/firestore";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import HomePageAudio from "./HomePageAudio";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";


const UserCard = ({ item, onPress }) => {
  const { user, logout } = useContext(AuthenticatedUserContext);
  const [userData, setUserData] = useState(null);
  const [loggedInUserData, setloggedInUserData] = useState(null);
  const navigation = useNavigation();

  let docName = Math.floor(Math.random() * 1000000);
let stringDocName = String(docName)

  const categoryStyle = (category) => {
    if(category === "IVF") {
      return styles.userCategoryIVF
    }
    if(category === "Partner") {
      return styles.userCategoryPartner
    }
    if(category === "Miscarriage") {
      return styles.userCategoryMiscarriage
    }
    if(category === "Support") {
      return styles.userCategorySupport
    }
  }

  const getUser = async () => {
    await firebase
      .firestore()
      .collection("users")
      .doc(item.uid)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          console.log("User Data!!!", documentSnapshot.data());
          setUserData(documentSnapshot.data());
        }
      });
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
          let loggedInUserFullData = documentSnapshot.data();
          console.log("this is LOGGED IN userFullData", loggedInUserFullData);
          setloggedInUserData(loggedInUserFullData);
        }
      });
    console.log("this is loggedin userFullData.name", loggedInUserFullData);
  };

  useEffect(() => {
    getUser();
    getLoggedInUser();
    console.log("this is user in homescreen", userData);
  }, []);
  console.log("this is user in homescreen", userData);
  console.log("this is logged in user in home", loggedInUserData)
  return (
    <SafeAreaView>
      <View
        key={item.id}
        style={{
          borderWidth: 0.5,
          borderColor: "#CDCDCD",
          margin: 10,
          borderRadius: 10,
          // shadowOpacity: 0.30,
          //   shadowRadius: 4.65,
          //   elevation: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 4,
            shadowOffset: { width: 3, height: 3 },
            backgroundColor: "white",
            borderRadius: 10,
          }}
        >
          <TouchableOpacity onPress={onPress}>
            <Image
              source={{
                uri: item
                  ? item.userImage ||
                    "https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg"
                  : "https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg",
              }}
              // uri: 'https://i.pinimg.com/custom_covers/222x/85498161615209203_1636332751.jpg' }}
              style={{
                height:117, 
                width: 107,
                borderBottomLeftRadius: 10,
                borderTopLeftRadius: 10,
                // borderRadius: 25
              }}
              align={"left"}
              stretch
              imageProps={{ resizeMode: "contain" }}
              containerStyle={{
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          </TouchableOpacity>
          {/* <Card.Title> */}
          <View style={{ marginLeft: 16 }}>
            <TouchableOpacity onPress={onPress}>
              <Text
                style={{
                  fontSize: 26,
                  color: "#AC9292",
                  fontWeight: "bold",
                  fontFamily: "Arial",
                  textTransform: "capitalize",
                  paddingLeft: 15,
                  paddingTop: 8,
                }}
              >
                {item ? item.firstName || "Test" : "Test"}{" "}
                <Text
                  style={{
                    fontSize: 14,
                    color: "#AC9292",
                  }}
                >
                  {item ? item.pronouns : null}{" "}
                </Text>
                <FontAwesome
                  name="arrow-circle-o-right"
                  style={{
                    size: 25,
                    color: "#AC9292",
                  }}
                />
              </Text>
              <View>
                <TouchableOpacity style={categoryStyle(item.category)}>
                  <Text style={ styles.userCategoryBtnTxtIvf}>
                    {item ? item.category : null}
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
            {/* <Text
                      style={{
                        color: "#AC9292",
                        fontSize: 16,
                        marginLeft: 16
                      }}
                    >
                      Listen to {item ? item.firstName || "Test" : "Test"} 's Story
                    </Text> */}
            {/* <Button mode={'outlined'}>Listen to their story</Button> */}

            {item.audio ? (
              <HomePageAudio url={item.audio} userName={item.firstName} />
            ) : null}
            <View
              style={{
                marginTop: 4,
                borderWidth: 0,
                paddingLeft: 8,
                flexDirection: "row",
                marginLeft: 8,
                // width: '85%',
              }}
            >
              <Icon name="message" color='#AC9292' size={20}       onPress={() => {
                  firebase
                    .firestore()
                    .collection("THREADS")
                    .doc()
                    .set({
                      id: `${item.id}_${user.uid}`,
                      //this is setting the thread id to the userid
                      users: [item.id, user.uid],
                      receiverID: item.id,
                      senderID: user.uid,
                      receiverName: item.firstName,
                      senderName: loggedInUserData.firstName,
                      receiverImage: item.userImage,
                      senderImage: loggedInUserData.userImage
                    })
                    .then(() => {
                      navigation.navigate("Message", {
                        thread: `${item.id}_${user.uid}`,
                        receiver: item.firstName,
                        receiverImage: item.userImage,
                        sender: loggedInUserData.firstName,
                        senderImage: loggedInUserData.userImage,
                        receiverID: item.id

                      });
                    });
                }} /> 
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: 'center',
    backgroundColor: "#f7f7f7",
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  userCategoryMiscarriage: {
    fontSize: 8,
    borderColor: "#E8A196",
    borderWidth: 0,
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 4,
    
    marginLeft: 16,
    marginRight: 100,
    backgroundColor: "#E8A196",
    marginVertical: 0,
    // padding: 3,
    // margin: 3,
  },
  userCategoryPartner: {
    fontSize: 8,
    borderColor: "#BDCFE9",
    borderWidth: 0,
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 4,
    
    marginLeft: 16,
    marginRight: 100,
    backgroundColor: "#BDCFE9",
    marginVertical: 0,
    // padding: 3,
    // margin: 3,
   
  },
  userCategoryIVF: {
    fontSize: 8,
    borderColor: "#AF8EC9",
    borderWidth: 0,
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 4,
    
    marginLeft: 16,
    marginRight: 100,
    backgroundColor: "#AF8EC9",
    marginVertical: 0,
    // padding: 3,
    // margin: 3,
  },
  userCategorySupport: {
    fontSize: 8,
    borderColor: "#E39AD8",
    borderWidth: 0,
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 4,
    
    marginLeft: 16,
    marginRight: 100,
    backgroundColor: "#9AE3D6",
    marginVertical: 0,
    // padding: 3,
    // margin: 3,
  },
  userCategoryBtnTxtIvf: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
    // backgroundColor: "#E8A196",
  },
});
