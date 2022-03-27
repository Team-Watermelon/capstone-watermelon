import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { Feather } from "@expo/vector-icons";
import firebase from "firebase/app";
import "firebase/firestore";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackObj, setPlaybackObj] = useState(null);
  const [playbackStatus, setplaybackStatus] = useState(null);
  const [audioURL, setAudioURL] = useState(0);
  // const [soundPlaying, setSoundPlaying] = useState(false);

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
          console.log("url in getAudio be4 set", audioURL);
          return setAudioURL(url);
          console.log("url in getAudio after set", audioURL);
        }
      });
  };
  //   useEffect(() => {
  //     if (playbackObject === null) {
  //       setPlaybackObject(sound);
  //     }
  //   }, []);

  const handleAudioPlayPause = async (url) => {
    await getAudio();
    console.log("playbackObj", playbackObj);
    console.log("playingStatus", playbackStatus);
    try {
      console.log("url in handleAudioPlay", audioURL);
      //playing audio for the first time
      if (playbackObj === null && playbackStatus.isPlaying===false || playbackStatus.isLoaded  ) {
        const playbackObj = new Audio.Sound();
        const status = await playbackObj.loadAsync(
          {
            uri: url,
          },
          { shouldPlay: true }
        );
        setplaybackStatus(status)
        //await playbackObj.playAsync();
        setIsPlaying(true);
        playbackStatus.isPlaying=true;
        console.log('isPlaying in start',isPlaying)
        console.log("playbackObj after pause", playbackObj);
        console.log("playbackStatus after pause", playbackStatus);
        return  setPlaybackObj(playbackObj)
      } else if (playbackStatus.isPlaying) {
        const status = await playbackObj.pauseAsync();
        setIsPlaying(false);
        console.log('isPlaying in pause',isPlaying)
        playbackStatus.isPlaying = false;
        return setplaybackStatus(status);
        console.log("isPlaying after play for resuem");
        // }
      } 
      // else if (playbackStatus.isLoaded && !playbackStatus.isPlaying) {
      //   const status = await playbackObj.playAsync();
      //   setIsPlaying(true);
      //   return setplaybackStatus(status);
      // }
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
        style={styles.control}
        size={24}
        color="white"
        onPress={() => handleAudioPlayPause(audioURL)}
      >
        {/* style={{
        //   alignSelf: "center",
        //   backgroundColor: "gray",
        //   padding: 10,
        //   borderRadius: 50,
        // }} */}
        <Feather name={isPlaying? "pause":"play"} size={35} color="#3D425C"></Feather>
        {/* {isPlaying ? (
          <Ionicons name='ios-pause' size={48} color='#444' />
        ) : (
          <Ionicons name='ios-play-circle' size={48} color='#444' />
        )} */}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  trackInfoText: {
    textAlign: "center",
    flexWrap: "wrap",
    color: "#550088",
  },
  control: {
    margin: 20,
  },
});
