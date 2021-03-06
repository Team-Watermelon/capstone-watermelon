import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, Button as RNButton, ImageBackground, Image } from 'react-native';

import { Button, InputField, ErrorMessage } from '../components';
import Firebase from '../config/firebase';

const auth = Firebase.auth();

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const [loginError, setLoginError] = useState('');

  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const onLogin = async () => {
    try {
      if (email !== '' && password !== '') {
        await auth.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      setLoginError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/coverhands.png')} resizeMode="cover" style={styles.image}>
      <StatusBar style='dark-content' />
      <Image source={require('../assets/logo.png')}  style={styles.logo} />
      <Text style={styles.title}>Login</Text>
      <InputField
        inputStyle={{
          fontSize: 14,
        }}
        containerStyle={{
          backgroundColor: '#fff',
          marginBottom: 20,
        }}
        leftIcon='email'
        placeholder='Enter email'
        autoCapitalize='none'
        keyboardType='email-address'
        textContentType='emailAddress'
        autoFocus={true}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <InputField
        inputStyle={{
          fontSize: 14,
        }}
        containerStyle={{
          backgroundColor: '#fff',
          marginBottom: 20,
        }}
        leftIcon='lock'
        placeholder='Enter password'
        autoCapitalize='none'
        autoCorrect={false}
        secureTextEntry={passwordVisibility}
        textContentType='password'
        rightIcon={rightIcon}
        value={password}
        onChangeText={(text) => setPassword(text)}
        handlePasswordVisibility={handlePasswordVisibility}
      />
      {loginError ? <ErrorMessage error={loginError} visible={true} /> : null}
      <Button
        onPress={onLogin}
        backgroundColor="#AF8EC9"
        title='Login'
        tileColor='#fff'
        titleSize={20}
        containerStyle={{
          marginBottom: 24,
        }}
      />
      <RNButton
        onPress={() => navigation.navigate('Signup')}
        title='Go to Signup'
        color="#AF8EC9"
      />
      </ImageBackground>
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
});
