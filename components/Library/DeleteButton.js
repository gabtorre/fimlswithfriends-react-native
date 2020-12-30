import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Firebase, { db } from '../../firebase';
import firebase from 'firebase';
import Ionicons from 'react-native-vector-icons/Ionicons';

const DeleteButton = ({ movieid, title, date, poster, rating, list, navigation }) => {
  const auth = Firebase.auth();
  const uid = auth.currentUser.uid;
  const movieRef = db.collection("users").doc(uid);
  const movieDetails = (rating >= 0) ? { movieid, title, date, poster, rating } : { movieid, title, date, poster };

  const deleteWatch = () => {
    movieRef.update({
      watchlist: firebase.firestore.FieldValue.arrayRemove(movieDetails)
    })
    .then(async () => {
      navigation.goBack();
    })
  };

  const deleteWatched = () => {
    movieRef.update({
      watched: firebase.firestore.FieldValue.arrayRemove(movieDetails)
    })
    .then(async () => {
      navigation.goBack();
    })
  };

  return (
    <>
    {list == 'watchlist' ?
      <TouchableOpacity
          width="auto"
          alt="Delete Movie"
          onPress={deleteWatch}
          className="mr-2" >
          <Ionicons name="trash" size={32} color="white" />
      </TouchableOpacity> : null
    }
    {list == 'watched' ?
      <TouchableOpacity
          width="auto"
          alt="Delete Movie"
          onPress={deleteWatched}
          className="mr-2" >
          <Ionicons name="trash" size={32} color="white" />
      </TouchableOpacity> : null
    }
    </>
  );
}

export default DeleteButton;
