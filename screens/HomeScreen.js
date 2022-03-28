import { StatusBar } from 'expo-status-bar';
import React, { useContext} from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import UserCard from '../components/UserCard';
import { IconButton } from '../components';
import Firebase from '../config/firebase';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';

const auth = Firebase.auth();

export default function HomeScreen() {
  
  const { user } = useContext(AuthenticatedUserContext);
  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView>
      <StatusBar style='dark-content' />
      <View style={styles.row}>
        <Text style={styles.title}>open.{"\n"}{"\n"}{"\n"}</Text>
        <IconButton
          name='logout'
          size={24}
          color='black'
          onPress={handleSignOut}
        />
        <Text style={styles.text}>Your UID is: {user.uid}{"\n"}{"\n"}{"\n"}</Text>
        
      </View>
      <Text style={styles.stories}>
        Stories
      </Text>
      <UserCard />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#AC9292',
  },
  text: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#AC9292',
  },
  stories: {
    fontSize: 28,
    fontWeight: 'normal',
    color: '#AC9292',
    padding: 10,
  }
});

