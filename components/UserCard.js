import React, { useContext, useEffect, useState } from "react";
import Card from "react-native-card-component";
import { SafeAreaView, StyleSheet, View, Image } from "react-native";
import { Button, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
// import FontAwesomeIcon from "font-awesome";
import firebase from "firebase/app";
import "firebase/firestore";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import HomePageAudio from "./HomePageAudio";
import { TouchableOpacity } from "react-native-gesture-handler";

const UserCard = ({ item, onPress }) => {
  const { user, logout } = useContext(AuthenticatedUserContext);
  const [userData, setUserData] = useState(null);

  const getUser = async () => {
    await firebase
      .firestore()
      .collection("users")
      .doc(item.uid)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          console.log("User Data!!!", documentSnapshot.data());
          setUserData(documentSnapshot.data());
        }
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <SafeAreaView>
      <View
        key={item.id}
        style={{
          borderWidth: .5,
          borderColor: "#CDCDCD",
          margin: 10,
          borderRadius: 10,
            // shadowOpacity: 0.30,
            //   shadowRadius: 4.65,
              elevation: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            // shadowOpacity: 0.30,
            // shadowRadius: 4.65,
            // elevation: 8,
          }}
        >
          <TouchableOpacity onPress={onPress}>
            <Image
              source={{
                uri: item
                  ? item.userImage ||
                    "https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg"
                  : "https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg",
              }}
              // uri: 'https://i.pinimg.com/custom_covers/222x/85498161615209203_1636332751.jpg' }}
              style={{
                height: 97,
                width: 97,
                borderBottomLeftRadius: 10,
                borderTopLeftRadius: 10,
                // borderRadius: 25
              }}
              align={"left"}
              stretch
              imageProps={{ resizeMode: "contain" }}
              containerStyle={{
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          </TouchableOpacity>
          {/* <Card.Title> */}
          <View style={{ marginLeft: 16 }}>
            <TouchableOpacity onPress={onPress}>
              <Text
                style={{
                  fontSize: 26,
                  color: "#AC9292",
                  fontWeight: "bold",
                  fontFamily: "Arial",
                  textTransform: "capitalize",
                  paddingLeft: 15,
                  paddingTop: 8,
                }}
              >
                {item ? item.firstName || "Test" : "Test"}{" "} 
                <Text style={{
                    fontSize: 14,
                    color: "#AC9292",
                }} 
                >
                    {item ? item.pronouns || "pronouns" : "pronouns"}{" "}
                    </Text>
                    <FontAwesome name="arrow-circle-o-right" style={{
                  size: 25, color: "#AC9292"
              }}/>
              </Text>
              

            </TouchableOpacity>
            {/* <Text
                      style={{
                        color: "#AC9292",
                        fontSize: 16,
                        marginLeft: 16
                      }}
                    >
                      Listen to {item ? item.firstName || "Test" : "Test"} 's Story
                    </Text> */}
            {/* <Button mode={'outlined'}>Listen to their story</Button> */}

            {item.audio ? (
            <TouchableOpacity>
                <HomePageAudio url={item.audio} />
            </TouchableOpacity>
            ) : 
            <Text>
                                    
            </Text>
            }
            
            <View
              style={{
                marginTop: 4,
                borderWidth: 0,
                paddingLeft: 8,
                flexDirection: "row",
                marginLeft: 8,
                // width: '85%',
              }}
            >
              <Icon name="message" color="#AC9292" size={20} />
              <Text
                style={{
                  color: "#AC9292",
                  fontSize: 16,
                }}
              >
                  Connect with {item ? item.firstName || "Test" : "Test"}{" "}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: 'center',
    backgroundColor: "#f7f7f7",
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});

//     return (
// <SafeAreaView >
// <TouchableOpacity onPress={onPress}>
//     <Card key={item.id}>
//         <Card.Thumbnail
//         source={{
//             uri: item
//               ? item.userImage ||
//                 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'
//               : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
//           }}
//             // uri: 'https://i.pinimg.com/custom_covers/222x/85498161615209203_1636332751.jpg' }}
//         style={{ height: 85, width: 97 }}
//         align={'left'}
//         // stretch
//         // imageProps={{resizeMode: 'contain'}}
//         containerStyle={{ justifyContent: 'center', alignItems: 'center' }}
//     />
//         {/* <Card.Title> */}
//         <View style={{marginLeft: 16}}>

//             <Text
//               style={{
//                 fontSize: 18,
//                 color: '#AC9292',
//                 fontWeight: 'bold',
//                 fontFamily: 'Arial',
//                 textTransform: 'capitalize',
//                 paddingLeft: 15,
//                 paddingTop: 0
//               }}>
//           {item ? item.firstName || 'Test' : 'Test'}{' '}
//           </Text>

//           <Text
//                 style={{
//                   color: '#AC9292',
//                   fontSize: 14,
//                 }}>
//                 Listen to {item ? item.firstName || 'Test' : 'Test'}{' '}'s Story
//               </Text>
//             {/* <Button mode={'outlined'}>Listen to their story</Button> */}
//             <NewAudioPlayer url ={item.audio} />
//             <View
//               style={{
//                 marginTop: 4,
//                 borderWidth: 0,
//                 paddingLeft: 15,
//                 flexDirection: 'row'
//                 // width: '85%',
//               }}>
//                <Icon name="message" color='#AC9292' size={20} />
//               <Text
//                 style={{
//                   color: '#AC9292',
//                   fontSize: 14,
//                 }}>
//                 Connect with {item ? item.firstName || 'Test' : 'Test'}{' '}
//               </Text>
//             </View>
//             </View>
// </Card>
// </TouchableOpacity>
// </SafeAreaView>
//     )
// }

// export default UserCard;

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       alignItems: 'center',
//       // justifyContent: 'center',
//       backgroundColor: '#f7f7f7',
//     },
//     box: {
//       width: 60,
//       height: 60,
//       marginVertical: 20,
//     },
//   });
