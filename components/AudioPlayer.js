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
          console.log("new url ", documentSnapshot.data().audio);
          const url = documentSnapshot.data().audio;
          console.log("url in getAudio be4 set", audioURL);
          setAudioURL(url);
          handleAudioPlayPause(url)
          
          console.log("url in getAudio after set", audioURL);
        }
      });
  };
 

    // useEffect(() => {
    //   if (playbackObj === null) {
    //     setPlaybackObj(sound);
    //   }
    // }, []);

  const handleAudioPlayPause = async (url) => {
    //await getAudio();
    console.log("playbackObj in handle player", playbackObj);
    console.log("playingStatus in handle player", playbackStatus);
    try {
      console.log("url in handleAudioPlay", audioURL);
      
      //playing audio for the first time
      if (playbackObj !== null && playbackStatus === null ) {
        const playbackObj = new Audio.Sound();
        const status = await playbackObj.loadAsync(
          {
            uri: url,
          },
          { shouldPlay: true }
        );
        setPlaybackObj(playbackObj)
        //await playbackObj.playAsync();
        setIsPlaying(false);
        //playbackStatus.isPlaying=true;
        console.log('isPlaying in start',isPlaying)
        // console.log("playbackObj after set", playbackObj);
        console.log("playbackStatus after set", playbackStatus);
        return setplaybackStatus(status)
      } 
   //pasue
      if (playbackStatus.isPlaying===true) {
        const status = await playbackObj.pauseAsync();
        setIsPlaying(false);
        console.log('isPlaying in pause',isPlaying)
        console.log('playbackObj status in pause',playbackObj)
        console.log('playingback status in pause',playbackStatus)
        // playbackStatus.isPlaying = false;
        // console.log('isPlaying in pause',isPlaying)
        return setplaybackStatus(status);
        console.log("isPlaying after play for resuem");
        // }
      } 
      //resume 
     if (playbackStatus.isPlaying===false) {
        await playbackObj.setStatusAsync({ shouldPlay: true })
        const status = await playbackObj.playAsync();
        console.log('this is resume',isPlaying)
        console.log('playbackObj status in resume',playbackObj)
        console.log('playingback status in resume',playbackStatus)
        // playbackStatus.isPlaying = true;
        setIsPlaying(true);
        console.log('this is resume',isPlaying)
         setplaybackStatus(status);
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
        style={styles.control}
        size={24}
        color="white"
        onPress={() => {getAudio ()}}
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
