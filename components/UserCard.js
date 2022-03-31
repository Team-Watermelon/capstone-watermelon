import React, { useContext, useEffect, useState } from "react";
import Card from "react-native-card-component";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import firebase from "firebase/app";
import "firebase/firestore";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
//import NewestAudioPlayer from "./NewestAudioPlayer";
import HomePageAudio from "./HomePageAudio"
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const UserCard = ({ item, onPress }) => {
  const { user, logout } = useContext(AuthenticatedUserContext);
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();

  const getUser = async () => {
    await firebase
      .firestore()
      .collection("users")
      .doc(item.uid)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          console.log("User Data", documentSnapshot.data());
          setUserData(documentSnapshot.data());
        }
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <SafeAreaView>
      <Card key={item.id}>
        <TouchableOpacity onPress={onPress}>
          <Card.Thumbnail
            source={{
              uri: item
                ? item.userImage ||
                  "https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg"
                : "https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg",
            }}
            // uri: 'https://i.pinimg.com/custom_covers/222x/85498161615209203_1636332751.jpg' }}
            style={{ height: 85, width: 97 }}
            align={"left"}
            // stretch
            // imageProps={{resizeMode: 'contain'}}
            containerStyle={{ justifyContent: "center", alignItems: "center" }}
          />
        </TouchableOpacity>
        {/* <Card.Title> */}
        <View style={{ marginLeft: 16 }}>
          <Text
            style={{
              fontSize: 18,
              color: "#AC9292",
              fontWeight: "bold",
              fontFamily: "Arial",
              textTransform: "capitalize",
              paddingLeft: 15,
              paddingTop: 0,
            }}
          >
            {item ? item.firstName || "Test" : "Test"}{" "}
          </Text>

          {/* <Button mode={'outlined'}>Listen to their story</Button> */}
          {item.audio ? (
            <View>
              <Text
                style={{
                  color: "#AC9292",
                  fontSize: 14,
                }}
              >
                Listen to {item ? item.firstName || "Test" : "Test"} 's Story
              </Text>
              <HomePageAudio url={item.audio} />
            </View>
          ) : null}

          <View
            style={{
              marginTop: 4,
              borderWidth: 0,
              paddingLeft: 15,
              flexDirection: "row",
              // width: '85%',
            }}
          >
            <Icon
              name="message"
              color="#AC9292"
              size={20}
              onPress={() =>
                firebase
                  .firestore()
                  .collection("THREADS")
                  .add({
                    id: item.id,
                    users: [item.id, user.uid],
                    receiverID: item.id,
                    senderID: user.uid,
                    receiverName: item.firstName,
                    //  senderName: loggedInUserData.firstName
                  })
                  .then(() => {
                    navigation.navigate("Message", { thread: item.id });
                  })
              }
            />

            <Text
              style={{
                color: "#AC9292",
                fontSize: 14,
              }}
            >
              Connect with {item ? item.firstName || "Test" : "Test"}{" "}
            </Text>
          </View>
        </View>
      </Card>
    </SafeAreaView>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: 'center',
    backgroundColor: "#f7f7f7",
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
