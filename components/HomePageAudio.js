// import React, { useState, useRef, useEffect } from "react";
// import { View, StyleSheet, Button, Text } from "react-native";
// import { Audio } from "expo-av";
// import { Feather } from "@expo/vector-icons";

// export default function NewestAudio({ url }) {
//   // Refs for the audio
//   const AudioPlayer = useRef(new Audio.Sound());

//   // States for UI
//   const [IsPLaying, SetIsPLaying] = useState(false);

//   const PlayRecordedAudio = async () => {
//     try {
//       // Load the Recorded URI
//       await AudioPlayer.current.loadAsync({ uri: url }, {}, true);

//       // Get Player Status
//       const playerStatus = await AudioPlayer.current.getStatusAsync();

//       // Play if song is loaded successfully
//       if (playerStatus.isLoaded) {
//         if (playerStatus.isPlaying === false) {
//           await AudioPlayer.current.playAsync();
//           SetIsPLaying(true);
//         }
//       }
//     } catch (error) {}
//   };

//   // Function to stop the playing audio
//   const StopPlaying = async () => {
//     try {
//       //Get Player Status
//       const playerStatus = await AudioPlayer.current.getStatusAsync();
//       // If song is playing then stop it
//       if (playerStatus.isLoaded === true)
//         await AudioPlayer.current.unloadAsync();
//       SetIsPLaying(false);
//     } catch (error) {}
//   };

//   return (
//     <View style={styles.playButtonContainer}>     
//     <Feather name={IsPLaying? "pause":"play"} 
//     color='#AC9292'
//     size={20}
//     onPress={IsPLaying ? StopPlaying : PlayRecordedAudio}
//     >
//   </Feather>
//       {/* <Button
//         title={IsPLaying ? "pause":"play"}
//         color={IsPLaying ? "red" : "orange"}
//         onPress={IsPLaying ? StopPlaying : PlayRecordedAudio}
//       /> */}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   playButtonContainer: {
//     backgroundColor: "#FFF",
//     borderColor: "rgba(93, 63, 106, 0.2)",
//     borderWidth: 3,
//     width: 30,
//     height: 30,
//     borderRadius: 50,
//     alignItems: "center",
//     justifyContent: "center",
//     marginHorizontal: 32,
//     shadowColor: "#333",
// elevation: 5
//     // shadowColor: "#5D3F6A",
//     // shadowRadius: 25,
//     // shadowOpacity: 0.5,
//     // elevation: 3,
//   },
// });

import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Button, Text } from "react-native";
import { Audio } from "expo-av";
import { Feather } from "@expo/vector-icons";

export default function NewestAudio({ url, userName}) {

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
    <View
      style={{
        marginTop: 4,
        borderWidth: 0,
        paddingLeft: 8,
        flexDirection: "row",
        marginLeft: 8,
        // styles.playButtonContainer
      }}
    >
      <Feather
        name={IsPLaying ? "pause" : "play"}
        color="#AC9292"
        size={20}
        onPress={IsPLaying ? StopPlaying : PlayRecordedAudio}
      ></Feather>
      <Text
        style={{
          color: "#AC9292",
          fontSize: 16,
          // marginLeft: 16,
        }}
      >
        Listen to {userName ? userName : null}'s story 
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  playButtonContainer: {
    backgroundColor: "blue",
    // borderColor: "rgba(93, 63, 106, 0.2)",
    // borderWidth: 15,
    // width: 70,
    // height: 70,
    // borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    // marginHorizontal: 32,
    shadowColor: "#333",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    // shadowColor: "#5D3F6A",
    // shadowRadius: 25,
    // shadowOpacity: 0.5,
    // elevation: 3,
  },
});
