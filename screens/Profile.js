import React from "react";
import { useState } from "react";
import { InputField } from "../components";
import { StyleSheet, Text, View } from "react-native";
import { Button,AudioPlayer } from "../components";
import * as DocumentPicker from "expo-document-picker";
import {Alert} from "react-native";
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

export default function PersonalPage({ navigation }) {
  const [post, setPost] = useState("");

  return (
    <View style={styles.container}>
      <Text>Profile Page</Text>
      <InputField
        inputStyle={{
          fontSize: 14,
        }}
        containerStyle={{
          backgroundColor: "#fff",
          marginBottom: 20,
        }}
        leftIcon="post"
        placeholder="Enter post"
        autoCapitalize="none"
        keyboardType="text"
        textContentType="Text"
        autoFocus={true}
        value={Text}
        onChangeText={(text) => setPost(text)}
      />
      <Button
        title="upload your file"
        color="black"
        onPress={async () => {
          let result = await DocumentPicker.getDocumentAsync({
            type: "audio/*",
          });
          if (result.type === "success") {
            console.log("getDocumentAsync", result);
            Alert.alert(
              "upload file",
              `Whether to upload ${result.name}`,
              [
                {
                  text: "Cancel",
                  onPress: () => {},
                  style: "cancel",
                },
                {
                  text: "OK",
                  onPress: () => dispatch(action.sendFile(encode(result.uri))),
                },
              ],
              { cancelable: true }
            );
          }
        }}
      />
      <AudioPlayer/>
       <ActionButton buttonColor="blue" >
          <ActionButton.Item buttonColor='#9b59b6' title="Add Audio" onPress={() => navigation.navigate('AudioRecord')}>
            <Icon name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          {/* <ActionButton.Item buttonColor='#3498db' title="Add Video" onPress={() => navigation.navigate('AudioRecord')}>
            <Icon name="md-notifications-off" style={styles.actionButtonIcon} />
          </ActionButton.Item> */}
       </ActionButton>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e93b81",
    paddingTop: 50,
    paddingHorizontal: 12,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});
