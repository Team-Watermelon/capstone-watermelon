import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Button, Text } from "react-native";
import { Audio } from "expo-av";
import { Feather } from "@expo/vector-icons";

export default function NewestAudio({ url }) {
  // Refs for the audio
  const AudioPlayer = useRef(new Audio.Sound());

  // States for UI
  const [isPlaying, setIsPlaying] = useState(false);

  const playRecordedAudio = async () => {
    try {
      // Load the Recorded URI
      await AudioPlayer.current.loadAsync({ uri: url }, {}, true);

      // Get Player Status
      const playerStatus = await AudioPlayer.current.getStatusAsync();

      // Play if song is loaded successfully
      if (playerStatus.isLoaded) {
        if (playerStatus.isPlaying === false) {
          await AudioPlayer.current.playAsync();
          setIsPlaying(true);
        }
      }
    } catch (error) {}
  };

  // Function to stop the playing audio
  const stopPlaying = async () => {
    try {
      //Get Player Status
      const playerStatus = await AudioPlayer.current.getStatusAsync();
      // If song is playing then stop it
      if (playerStatus.isLoaded === true)
        await AudioPlayer.current.unloadAsync();
      setIsPlaying(false);
    } catch (error) {}
  };

  return (
    <View style={styles.playButtonContainer}>
      <Feather name={isPlaying? "pause":"play"} 
        color='#AC9292'
        size={20}
        onPress={isPlaying ? stopPlaying : playRecordedAudio}
        >
      </Feather>
      {/* <Button

        title={IsPLaying ? "Stop Sound" : "Play Sound"}
        color={IsPLaying ? "red" : "orange"}
        onPress={IsPLaying ? StopPlaying : PlayRecordedAudio}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  playButtonContainer: {
    backgroundColor: "#FFF",
    borderColor: "rgba(93, 63, 106, 0.2)",
    borderWidth: 16,
    width: 100,
    height: 100,
    borderRadius: 64,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 32,
    shadowColor: "#5D3F6A",
    shadowRadius: 30,
    shadowOpacity: 0.5,
  },
});

// const styles = StyleSheet.create({
//   container: {
//     // flex: 1,
//     height: 40,
//     width: 40,
//     justifyContent: "center",
//     backgroundColor: "#ecf0f1",
//     padding: 8,
//   },
// });
