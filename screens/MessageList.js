// import React, { useContext } from "react";
import { Title } from "react-native-paper";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import Button from "../components/Button";
import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { List, Divider } from "react-native-paper";
import "firebase/firestore";
import firebase from "firebase/app";

import Loading from '../components/Loading';



export default function HomeScreen( {navigation}) {
  const { user } = useContext(AuthenticatedUserContext);
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);

  const getThreads = async () => {
    await firebase
      .firestore()
      .collection('THREADS')
      .where('user1', '==', "19nD7SIhT6aXCBFohpWEtlyJuPp2")
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log('Users with id 19nD7SIhT6aXCBFohpWEtlyJuPp2', data);
      });
  };

  useEffect(() => {
    getThreads()
    const unsubscribe = firebase.firestore()
      .collection("THREADS")
      .where("users", "array-contains", user.uid)
      .onSnapshot((querySnapshot) => {
        const threads = querySnapshot.docs.map((documentSnapshot) => {
          // console.log('this is querysnapshot', querySnapshot)
          // console.log('this is threads', threads)
          //console.log('this is document snapshot.data', documentSnapshot.data())
          //console.log('this is document snapshot.id', documentSnapshot.id)
          return {
            _id: documentSnapshot.id,
            // give defaults
            name: documentSnapshot.name,
            latestMessage: {
              text: '',
            },
            ...documentSnapshot.data(),
          };
        });

        setThreads(threads);
        //console.log('this is threads', threads)

        if (loading) {
          setLoading(false);
        }
      });

    /**
     * unsubscribe listener
     */
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Loading />;
  }

  // ...rest of the component
  return (
    <View style={styles.container}>
      <FlatList
        data={threads}
        keyExtractor={(item) => item._id}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Message', { thread: item })}
          >
            <List.Item
              title={item.name}
              description={item.latestMessage.text}
              titleNumberOfLines={1}
              titleStyle={styles.listTitle}
              descriptionStyle={styles.listDescription}
              descriptionNumberOfLines={1}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  input: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    padding: 15,
    marginBottom: 20,
    borderColor: 'gray',
  },
  container: {
    paddingTop: 40,
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  listTitle: {
    fontSize: 22,
  },
  listDescription: {
    fontSize: 16,
  },
});
