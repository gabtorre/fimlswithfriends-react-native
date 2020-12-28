import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Firebase, { db } from '../firebase';
import { useDocumentData } from 'react-firebase-hooks/firestore';

export default function SettingsScreen() {

  const auth = Firebase.auth();
  const currentUser = auth.currentUser;

  return (
    <View style={styles.container}>
      <Image
        style={styles.profilepic}
        resizeMode={"cover"}
        source={{
          uri: currentUser.photoURL
        }}/>
      <Text style={styles.text}>{currentUser.displayName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181D2F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilepic: {
    width: 100,
    height: 100
  },
  text: {
    color: 'white',
  }
});
