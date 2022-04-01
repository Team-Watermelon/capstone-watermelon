import React from 'react';
import { Platform, StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { useNavigation } from "@react-navigation/native";

export default function Map() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
   
      <MapView
         style={{ flex: 1 }}
         provider={PROVIDER_GOOGLE}
         showsUserLocation
         initialRegion={{
         latitude: 37.78825,
         longitude: -122.4324,
         latitudeDelta: 0.0922,
         longitudeDelta: 0.0421}}
         onPress={()=> navigation.navigate("MapModal")}
      />
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

