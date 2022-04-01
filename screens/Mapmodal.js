import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Pressable
} from "react-native";

import { Alert } from "react-native";

export default function MapModal({navigation}) {
 
  const [modalVisible, setModalVisible] = useState(true);

 

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="none"
        transparent={true}
        // visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
          navigation.navigate("Map")
        }}
      >
        {/* <View style={styles.centeredView}> */}
          <View style={styles.modalView}>
            <Text style={styles.modalText}>You are not alone.</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => navigation.navigate("Map")}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        {/* </View> */}
      </Modal>
      {/* <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      > */}
        {/* <Text style={styles.textStyle}>Show Modal</Text> */}
      {/* </Pressable> */}
    </View>
  );
};

const styles = StyleSheet.create({
  // centeredView: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   marginTop: 22
  // },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});



