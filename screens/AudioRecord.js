import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { Audio } from "expo-av";
import Base64 from "../helpFunc/Base64";
import { saveAudio } from "../api/saveAudio";
import { Alert } from "react-native";

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
    setSound(sound);
    setRecorded(recording);
    // console.log("recording in stop Recording..", recording);
    //console.log("recorded in stop Recording..", recorded);
  }

  function toDataURL(uri, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      var reader = new FileReader();
      reader.onloadend = function() {
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', uri, true);
    xhr.responseType = 'blob';
    xhr.send();
  }
  
  const handleUpload = () => {
    //console.log("recording inside handleupload", recording);
    //console.log("recorded inside handleupload", recorded);
    const recordedURI= recorded.getURI();
    //const recordedURI =
      //"file:///Users/leishi/Library/Developer/CoreSimulator/Devices/55CE61A9-970C-4AE3-A951-C2DFE61E7890/data/Containers/Data/Application/F17501CC-4C3A-479E-B98A-9DFC828BA2AB/Library/Caches/ExponentExperienceData/%2540anonymous%252Fcapstone-watermelon-a7895481-c0e2-4ca0-bb83-3f9cd6f39b37/AV/recording-E0F42EDE-4032-47D9-9936-13AA50E10EA8.m4a";

    // utitlity function to convert BLOB to BASE64
    // Fetch audio binary blob data
    //const audioURI = recording.getURI();
  toDataURL(recordedURI, function(dataUrl) {
      console.log('RESULT:', dataUrl)
      const formData = new FormData();
      formData.append("file", `${dataUrl}`);
      formData.append("upload_preset", "openArms");
      formData.append("cloud_name", "capstonewatermelon");
      formData.append("resource_type", "audio");
      //formData.append("f_auto","MP4")
      fetch("https://api.cloudinary.com/v1_1/capstonewatermelon/auto/upload", {
        method: "post",
        body: formData,
      })
        .then(async (response) => {
          let recordedObj = await response.json();
          console.log("Cloudinary Info in handleUpload:", recordedObj);
          const recordingURL = recordedObj.url;
          saveAudio(recordingURL);
          console.log("recordingURL inside handleUpload", recordingURL);
          console.log("audio saved in handleUpdate");
        })
        .catch((err) => {
          Alert.alert("An Error Occured While Uploading");
        });
    })
    // console.log("recordedURI", recordedURI);
    // console.log('reader.onloadend',reader.onloadend())
    //This line will let cloudinary know what MIME type is being sent
    // let base64Aud = `data:audio/mpeg;base64,${base64data}`;
    // console.log('recorded uri',recordedURI)
    // console.log('cloudUri', cloudUri)
    // console.log('decodedUri',decodedUri)
  };

  return (
    <View style={styles.container}>
      <Text>{message}</Text>
      <Button
        title={
          Object.keys(recording).length ? "Stop Recording" : "Start Recording"
        }
        onPress={Object.keys(recording).length ? stopRecording : startRecording}
      />
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
