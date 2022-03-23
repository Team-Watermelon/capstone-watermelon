// add logic to click on list of messages 

// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// export default function MessageList() {
//   return (
//     <View style={styles.container}>
//       <Text>List of messages!</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#e93b81',
//     paddingTop: 50,
//     paddingHorizontal: 12,
//   },
// });


import React from 'react'
import { GiftedChat } from 'react-native-gifted-chat'

export default function MessageList() {
  return (
    <GiftedChat />
  )
}
