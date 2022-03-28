import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  Alert,
  Button,
  Image,
  Platform,
} from 'react-native';

import {useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Feather from 'react-native-vector-icons/Feather';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import firebase from "firebase/app";
import "firebase/firestore";
// import storage from '@react-native-firebase/storage';
import {AuthenticatedUserContext} from '../navigation/AuthenticatedUserProvider';
import * as ImagePicker from 'expo-image-picker';

const EditProfileScreen = () => {

// const [image, setImage] = useState('https://api.adorable.io/avatars/80/abott@adorable.png');
  const {colors} = useTheme();
  const {user} = useContext(AuthenticatedUserContext);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [userData, setUserData] = useState(null);
  const [imagURL, setImageURL] = useState(0)

  const getUser = async() => {
    const currentUser = await firebase.firestore()
    .collection('users')
    .doc(user.uid)
    .get()
    .then((documentSnapshot) => {
      if( documentSnapshot.exists ) {
        console.log('User Data', documentSnapshot.data());
        setUserData(documentSnapshot.data());
      }
    })
  }

  function toDataURL(uri, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open("GET", uri, true);
    xhr.responseType = "blob";
    xhr.send();
  }
  const openImagePickerAsync = async () => {
    const permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log(pickerResult.uri);
    setImage(pickerResult.uri)
  };

  const uploadImage = ()=>{
    toDataURL(image, function (dataUrl) { 
    const formData = new FormData();
    formData.append("file", `${dataUrl}`);
      formData.append("upload_preset", "openArms");
      formData.append("cloud_name", "capstonewatermelon");
      fetch("https://api.cloudinary.com/v1_1/capstonewatermelon/auto/upload", {
        method: "post",
        body: formData,
      })
      .then(resp => resp.json())
      .then(data => {
        console.log('data in uploadImage',data)
        setImageURL(data.url)
      })
    });
  };

  const handleUpdate = async() => {
    // let imgUrl = await uploadImage();

    // if( imgUrl == null && userData.userImg ) {
    //   imgUrl = userData.userImg;
    // }
    firebase.firestore()
    .collection('users')
    .doc(user.uid)
    .update({
      firstName: userData.firstName,
      // lname: userData.lname,
      aboutMe: userData.aboutMe,
      // phone: userData.phone,
      // country: userData.country,
      city: userData.city,
      // userImg: imgUrl,
    })
    .then(() => {
      console.log('User Updated!');
      Alert.alert(
        'Profile Updated!',
        'Your profile has been updated successfully.'
      );
    })
  }
  useEffect(() => {
    getUser();
  }, []);

  // const takePhotoFromCamera = () => {
  //   ImagePicker.openCamera({
  //     compressImageMaxWidth: 300,
  //     compressImageMaxHeight: 300,
  //     cropping: true,
  //     compressImageQuality: 0.7
  //   }).then(image => {
  //     console.log(image);
  //     setImage(image.path);
  //     bs.current.snapTo(1);
  //   });
  // }

  // const choosePhotoFromLibrary = () => {
  //   ImagePicker.openPicker({
  //     width: 300,
  //     height: 300,
  //     cropping: true,
  //     compressImageQuality: 0.7
  //   }).then(image => {
  //     console.log(image);
  //     setImage(image.path);
  //     bs.current.snapTo(1);
  //   });
  // }

  return (
    <View style={styles.container}>
       {/* <BottomSheet
        ref={bs}
        snapPoints={[330, 0]}
        renderContent={renderInner}
        // renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
      /> */}
      {/* <Animated.View style={{margin: 20,
        opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
    }}> */}
      <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
        <Text style={styles.buttonText}>Pick a photo</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={uploadImage} style={styles.button}>
        <Text style={styles.buttonText}>UpLoad</Text>
      </TouchableOpacity>
        <View style={{alignItems: 'center'}}>
        <TouchableOpacity onPress={() => {}}>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ImageBackground
                source={{
                //   uri: image
                //     ? image
                //     : userData
                //     ? userData.userImg ||
                //       'https://i.pinimg.com/custom_covers/222x/85498161615209203_1636332751.jpg'
                //     : 'https://i.pinimg.com/custom_covers/222x/85498161615209203_1636332751.jpg',
                // }}
                        
                  uri: 'https://i.pinimg.com/custom_covers/222x/85498161615209203_1636332751.jpg',
                }}
                style={{height: 100, width: 100}}
                imageStyle={{borderRadius: 15}}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon
                    name="camera"
                    size={35}
                    color="#fff"
                    style={{
                      opacity: 0.7,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 1,
                      borderColor: '#fff',
                      borderRadius: 10,
                    }}
                  />
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
          <Text style={{marginTop: 10, fontSize: 18, fontWeight: 'bold'}}>
          {userData ? userData.firstName : ''}
          </Text>
        </View>
        

        <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={20} />
          <TextInput
            placeholder="Full Name"
            placeholderTextColor="#666666"
            autoCorrect={false}
            value={userData ? userData.firstName : ''}
            onChangeText={(txt) => setUserData({...userData, firstName: txt})}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        {/* <View style={styles.action}>
          <FontAwesome name="envelope-o" color={colors.text} size={20} />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#666666"
            keyboardType="email-address"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View> */}
        <View style={styles.action}>
          <Icon name="map-marker-outline" color={colors.text} size={20} />
          <TextInput
            placeholder="City"
            placeholderTextColor="#666666"
            autoCorrect={false}
            value={userData ? userData.city : ''}
            onChangeText={(txt) => setUserData({...userData, city: txt})}
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
            value={userData ? userData.aboutMe : ''}
            onChangeText={(txt) => setUserData({...userData, aboutMe: txt})}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        
        <TouchableOpacity style={styles.commandButton} onPress={handleUpdate}>
          <Text style={styles.panelButtonTitle}>Update</Text>
        </TouchableOpacity>
      {/* </Animated.View> */}
    </View>
    
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    backgroundColor: '#fff'
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#AF8EC9',
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
});
