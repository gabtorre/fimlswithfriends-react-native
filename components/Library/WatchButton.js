import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Firebase, { db } from '../../firebase';
import firebase from 'firebase';
import Ionicons from 'react-native-vector-icons/Ionicons';

const WatchButton = ({ movieid, title, date, poster, navigation }) => {
  const auth = Firebase.auth();
  const uid = auth.currentUser.uid;
  const movieRef = db.collection("users").doc(uid);
  const movieDetails = { movieid, title, date, poster };

  const addWatchList = () => {
    movieRef.update({
      watchlist: firebase.firestore.FieldValue.arrayUnion(movieDetails)
    })
    .then(async () => {
      navigation.goBack();
    })
  };

  return (
    <TouchableOpacity
        width="auto"
        alt="Add to Watch List"
        onPress={addWatchList}
        className="mr-2" >
        <Ionicons name="add" size={32} color="white" />
    </TouchableOpacity>
  );
}

export default WatchButton;
