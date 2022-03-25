import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
//import { getAudio } from "../api/getAudio";

import firebase from "firebase/app";
import "firebase/firestore";

const sound = new Audio.Sound();

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundPlaying, setSoundPlaying] = useState(false);
  const [playbackObject, setPlaybackObject] = useState(null);
  const [playbackStatus, setPlaybackStatus] = useState(null);
  const [audioURL, setAudioURL] = useState(0);

  const getAudio = async () => {
    const currentUser = firebase.auth().currentUser;
    firebase
      .firestore()
      .collection("users")
      .doc(currentUser.uid)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          console.log("Audio Data", documentSnapshot.data().audio);
          const url = documentSnapshot.data().audio;
          console.log("url", url);
          setAudioURL(url);
          console.log("url in getAudio", audioURL);
        }
      });
  };

  //   console.log("audioURL", audioURL);

  //   useEffect(() => {
  //     if (playbackObject === null) {
  //       setPlaybackObject(sound);
  //     }
  //   }, []);

  const handleAudioPlayPause = async () => {
    getAudio();
    const url = atob(audioURL)
    console.log("url in handleAudioPlay", url);
    try {
      if (isPlaying) {
        await sound.pauseAsync();
        setIsPlaying(false);
      } else {
        await sound.loadAsync({
          url: audioURL
        });
        await sound.playAsync();
        setIsPlaying(true);
      }
    } catch (error) {
      console.log(error);
    }
    // if (playbackObject !== null && playbackStatus === null) {
    //   const status = await playbackObject.loadAsync(
    //     { url: audioURL },
    //     { shouldPlay: true }
    //   );
    //   setIsPlaying(true);
    //   return setPlaybackStatus(status);
    // }
    // It will pause our audio
    // if (playbackStatus.isPlaying) {
    //   const status = await playbackObject.pauseAsync();
    //   setIsPlaying(false);
    //   return setPlaybackStatus(status);
    // }

    // // It will resume our audio
    // if (!playbackStatus.isPlaying) {
    //   const status = await playbackObject.playAsync();
    //   setIsPlaying(true);
    //   return setPlaybackStatus(status);
    // }
  };

  return (
    <View style={{ flex: 1, padding: 50, backgroundColor: "#fff" }}>
      <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 15 }}>
        My story
      </Text>
      <Ionicons
        style={{
          alignSelf: "center",
          backgroundColor: "gray",
          padding: 10,
          borderRadius: 50,
        }}
        name={isPlaying ? "pause" : "play"}
        size={24}
        color="white"
        onPress={handleAudioPlayPause}
      />
    </View>
  );
}
