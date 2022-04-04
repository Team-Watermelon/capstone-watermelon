import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  Platform,
  ActivityIndicator,
  Modal,
  ImageBackground,
} from "react-native";
import { useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { StatusWrapper } from "../styles/FeedStyle";
import DropDownPicker from "react-native-dropdown-picker";
// import Feather from 'react-native-vector-icons/Feather';
import firebase from "firebase/app";
import "firebase/firestore";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";

const Welcome = () => {
  const { colors } = useTheme();
  const { user } = useContext(AuthenticatedUserContext);
  const [isModalVisible, setModalVisible] = useState(true);
  const [userData, setUserData] = useState(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "IVF", value: "IVF" },
    { label: "Miscarriage", value: "Miscarriage" },
    { label: "Support", value: "Support" },
  ]);
  const navigation = useNavigation();

  const getUser = async () => {
    const currentUser = await firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          console.log("User Data in EditProfile", documentSnapshot.data());
          setUserData(documentSnapshot.data());
        }
      });
  };

  const handleUpdate = async () => {
    const currentUser = firebase.auth().currentUser;
    const db = firebase.firestore();
    await db
      .collection("users")
      .doc(currentUser.uid)
      .set({
        firstName: userData.firstName,
        aboutMe: userData.aboutMe,
        city: userData.city,
        category: value,
      })
      .then(() => {
        navigation.navigate("Profile");
        setModalVisible(false);
        //console.log('navigation',navigation)
        console.log("User Updated!", userData.category);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Modal
      visible={isModalVisible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(false);
      }}
    >
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require("../assets/coverhands.png")}
        >
          <View style={styles.message}>

            <Text style={styles.text}>Welcome to Open! </Text>
            <Text
              style={{
                marginTop: 20,
                marginBottom: 30,
                fontSize: 24,
                fontWeight: "bold",
                color: "#E8A196",
              }}
            >
              We are here with you
            </Text>
          </View>
          <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "bold" }}>
            {userData ? userData.firstName : ""}
          </Text>

          <View style={styles.action}>
            <FontAwesome name="user-o" color={colors.text} size={20} />
            <TextInput
              placeholder="Full Name"
              placeholderTextColor="#666666"
              autoCorrect={false}
              value={userData ? userData.firstName : ""}
              onChangeText={(txt) =>
                setUserData({ ...userData, firstName: txt })
              }
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
            />
          </View>
          <View style={styles.action}>
            <Icon name="map-marker-outline" color={colors.text} size={20} />
            <TextInput
              placeholder="City"
              placeholderTextColor="#666666"
              autoCorrect={false}
              value={userData ? userData.city : ""}
              onChangeText={(txt) => setUserData({ ...userData, city: txt })}
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
            />
          </View>
          <View style={styles.action}>
            <Icon name="information-variant" color={colors.text} size={20} />
            <TextInput
              placeholder="About Me"
              placeholderTextColor="#666666"
              autoCorrect={false}
              value={userData ? userData.aboutMe : ""}
              onChangeText={(txt) => setUserData({ ...userData, aboutMe: txt })}
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
            />
          </View>
          <DropDownPicker
            open={open}
            value={value}
            placeholder="What best describes your story?"
            placeholderTextColor="#666666"
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
          />
          <TouchableOpacity style={styles.commandButton} onPress={handleUpdate}>
            <Text style={styles.panelButtonTitle}>Save</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.commandButton} onPress={()=>navigation.navigate('Home')}>
          <Text style={styles.panelButtonTitle}>Find your people</Text>
        </TouchableOpacity> */}
        </ImageBackground>
      </View>
    </Modal>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    marginTop: 150,
  },
  modal: {
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    marginTop: 80,
    marginLeft: 40,
  },
  image: {
    justifyContent: "center",
    alignItems:"center",
  },
  message: {
    alignItems: "center",
  },
  text: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#F25037",
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#AF8EC9",
    alignItems: "center",
    marginTop: 10,
    justifyContent: "center",
    width: 150
  },
  panel: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
  },
  header: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "#FF6347",
    alignItems: "center",
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
});
