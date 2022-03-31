import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';

export default function Map() {
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/Map_planned.png')} resizeMode="cover" style={styles.image}>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#AF8EC9",
    alignSelf: "center",
    paddingBottom: 24,
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
  logo:{
    position: "absolute",
    top: 0,
    width: 300,
    height: 400,
    resizeMode: 'contain',
    alignSelf: 'center',
    padding:0
  },
});

