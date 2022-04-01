// import React, { Component } from "react";
// import { View, ActivityIndicator } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// class CheckLoad extends Component {

//   checkToken =  () => {
//     const token =  AsyncStorage.getItem("FirstTime");
//     if (token) {
//         console.log('token',token)
//       this.props.navigation.navigate("Home");
//     } else {
//         console.log('intro token',token)
//       this.props.navigation.navigate("Intro");
//     }
//   };

//   componentDidMount() {
//     this.checkToken();
//   }
//   render() {
//     return (
//       <View>
//         <ActivityIndicator
//           style={{
//             position: "absolute",
//             flexDirection: "row",
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             marginTop: 350,
//           }}
//           size="large"
//           color="#0275d8"
//         />
//       </View>
//     );
//   }
// }

// export default CheckLoad;
