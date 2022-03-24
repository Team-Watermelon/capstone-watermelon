import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { Audio } from "expo-av";
import Base64 from "../helpFunc/Base64";

export default function AudioRecord() {
  const [recording, setRecording] = useState({});
  const [recorded, setRecorded] = useState({});
  const [message, setMessage] = useState("");
  const [sound, setSound] = useState(null);

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
        console.log("recording when start", recording);
        console.log("recorded when start", recorded);
      } else {
        setMessage("Please grant permission to app to access microphone");
      }
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  const handleUpload = () => {
    console.log("this is inside handleupload", recorded);
    const cloudUri = Base64.encode(recorded.getURI());
    //This line will let cloudinary know what MIME type is being sent
    let base64Aud = `data:audio/mpeg;base64,${cloudUri}`;
    const formData = new FormData();
    formData.append("file", `${base64Aud}`);
    formData.append("upload_preset", "openArms");
    formData.append("cloud_name", "capstonewatermelon");
    formData.append("resource_type", "video");
    fetch("https://api.cloudinary.com/v1_1/capstonewatermelon/auto/upload", {
      method: "post",
      body: formData,
    })
      .then(async (response) => {
        let recordedObj = await response.json();
        console.log("Cloudinary Info in stopRecording:", recordedObj);
        const recordingURL = recordedObj.url;
        console.log("recordingURL inside stopRecording", recordingURL);
        return recordingURL;
      })
      .catch((err) => {
        Alert.alert("An Error Occured While Uploading");
      });
  };

  async function stopRecording() {
    console.log("Stopping recording..", recording);
    setRecording({});
    await recording.stopAndUnloadAsync();
    const { sound: sound } = await recording.createNewLoadedSoundAsync({
      isMuted: false,
      volume: 1.0,
      rate: 1.0,
      shouldCorrectPitch: true,
    });
    setSound(sound);
    setRecorded(recording);
    console.log("After stoping recording,recording..", recording);
    console.log("After stoping recording,recorded..", recorded);

    // //Call the `encode` method on the local URI that DocumentPicker                returns
    // const cloudUri = Base64.encode(recording.getURI());
    // console.log("cloudUri when stop", cloudUri);
    // //This line will let cloudinary know what MIME type is being sent
    // let base64Aud = `data:audio/mpeg;base64,${cloudUri}`;
    // const formData = new FormData();
    // //setRecording(recording);
    // formData.append("file", `${base64Aud}`);
    // formData.append("upload_preset", "openArms");
    // formData.append("cloud_name", "capstonewatermelon");
    // formData.append("resource_type", "video");
    // //console.log("data", formData, "recording", cloudUri);
    // fetch("https://api.cloudinary.com/v1_1/capstonewatermelon/auto/upload", {
    //   method: "post",
    //   body: formData,
    // })
    //   .then(async (response) => {
    //     let recordedObj = await response.json();
    //     console.log("Cloudinary Info in stopRecording:", recordedObj);
    //     const recordingURL = recordedObj.url
    //     console.log('recordingURL inside stopRecording',recordingURL)
    //     return recordingURL;
    //   })
    //   .catch((err) => {
    //     Alert.alert("An Error Occured While Uploading");
    //   });
  }

  return (
    <View style={styles.container}>
      <Text>{message}</Text>
      <Button
        title={
          Object.keys(recording).length ? "Stop Recording" : "Start Recording"
        }
        onPress={Object.keys(recording).length ? stopRecording : startRecording}
      />
      {/* <Text style={styles.fill}>Recording 1 - {recourded.duration}</Text> */}
      <Button
        style={styles.button}
        onPress={() => sound.replayAsync()}
        title="Play"
      ></Button>
      <Button
        title="Save"
        onPress={() => {
          handleUpload();
        }}
      ></Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  fill: {
    flex: 1,
    margin: 16,
  },
  button: {
    margin: 16,
  },
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
