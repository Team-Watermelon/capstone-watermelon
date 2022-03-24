import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import firebase from "firebase/app";
import "firebase/firestore";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {AuthenticatedUserContext} from '../navigation/AuthenticatedUserProvider';

const PersonalPage = ({navigation, route}) => {
  const {user, logout} = useContext(AuthenticatedUserContext);
  
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUser = async() => {
      await firebase.firestore()
    .collection('users')
    .doc( route.params ? route.params.userId : user.uid)
    .get()
    .then((documentSnapshot) => {
      if( documentSnapshot.exists ) {
        console.log('User Data', documentSnapshot.data());
        setUserData(documentSnapshot.data());
      }
    })
  }

  useEffect(() => {
    getUser();
    navigation.addListener("focus", () => setLoading(!loading));
  }, [navigation, loading]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
        showsVerticalScrollIndicator={false}>
        <Image
          style={styles.userImg}
          source={{
            uri: 'https://i.pinimg.com/custom_covers/222x/85498161615209203_1636332751.jpg'}}
        />
        <Text style={styles.userName}>{userData ? userData.firstName || 'Test' : 'Test'}</Text>
        
        <Text style={styles.userLocation}>{userData ? userData.city || 'City' : 'City'}</Text>
        {/* <Icon name="map-marker-radius" color="#777777" size={15}/> */}
        <View style={styles.userBtnWrapper}>
          {route.params ? (
            <>
            <TouchableOpacity style={styles.userBtn} onPress={() => {}}>
                <Text style={styles.userBtnTxt}>{userData ? userData.firstName || 'Test' : 'Test'}'s Story</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.userBtn} onPress={() => {}}>
                <Text style={styles.userBtnTxt}>Message</Text>
          </TouchableOpacity>
          </>
          ) : (
            <>
            <TouchableOpacity
                style={styles.userBtn}
                onPress={() => {
                  navigation.navigate('EditProfile');
                }}
                >
                <Text style={styles.userBtnTxt}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.userBtn}
              // onPress={() => logout()}
              >
                <Text style={styles.userBtnTxt}>Logout</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
        <View>
        <Text style={styles.aboutMe}>{userData ? userData.aboutMe || 'About Me' : 'About Me'}</Text>
        </View>
        <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>10</Text>
            <Text style={styles.userInfoSubTitle}>Posts</Text>
          </View>
        </ScrollView>
    </SafeAreaView>

    // <View style={styles.container}>
    //   <Text>Profile Page</Text>
    // </View>
  );
}

export default PersonalPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e93b81',
    paddingTop: 140,
    paddingHorizontal: 12,
  },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  aboutMe: {
    fontSize: 14,
    marginTop: 10,
    marginBottom: 10,
  },
  userLocation: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  userBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
  },
  userBtn: {
    borderColor: '#2e64e5',
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  userBtnTxt: {
    color: '#2e64e5',
  },
  userInfoItem: {
    justifyContent: 'center',
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});
