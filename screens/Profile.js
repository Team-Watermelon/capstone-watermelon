import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, AudioPlayer, RNActionButton } from "../components";
import Icon from "react-native-vector-icons/Ionicons";

export default function PersonalPage({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Profile Page</Text>
      {/* story post here? */}
      {/* <InputField
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
      /> */}
      <AudioPlayer />
      <RNActionButton buttonColor="blue">
        <RNActionButton.Item
          buttonColor="#9b59b6"
          title="Add Audio"
          onPress={() => navigation.navigate("AudioRecord")}
        >
          <Icon name="md-create" style={styles.actionButtonIcon} />
        </RNActionButton.Item>
        {/* add video story from here? */}
        {/* <RNActionButton.Item buttonColor='#3498db' title="Add Video" onPress={() => navigation.navigate('upload video story?')}>
            <Icon name="md-create" style={styles.actionButtonIcon} />
          </RNActionButton.Item> */}
      </RNActionButton>
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
    color: "white",
  },
});
