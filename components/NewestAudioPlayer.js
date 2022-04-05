import React, { useState, useRef } from "react";
import { View, StyleSheet } from "react-native";
import { Audio } from "expo-av";
import { Feather } from "@expo/vector-icons";
import LottieView from "lottie-react-native";

export default function NewestAudio({ url }) {
  // Refs for the audio
  const AudioPlayer = useRef(new Audio.Sound());

  // States for UI
  const [IsPLaying, SetIsPLaying] = useState(false);

  const PlayRecordedAudio = async () => {
    try {
      // Load the Recorded URI
      await AudioPlayer.current.loadAsync({ uri: url }, {}, true);
      // Get Player Status``
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
// <<<<<<< ss-styling
//     <View style={{
//       alignItems: "center",
//       justifyContent: "center",
  
//     }}>
//     <View style={styles.playButtonContainer}>
//     <Feather name={IsPLaying? "pause":"play"} 
//     color='#AC9292'
//     size={20}
//     onPress={IsPLaying ? StopPlaying : PlayRecordedAudio}
//     >
//   </Feather>
//   </View>
//   <View>
//   <Text style={{
//     alignItems: "center",
//     justifyContent: "center",

//   }}>
//     Tap to listen to their story
//   </Text>
//   </View>
// =======
    <View>
    <View style={styles.playButtonContainer}>
      <Feather
        name={IsPLaying ? "pause" : "play"}
        color="#AC9292"
        size={20}
        onPress={IsPLaying ? StopPlaying : PlayRecordedAudio}
      ></Feather>
      </View>
      <View style={styles.status}>  
    {IsPLaying ? (<LottieView source={require('../assets/playing-purple.json')} autoPlay loop />):null}

      {/* <Button
        title={IsPLaying ? "pause":"play"}
        color={IsPLaying ? "red" : "orange"}
        onPress={IsPLaying ? StopPlaying : PlayRecordedAudio}
      /> */}

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  playButtonContainer: {
    elevation: 10,
    backgroundColor: "#FFF",
    borderColor: "rgba(93, 63, 106, 0.2)",
    borderWidth: 1,
    width: 70,
    height: 70,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 32,
    shadowColor: "#333",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,

  },
  status :{
    marginTop: 3,
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 32,
    elevation: 5,
  }
});
