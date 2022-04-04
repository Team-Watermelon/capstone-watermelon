import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  Alert,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { StatusWrapper } from "../styles/FeedStyle";
import DropDownPicker from "react-native-dropdown-picker";
import firebase from "firebase/app";
import "firebase/firestore";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import * as ImagePicker from "expo-image-picker";
import { saveProfileImage } from "../api/saveProfileImage";
import { toDataURL } from "../helper/Base64";

const EditProfileScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const { user } = useContext(AuthenticatedUserContext);
  const [imageURI, setImageURI] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "IVF", value: "IVF" },
    { label: "Miscarriage", value: "Miscarriage" },
    { label: "Support", value: "Support" },
  ]);

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
          setImageURI(documentSnapshot.data().userImage);
        }
      });
  };

  const openImagePickerAsync = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [3, 3],
    });
    console.log("pickerResult.uri", pickerResult.uri);
    return setImageURI(pickerResult.uri);
  };
  //uploud image uri to cloudinary after converting to base64
  const uploadImage = async () => {
    //convert image uri to base64 for cloudinary uplaoding
    toDataURL(imageURI, function (dataUrl) {
      const formData = new FormData();
      formData.append("file", `${dataUrl}`);
      formData.append("upload_preset", "openArms");
      formData.append("cloud_name", "capstonewatermelon");
      fetch("https://api.cloudinary.com/v1_1/capstonewatermelon/auto/upload", {
        method: "post",
        body: formData,
      })
        .then((resp) => resp.json())
        .then((data) => {
          const url = data.url;
          saveProfileImage(url);
          setUploading(false);
          console.log("data.url in uploadImage", data.url);
          Alert.alert(
            "Profile Updated!",
            "Your profile has been updated successfully."
          );
          navigation.navigate("Profile");
        });
    });
  };

  const handleUpdate = async () => {
    setUploading(true);
    uploadImage();
    await firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .update({
        firstName: userData.firstName,
        aboutMe: userData.aboutMe,
        city: userData.city,
        userImage: userData.userImage,
        category: value,
        pronouns: userData.pronouns
      })
      .then(() => {
        
        console.log("User Updated!", userData.category);
      });
  };

  useEffect(() => {
    getUser();
    return () => {
      setUserData(null);
      setImageURI(null);
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity onPress={openImagePickerAsync}>
          <View
            style={{
              height: 100,
              width: 100,
              borderRadius: 15,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ImageBackground
              source={{
                uri: imageURI
                  ? imageURI
                  : "https://i.pinimg.com/custom_covers/222x/85498161615209203_1636332751.jpg",
              }}
              style={{ height: 100, width: 100 }}
              imageStyle={{ borderRadius: 15 }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Icon
                  name="camera"
                  size={35}
                  color="#fff"
                  style={{
                    opacity: 0.7,
                    alignItems: "center",
                    justifyContent: "center",
                    borderWidth: 1,
                    borderColor: "#fff",
                    borderRadius: 10,
                  }}
                />
              </View>
            </ImageBackground>
          </View>
        </TouchableOpacity>
        <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "bold" }}>
          {userData ? userData.firstName : ""}
        </Text>
      </View>
      <View style={styles.action}>
        <FontAwesome name="user-o" color={colors.text} size={20} />
        <TextInput
          placeholder="Full Name"
          placeholderTextColor="#666666"
          autoCorrect={false}
          value={userData ? userData.firstName : ""}
          onChangeText={(txt) => setUserData({ ...userData, firstName: txt })}
          style={[
            styles.textInput,
            {
              color: colors.text,
            },
          ]}
        />
      </View>
      <View style={styles.action}>
        <FontAwesome name="user-o" color={colors.text} size={20} />
        <TextInput
          placeholder="Pronouns"
          placeholderTextColor="#666666"
          autoCorrect={false}
          value={userData ? userData.pronouns : ""}
          onChangeText={(txt) => setUserData({ ...userData, pronouns: txt })}
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
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
      />
      {uploading ? (
        <StatusWrapper
        style={{
          position: "absolute",
          top: 300,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: "center",
          alignItems: "center",
        }}>
          {/* <Text>Updating your profile!</Text> */}
          <ActivityIndicator size="large" color="#0000ff" />
        </StatusWrapper>
      ) : (
        <TouchableOpacity style={styles.commandButton} onPress={handleUpdate}>
          <Text style={styles.panelButtonTitle}>Update</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    backgroundColor: "#fff",
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#AF8EC9",
    alignItems: "center",
    marginTop: 10,
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
