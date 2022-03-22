import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function PersonalPage() {
  return (
    <View style={styles.container}>
      <Text>Calendar Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e93b81',
    paddingTop: 50,
    paddingHorizontal: 12,
  },
});
