// import * as React from 'react';
// import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
// import Constants from 'expo-constants';
// import { Audio } from 'expo-av';
// import { MaterialIcons } from '@expo/vector-icons';
// import { Entypo } from '@expo/vector-icons';
// import Slider from '@react-native-community/slider';


// export default function AudioPlayer({url}) {
//   const [Loaded, SetLoaded] = React.useState(false);
//   const [Loading, SetLoading] = React.useState(false);
//   const [Playing, SetPlaying] = React.useState(false);
//   const [Duration, SetDuration] = React.useState(0);
//   const [Value, SetValue] = React.useState(0);
//  // const [audioULR,setAudioURL] = React.useState(url)

//   const sound = React.useRef(new Audio.Sound());

//   const source = {uri: url}
//   console.log('source',source)
//   const UpdateStatus = async (data) => {
//     try {
//       if (data.didJustFinish) {
//         ResetPlayer();
//       } else if (data.positionMillis) {
//         if (data.durationMillis) {
//           SetValue((data.positionMillis / data.durationMillis) * 100);
//         }
//       }
//     } catch (error) {
//       console.log('Error');
//     }
//   };

//   const ResetPlayer = async () => {
//     try {
//       const checkLoading = await sound.current.getStatusAsync();
//       if (checkLoading.isLoaded === true) {
//         SetValue(0);
//         SetPlaying(false);
//         await sound.current.setPositionAsync(0);
//         await sound.current.stopAsync();
//       }
//     } catch (error) {
//       console.log('Error');
//     }
//   };

//   const PlayAudio = async () => {
//     try {
//       const result = await sound.current.getStatusAsync();
//       if (result.isLoaded) {
//         if (result.isPlaying === false) {
//           sound.current.playAsync();
//           SetPlaying(true);
//           //result.isPlaying === true;
//           console.log('result in play',result)
//           // SetLoaded(false)
//           // sound.current.unloadAsync()
//         }
//       }
//     } catch (error) {
//       SetPlaying(false);
//     }
//   };

//   const PauseAudio = async () => {
//     try {
//       const result = await sound.current.getStatusAsync();
//       if (result.isLoaded) {
//         if (result.isPlaying === true) {
//           sound.current.pauseAsync();
//           SetPlaying(false);
//         }
//       }
//     } catch (error) {
//       SetPlaying(true);
//     }
//   };

//   const SeekUpdate = async (data) => {
//     try {
//       const checkLoading = await sound.current.getStatusAsync();
//       if (checkLoading.isLoaded === true) {
//         const result = (data / 100) * Duration;
//         await sound.current.setPositionAsync(Math.round(result));
//       }
//     } catch (error) {
//       console.log('Error');
//     }
//   };

//   const LoadAudio = async () => {
//     SetLoading(true);
//     const checkLoading = await sound.current.getStatusAsync();
//     console.log('checkingLoading',checkLoading)
//     if (checkLoading.isLoaded === false) {
//       try {
//         console.log('url in loading',url)
//         const result = await sound.current.loadAsync(
//           source,
//           {},
//           true
//         );
//         console.log('result',result)
//         if (result.isLoaded === false) {
//           SetLoading(false);
//           SetLoaded(false);
//           console.log('Error in Loading Audio');
//         } else {
//           sound.current.setOnPlaybackStatusUpdate(UpdateStatus);
//           SetLoading(false);
//           SetLoaded(true);
//           SetDuration(result.durationMillis);
//         }
//       } catch (error) {
//         SetLoading(false);
//         SetLoaded(false);
//       }
//     } else {
//       SetLoading(false);
//       SetLoaded(true);
//     }
//   };

//   const GetDurationFormat = (duration) => {
//     let time = duration / 1000;
//     let minutes = Math.floor(time / 60);
//     let timeForSeconds = time - minutes * 60;
//     let seconds = Math.floor(timeForSeconds);
//     let secondsReadable = seconds > 9 ? seconds : `0${seconds}`;
//     return `${minutes}:${secondsReadable}`;
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.AudioPLayer}>
//         {Loading ? (
//           <ActivityIndicator size={'small'} color={'red'} />
//         ) : Loaded === false ? (
//           <MaterialIcons
//             name="replay"
//             size={24}
//             color="black"
//             onPress={() => LoadAudio()}
//           />
//         ) : (
//           <Entypo
//             name={Playing ? 'controller-paus' : 'controller-play'}
//             size={24}
//             color="black"
//             onPress={Playing ? () => PauseAudio() : () => PlayAudio()}
//           />
//         )}
//         <Slider
//           style={{ width: '100%' }}
//           minimumValue={0}
//           maximumValue={100}
//           value={Value}
//           onSlidingComplete={(data) => SeekUpdate(data)}
//           minimumTrackTintColor={'dodgerblue'}
//         />
//         <Text>
//           {Playing
//             ? GetDurationFormat((Value * Duration) / 100)
//             : GetDurationFormat(Duration)}
//         </Text>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingTop: Constants.statusBarHeight,
//     backgroundColor: '#ecf0f1',
//     padding: 8,
//   },
//   AudioPLayer: {
//     width: '100%',
//     height: 50,
//     alignItems: 'center',
//   },
// });