import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { Audio } from "expo-av";
import firebase from "firebase/app";

export default function AudioRecord() {
  const [recording, setRecording] = useState();
  const [recordings, setRecordings] = useState([]);
  const [message, setMessage] = useState("");
  const [sound, setSound] = useState()
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
        setRecording(recording);
        console.log('recording when start',recording)
      } else {
        setMessage("Please grant permission to app to access microphone");
      }
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    console.log("Stopping recording..");
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    console.log("Recording stopped and stored at", uri);
    const { sound: sound, status } = await recording.createNewLoadedSoundAsync({
      // isLooping: true,
      isMuted: false,
      volume: 1.0,
      rate: 1.0,
      shouldCorrectPitch: true,
    });
    // recording.sound = sound;
     sound.duration = getDurationFormatted(status.durationMillis);
    setSound(sound)
    //setRecording(recording);
    console.log("recording when stop", recording);
  }
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

  function getDurationFormatted(millis) {
    const minutes = millis / 1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round((minutes - minutesDisplay) * 60);
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutesDisplay}:${secondsDisplay}`;
  }

  const handleUpload = () => {
    const data = new FormData();

    data.append("file", recording);
    data.append("upload_preset", "openArms");
    data.append("cloud_name", "capstonewatermelon");
    console.log("data", data, recording);
    fetch("https://api.cloudinary.com/v1_1/capstonewatermelon/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        // setRecording(data.url);
      })
      .catch((err) => {
        Alert.alert("An Error Occured While Uploading");
      });
  };

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

  return (
    <View style={styles.container}>
      <Text>{message}</Text>
      <Button
        title={recording ? "Stop Recording" : "Start Recording"}
        onPress={recording ? stopRecording : startRecording}
      />
      <Text style={styles.fill}>Recording 1 - {sound.duration}</Text>
      <Button
        style={styles.button}
        onPress={() => sound.replayAsync()}
        title="Play"
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
