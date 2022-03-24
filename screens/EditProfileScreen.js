import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';

const EditProfileScreen = () => {
    return (
        <View style={styles.container}>
            <Text>
            Edit Profile
            </Text>
        </View>
    )
}

export default EditProfileScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
})

