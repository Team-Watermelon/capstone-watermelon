import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Button, Text } from "react-native";
import { Audio } from "expo-av";

export default function NewestAudio({ url }) {
  // Refs for the audio
  const AudioPlayer = useRef(new Audio.Sound());

  // States for UI
  const [IsPLaying, SetIsPLaying] = useState(false);

  const PlayRecordedAudio = async () => {
    try {
      // Load the Recorded URI
      await AudioPlayer.current.loadAsync({ uri: url }, {}, true);

      // Get Player Status
      const playerStatus = await AudioPlayer.current.getStatusAsync();

      // Play if song is loaded successfully
      if (playerStatus.isLoaded) {
        if (playerStatus.isPlaying === false) {
          await AudioPlayer.current.playAsync();
          SetIsPLaying(true);
        }
      }
    } catch (error) {}
  };

  // Function to stop the playing audio
  const StopPlaying = async () => {
    try {
      //Get Player Status
      const playerStatus = await AudioPlayer.current.getStatusAsync();
      // If song is playing then stop it
      if (playerStatus.isLoaded === true)
        await AudioPlayer.current.unloadAsync();
      SetIsPLaying(false);
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      <Button
        title={IsPLaying ? "Stop Sound" : "Play Sound"}
        color={IsPLaying ? "red" : "orange"}
        onPress={IsPLaying ? StopPlaying : PlayRecordedAudio}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
});
