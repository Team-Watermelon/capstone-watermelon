import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
export default
class Map extends React.Component {
  render() {
    return (
      <MapView
         style={{ flex: 1 }}
         provider={PROVIDER_GOOGLE}
         showsUserLocation
         initialRegion={{
         latitude: 37.78825,
         longitude: -122.4324,
         latitudeDelta: 0.0922,
         longitudeDelta: 0.0421}}
      />
    );
  }
}

// import React from 'react';
// import { StyleSheet, Text, View, ImageBackground } from 'react-native';

// export default function Map() {
//   return (
//     <View style={styles.container}>
//       <ImageBackground source={require('../assets/Map_planned.png')} resizeMode="cover" style={styles.image}>
//       </ImageBackground>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 0,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "600",
//     color: "#AF8EC9",
//     alignSelf: "center",
//     paddingBottom: 24,
//   },
//   image: {
//     flex: 1,
//     justifyContent: "center"
//   },
//   logo:{
//     position: "absolute",
//     top: 0,
//     width: 300,
//     height: 400,
//     resizeMode: 'contain',
//     alignSelf: 'center',
//     padding:0
//   },
// });