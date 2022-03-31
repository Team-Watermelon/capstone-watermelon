import React, {useContext, useEffect, useState} from 'react'
import Card from "react-native-card-component";
import { SafeAreaView, StyleSheet, View, Image} from 'react-native';
import { Button, Text } from 'react-native-paper';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import firebase from "firebase/app";
import "firebase/firestore";
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import NewAudioPlayer from './NewAudioPlayer';
import {TouchableOpacity} from 'react-native-gesture-handler';

const UserCard = ({item, onPress}) => {
    const {user, logout} = useContext(AuthenticatedUserContext);
    const [userData, setUserData] = useState(null);

    const getUser = async () => {
        await firebase
          .firestore()
          .collection("users")
          .doc(item.uid)
          .get()
          .then((documentSnapshot) => {
            if (documentSnapshot.exists) {
                console.log('User Data', documentSnapshot.data());
                setUserData(documentSnapshot.data());
              }
            });
        };

        useEffect(() => {
            getUser();
          }, []);

    return (
        <View style={[styles.container, {
            // Try setting `flexDirection` to `"row"`.
            flexDirection: "column"
          }]}>
{/* <View style={{
    flexDirection: 'row', marginRight: 10, marginLeft: 20, padding: 20, backgroundColor: 'black'
}}> */}
    
<TouchableOpacity onPress={onPress}>
    
    <View key={item.id}
        style={{
            shadowColor: "#000",
            shadowOffset: {
	        width: 15,
	        height: 9,
            },
            shadowOpacity: 0.30,
            shadowRadius: 4.65,
            elevation: 8,
            borderRadius: 40,
            backgroundColor: 'magenta',
            flexRight: 10
        }}
        >
    <View>
        <Image
        source={{
            uri: item
              ? item.userImage ||
                'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'
              : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
          }}
          resizeMode="contain"
          style={styles.cardImage}
    />
    </View>
        <View style={styles.cardText}>
            <View style={{backgroundColor: 'pink'
            }}>
            <Text
              style={{
                fontSize: 18,
                color: '#AC9292',
                fontWeight: 'bold',
                fontFamily: 'Arial',
                textTransform: 'capitalize',
                // paddingLeft: 15,
              }}>
          {item ? item.firstName || 'Test' : 'Test'}{' '}
          </Text>
            </View>
            <View style={{ 
              backgroundColor: 'teal'
          }}>
          <View>
          <Text
                style={{
                  color: '#AC9292',
                  fontSize: 14,
                //   marginRight: 10
                }}>
                Listen to {item ? item.firstName || 'Test' : 'Test'}{' '}'s Story
              </Text>     
            <NewAudioPlayer url ={item.audio} />
          </View>
            <View
              style={{
                marginTop: 4,
                borderWidth: 0,
                paddingLeft: 15,
                flexDirection: 'row',
                // width: '85%',
              }}>
               <Icon name="message" color='#AC9292' size={20} /> 
              <Text
                style={{
                  color: '#AC9292',
                  fontSize: 14,
                }}>
                Connect with {item ? item.firstName || 'Test' : 'Test'}{' '}
              </Text>
              </View>            
            </View>
            </View>
</View>
</TouchableOpacity>
</View>
    )
}

export default UserCard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
      },
    // container: {
    //   flex: 1,
    //   alignItems: 'center',
    //   // justifyContent: 'center',
    //   backgroundColor: '#f7f7f7',
    // },
      cardText : {
        // marginLeft: 120,
        // marginBottom: 90,
        flex: 1
      },
      subCardView: {
        height: 90,
        width: 150,
        borderRadius: 25,
        // flexDirection: 'row',
        // backgroundColor: '#0000FF',
        borderColor: '#FF0000',
        borderWidth: 1,
        borderStyle: 'solid',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green'
      },
      cardImage : {
        borderRadius: 14,
        height: 100,
        width: 117,
        backgroundColor: 'blue',
        flex: 2
      },

      userCategoryIvf: {
        borderColor: '#E8A196',
        color: '#fff',
        // width: 8,
        // height: 10,
        // borderWidth: 2,
        borderRadius: 30,
        paddingVertical: 4,
        paddingHorizontal: 6,
        paddingRight: 6,
        marginRight: 120,
        marginHorizontal: 15,
        backgroundColor: '#E8A196'
      },
      userCategoryBtnTxtIvf: {
        color: '#fff',
        backgroundColor: '#E8A196'
      },
  });