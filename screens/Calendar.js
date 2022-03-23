import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function PersonalPage() {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')}  style={styles.smallLogo} />
       
      <Text>Calendar Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    paddingHorizontal: 12,
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
  smallLogo:{
    position: "absolute",
    top: 0,
    left: 10,
    width: 100,
    height: 200,
    resizeMode: 'contain',
    padding:0
  },
});
