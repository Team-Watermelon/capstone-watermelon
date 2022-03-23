import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function PersonalPage() {
  return (
    <View style={styles.container}>
       <Image source={require('../assets/logo.png')}  style={styles.smallLogo} />
      <Text>Messages Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 12,
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
