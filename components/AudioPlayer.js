import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View,TouchableOpacity } from "react-native";
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
          setAudioURL(url);
          console.log("url in getAudio", audioURL);
        }
      });
  };
  //   useEffect(() => {
  //     if (playbackObject === null) {
  //       setPlaybackObject(sound);
  //     }
  //   }, []);

  const handleAudioPlayPause = async (url) => {
    getAudio();
    console.log("url in handleAudioPlay", audioURL);
    try {
      if (isPlaying) {
        await sound.pauseAsync();
        setIsPlaying(false);
      } else {
       
        setIsPlaying(true);
        await sound.loadAsync({
          uri: url
        });
        await sound.playAsync();
        
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
    <View style={styles.container}>
      <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 15 }}>
        My story
      </Text>
      <TouchableOpacity 
      style = {styles.control}
      size={24}
        color="white"
        onPress={()=>handleAudioPlayPause(audioURL)}>
        {/* style={{
        //   alignSelf: "center",
        //   backgroundColor: "gray",
        //   padding: 10,
        //   borderRadius: 50,
        // }} */}
        {isPlaying ? (
          <Ionicons name='ios-pause' size={48} color='#444' />
        ) : (
          <Ionicons name='ios-play-circle' size={48} color='#444' />
        )}
       
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  trackInfoText: {
    textAlign: 'center',
    flexWrap: 'wrap',
    color: '#550088'
  },
  control: {
    margin: 20
  },
})
