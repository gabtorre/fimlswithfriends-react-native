import React, { useContext } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import Firebase, { db } from '../firebase';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { AuthContext } from '../navigation/AuthProvider';

export default function SettingsScreen() {

  const {user} = useContext(AuthContext);

  const {logout} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Image
        style={styles.profilepic}
        resizeMode={"cover"}
        source={{
          uri: user.photoURL
        }}/>
      <Text style={styles.text}>{user.displayName}</Text>
      <TouchableHighlight
				style={styles.logoutBtn}
				onPress={() => logout()}
			>
				<Text style={styles.logoutBtnText}>LOGOUT</Text>
			</TouchableHighlight>
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
    height: 100,
    borderRadius: 50,
  },
  text: {
    color: 'white',
  },
  logoutBtn: {
		backgroundColor: '#DC3545',
    width: 300,
    padding: 5,
    borderRadius: 10,
    marginTop: 50
	},
	logoutBtnText: {
    color: '#F5F5F1',
    textAlign: "center",
    padding: 3,
    fontSize: 20,
	},
});
