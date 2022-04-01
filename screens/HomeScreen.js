import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Alert,
} from "react-native";
import UserCard from "../components/UserCard";
import { IconButton } from "../components";

import Firebase from "../config/firebase";
import firebase from "firebase/app";
import "firebase/firestore";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";

const auth = firebase.auth();

export default function HomeScreen({ navigation }) {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);

  const { user } = useContext(AuthenticatedUserContext);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const list = [];
      await firebase
        .firestore()
        .collection("users")
        .get()
        .then((querySnapshot) => {
          console.log("Total Users: ", querySnapshot.size);
          querySnapshot.forEach((doc) => {
            const { id, firstName, userImage, audio, aboutMe } = doc.data();
            list.push({
              id: doc.id,
              firstName,
              userImage,
              audio,
              aboutMe,
            });
          });
        });
      setUsers(list);
      console.log("list", list);
      console.log("Users: ", users);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <UserCard
        data={users}
        key={item.id}
        item={item}
        onPress={() =>
          navigation.navigate("HomeProfile", { currentUser: item })
        }
      />
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <>
            <StatusBar style="dark-content" />
            <View style={styles.row}>
              <Text style={styles.title}>
                open.{"\n"}
                {"\n"}
                {"\n"}
              </Text>
              <IconButton
                name="logout"
                size={24}
                color="black"
                onPress={handleSignOut}
              />
              <Text style={styles.text}>
                Your UID is: {user.uid}
                {"\n"}
                {"\n"}
                {"\n"}
              </Text>
            </View>
            <Text style={styles.stories}>Stories</Text>
          </>
        }
        data={users}
        renderItem={renderItem}
        // ListFooterComponent={
        //   <Footer/>
        // }
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
{
  /* <FlatList
            data={users}
            renderItem={({item}) => (
              <UserCard
                item={item}
                // onDelete={handleDelete}
                onPress={() =>
                  navigation.navigate('HomeProfile',{currentUser:item})
                }
              />
            )}
            keyExtractor={(item) => item.id}
            // ListHeaderComponent={ListHeader}
            // ListFooterComponent={ListHeader}
            showsVerticalScrollIndicator={false}
          /> */
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#AC9292",
  },
  text: {
    fontSize: 16,
    fontWeight: "normal",
    color: "#AC9292",
  },
  stories: {
    fontSize: 28,
    fontWeight: "normal",
    color: "#AC9292",
    padding: 10,
  },
});
