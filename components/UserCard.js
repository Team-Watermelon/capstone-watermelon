import React, {useContext, useEffect, useState} from 'react'
import Card from "react-native-card-component";
import { SafeAreaView, StyleSheet} from 'react-native';
import { Button, Text } from 'react-native-paper';
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
<SafeAreaView >
    <Card key={item.id}>
        <Card.Thumbnail
        source={{
            uri: item
              ? item.userImage ||
                'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'
              : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
          }} 
            // uri: 'https://i.pinimg.com/custom_covers/222x/85498161615209203_1636332751.jpg' }}
        style={{ height: 85, width: 97 }}
        align={'left'}
        // stretch
        // imageProps={{resizeMode: 'contain'}}
        containerStyle={{ justifyContent: 'center', alignItems: 'center' }}
    />
    <Card.Content>
        {/* <Card.Title> */}
        <TouchableOpacity onPress={onPress}>
          <Text>
          {item ? item.firstName || 'Test' : 'Test'}{' '}
          </Text>
          </TouchableOpacity>
        {/* text={'Ex Lorem magna sint labore ex commodo dolor minim ad.'}
        /> */}
        {/* </Card.Title> */}
        <Card.Row>
        <Card.Col>
            {/* <Button mode={'outlined'}>Listen to their story</Button> */}
            <NewAudioPlayer url ={item.audio}/>
        </Card.Col>
        <Card.Col>
            <Button mode={'contained'}>Connect with {userData ? userData.firstName || 'Test' : 'Test'}{' '}</Button>
        </Card.Col>
        </Card.Row>
    </Card.Content>
</Card>
</SafeAreaView>
    )
}

export default UserCard;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      // justifyContent: 'center',
      backgroundColor: '#f7f7f7',
    },
    box: {
      width: 60,
      height: 60,
      marginVertical: 20,
    },
  });