import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import { Audio } from "expo-av";
import { saveAudio } from "../api/saveAudio";
import { toDataURL } from "../helper/Base64";
import { Alert } from "react-native";
import { StatusWrapper } from "../styles/FeedStyle";
import { Feather } from "@expo/vector-icons";

export default function AudioRecord({ navigation }) {
  const [recording, setRecording] = useState({});
  const [recorded, setRecorded] = useState({});
  const [message, setMessage] = useState("");
  const [sound, setSound] = useState(null);
  const [isModalVisible, setModalVisible] = useState(true);
  const [uploading, setUploading] = useState(false);

  async function startRecording() {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
        const { recording } = await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );
        setRecorded({});
        setRecording(recording);
        // console.log("recording in startRecording", recording);
        // console.log("recorded in startRecording", recorded);
      } else {
        setMessage("Please grant permission to app to access microphone");
      }
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    // console.log("Stopping recording..recording", recording);
    setRecording({});
    await recording.stopAndUnloadAsync();
    const { sound: sound } = await recording.createNewLoadedSoundAsync({
      isMuted: false,
      volume: 1.0,
      rate: 1.0,
      shouldCorrectPitch: true,
    });
    setRecorded(recording);
    setSound(sound);

    // console.log("recording in stop Recording..", recording);
    //console.log("recorded in stop Recording..", recorded);
  }

  const handleUpload = () => {
    //console.log("recording inside handleupload", recording);
    //console.log("recorded inside handleupload", recorded);
    if (Object.keys(recorded).length === 0) {
      Alert.alert("Ops, please record again :)");
    } else {
      setUploading(true);
      const recordedURI = recorded.getURI();
      toDataURL(recordedURI, function (dataUrl) {
        console.log("RESULT:", dataUrl);
        const formData = new FormData();
        formData.append("file", `${dataUrl}`);
        formData.append("upload_preset", "openArms");
        formData.append("cloud_name", "capstonewatermelon");
        formData.append("resource_type", "audio");
        fetch(
          "https://api.cloudinary.com/v1_1/capstonewatermelon/auto/upload",
          {
            method: "post",
            body: formData,
          }
        )
          .then(async (response) => {
            let recordedObj = await response.json();
            console.log("Cloudinary Info in handleUpload:", recordedObj);
            const recordingURL = recordedObj.url;
            saveAudio(recordingURL);
            setUploading(false);
            console.log("recordingURL inside handleUpload", recordingURL);
            console.log("audio saved in handleUpdate");
          })
          .catch((err) => {
            Alert.alert("An Error Occured While Uploading");
          });
      });
    }
  };

  const playSound = () => {
    if (sound) {
      sound.replayAsync();
    } else {
      Alert.alert("Ops,please record again :)");
    }
  };

  // const pauseSound = () =>{
  //   if(isPlaying){
  //     setIsPlaying(false)
  //     sound.unloadAsync();
  //   } else {
  //     setIsPlaying(true)
  //   }
  // }
  return (
    <View style={styles.container}>
      <Modal
        visible={isModalVisible}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(false);
        }}
      >
        <ImageBackground
          style={styles.image}
          source={require("../assets/coverhands.png")}
        >
          <View
            style={{
              position: "absolute",
              right: 40,
              top: 80,
              fontWeight: "bold",
            }}
          >
            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
              <Text>X</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.modal}>
            <Text
              style={{
                marginBottom: 70,
                fontSize: 27,
                fontWeight: "bold",
                color: "#E8A196",
                justifyContent: "center",
                marginLeft: 40,
                marginRight: 40,
              }}
            >
              Tell Your Story
            </Text>
            <View>
              {uploading ? (
                <StatusWrapper
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text>Uploading Your Story!</Text>
                  <ActivityIndicator size="large" color="#0000ff" />
                </StatusWrapper>
              ) : null}
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ marginBottom: 50, color: "#6666", fontSize: 20 }}>
                Tab to start recording
              </Text>

              <View style={styles.playButtonContainer}>
                <Feather
                  name={Object.keys(recording).length ? "stop-circle" : "mic"}
                  color="#AC9292"
                  size={20}
                  onPress={
                    Object.keys(recording).length
                      ? stopRecording
                      : startRecording
                  }
                ></Feather>
              </View>
            </View>
            <View style={{ flex: 1, elevation: 10 }}>
              {sound ? (
                <Button
                  title="Play"
                  color="#AC9292"
                  size={20}
                  fontWeight="bold"
                  onPress={playSound}
                  // style={{ top:600,position:"relative" }}
                ></Button>
              ) : null}
         
              {sound ? (
                <TouchableOpacity
                  style={styles.commandButton}
                  onPress={() => {
                    handleUpload();
                  }}
                >
                  <Text style={styles.panelButtonTitle}>Save</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        </ImageBackground>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 30,
    // marginTop: 150,
  },
  // row: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  // fill: {
  //   flex: 1,
  //   margin: 16,
  // },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //marginBottom: 100,
    marginTop: 200,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#F194FF",
  },
  modalHeaderCloseText: {
    textAlign: "center",
    paddingLeft: 5,
    paddingRight: 5,
    // position: 'absolute',
    // left: 0,
    // right: 0,
    // top: 0,
    // bottom: 0
  },
  commandButton: {
    padding: 5,
    borderRadius: 10,
    backgroundColor: "#AF8EC9",
    alignItems: "center",
    marginTop: 20,
    justifyContent: "center",
    width: 100,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  playButtonContainer: {
    backgroundColor: "#FFF",
    borderColor: "rgba(93, 63, 106, 0.2)",
    borderWidth: 15,
    width: 70,
    height: 70,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 32,
    shadowColor: "#5D3F6A",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
    // shadowColor: "#5D3F6A",
    // shadowRadius: 25,
    // shadowOpacity: 0.5,
    // elevation: 3,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  // modal: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   marginTop: 22,
  // flex: 1,
  // margin: 15,
  // padding: 15,
  // backgroundColor: "white",
  // shadowColor: "purple",
  // shadowOffset: {
  //   width: 0,
  //   height: 2,
  // },
  // shadowOpacity: 0.25,
  // shadowRadius: 4,
  // elevation: 5,
  // },
});

//upload audio to firebase storage
// const uploadAudio = async () => {
//   console.log('recording when save',recording)
//   const uri = recording.getURI();
//   try {
//     const blob = await new Promise((resolve, reject) => {
//       const xhr = new XMLHttpRequest();
//       xhr.onload = () => {
//         try {
//           resolve(xhr.response);
//         } catch (error) {
//           console.log("error:", error);
//         }
//       };
//       xhr.onerror = (e) => {
//         console.log(e);
//         reject(new TypeError("Network request failed"));
//       };
//       xhr.responseType = "blob";
//       xhr.open("GET", uri, true);
//       xhr.send(null);
//     });
//     if (blob != null) {
//       const uriParts = uri.split(".");
//       const fileType = uriParts[uriParts.length - 1];
//       firebase
//         .storage()
//         .ref()
//         .child(`nameOfTheFile.${fileType}`)
//         .put(blob, {
//           contentType: `audio/${fileType}`,
//         })
//         .then(() => {
//           console.log("Sent!");
//         })
//         .catch((e) => console.log("error:", e));
//     } else {
//       console.log("erroor with blob");
//     }
//   } catch (error) {
//     console.log("error:", error);
//   }
// };
// async function stopRecording() {
//   setRecording(undefined);
//   await recording.stopAndUnloadAsync();

//   let updatedRecordings = [...recordings];
//   const { sound, status } = await recording.createNewLoadedSoundAsync();
//   // recording.sound = sound;
//   // recording.duration = getDurationFormatted(status.durationMillis);
//   updatedRecordings.push({
//     sound: sound,
//     duration: getDurationFormatted(status.durationMillis),
//     file: recording.getURI(),
//   });
//   console.log("updatedRecordings when stop", updatedRecordings);

//   setRecordings(updatedRecordings);
//   setRecording(recording)
//   console.log("recording when stop", recording);
// }

// function getRecordingLines() {
//   return recordings.map((recordingLine, index) => {
//     return (
//       <View key={index} style={styles.row}>
//         <Text style={styles.fill}>
//           Recording {index - 1}- {recordingLine.duration}
//         </Text>
//         <Button
//           style={styles.button}
//           onPress={() => recordingLine.sound.replayAsync()}
//           title="Play"
//         ></Button>
//         <Button
//           style={styles.button}
//           onPress={
//             // if (!data.didCancel) {
//             //   const uri = data.uri;
//             //   const type = data.type;
//             //   const name = data.fileName;
//             //   const file = { uri, type, name };
//             //   console.log('file',file)
//               handleUpload

//           }
//           title="Save"
//         ></Button>
//       </View>
//     );
//   });
// }

// function getDurationFormatted(millis) {
//   const minutes = millis / 1000 / 60;
//   const minutesDisplay = Math.floor(minutes);
//   const seconds = Math.round((minutes - minutesDisplay) * 60);
//   const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
//   return `${minutesDisplay}:${secondsDisplay}`;
// }
